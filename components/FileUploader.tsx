"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { toast as te } from "react-hot-toast";
import { storage } from "@/firebase/client"; // Ensure Firebase is initialized and storage is imported
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface Props {
    ownerId: string;
    accountId: string;
    className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
    const path = usePathname();
    const { toast } = useToast();
    const [files, setFiles] = useState<File[]>([]);

    const uploadFile = async (file: File) => {
        const storageRef = ref(storage, `uploads/${ownerId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle progress if needed
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            setFiles(acceptedFiles);

            const uploadPromises = acceptedFiles.map(async (file) => {
                if (file.size > MAX_FILE_SIZE) {
                    setFiles((prevFiles) =>
                        prevFiles.filter((f) => f.name !== file.name)
                    );

                    return toast({
                        description: (
                            <p className="body-2 text-white">
                                <span className="font-semibold">{file.name}</span> is too large.
                                Max file size is 50MB.
                            </p>
                        ),
                        className: "error-toast",
                    });
                }

                try {
                    const uploadedFileURL = await uploadFile(file);
                    // Handle the uploaded file URL as needed
                    setFiles((prevFiles) =>
                        prevFiles.filter((f) => f.name !== file.name)
                    );
                    te.success("File uploaded successfully");
                } catch (error) {
                    console.error("Error uploading file:", error);
                    te.error("Failed to upload file");
                }
            });

            await Promise.all(uploadPromises);
        },
        [ownerId, accountId, path]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleRemoveFile = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>,
        fileName: string
    ) => {
        e.stopPropagation();
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Button type="button" className={cn("uploader-button", className)}>
                <Image
                    src="/assets/icons/upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                />{" "}
                <p>Upload</p>
            </Button>
            {files.length > 0 && (
                <ul className="uploader-preview-list">
                    <h4 className="h4 text-light-100">Uploading</h4>

                    {files.map((file, index) => {
                        const { type, extension } = getFileType(file.name);

                        return (
                            <li
                                key={`${file.name}-${index}`}
                                className="uploader-preview-item"
                            >
                                <div className="flex items-center gap-3">
                                    <Thumbnail
                                        type={type}
                                        extension={extension}
                                        url={convertFileToUrl(file)}
                                    />

                                    <div className="preview-item-name">
                                        {file.name}
                                        <Image
                                            src="/assets/icons/file-loader.gif"
                                            width={80}
                                            height={26}
                                            alt="Loader"
                                        />
                                    </div>
                                </div>

                                <Image
                                    src="/assets/icons/remove.svg"
                                    width={24}
                                    height={24}
                                    alt="Remove"
                                    onClick={(e) => handleRemoveFile(e, file.name)}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FileUploader;
