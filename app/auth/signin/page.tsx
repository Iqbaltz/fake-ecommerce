import React from "react";
import LoginForm from "./LoginForm";
import AccountForm from "./AccountForm";

type Props = {};

export default async function SigninPage({}: Props) {
  const users = await (await fetch("https://fakestoreapi.com/users")).json();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LoginForm />
      <AccountForm users={users} />
    </div>
  );
}
