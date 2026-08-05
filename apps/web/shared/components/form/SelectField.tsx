"use client";

import { SelectHTMLAttributes } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { BaseFieldProps, useFormContext } from "./Form";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "className"> & {
    options: SelectOption[];
    placeholder?: string;
    selectClassName?: string;
  };

export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  options,
  placeholder,
  className,
  selectClassName,
  helperText,
  rules,
  ...selectProps
}: SelectFieldProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={String(name)} className="mb-2 block text-sm font-medium text-zinc-700">
          {label}
        </label>
      ) : null}
      <select
        id={String(name)}
        className={
          selectClassName ??
          "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        }
        {...form.register(name, rules)}
        {...selectProps}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText ? <p className="mt-2 text-sm text-zinc-500">{helperText}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
