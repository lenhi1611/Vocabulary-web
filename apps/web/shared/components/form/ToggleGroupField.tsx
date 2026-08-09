"use client";

import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BaseFieldProps, useFormContext } from "./Form";

type ToggleGroupOption = {
  label: string;
  value: string;
};

type ToggleGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues, TName> & {
  options: ToggleGroupOption[];
  toggleGroupClassName?: string;
};

export function ToggleGroupField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  options,
  className,
  toggleGroupClassName,
  helperText,
  rules,
}: ToggleGroupFieldProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={form.control}
      rules={rules}
      render={({ field }) => (
        <div className={className}>
          {label ? (
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              {label}
            </label>
          ) : null}
          <ToggleGroup
            value={field.value ? [field.value] : []}
            onValueChange={(value: string[]) => {
              // Ignore deselect-to-empty so exactly one option always stays chosen.
              if (value.length > 0) field.onChange(value[0]);
            }}
            variant="outline"
            className={toggleGroupClassName ?? "w-full"}
          >
            {options.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value} className="flex-1">
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {helperText ? (
            <p className="mt-2 text-sm text-zinc-500">{helperText}</p>
          ) : null}
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>
      )}
    />
  );
}
