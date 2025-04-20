"use client";

import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {
  MailIcon,
  Phone,
  User,
  TriangleAlert,
  CircleCheck,
} from "lucide-react";
import { addToast } from "@heroui/toast";

import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.actions";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import CountrySelect, { CountrySelectValue } from "@/components/CountrySelect";

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
              ? z.custom<CountrySelectValue>()
              : z.custom<CountrySelectValue>().optional(),
      password: z.string().min(6).max(50),
    });

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [country, setCountry] = useState<CountrySelectValue | undefined>(
      undefined
  );

  const toggleVisibility = () => setIsVisible(!isVisible);
  const formSchema = authFormSchema({ formType: type });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      country: undefined,
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const { email, password, country } = values;
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const results = await signUp({
          uid: userCredential.user.uid,
          name: values.name,
          phone: values.phone,
          country: country?.value,
          email: values.email,
        });

        if (!results.success) {
          toast.error(results.message);
          return;
        }
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        addToast({
          title: "Account Created",
          icon: <CircleCheck color={"green"} />,
          description:
              "Account created successfully. Redirecting to sign-in page.",
        });
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          addToast({
            title: "Failed to sign in",
            icon: <TriangleAlert className="text-red-500" color={"red"} />,
            description: "Please try again.",
          });
          return;
        }

        await signIn({
          email,
          idToken,
        });

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);

        addToast({
          title: "Success",
          icon: <CircleCheck className="text-green-500" color={"green"} />,
          description: "Signed in successfully.",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        addToast({
          title: "Email already in use",
          icon: <TriangleAlert color={"red"} />,
          description: "Please use a different email address.",
        });
      } else if (error.code === "auth/invalid-credential") {
        addToast({
          title: "Invalid credentials",
          icon: <TriangleAlert className="text-red-500" color={"red"} />,
          description: "Your email or password is incorrect. Please try again.",
        });
      } else {
        console.error(error);
        toast.error(`${(error as Error).message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full md:w-[566px] bg-white/40 dark:bg-black/70 shadow-xl p-4 m-5 backdrop-blur rounded-2xl">
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
                type="password"
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

                <div className="w-full z-50">
                  <Controller
                      name="country"
                      control={control}
                      rules={{
                        required: "Please select a country",
                      }}
                      render={({ field }) => (
                          <CountrySelect
                              {...field}
                              value={country}
                              onChange={(value) => {
                                setCountry(value);
                                field.onChange(value);
                              }}

                          />
                      )}
                  />
                  {errors.country && (
                      <p className="text-red-500">{errors.country.message}</p>
                  )}
                </div>
              </>
          )}

          <Button
              className="w-full bg-[#00d346]/50 z-10 mt-10 p-3"
              disabled={isLoading}
              type="submit"
              onClick={handleSubmit(onSubmit)}
          >
            <p>{type === "sign-in" ? "Sign In" : "Sign Up"}</p>
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
            <p>
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