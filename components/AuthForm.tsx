'use client'
import React, { useState } from 'react'
import {Form} from "@heroui/form";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {z} from "zod"
import Image from "next/image"
import {Link} from "@heroui/link";
import { useForm } from "react-hook-form";
import {createAccount, signInUser} from "@/lib/actions/users.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up"



const authFormSchema = ({ formType }: { formType: FormType}) => {
    return z.object({
        phone: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        email:  z.string().email() ,
        name: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        dob: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        country: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        city: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    });
};
const AuthForm = ({type}: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState("");

    const formSchema = authFormSchema({formType:type});
    const {register, handleSubmit, getValues}= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            dob: "",
            country: "",
            city: "",
            phone: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        try {
            const user =
                type === "sign-up"
                    ? await createAccount({
                        name: values.name || "",
                        phone: values.phone || "",
                        dob: values.dob || "",
                        country: values.country || "",
                        city: values.city || "",
                        email: values.email,
                    })
                    : await signInUser({ email: values.email });
            setAccountId(user.accountId);
        } catch (error) {
            console.log(error);

            setErrorMessage("Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>

                <Form action="" className="flex  w-full  flex-col justify-center  transition-all lg:h-full " >
                    <h1 className={"text-[34px] leading-[42px] font-bold text-center text-light-100  "}>
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>

                    <div className={"w-full"}>
                        <Input type={"text"} label={"Email"} labelPlacement={"outside"} {...register("email",{required:true})}
                               style={{fontSize: "16px"}} className={" w-full shadow-2xl  placeholder:text-light-200  "} size={"lg"} />
                    </div>
                    {type === "sign-up" && (
                        <>
                            <div className={" w-full"}>
                                <Input type={"text"} label={"Full Name"} labelPlacement={"outside"}
                                       style={{fontSize: "16px"}} className={" w-full shadow-2xl  placeholder:text-light-200  "} size={"lg"} />
                            </div>
                            <div className={"flex gap-2  w-full"}>
                                <Input type={"date"} label={"Date of Birth"} labelPlacement={"outside"}
                                       style={{fontSize: "16px"}} className={" w-full shadow-2xl  placeholder:text-light-200  "} size={"lg"} />
                                <Input type={"tel"} label={"Phone"} labelPlacement={"outside"}
                                       style={{fontSize: "16px"}} className={" w-full shadow-2xl  placeholder:text-light-200  "} size={"lg"} />
                            </div>
                            <div className={" w-full"}>
                                <Input type={"text"} label={"Country"} labelPlacement={"outside"}
                                       style={{fontSize: "16px"}} className={" w-full shadow-2xl  placeholder:text-light-200  "} size={"lg"} />
                            </div>
                            <div className={"mb-2 w-full"}>
                                <Input type={"text"} label={"City"} labelPlacement={"outside"}
                                       style={{fontSize: "16px"}} className={" w-full shadow-2xl  placeholder:text-light-200  "} size={"lg"} />
                            </div>
                        </>
                    )}
                    <Button
                        type="submit"
                        className={"w-full"}
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                        {isLoading && (
                            <Image
                                src={"/assets/icons/loader.svg"}
                                alt={"loader"}
                                width={24}
                                height={24}
                                className={"animate-spin ml-2"}
                            />
                        )}
                    </Button>
                    {errorMessage && <p className={"error-message"}>{errorMessage}</p>}
                    <div className={"body-2 flex justify-center"}>
                        <p className={"text-light-100"}>
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className={"ml-1 font-medium text-[#00d346]"}
                        >
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </Form>
            {accountId && (
                <OtpModal email={getValues("email")} accountId={accountId} />
            )}
        </div>
    )
}
export default AuthForm
