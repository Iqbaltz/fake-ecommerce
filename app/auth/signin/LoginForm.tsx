"use client";

import { Button } from "@/components/buttons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEventHandler, useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userInfo = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.ok) {
      push("/");
    } else {
      toast.error("Invalid Credentials!", { position: "top-center" });
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-slate-800 p-8 rounded text-white"
    >
      <h1 className="text-center font-bold text-xl mb-6">Login</h1>
      <div className="flex flex-col mb-2">
        <label htmlFor="username" className="text-xs">
          Username
        </label>
        <input
          disabled={isLoading}
          name="username"
          id="username"
          type="username"
          placeholder="ex. user"
          className="px-2 py-1 mt-1 text-black"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="text-xs">
          Password
        </label>
        <input
          disabled={isLoading}
          name="password"
          id="password"
          type="password"
          placeholder="password"
          className="px-2 py-1 mt-1 text-black"
        />
      </div>
      <Button isLoading={isLoading} type="submit">
        Login
      </Button>
    </form>
  );
}
