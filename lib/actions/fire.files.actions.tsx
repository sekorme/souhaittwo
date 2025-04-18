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


const getFileExtension = (param: any) => {
    return param.split(".").pop();
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
            size: data.size ,
            extension: getFileExtension(data.name || data.fileName || docSnap.id), // <-- fallback options
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


export async function deleteFileAction(userId: string) {
    if (!userId) {
        console.error("Error: userId is undefined or null.");
        throw new Error("Invalid userId: userId is required.");
    }

    try {
        // Query all files associated with the user
        const filesQuery = query(collection(db, "files"), where("ownerId", "==", userId));
        const filesSnapshot = await getDocs(filesQuery);

        const deletePromises = filesSnapshot.docs.map(async (fileDoc) => {
            const fileData = fileDoc.data();
            if (!fileData.storagePath) {
                console.warn(`File document ${fileDoc.id} is missing storagePath.`);
                return;
            }

            const fileRef = ref(storage, fileData.storagePath);

            // Delete file from Firebase Storage
            await deleteObject(fileRef);
            console.log(`File deleted from storage: ${fileData.storagePath}`);

            // Delete file document from Firestore
            await deleteDoc(fileDoc.ref);
            console.log(`File document deleted: ${fileDoc.id}`);
        });

        await Promise.all(deletePromises);
        console.log(`All files for user ${userId} deleted.`);
    } catch (error) {
        console.error("Error deleting user storage:", error);
        throw error;
    }
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

export async function deleteFileById(fileId: string, userId: string) {
    if (!fileId || !userId) {
        throw new Error("fileId and userId are required.");
    }

    try {
        const docRef = doc(db, "files", fileId);
        const snap = await getDoc(docRef);

        if (!snap.exists()) throw new Error("File not found");

        const data = snap.data();
        if (data.ownerId !== userId) throw new Error("Unauthorized");

        const fileRef = ref(storage, data.storagePath);

        try {
            // Attempt to delete the storage file
            await deleteObject(fileRef);
            console.log("Storage file deleted:", data.storagePath);
        } catch (error: any) {
            if (error.code === "storage/object-not-found") {
                console.warn("Storage file not found, skipping deletion:", data.storagePath);
            } else {
                throw error;
            }
        }

        // Delete Firestore document regardless of whether the file was found
        await deleteDoc(docRef);
        console.log("Firestore document deleted:", fileId);

        return { success: true };
    } catch (error) {
        console.error("Failed to delete file:", error);
        throw new Error("Could not delete file.");
    }
}




export async function downloadFile(storagePath: string) {
    try {
        const fileRef = ref(storage, storagePath);
        const url = await getDownloadURL(fileRef);

        // Trigger browser download
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = storagePath.split("/").pop() || "file";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        console.log("File download triggered:", url);
    } catch (error) {
        console.error("Error downloading file:", error);
        throw new Error("Failed to download file");
    }
}