"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseFieldProps, useFormContext } from "./Form";

type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> &
  Omit<
    InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "type" | "className"
  > & {
    type?: InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
    placeholder?: string;
    inputClassName?: string;
  };

const DEFAULT_FIELD_CLASSNAME =
  "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100";

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
  const fieldClassName = inputClassName ?? DEFAULT_FIELD_CLASSNAME;

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={String(name)} className="mb-2 block text-sm font-medium text-zinc-700">
          {label}
        </label>
      ) : null}
      {type === "textarea" ? (
        <textarea
          id={String(name)}
          placeholder={placeholder}
          className={`${fieldClassName} min-h-24 resize-y`}
          {...form.register(name, rules)}
          {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={String(name)}
          type={type}
          placeholder={placeholder}
          className={fieldClassName}
          {...form.register(name, rules)}
          {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {helperText ? <p className="mt-2 text-sm text-zinc-500">{helperText}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
