"use client";
import React, { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-toastify";

type Props = { users: any };

export default function AccountForm({ users }: Props) {
  const [generatedAccount, setGeneratedAccount] = useState<any>();

  const handleGenerateAccount = () => {
    const user = users[Math.floor(Math.random() * users.length)];

    setGeneratedAccount(user);
  };

  const handleCopy = async (data: string) => {
    try {
      await navigator.clipboard.writeText(data);
      toast.success("Copied!", { position: "top-center" });
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
    }
  };
  return (
    <div className="my-2">
      <p>
        Don't have an account?{" "}
        <button
          onClick={handleGenerateAccount}
          className="opacity-70 underline"
        >
          Get one
        </button>
      </p>
      {generatedAccount ? (
        <div className="border rounded-xl p-4 mt-2">
          <h1 className="font-bold text-center mb-3">Use this one 👇</h1>
          <p className="flex justify-between mb-2">
            username:
            <span className="flex items-center justify-between bg-slate-200 px-2 min-w-[50%]">
              {generatedAccount?.username}
              <button
                onClick={() => handleCopy(generatedAccount?.username)}
                className="opacity-50 text-sm"
              >
                <BiCopy />
              </button>
            </span>
          </p>
          <p className="flex justify-between">
            password:
            <span className="flex items-center justify-between bg-slate-200 px-2 min-w-[50%]">
              {generatedAccount?.password}
              <button
                onClick={() => handleCopy(generatedAccount?.password)}
                className="opacity-50 text-sm"
              >
                <BiCopy />
              </button>
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
