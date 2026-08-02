"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { signInSchema, SignInValues } from "../schemas/signIn.schema";
import { selectSignIn, signIn } from "../store/auth.slice";
import { Form, SubmitButton } from "@/shared/components/form/Form";
import { TextField } from "@/shared/components/form/TextField";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { RequestStatus } from "@/shared/store/requestStatus";
import AuthLayout from "./AuthLayout";
import { toast } from "@/components/ui/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SignInForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector(selectSignIn);
  const isLoading = status === RequestStatus.Loading;
  const isFailed = status === RequestStatus.Failed;

  const handleSubmit = (values: SignInValues) => {
    dispatch(signIn(values)).then((result) => {
      console.log("SignIn result:", result);
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/dashboard"); // Redirect to the dashboard page after successful sign-in
      }
    });
  };

  return (
    <AuthLayout>
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
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remember me
          </label>
          <a
            href="#"
            className="font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            Forgot password?
          </a>
        </div>

        {isFailed && error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <SubmitButton disabled={isLoading} isLoading={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </SubmitButton>
      </Form>
    </AuthLayout>
  );
}
