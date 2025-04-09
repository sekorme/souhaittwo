import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

import { storage, db } from "@/firebase/client";
import {getFileType} from "@/lib/utils";
import {FileType} from "@/types";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import { collection, addDoc, query, where, deleteDoc, getDocs, orderBy, limit as limitDocs, updateDoc, doc } from "firebase/firestore";

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

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
    try {
        const fileRef = ref(storage, `files/${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snapshot.ref);

        const fileType = getFileType(file.name);

        const docRef = await addDoc(collection(db, "files"), {
            type: fileType.type,
            name: file.name,
            url,
            extension: fileType.extension,
            size: file.size,
            owner: ownerId,
            accountId,
            users: [],
            bucketField: fileRef.fullPath,
            createdAt: new Date(),
        });

        return { id: docRef.id, url };
    } catch (error) {
        console.error("Upload failed", error);
        throw error;
    }
};


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

export const fetchFilesFromStorage = async (folderPath: string) => {
    const folderRef = ref(storage, folderPath);
    const listResult = await listAll(folderRef);

    const files = await Promise.all(
        listResult.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
                name: item.name,
                fullPath: item.fullPath,
                url,
            };
        })
    );

    return files;
};