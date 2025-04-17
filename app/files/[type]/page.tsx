'use client'
import { useState } from "react";
import { uploadFileAction, deleteFileAction, shareFileWithUsername, getUserFiles } from "@/lib/actions/fire.files.actions";
import { useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";

import {Input} from "@heroui/input";

import Image from "next/image"
import Card from "@/components/Card";


export default function FileManager() {
  const [files, setFiles] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    refreshFiles();
  }, []);

  const refreshFiles = async () => {
    const data = await getUserFiles();
    setFiles(data);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await uploadFileAction(formData);
    setFile(null);
    refreshFiles();
  };

  const handleDelete = async (fileId: string) => {
    await deleteFileAction(fileId);
    refreshFiles();
  };

  const handleShare = async () => {
    if (!selectedFileId || !username) return;
    await shareFileWithUsername(selectedFileId, username);
    setUsername("");
    setSelectedFileId(null);
    refreshFiles();
  };

  const getPreview = (type: string, url: string) => {
    if (type === "image") return <Image src={url} alt="preview" className="h-32 object-contain" width={100} height={100}/>;
    if (type === "video") return <video src={url} controls className="h-32" />;
    if (type === "audio") return <audio src={url} controls />;
    return <p className="text-sm">Document</p>;
  };

  return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Files</h1>

        <div className="flex items-center gap-4 mb-6">
          <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Button onClick={handleUpload} disabled={isPending}>Upload</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((f) => (
              <Card key={f.id} file={f} />
          ))}
        </div>

        {selectedFileId && (
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-2">Share File</h2>
              <div className="flex items-center gap-2">
                <Input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button onClick={handleShare}>Share</Button>
              </div>
            </div>
        )}
      </div>
  );
}
