"use client";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import NavbarComponent from "@/components/navbar";
import { axiosInstance, axiosInstanceSSR } from "@/axios/axios";
import {
  TransactionsCard,
  UserTransaction,
} from "../../components/alltransaction";

// export const metadata = {
//   title: "Transaction Detail",
//   description: "tempat jualan tiket :)",
// };

export function Page() {
  // const transactions = (await axiosInstanceSSR().get("/transactions")).data
  //   .result;
  // console.log(transactions);
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
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1">
          <table className="w-full">
            <tr className="text-center">
              <th>User</th>
              <th>Event Name</th>
              <th>Invoice No</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
            {/* <UserTransaction /> */}
            {transactions.map((event, key) => (
              <TransactionsCard {...event} key={key} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
export default Page;
