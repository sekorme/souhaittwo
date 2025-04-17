import {ref, uploadBytes, deleteObject, getDownloadURL, getMetadata} from "firebase/storage";

import { storage, db } from "@/firebase/client";
import {getFileType} from "@/lib/utils";
import {FileType} from "@/types";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import {
    collection,
    addDoc,
    query,
    where,
    deleteDoc,
    getDocs,
    orderBy,
    limit as limitDocs,
    updateDoc,
    doc,
    serverTimestamp, getDoc
} from "firebase/firestore";

declare interface UpdateFileUsersProps {
    fileId: string;
    emails: string[];
    path: string;
}
declare interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}

declare interface GetFilesProps {
    types: FileType[];
    searchText?: string;
    sort?: string;
    limit?: number;
}
declare interface RenameFileProps {
    fileId: string;
    name: string;
    extension: string;
    path: string;
}


declare interface DeleteFileProps {
    fileId: string;
    bucketField: string;
    path: string;
}




export const getFiles = async ({ types = [], searchText = "", sort = "createdAt-desc", limit }: GetFilesProps) => {
    try {
        const currentUser = await getCurrentUser();
        const filesRef = collection(db, "files");

        const q = query(
            filesRef,
            where("owner", "==", currentUser?.id),
            ...(types.length > 0 ? [where("type", "in", types)] : []),
            ...(searchText ? [where("name", ">=", searchText)] : []),
            orderBy(sort.split("-")[0], sort.split("-")[1] === "asc" ? "asc" : "desc"),
            ...(limit ? [limitDocs(limit)] : [])
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error("Failed to fetch files", err);
        throw err;
    }
};




export const renameFile = async ({ fileId, name, extension }: RenameFileProps) => {
    try {
        const newName = `${name}.${extension}`;
        const fileDoc = doc(db, "files", fileId);
        await updateDoc(fileDoc, { name: newName });
        return { id: fileId, name: newName };
    } catch (err) {
        console.error("Rename failed", err);
        throw err;
    }
};


export const updateFileUsers = async ({ fileId, emails }: UpdateFileUsersProps) => {
    try {
        const fileDoc = doc(db, "files", fileId);
        await updateDoc(fileDoc, { users: emails });
        return { id: fileId, users: emails };
    } catch (err) {
        console.error("Failed to update users", err);
        throw err;
    }
};





export const deleteFile = async ({ fileId, bucketField }: DeleteFileProps) => {
    try {
        const fileDoc = doc(db, "files", fileId);
        await deleteDoc(fileDoc);

        const fileRef = ref(storage, bucketField);
        await deleteObject(fileRef);

        return { status: "success" };
    } catch (err) {
        console.error("Delete failed", err);
        throw err;
    }
};


export async function getTotalSpaceUsed() {
    const currentUser = await getCurrentUser();
    const filesRef = collection(db, "files");
    const q = query(filesRef, where("owner", "==", currentUser?.id));
    const snapshot = await getDocs(q);

    const totalSpace: {
        all: number;
        image: { latestDate: string; size: number };
        other: { latestDate: string; size: number };
        document: { latestDate: string; size: number };
        video: { latestDate: string; size: number };
        audio: { latestDate: string; size: number };
        used: number;
        [key: string]: { latestDate: string; size: number } | number;
    } = {
        image: { size: 0, latestDate: "" },
        document: { size: 0, latestDate: "" },
        video: { size: 0, latestDate: "" },
        audio: { size: 0, latestDate: "" },
        other: { size: 0, latestDate: "" },
        used: 0,
        all: 2 * 1024 * 1024 * 1024,
    };

    snapshot.docs.forEach((docSnap) => {
        const file = docSnap.data();
        const type = file.type || "other";

        if (type in totalSpace && typeof totalSpace[type] === 'object') {
            (totalSpace[type] as { size: number; latestDate: string }).size += file.size;
            totalSpace.used += file.size;

            if (
                !(totalSpace[type] as { latestDate: string }).latestDate ||
                new Date(file.updatedAt || file.createdAt) > new Date((totalSpace[type] as { latestDate: string }).latestDate)
            ) {
                (totalSpace[type] as { latestDate: string }).latestDate = file.updatedAt || file.createdAt;
            }
        }
    });

    return totalSpace;
}



export async function uploadFileAction(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const file = formData.get("file") as File;
    const storageRef = ref(storage, `uploads/${user.id}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
  const metadata = await getMetadata(snapshot.ref)


    const docRef = await addDoc(collection(db, "files"), {
        ownerId: user.id,
        fileName: file.name,
        size: metadata.size,
        storagePath: snapshot.ref.fullPath,
        type: getFileType(file.name),
        sharedWith: [],
        url:url,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
}




export const createFQuery = (
    currentUser: any,
    types: string[],
    searchText: string,
    sort: string,
    limit?: number
) => {
    let q = query(
        collection(db, "files"), // adjust collection name
        where("access", "array-contains-any", [currentUser.email, currentUser.uid])
    );

    if (types.length > 0) {
        q = query(q, where("type", "in", types));
    }

    if (searchText) {
        // Firestore doesn't support full-text search directly.
        // You may need to integrate with Algolia or use `name_lowercase` + `>=` for prefix matching.
        // Here's a basic workaround if you've indexed name as lowercase:
        const searchLower = searchText.toLowerCase();
        q = query(q, where("name_lowercase", ">=", searchLower), where("name_lowercase", "<=", searchLower + "\uf8ff"));
    }

    if (sort) {
        const [sortBy, orderByDir] = sort.split("-");
        q = query(q, orderBy(sortBy, orderByDir === "asc" ? "asc" : "desc"));
    }

    if (limit) {
        q = query(q, limitDocs(limit));
    }

    return q;
};








export async function getUserFiles({
                                       types = [],
                                       searchText = "",
                                       sort = "createdAt-desc",
                                       limit,
                                   }: GetFilesProps) {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    // Step 1: Get all files owned or shared with user
    const ownQuery = query(
        collection(db, "files"),
        where("ownerId", "==", user.id)
    );
    const sharedQuery = query(
        collection(db, "files"),
        where("sharedWith", "array-contains", user.id)
    );

    const [ownSnap, sharedSnap] = await Promise.all([
        getDocs(ownQuery),
        getDocs(sharedQuery),
    ]);

    const allDocs = [...ownSnap.docs, ...sharedSnap.docs];

    // Step 2: Filter and sort client-side
    const [sortBy = "createdAt", orderDir = "desc"] = sort.split("-");
    let files = allDocs.map((docSnap) => {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name || data.fileName || docSnap.id,
            size: data.size ,// <-- fallback options
            ...data,
        };
    }) as any[];

    // Filter by type
    if (types.length > 0) {
        files = files.filter((file) => types.includes(file.type));
    }

    // Filter by searchText
    if (searchText) {
        const search = searchText.toLowerCase();
        files = files.filter((file) =>
            file.name?.toLowerCase().includes(search)
        );
    }

    // Sort
    files.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (orderDir === "asc") return aVal > bVal ? 1 : -1;
        else return aVal < bVal ? 1 : -1;
    });

    // Limit
    if (limit) {
        files = files.slice(0, limit);
    }

    // Step 3: Attach sharedBy name (avoid N+1 reads with caching)
    const ownerIds = Array.from(new Set(files.map((f) => f.ownerId)));
    const ownerSnaps = await Promise.all(
        ownerIds.map((id) => getDoc(doc(db, "users", id)))
    );
    const ownerMap = Object.fromEntries(
        ownerSnaps.map((snap) => [snap.id, snap.data()?.name || "Unknown"])
    );

    const enriched = files.map((file) => ({
        ...file,
        sharedBy: ownerMap[file.ownerId] || "Unknown",
    }));

    return enriched;
}


export async function updateFileAction(fileId: string, newFile: File) {
    const user = await getCurrentUser();
    const docRef = doc(db, "files", fileId);
    const fileSnap = await getDoc(docRef);
    const fileData = fileSnap.data();

    if (fileData?.ownerId !== user?.id) throw new Error("Unauthorized");

    const oldRef = ref(storage, fileData?.storagePath);
    await deleteObject(oldRef);

    const newPath = `uploads/${user?.id}/${newFile.name}`;
    const newRef = ref(storage, newPath);
    await uploadBytes(newRef, newFile);

    await updateDoc(docRef, {
        fileName: newFile.name,
        storagePath: newPath,
        updatedAt: serverTimestamp(),
    });

    return { success: true };
}


export async function deleteFileAction(fileId: string) {
    const user = await getCurrentUser();
    const docRef = doc(db, "files", fileId);
    const snap = await getDoc(docRef);
    const data = snap.data();

    if (data?.ownerId !== user?.id) throw new Error("Unauthorized");

    const fileRef = ref(storage, data?.storagePath);
    await deleteObject(fileRef);
    await deleteDoc(docRef);

    return { success: true };
}

export async function shareFileWithUsername(fileId: string, email: string, unshare = false) {
    const user = await getCurrentUser();
    const fileDocRef = doc(db, "files", fileId);
    const fileSnap = await getDoc(fileDocRef);
    const fileData = fileSnap.data();

    if (fileData?.ownerId !== user?.id) throw new Error("Unauthorized");

    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("User not found");

    const recipientId = snap.docs[0].id;

    const sharedWith = fileData?.sharedWith || [];
    const updatedList = unshare
        ? sharedWith.filter((id: string) => id !== recipientId)
        : [...Array.from(new Set([...sharedWith, recipientId]))];

    await updateDoc(fileDocRef, {
        sharedWith: updatedList,
    });

    return { success: true };
}