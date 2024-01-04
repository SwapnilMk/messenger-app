"use client";

import { useCallback, useState } from "react";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/input/input";

type variant = "LOGIN" | "REGISTER";


const AuthForm = () => {
    const [variant, setVariant] = useState<variant>("LOGIN");
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
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            //axios Register
        }

        if (variant === 'LOGIN') {
            // nextAuth login
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        console.log(`Social action ${action}`);

        //next auth social sign in 
    }




    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input />
            </form>
        </>
    )
}
export default AuthForm;