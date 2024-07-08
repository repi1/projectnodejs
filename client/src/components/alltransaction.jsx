"use client";

import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import { FaShoppingBag } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";

export function UserTransaction() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [value] = useDebounce(search, 500);

  const fetchTransactions = () => {
    axiosInstance()
      .get("/transactions/", {
        params: {
          user_id: search,
        },
      })
      .then((res) => {
        setTransactions(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTransactions();
  }, [value]);

  const ps = useMemo(
    () => [...transactions].sort((a, b) => b.total - a.total),
    [transactions]
  );

  return (
    <div className="w-full bg-orange-100">
      <div className="">
        {ps?.map((event, key) => (
          <TransactionsCard {...event} key={key} />
        ))}
      </div>
    </div>
  );
}

export default UserTransaction;

export function TransactionsCard({
  users,
  events,
  invoice_no,
  qty,
  total,
  created_at,
}) {
  function displayPrice() {
    if (total == 0) {
      return `Free`;
    }
    if (total) {
      return `IDR ${total}`;
    }
  }
  return (
    <>
      {/* <tr className="text-center">
        <td className="text-left">{users.name}</td>
        <td className="text-left">{events.event_name}</td>
        <td className="text-left">{invoice_no}</td>
        <td className="text-left">{qty}</td>
        <td className="text-left">IDR {total}</td>
      </tr> */}
      <div className="flex flex-col bg-gray-50 rounded-xl m-4 p-3 border-solid border-2 border-gray-200 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-right">
              <FaShoppingBag />
              <p className="font-bold text-lg">Belanja</p>
            </div>
            <p>{created_at}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 justify-end">
              <FaFileInvoice />
              <p className="font-bold text-lg">Invoice: </p>
            </div>
            <p>{invoice_no}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src={process.env.API_URL + events.image_url}
              className="h-[140px] w-[140px] object-cover"
              alt=""
            />
            <div className="flex flex-col">
              <div className="font-bold"> {events.event_name}</div>
              <div>
                {qty} Tiket x IDR {total}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <div className="font-bold">Total Belanja</div>
            <div className="">{displayPrice()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
