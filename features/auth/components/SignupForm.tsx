"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, SignUpValues } from "../schemas/signUp.schema";
import { authService } from "../services/auth.service";
import { AuthLayout } from "./AuthLayout";
import { Form, FormDebug, SubmitButton } from "@/shared/components/form/Form";
import { TextField } from "@/shared/components/form/TextField";
import { SelectField } from "@/shared/components/form/SelectField";
import { CheckboxField } from "@/shared/components/form/CheckboxField";

export function SignupForm() {
  const [status, setStatus] = useState<string>("Create your account to get started.");

  const handleSubmit = async (values: SignUpValues) => {
    const result = await authService.signUp(values);
    setStatus(result.message);
  };

  return (
    <AuthLayout
      eyebrow="Join the studio"
      heroTitle="Build a richer vocabulary routine in minutes."
      heroDescription="Create your account and start your learning journey with a calm, structured experience."
      panelLabel="Create account"
      heading="Sign up"
      navLink={{ href: "/signin", label: "Sign in" }}
      gridClassName="lg:grid-cols-[0.95fr_1.05fr]"
      footer={<p className="mt-6 text-sm text-zinc-600">{status}</p>}
    >
      <Form<SignUpValues>
        className="mt-8 space-y-5"
        defaultValues={{ fullName: "", email: "", password: "", confirmPassword: "", role: "", agreeToTerms: false }}
        onSubmit={handleSubmit}
        options={{
          mode: "onChange",
          resolver: zodResolver(signUpSchema),
        }}
      >
        <FormDebug<SignUpValues> />

        <TextField<SignUpValues>
          name="fullName"
          label="Full name"
          placeholder="Ada Lovelace"
        />

        <TextField<SignUpValues>
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
        />

        <TextField<SignUpValues>
          name="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
        />

        <TextField<SignUpValues>
          name="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Repeat your password"
        />

        <SelectField<SignUpValues>
          name="role"
          label="Goal"
          placeholder="Choose your focus"
          options={[
            { label: "Student", value: "student" },
            { label: "Professional", value: "professional" },
            { label: "Language learner", value: "learner" },
          ]}
        />

        <CheckboxField<SignUpValues>
          name="agreeToTerms"
          label="I agree to the terms and privacy policy"
        />

        <SubmitButton>Create account</SubmitButton>
      </Form>
    </AuthLayout>
  );
}
