"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { signUpSchema, SignUpValues } from "../schemas/signUp.schema";
import { selectSignUp, signUp } from "../store/auth.slice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, SubmitButton } from "@/shared/components/form/Form";
import { TextField } from "@/shared/components/form/TextField";
import { SelectField } from "@/shared/components/form/SelectField";
import { CheckboxField } from "@/shared/components/form/CheckboxField";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { RequestStatus } from "@/shared/store/requestStatus";
import AuthLayout from "./AuthLayout";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";

export function SignupForm() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectSignUp);
  const isLoading = status === RequestStatus.Loading;
  const isFailed = status === RequestStatus.Failed;
  const isSucceeded = status === RequestStatus.Succeeded;

  const handleSubmit = (values: SignUpValues) => {
    dispatch(signUp(values)).then((result) => {
        console.log("Signup result:", result);
      if (result.meta.requestStatus === "fulfilled") {
        // Handle successful signup, e.g., redirect to a different page or show a success message
        toast.add({
          type: "success",
          description: "Account created successfully!",
        });
      }
    });
  };

  return (
    <AuthLayout>
      <Form<SignUpValues>
        className="mt-8 space-y-5"
        defaultValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          agreeToTerms: false,
        }}
        onSubmit={handleSubmit}
        options={{
          mode: "onChange",
          resolver: zodResolver(signUpSchema),
        }}
      >
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

        {isFailed && error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <SubmitButton disabled={isLoading} isLoading={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </SubmitButton>
      </Form>
    </AuthLayout>
  );
}
