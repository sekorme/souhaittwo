"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState , useEffect, useCallback} from "react";
import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    deleteFile,
    renameFile,
    updateFileUsers,
} from "@/lib/actions/file.actions";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { FileDetails, ShareInput } from "@/components/ActionsModalContent";
import {ActionType, FileType} from "@/types";
import {deleteFileAction, deleteFileById, getUserFiles, shareFileWithUsername} from "@/lib/actions/fire.files.actions";
import {getCurrentUser} from "@/lib/actions/auth.actions";
import {getDownloadURL} from "firebase/storage";

const ActionDropdown = ({ file }: { file: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [action, setAction] = useState<ActionType | null>(null);
    const [name, setName] = useState(file.name);
    const [isLoading, setIsLoading] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("createdAt-desc");
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

    const closeAllModals = () => {
        setIsModalOpen(false);
        setIsDropdownOpen(false);
        setAction(null);
        setName(file.name);
        window.location.reload();
        //   setEmails([]);
    };

    const currentType = searchParams.get("type") || "all";

    const resolveTypeFilter = (typeParam: string) : FileType[] => {
        switch (typeParam) {
            case "images":
                return ["image"];
            case "documents":
                return ["document"];
            case "media":
                return ["video", "audio"];
            case "other":
                return ["other"];
            default:
                return [];
        }
    };

    const typeFilter = resolveTypeFilter(currentType);


    const refreshFetchFiles = async () => {
        setLoading(true);
        try {
            const data = await getUserFiles({
                searchText,
                types: typeFilter,
                sort,
            });
            setFiles(data);
        } catch (error) {
            console.error("Failed to load files", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshFetchFiles();
    }, []);

    const handleShare = async () => {
        if (!selectedFileId || !username) return;
        await shareFileWithUsername(selectedFileId, username);
        setUsername("");
        setSelectedFileId(null);
        refreshFetchFiles()
    };


    const handleDeleteFile = async(fileId: string,) => {
        try {
            const user = await getCurrentUser();
            if (!user || !user.id) {
                throw new Error("Error: userId is undefined or null.");
            }

            const userId = user.id; // Ensure userId is valid
            console.log(`Deleting file for userId: ${userId}`);
            await deleteFileById(fileId, userId);
            window.location.reload()
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    }

    const handleAction = async () => {
        if (!action) return;
        setIsLoading(true);
        let success = false;

        const actions = {
            rename: () =>
                renameFile({ fileId: file.$id, name, extension: file.extension, path }),
            share: () => handleShare(),
            delete: () =>
                handleDeleteFile(  file.id )
        };

        success = await actions[action.value as keyof typeof actions]();

        if (success) closeAllModals();

        setIsLoading(false);
    };

    const handleRemoveUser = async (email: string) => {
        const updatedEmails = emails.filter((e) => e !== email);

        const success = await updateFileUsers({
            fileId: file.$id,
            emails: updatedEmails,
            path,
        });

        if (success) setEmails(updatedEmails);
        closeAllModals();
    };

    const renderDialogContent = () => {
        if (!action) return null;

        const { value, label } = action;

        return (
            <DialogContent className="shad-dialog button">
                <DialogHeader className="flex flex-col gap-3">
                    <DialogTitle className="text-center text-light-100">
                        {label}
                    </DialogTitle>
                    {value === "rename" && (
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ fontSize: "16px" }}
                        />
                    )}
                    {value === "details" && <FileDetails file={file} />}
                    {value === "share" && (
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Button onClick={handleShare}>Share</Button>
                        </div>
                    )}
                    {value === "delete" && (
                        <p className="delete-confirmation">
                            Are you sure you want to delete{` `}
                            <span className="delete-file-name">{file.name}</span>?
                        </p>
                    )}
                </DialogHeader>
                {["rename", "delete", "share"].includes(value) && (
                    <DialogFooter className="flex flex-col gap-3 md:flex-row">
                        <Button onClick={closeAllModals} className="modal-cancel-button">
                            Cancel
                        </Button>
                        <Button onClick={handleAction} className="modal-submit-button">
                            <p className="capitalize">{value}</p>
                            {isLoading && (
                                <Image
                                    src="/assets/icons/loader.svg"
                                    alt="loader"
                                    width={24}
                                    height={24}
                                    className="animate-spin"
                                />
                            )}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger className="shad-no-focus">
                    <Image
                        src="/assets/icons/dots.svg"
                        alt="dots"
                        width={34}
                        height={34}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="max-w-[200px] truncate">
                        {file.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {actionsDropdownItems.map((actionItem) => (
                        <DropdownMenuItem
                            key={actionItem.value}
                            className="shad-dropdown-item"
                            onClick={() => {
                                setAction(actionItem);

                                if (
                                    ["rename", "share", "delete", "details"].includes(
                                        actionItem.value,
                                    )
                                ) {
                                    setIsModalOpen(true);
                                }
                            }}
                        >
                            {actionItem.value === "download" ? (
                                <Link
                                    href={`${file.url}`}
                                    download={file.name}
                                    className="flex items-center gap-2"
                                    onClick={closeAllModals}
                                >
                                    <Image
                                        src={actionItem.icon}
                                        alt={actionItem.label}
                                        width={30}
                                        height={30}
                                    />
                                    {actionItem.label}
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={actionItem.icon}
                                        alt={actionItem.label}
                                        width={30}
                                        height={30}
                                    />
                                    {actionItem.label}
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {renderDialogContent()}
        </Dialog>
    );
};
export default ActionDropdown;
