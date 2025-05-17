'use client'
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid"

import { useState } from "react"
import {useRouter} from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"


import { Modal, ModalBody,Tooltip, Button, ModalContent, ModalFooter, ModalHeader, ModalProps, useDisclosure } from "@heroui/react";
import {deleteInterviewById} from "@/lib/actions/deleteInterviewById";

interface Params{
    id: string,
    title: string,
    type?: string

}


const DeleteConfirm = ({ interviewId, userId }: { interviewId: string, userId: string }) => {

    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [loading, setLoading] = useState(false);

    const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");
    const handleOpen = () => {

        onOpen();
    }

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {


        setLoading(true);
        const result = await deleteInterviewById({ interviewId, userId });
        setLoading(false);

        if (result.success) {
            toast.success("Interview deleted successfully.");
            window.location.reload(); // Or use router.refresh()
        } else {
            alert("Delete failed: " + result.message);
        }
    };


    return (
        <div className=" w-full flex items-center justify-center">


            <Tooltip content="Delete Interview" className={"w-full"} placement="top">
                <Button  onClick={handleOpen} className={"w-full"}>
                    <TrashIcon className="h-4 w-4 text-red-500"/>
                </Button>


            </Tooltip>







            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                scrollBehavior={scrollBehavior}
            >
                <div className="flex flex-col items-center justify-center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{"Delete Interview"}</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Are you sure you want to delete this user ?
                                    </p>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleDelete} disabled={isLoading}>
                                        confirm
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteConfirm