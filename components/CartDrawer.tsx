import {
  addToCart,
  decrementCartItem,
  removeAllFromCart,
} from "@/redux/features/entities-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLoading,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Button } from "./buttons";

type Props = { openCart: boolean; closeCart: () => void; carts: any[] };

export default function CartDrawer({ openCart, closeCart, carts }: Props) {
  const products = useAppSelector((state) => state.entitiesReducer.products);
  const userId = useAppSelector((state) => state.authReducer.value.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

  const cartData = carts?.map((obj) => {
    const matchingAdditionalData = products.find(
      (data) => data.id === obj.productId
    );

    if (matchingAdditionalData) {
      return {
        ...obj,
        ...matchingAdditionalData,
      };
    }

    return obj;
  });

  const total = cartData?.reduce((accumulator, currData) => {
    return accumulator + currData.quantity * currData.price;
  }, 0);

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      const existingTransactionsString = localStorage.getItem("transactions");
      const existingTransactions = existingTransactionsString
        ? JSON.parse(existingTransactionsString)
        : [];

      const newId = Date.now();
      const newTransaction = {
        userId,
        id: newId,
        isPaid: false,
        products: cartData,
        total,
      };

      const updatedTransactions = [...existingTransactions, newTransaction];

      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      dispatch(removeAllFromCart());

      closeCart();
      push(`/transaction/${newId}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`bg-slate-950/90 overflow-auto flex flex-col justify-between backdrop-blur p-5 w-96 fixed top-0  bottom-0 z-50 transition-transform duration-300 right-0 ${
        openCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">My Cart</h1>
          <div
            onClick={closeCart}
            className="border border-white p-2 rounded cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>
        <ul className="my-12">
          {cartData?.map(({ title, quantity, price, productId }: any) => (
            <li
              className="border-b border-white border-opacity-50 pt-5 pb-3"
              key={productId}
            >
              <div className="flex justify-between">
                <p className="line-clamp-2">{title}</p>

                <div className="text-right text-sm ml-4">
                  <p>${(price * quantity).toFixed(2)}</p>
                  <div className="flex justify-between items-center border border-white border-opacity-50 rounded-full px-2 py-1 mt-2 text-xs gap-1">
                    <button
                      onClick={() =>
                        dispatch(decrementCartItem(Number(productId)))
                      }
                      className="opacity-50 cursor-pointer"
                    >
                      <AiOutlineMinus />
                    </button>
                    <p>{quantity}</p>
                    <button
                      onClick={() =>
                        dispatch(addToCart({ productId, quantity: 1 }))
                      }
                      className="opacity-50 cursor-pointer"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex justify-between items-center pb-3 border-b border-white border-opacity-50">
          <p className="opacity-50">Total</p>
          <p className="text-lg">${total?.toFixed(2)}</p>
        </div>
        <Button
          onClick={handleCheckout}
          disabled={!carts?.length}
          isLoading={isLoading}
          className="my-6"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
