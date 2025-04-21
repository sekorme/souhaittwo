import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/filecomponent/FormattedDateTime";
import ActionDropdown from "@/components/filecomponent/ActionDropdown";


const Card = ({ file }: { file:  any }) => {
    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    };

    return (
        <Link href={`${file?.url}`} target="_blank" className="file-card hover:scale-0.1">
            <div className="flex justify-between">
                <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="!size-20"
                    imageClassName="!size-11"
                />
                <div className="flex flex-col items-end justify-between">
                    <ActionDropdown file={file} />
                    <p className="body-1">{formatSize(file.size)}</p>
                </div>
            </div>

            <div className="file-card-details">
                <p className={"subtitle-2 line-clamp-1"}>{file.name}</p>
 <FormattedDateTime date={file.createdAt?.toDate?.().toLocaleString() || "Unknown"}/>

                <p className={"caption line-clamp-1 text-[#00d700] "}>
                    Owner: {file.sharedBy}
                </p>
            </div>
        </Link>
    );
};
export default Card;
