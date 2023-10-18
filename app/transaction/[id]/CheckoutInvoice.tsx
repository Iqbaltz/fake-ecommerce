"use client";
import { Button } from "@/components/buttons";
import React from "react";

type Props = { id: string };

export default function CheckoutInvoice({ id }: Props) {
  const data = JSON.parse(localStorage.getItem("transactions")!);

  const currentData = data.find((transaction: any) => transaction.id == id);

  return (
    <div className="max-w-[640px] mx-auto p-8 rounded-xl bg-slate-100">
      <ul>
        {currentData.products.map(
          ({ image, title, quantity, price, id }: any) => (
            <li
              className="flex justify-between items-center my-4 pb-4 border-b"
              key={id}
            >
              <div className="flex items-center w-2/3">
                <img
                  src={image}
                  className="w-20 h-20 object-contain mr-2"
                  alt={title}
                />
                <p className="max-w-[240px]">{title}</p>
              </div>
              <p className="w-1/6">x{quantity}</p>
              <p className="w-1/6 text-right">${price * quantity}</p>
            </li>
          )
        )}
        <li className="flex justify-between font-bold">
          <p>Total</p>
          <p>{currentData.total}</p>
        </li>
      </ul>
      <Button className="mt-4">Pay</Button>
    </div>
  );
}
