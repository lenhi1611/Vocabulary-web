"use client";

import { ComponentProps, ReactNode, createContext, useContext, useEffect } from "react";
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  FormProvider,
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export type FormProps<T extends FieldValues = FieldValues> = {
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  className?: string;
  options?: UseFormProps<T>;
};

export type BaseFieldProps<
  T extends FieldValues = FieldValues,
  TName extends FieldPath<T> = FieldPath<T>
> = {
  name: TName;
  label?: ReactNode;
  className?: string;
  helperText?: string;
  rules?: RegisterOptions<T, TName>;
};

type FormContextValue<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
};

const FormContext = createContext<FormContextValue<FieldValues> | null>(null);

export function Form<T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  onError,
  defaultValues,
  className,
  options,
}: FormProps<T>) {
  const form = useForm<T>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
    ...options,
  });

  return (
    <FormProvider {...form}>
      <FormContext.Provider value={{ form: form as UseFormReturn<FieldValues> }}>
        <form className={className} onSubmit={form.handleSubmit(onSubmit, onError)}>
          {children}
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
}

export function useFormContext<T extends FieldValues = FieldValues>() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used inside a Form component");
  }

  return context.form as UseFormReturn<T>;
}

export function SubmitButton({
  children,
  className,
  disabled,
  isLoading,
  ...buttonProps
}: ComponentProps<typeof Button> & { isLoading?: boolean }) {
  const form = useFormContext();
  const isDisabled = disabled || !form.formState.isValid;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn("w-full", className)}
      {...buttonProps}
    >
        {isLoading ? <Spinner /> : null}
      {children}
    </Button>
  );
}

export function FormField<T extends FieldValues = FieldValues, TName extends FieldPath<T> = FieldPath<T>>({
  name,
  label,
  type = "text",
  placeholder,
  className,
  inputClassName,
}: {
  name: TName;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}) {
  const form = useFormContext<T>();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={name} className="mb-2 block text-sm font-medium text-zinc-700">
          {label}
        </label>
      ) : null}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={inputClassName ?? "w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"}
        {...form.register(name)}
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
