import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

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

    const fileType = file.type.split("/")[0];

    const docRef = await addDoc(collection(db, "files"), {
        ownerId: user.id,
        fileName: file.name,
        storagePath: snapshot.ref.fullPath,
        type: fileType,
        sharedWith: [],
        url:url,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
}



export async function getUserFiles() {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    const q = query(
        collection(db, "files"),
        where("ownerId", "==", user.id)
    );
    const sharedQuery = query(
        collection(db, "files"),
        where("sharedWith", "array-contains", user.id)
    );

    const [ownSnap, sharedSnap] = await Promise.all([
        getDocs(q),
        getDocs(sharedQuery),
    ]);

    const allFiles = await Promise.all(
        [...ownSnap.docs, ...sharedSnap.docs].map(async (docSnap) => {
            const data = docSnap.data();
            const ownerDoc = await getDoc(doc(db, "users", data.ownerId));
            return {
                id: docSnap.id,
                ...data,
                sharedBy: ownerDoc.data()?.name || "Unknown",
            };
        })
    );

    return allFiles;
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