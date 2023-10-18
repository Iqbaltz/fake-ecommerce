"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ButtonHTMLAttributes, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export function SignInButton() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const username = useAppSelector((state) => state.authReducer.value.username);

  useEffect(() => {
    if (session) {
      const isAdmin = !!(session.user?.email == "admin@gmail.com");
      dispatch(
        logIn({
          ...session?.user,
          isAdmin,
        })
      );
    } else {
      dispatch(logOut());
    }
  }, [session]);

  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    return (
      <div className="group relative min-w-[80px] p-2 text-sm font-normal">
        <span className="capitalize">Hi, {username}</span>
        <div className="absolute top-full left-0 p-2 bg-slate-800 invisible group-hover:visible">
          <SignOutButton />
        </div>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  children,
  disabled,
  isLoading,
  className,
  ...restProps
}: IButton) {
  return (
    <button
      className={`${
        disabled || isLoading ? "bg-slate-600" : "bg-blue-600"
      }  flex justify-center items-center w-full p-3 font-bold rounded-full text-white  ${className}`}
      disabled={disabled || isLoading}
      {...restProps}
    >
      <div className={`animate-spin mr-2  ${isLoading ? "inline" : "hidden"}`}>
        <AiOutlineLoading />
      </div>
      {children}
    </button>
  );
}
