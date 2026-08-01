"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";

import { signInSchema, SignInValues } from "../schemas/signIn.schema";
import { authService } from "../services/auth.service";
import { AuthLayout } from "./AuthLayout";
import { Form, SubmitButton } from "@/shared/components/form/Form";
import { TextField } from "@/shared/components/form/TextField";

export function SignInForm() {
  const [status, setStatus] = useState("Enter your details to continue.");

  const handleSubmit = async (values: SignInValues) => {
    const result = await authService.signIn(values);
    setStatus(result.message);
  };

  return (
    <AuthLayout
      eyebrow="Vocabulary Studio"
      heroTitle="Learn faster with a calmer, brighter study space."
      heroDescription="Keep your vocabulary practice organized, focused, and delightfully simple."
      testimonial={{ quote: "The best part is how calm it feels.", author: "A happy learner" }}
      panelLabel="Welcome back"
      heading="Sign in to your account"
      navLink={{ href: "/", label: "Home" }}
      footer={
        <>
          <p className="mt-6 text-sm text-zinc-600">{status}</p>
          <p className="mt-8 text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-indigo-600 transition hover:text-indigo-700">
              Sign up
            </Link>
          </p>
        </>
      }
    >
      <Form<SignInValues>
        className="mt-8 space-y-5"
        defaultValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        options={{
          mode: "onChange",
          resolver: zodResolver(signInSchema),
        }}
      >
        <TextField<SignInValues>
          name="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
        />
        <TextField<SignInValues>
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500" />
            Remember me
          </label>
          <a href="#" className="font-medium text-indigo-600 transition hover:text-indigo-700">
            Forgot password?
          </a>
        </div>

        <SubmitButton>Sign in</SubmitButton>
      </Form>
    </AuthLayout>
  );
}
