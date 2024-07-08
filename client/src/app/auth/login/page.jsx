/** @format */
"use client";
import { userLogin } from "@/redux/middleware/user";
import Link from "next/link";
import { useDispatch } from "react-redux";

function Page() {
  const dispatch = useDispatch();

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    dispatch(userLogin({ email, password }));
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Login</h1>
          <div className=" text-[#989898] text-[13px] mt-2">
            Belum punya account?{" "}
            <Link href="/auth/register" className="text-[#4F46E5] font-bold">
              Register
            </Link>
          </div>

          <div className=" font-bold mt-5">Email</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            id="email"
            type="email"
          ></input>

          <div className=" font-bold mt-5">Password</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="******"
            id="password"
            type="password"
          ></input>

          <button
            className="  rounded-lg mt-6 text-white bg-[#4F46E5] h-16"
            onClick={login}
          >
            Masuk
          </button>
          <div className=" mt-2 text-xs ">
            <Link href="/auth/register" className="text-blue-500 font-bold">
              Forgot your username or password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
