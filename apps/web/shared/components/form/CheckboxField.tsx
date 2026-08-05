"use client";

import { InputHTMLAttributes } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseFieldProps, useFormContext } from "./Form";

type CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type" | "className"> & {
    labelClassName?: string;
  };

export function CheckboxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  className,
  labelClassName,
  helperText,
  rules,
  ...inputProps
}: CheckboxFieldProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <div className={className}>
      <label className={labelClassName ?? "flex items-start gap-3 text-sm text-zinc-700"}>
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
          {...form.register(name, rules)}
          {...inputProps}
        />
        <span>{label}</span>
      </label>
      {helperText ? <p className="mt-2 text-sm text-zinc-500">{helperText}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
