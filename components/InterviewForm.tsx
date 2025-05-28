"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
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
            type: "",
        },
    });

    const role = watch("role") || "";

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true);

            const res = await axios.post("/api/vapi/generate", data);

            if (res.status === 200 && res.data.success) {
                toast.success("🎉 New Interview Generated");
                router.refresh();
                window.location.reload();
            } else {
                toast.error("Something went wrong. Try again.");
            }
        } catch (error: any) {
            if (error?.response?.data?.reason === "NOT_ENOUGH_TOKENS") {
                toast.error("❌ You need at least 10 tokens to generate an interview.");
            } else {
                toast.error("An unexpected error occurred.");
            }
            console.error("Interview generation error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onPress={onOpen}>Generate New Interview</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Generate Interview</ModalHeader>
                            <ModalBody>
                                <form>
                                    <div className="mb-2">
                                        <Input
                                            label="Role"
                                            placeholder="Enter the role you are applying for"
                                            type="text"
                                            style={{ fontSize: "16px" }}
                                            {...register("role", { required: true })}
                                        />
                                    </div>

                                    {isITRole(role) && (
                                        <div className="mb-2">
                                            <Input
                                                label="Tech Stack"
                                                placeholder="Enter the tech stack"
                                                type="text"
                                                style={{ fontSize: "16px" }}
                                                {...register("techstack")}
                                            />
                                        </div>
                                    )}

                                    <div className="mb-2">
                                        <Select
                                            label="Select Difficulty"
                                            className="w-full"
                                            {...register("level", { required: true })}
                                        >
                                            {difficulty.map((gen) => (
                                                <SelectItem key={gen.label}>{gen.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="mb-2">
                                        <Input
                                            label="Number of Questions"
                                            placeholder="Enter question count"
                                            type="number"
                                            style={{ fontSize: "16px" }}
                                            {...register("amount", { required: true })}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <Input
                                            label="Type"
                                            placeholder="Enter interview type"
                                            type="text"
                                            style={{ fontSize: "16px" }}
                                            {...register("type", { required: true })}
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={isLoading}
                                >
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
