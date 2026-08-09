"use client";

import { InputHTMLAttributes } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseFieldProps, useFormContext } from "./Form";

type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type" | "className"> & {
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder?: string;
    inputClassName?: string;
  };

export function TextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName,
  helperText,
  rules,
  ...inputProps
}: TextFieldProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();
  const error = form.formState.errors[name]?.message as string | undefined;
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={String(name)} className="mb-2 block text-sm font-medium text-zinc-700">
          {label}
        </label>
      ) : null}
      <input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        className={
          inputClassName ??
          "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        }
        {...form.register(name, rules)}
        {...inputProps}
      />
      {helperText ? <p className="mt-2 text-sm text-zinc-500">{helperText}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
