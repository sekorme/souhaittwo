"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast as te } from "react-hot-toast";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/firebase/client"; // Ensure Firebase is initialized and storage is imported
import { getCurrentUser } from "@/lib/actions/auth.actions";

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
    try {
      const user = await getCurrentUser();
      if (!user || !user.id) throw new Error("User not authenticated");

      const storageRef = ref(storage, `uploads/${user.id}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<{ success: boolean; id: string }>((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            // Optional progress handler
            () => {},
            (error) => {
              console.error("Upload error:", error);
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                const fileType = file.type.split("/")[0];

                const docRef = await addDoc(collection(db, "files"), {
                  ownerId: user.id,
                  fileName: file.name,
                  size: file.size,
                  storagePath: uploadTask.snapshot.ref.fullPath,
                  type: fileType,
                  sharedWith: [],
                  url: downloadURL,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                });

                console.log("File uploaded and saved to Firestore:", docRef.id);
                resolve({ success: true, id: docRef.id });
              } catch (metaError) {
                console.error("Error saving file metadata:", metaError);
                reject(metaError);
              }
            }
        );
      });
    } catch (err) {
      console.error("Unexpected error in uploadFile:", err);
      throw err;
    }
  };


  const onDrop = useCallback(
      async (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);

        const uploadPromises = acceptedFiles.map(async (file) => {
          if (file.size > MAX_FILE_SIZE) {
            setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

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
            await uploadFile(file);
            setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
            te.success(`✅ ${file.name} uploaded successfully`);
          } catch (error) {
            console.error(`❌ Error uploading ${file.name}:`, error);
            te.error(`Failed to upload ${file.name}`);
          }
        });

        await Promise.all(uploadPromises);
      },
      [ownerId, accountId, path]
  );


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button className={cn("uploader-button", className)} type="button">
        <Image
          alt="upload"
          height={24}
          src="/assets/icons/upload.svg"
          width={24}
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
                    extension={extension}
                    type={type}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      alt="Loader"
                      height={26}
                      src="/assets/icons/file-loader.gif"
                      width={80}
                    />
                  </div>
                </div>

                <Image
                  alt="Remove"
                  height={24}
                  src="/assets/icons/remove.svg"
                  width={24}
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
