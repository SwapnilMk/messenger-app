"use client";
import axios, { Axios } from "axios";
import { useCallback, useState } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";


type variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const [variant, setVariant] = useState<variant>("REGISTER");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            axios.post('/api/register', data)
                .catch(() => toast.error("something went wrong!!"))
                .finally(() => setIsLoading(false))
        }

        if (variant === "LOGIN") {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('invalid credentials')
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success('looged in!')
                    }
                })
                .finally(() => setIsLoading(false))
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('invalid credentials')
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('logged in!')
                }
            })
            .finally(() => setIsLoading(false))
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="Name"
                            type="text"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <div>
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} fullWidth type="submit">
                        {variant === "LOGIN" ? "Sign in" : "Register"}
                    </Button>
                </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex item-center text-center">
                        <div
                            className="w-full border-t
                        border-gray-300"
                        >
                            <span className="bg-white px-2 text-gray-500 ">
                                or continue with
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <AuthSocialButton
                        icon={BsGithub}
                        onClick={() => socialAction("github")}
                    />
                    <AuthSocialButton
                        icon={BsGoogle}
                        onClick={() => socialAction("google")}
                    />
                </div>
                <div
                    className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                    "
                >
                    <div>
                        {variant === "LOGIN"
                            ? "New to Messenger?"
                            : "Already have an account?"}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === "LOGIN" ? "Create an account" : "login"}
                    </div>
                </div>
            </div>
        </>
    );
};
export default AuthForm;
