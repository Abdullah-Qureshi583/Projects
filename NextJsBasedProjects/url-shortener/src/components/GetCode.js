"use client";
import React, { useState } from "react";
import Form from "./Form";
import { useSearchParams } from "next/navigation";
import { checkCode } from "@/actions/auth/checkCode";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const GetCode = () => {
  const { data: session } = useSession();
  const params = useSearchParams();

  const router = useRouter();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  let process = params.get("process");

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    let { code } = formData;
    let email = params.get("email");

    const response = await checkCode({ email, code, provider: "credentials" });
    if (response) {
      if (response.message) {
        setMessage(response.message);
      }
      if (response.success) {
        setSuccess(true);
        setError(false);
        setIsLoading(false);
        if (response.isUpdated == false) {
          const isSignin = await signIn("credentials", {
            email,
            callbackUrl: "/dashboard",
            redirect: false,
          });
          if (isSignin.ok) {
            router.push("/dashboard");
          } else {
            setError(true);
            setSuccess(false);
            setMessage("Try Again Later");
          }
        }
        // if the user is reseting password
        else {
          router.push(`/auth/reset?email=${email}&code=${code}`);
        }
      } else {
        setSuccess(false);
        setError(true);
        setIsLoading(false);
      }
    }
  };

  const getCodeFields = [
    {
      name: "code",
      label: "Code",
      type: "text",
      placeholder: "758233",
      required: true,
    },
  ];

  return (
    <div className=" w-full">
      {/* Forget Password Form */}
      <Form
        title="Verify Your Email"
        description="Check your email and type the code here."
        buttonText="Verify"
        onSubmit={handleFormSubmit}
        fields={getCodeFields}
        forgetLable="Resend Code"
        forgetLinkHref={
          process == "reset"
            ? "/auth/forget"
            : process == "signup"
            ? "/auth/signup"
            : ""
        }
        success={success}
        error={error}
        message={message}
        footerText="Already Remembered?"
        footerLinkText="Sign In"
        footerLinkHref="/auth/signin"
        isLoading={isLoading}
      />
    </div>
  );
};

export default GetCode;