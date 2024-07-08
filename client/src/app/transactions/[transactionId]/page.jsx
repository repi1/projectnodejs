import NavbarComponent from "@/components/navbar";
import { axiosInstance, axiosInstanceSSR } from "@/axios/axios";
import ProductDetailComponent from "../../../components/productDetail";

export const metadata = {
  title: "Transaction Detail",
  description: "tempat jualan tiket :)",
};

async function Page({ params }) {
  const { transactionId } = params;

  const transaction = (
    await axiosInstanceSSR().get("/transactions/" + transactionId)
  ).data.result;
  console.log(transaction);

  // const userTransaction = (await axiosInstanceSSR().get("/usertransactions"))
  //   .data.result;
  // console.log(userTransaction);

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1">
          <div className="p-5 flex flex-col gap-3  w-9/12 bg-gray-100 rounded-xl">
            <div className="font-bold text-2xl">{transaction.users.name}</div>
            <div className="font-light text-xl">
              Invoice: {transaction.invoice_no}
            </div>
            <div className=" font-light text-xl">
              Event: {transaction.events.event_name}
            </div>
            <div className=" font-light text-xl">
              Quantity: {transaction.qty}
            </div>
            <div className="font-light text-xl">
              Total : IDR{" "}
              {Number(transaction.events.price) -
                Number(transaction.events.discount)}
            </div>
          </div>
          {/* <table className="w-full">
            <tr className="text-center">
              <th>Event Name</th>
              <th>Invoice No</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
            {events.map((event, key) => (
              <AdminEventCard
                {...event}
                key={key}
                // edit={() => edit(event.id)}
                hapus={() => hapus(event.id)}
              />
            ))}
          </table> */}
        </div>
      </div>
    </>
  );
}
export default Page;
