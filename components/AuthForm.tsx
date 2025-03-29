"use client";

import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link"; // Fixed import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.actions";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import {MailIcon, MapPin, Phone, User} from "lucide-react";

type FormType = "sign-in" | "sign-up";

const authFormSchema = ({ formType }: { formType: FormType }) =>
  z.object({
    phone:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    email: z.string().email(),
    name:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    country:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    password: z.string().min(6).max(50),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const formSchema = authFormSchema({ formType: type });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const { email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const results = await signUp({
          uid: userCredential.user.uid,
          name: values.name,
          phone: values.phone,
          country: values.country,
          email: values.email,
        });

        if (!results.success) {
          toast.error(results.message);

          return;
        }
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");

          return;
        }

        await signIn({
          email,
          idToken,
        });

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        toast.success("Signed in successfully.");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error,Please try again`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[566px] bg-white/60 dark:bg-black/70 shadow-xl p-4 m-5 backdrop-blur rounded-2xl">
      {showConfetti && (
        <div className="absolute left-0 top-0 z-0 w-full size-full">
          <Fireworks autorun={{ speed: 1 }} />
        </div>
      )}
      <Form
        action=""
        className="flex w-full flex-col items-center justify-center transition-all lg:h-full"
      >
        <h1 className="text-[34px] font-bold text-center text-light-100">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>

        <div className="w-full">
          <Input
              endContent={
                <MailIcon className="text-2xl rounded-full text-default-400 pointer-events-none flex-shrink-0" />
              }
            label="Email"
            labelPlacement="outside"
            type="text"
            {...register("email")}
            className="w-full shadow-2xl placeholder:text-light-200"
            size="lg"
            style={{ fontSize: "16px" }}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <Input
            label="Password"
            labelPlacement="outside"
            type={isVisible ? "password" : "password"}
            {...register("password")}
            className="w-full shadow-2xl placeholder:text-light-200"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            size="lg"
            style={{ fontSize: "16px" }}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {type === "sign-up" && (
          <>
            <div className="w-full">
              <Input
                className="w-full shadow-2xl placeholder:text-light-200"
                label="Full Name"
                labelPlacement="outside"
                size="lg"
                style={{ fontSize: "16px" }}
                type="text"
                {...register("name")}
                endContent={
                  <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex gap-2 w-full">
              <Input
                className="w-full shadow-2xl placeholder:text-light-200"
                label="Phone"
                labelPlacement="outside"
                size="lg"
                style={{ fontSize: "16px" }}
                type="tel"
                {...register("phone")}
                endContent={
                  <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="w-full">
              <Input
                className="w-full shadow-2xl placeholder:text-light-200"
                label="Country"
                labelPlacement="outside"
                size="lg"
                style={{ fontSize: "16px" }}
                type="text"
                {...register("country")}
                endContent={
                  <MapPin className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>
          </>
        )}

        <Button
          className="w-full bg-green-500/70 mt-10 p-3"
          disabled={isLoading}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <p className="text-white">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </p>
          {isLoading && (
            <Image
              alt="loader"
              className="animate-spin ml-2"
              height={24}
              src="/assets/icons/loader.svg"
              width={24}
            />
          )}
        </Button>

        <div className="flex justify-center">
          <p className="text-light-100">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            className="ml-1 font-medium text-[#00d346]"
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
