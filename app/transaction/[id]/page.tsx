import React from "react";
import CheckoutInvoice from "./CheckoutInvoice";
import { PageProps } from "@/.next/types/app/page";

export default function TransactionDetails({ params }: PageProps) {
  return (
    <div className="min-h-screen p-20">
      <h1 className="text-4xl text-center my-8">Checkout</h1>
      <CheckoutInvoice id={params.id} />
    </div>
  );
}
