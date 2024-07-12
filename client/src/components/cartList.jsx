/** @format */
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../axios/axios";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDebounce } from "use-debounce";

export function CartListComponent() {
  const [cartItems, setCartItems] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  function fetchCart() {
    axiosInstance()
      .get("/carts/" + userSelector.id)
      .then((res) => {
        setCartItems(res.data.result);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchCart();
  }, [userSelector.id]);

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.products.price * item.qty;
    }, 0);
  };

  function deleteCart(productId) {
    axiosInstance()
      .delete("/carts/" + productId)
      .then((res) => {
        alert("Product removed from cart");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  const subTotal = calculateSubtotal(cartItems);

  const [debouncedQuantity, setDebouncedQuantity] = useState({});
  const [debouncedValue] = useDebounce(debouncedQuantity, 1000);
  useEffect(() => {
    if (debouncedValue.productId && debouncedValue.quantity) {
      updateCartQuantity(debouncedValue.productId, debouncedValue.quantity);
    }
  }, [debouncedValue]);

  const updateCartQuantity = (productId, newQuantity) => {
    axiosInstance()
      .patch("/carts/" + productId, {
        qty: newQuantity,
      })
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId ? { ...item, qty: newQuantity } : item
          )
        );
        alert("Quantity updated");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response?.data?.message);
      });
  };

  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="text-xl font-bold pl-12 py-5">Your Shopping Cart</div>
      <div className="flex w-full">
        {cartItems.length > 0 ? (
          <div className="w-2/3">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="bg-white mx-10 my-2 rounded-lg p-5 flex items-center justify-between "
              >
                <div className="flex items-center gap-2">
                  <Image
                    height={100}
                    width={80}
                    src={`/product_images/${item.products.productPhotos[0].photoURL}`}
                    className="object-cover"
                  />
                  <div>{item.products.name}</div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="font-semibold ">Rp{item.products.price}</div>
                  <div className="flex items-center">
                    Quantity:
                    <input
                      type="number"
                      defaultValue={item.qty}
                      min="1"
                      max={item.products.stocks}
                      className="border-2 border-black w-9 h-10"
                      onChange={(e) =>
                        setDebouncedQuantity({
                          productId: item.productId,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button onClick={() => deleteCart(item.productId)}>
                    <FaRegTrashAlt className="hover:text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </div>
        ) : (
          <div className="w-full bg-white mx-10 my-2 rounded-lg p-5 flex items-center gap-10">
            <Image height={200} width={200} src="/emptycart.png" />
            <div className="flex flex-col">
              <span className="text-xl font-semibold">
                Your Shopping Cart is empty
              </span>
              <Link className="text-lime-500 pointer-events-auto" href={"/"}>
                Shop today's deals
              </Link>
            </div>
          </div>
        )}
        {cartItems.length > 0 ? (
          <div className="w-1/3 h-64 bg-white my-2 mr-10 rounded-lg flex flex-col justify-center items-center">
            <div className="flex">
              <div>Subtotal</div>
              <div className="ml-1">({cartItems.length} items):</div>
              <div className="ml-2 font-bold">Rp{subTotal}</div>
            </div>
            <button className="px-10 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white">
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default CartListComponent;
