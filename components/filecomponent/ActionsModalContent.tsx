import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/filecomponent/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageThumbnail = ({ file }: { file: any }) => (
    <div className="file-details-thumbnail">
        <Thumbnail type={file.type} extension={file.extension} url={file.url} />
        <div className="flex flex-col">
            <p className="subtitle-2 mb-1">{file.name}</p>
            <FormattedDateTime date={file.$createdAt} className="caption" />
        </div>
    </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex">
        <p className="file-details-label text-left">{label}</p>
        <p className="file-details-value text-left">{value}</p>
    </div>
);

export const FileDetails = ({ file }: { file: any }) => {
    return (
        <>
            <ImageThumbnail file={file} />
            <div className="space-y-4 px-2 pt-2">
                <DetailRow label="Format:" value={file.extension} />
                <DetailRow label="Size:" value={convertFileSize(Number(file.size))} />
                <DetailRow label="Owner:" value={file.sharedBy} />
                <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
            </div>
        </>
    );
};

interface Props {
    file: any;
    onInputChange?: React.Dispatch<React.SetStateAction<string[]>>;
    onRemove: (email: string) => void;
    value:any
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ShareInput = ({ file, value, onInputChange,onChange, onRemove }: Props) => {
    return (
        <>
            <ImageThumbnail file={file} />

            <div className="share-wrapper">
                <p className="subtitle-2 pl-1 text-light-100">
                    Share file with other users
                </p>
                <Input
                    type="email"
                    placeholder="Enter email address"
                    onChange = {onChange}
                    className="share-input-field"
                    style={{ fontSize: "16px" }}
                    value={value}
                />
                <div className="pt-4">
                    <div className="flex justify-between">
                        <p className="subtitle-2 text-light-100">Shared with</p>
                        <p className="subtitle-2 text-light-200">
                            {Array.isArray(file.email) ? `${file.email.length} users` : "0 users"}
                        </p>
                    </div>

                    <ul className="pt-2">
                        {Array.isArray(file?.email) && file.email.map((email: string) => (
                            <li
                                key={email}
                                className="flex items-center justify-between gap-2"
                            >
                                <p className="subtitle-2">{email}</p>
                                <Button
                                    onClick={() => onRemove(email)}
                                    className="share-remove-user"
                                >
                                    <Image
                                        src="/assets/icons/remove.svg"
                                        alt="Remove"
                                        width={24}
                                        height={24}
                                        className="remove-icon"
                                    />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
