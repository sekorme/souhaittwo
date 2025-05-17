'use client'
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select, SelectItem,
} from "@heroui/react";
import { Input } from "@heroui/input";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const IT_KEYWORDS = [
    "front end",
    "frontend",
    "back end",
    "backend",
    "developer",
    "software",
    "engineer",
    "it",
    "full stack",
];

function isITRole(role: string) {
    return IT_KEYWORDS.some((kw) => role.toLowerCase().includes(kw));
}

const InterviewForm = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const difficulty = [{ label: "easy" }, { label: "medium" }, { label: "hard" }];
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, watch } = useForm<FieldValues>({
        defaultValues: {
            role: "",
            level: "",
            amount: 0,
            techstack: "",
            type: ""
        }
    });

    const role = watch("role") || "";

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/vapi/generate', data).then(() => {
            toast.success("New Member Added");
            router.refresh();
            window.location.reload();
            setIsLoading(false);
        })
            .catch((error) => { console.log(error); toast.error("An error occurred"); })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <Button onPress={onOpen}>Generate New Interview</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Generate Interview
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <form action="">
                                        <>
                                            <div className={"mb-2"}>
                                                <Input
                                                    label="Role"
                                                    placeholder="Enter the role you are applying for"
                                                    type="text"
                                                    style={{ fontSize: "16px" }}
                                                    {...register("role", { required: true })}
                                                />
                                            </div>
                                            {isITRole(role) && (
                                                <div className={"mb-2"}>
                                                    <Input
                                                        label="Tech Stack"
                                                        placeholder="Enter the tech stack you are applying for"
                                                        type="text"
                                                        style={{ fontSize: "16px" }}
                                                        {...register("techstack")}
                                                    />
                                                </div>
                                            )}
                                            <div className={"mb-2"}>
                                                <Select
                                                    label="Select Difficulty"
                                                    className="w-full"
                                                    {...register("level", { required: true })}
                                                >
                                                    {difficulty.map((gen) => (
                                                        <SelectItem key={gen.label}>
                                                            {gen.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className={"mb-2"}>
                                                <Input
                                                    label="Number of Questions"
                                                    placeholder="Enter the number of questions you want"
                                                    type="number"
                                                    style={{ fontSize: "16px" }}
                                                    {...register("amount", { required: true })}
                                                />
                                            </div>
                                            <div className={"mb-2"}>
                                                <Input
                                                    label="Type"
                                                    placeholder="Enter the type you want to practice"
                                                    type="text"
                                                    style={{ fontSize: "16px" }}
                                                    {...register("type", { required: true })}
                                                />
                                            </div>
                                        </>
                                    </form>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                                    {isLoading ? "Generating..." : "Generate"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default InterviewForm;