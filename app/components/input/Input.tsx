"use client";

import clsx from 'clsx';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface inputProps {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

const Input: React.FC<inputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div>
            <label className='text-sm text-left' htmlFor={id}>{label}</label>
            <div>
                <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id, { required: required })} className={clsx(`
                form-input
                block
                w-full
                rounded-md
                border-0
                py-1.5
                focus:ring-2
                focus:ring-sky-600
                `, errors[id] && "focus:ring-red-600",
                    disabled && "opacity-50")} />
            </div>
        </div>
    )
}

export default Input;
