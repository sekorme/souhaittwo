"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InputOtp} from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,


} from "@heroui/react";


import { sendEmailOTP, verifySecret } from "@/lib/actions/users.actions";
import { useRouter } from "next/navigation";
import {Button} from "@heroui/button";

const OtpModal = ({
                      accountId,
                      email,
                  }: {
    accountId: string;
    email: string;
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const sessionId = await verifySecret({ accountId, password });
            if (sessionId) {
                setIsOpen(false);
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    const handleResendOtp = async () => {
        await sendEmailOTP({ email });
    };
    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <ModalContent className={" space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10  outline-none"}>
                <ModalHeader className={"relative flex flex-col justify-center"}>
                    <h2 className={"h2 text-center"}>
                        Enter your OTP
                        <Image
                            src={"/assets/icons/close-dark.svg"}
                            alt={"close"}
                            width={20}
                            height={20}
                            onClick={() => setIsOpen(false)}
                            className={" absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4"}
                        />
                    </h2>
                    <ModalBody
                        className={" text-[14px] leading-[20px] font-semibold text-center text-light-100"}
                    >
                        we&#39;ve sent an OTP to your email address
                        <span className={"text-[#ff3d57]"}>
                            {email}
                    </span>
                    </ModalBody>
                </ModalHeader>
                <div className={"flex items-center gap-1 sm:gap-2 justify-center"}>
                    <InputOtp length={6} value={password} onValueChange={setPassword} isRequired />
                </div>

                <ModalFooter>
                    <div className={"flex w-full flex-col gap-4"}>
                        <button
                            onClick={handleSubmit}
                            className={"w-full h-12"}
                            type={"button"}
                        >
                            Submit
                            {isLoading && (
                                <Image
                                    src={"/assets/icons/loader.svg"}
                                    alt={"loader"}
                                    width={24}
                                    height={24}
                                    className={"ml-2 animate-spin"}
                                />
                            )}
                        </button>

                        <div className={"text-[14px] leading-[20px] font-semibold; mt-2 text-center text-light-100"}>
                            Didn&#39;t get a code ? &nbsp;
                            <Button
                                type={"button"}

                                className={"pl-1 "}
                                onPress={handleResendOtp}
                            >
                                Click to resend
                            </Button>
                        </div>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default OtpModal;
