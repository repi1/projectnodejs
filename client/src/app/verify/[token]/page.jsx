/** @format */
import Image from "next/image";
import { axiosInstanceSSR } from "../../../axios/axios";
import Link from "next/link";

async function Page({ params }) {
  try {
    await axiosInstanceSSR().patch(
      "/users/verify",
      {},
      {
        headers: {
          Authorization: params.token,
        },
      }
    );
    return (
      <div>
        <center>Account Verified</center>
      </div>
    );
  } catch (error) {
    // console.log(error);
    return (
      <div>
        <center>
          <p>User already verified</p>
          <Link href="/">
            <button className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-400">
              back to homepage
            </button>
          </Link>
        </center>
      </div>
    );
  }
}
export default Page;
