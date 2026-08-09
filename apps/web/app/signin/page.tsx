"use client";

import { Suspense } from "react";
import { SignInForm } from "@/features/auth/components/SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
