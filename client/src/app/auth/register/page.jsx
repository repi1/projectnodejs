/** @format */
"use client";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useEffect } from "react";
import { axiosInstance } from "@/axios/axios";
import { redirect } from "next/dist/server/api-utils";
import { useFormik } from "formik";
import Link from "next/link";

function Page() {
  YupPassword(Yup);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email("bukan email"),
      password: Yup.string().required().min(5),
    }),
    onSubmit: () => {
      mendaftar();
    },
  });
  const mendaftar = () => {
    const user = formik.values;
    console.log(user);
    if (user.name && user.email && user.password) {
      axiosInstance()
        .post("/users", user)
        .then((res) => {
          formik.resetForm();
          alert("register berhasil");
          redirect("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Make a new account</h1>
          <p className="  text-[#989898] text-[13px]"></p>

          <div className=" font-bold mt-5">Name</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder=""
            onChange={(e) => formik.setFieldValue("name", e.target.value)} //panggil function inputHandler otomatis kirim event
            id="name"
            value={formik.values.name}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.name}</div>

          <div className=" font-bold mt-5">Email</div>
          <input
            type="email"
            className="p-3  bg-[#F3F4F6] rounded-lg "
            placeholder=""
            onChange={formik.handleChange}
            id="email"
            value={formik.values.email}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.email}</div>

          <div className=" font-bold mt-5">Password</div>
          <input
            type="password"
            placeholder=""
            className="p-3 bg-[#F3F4F6] rounded-lg"
            onChange={formik.handleChange}
            id="password"
            value={formik.values.password}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.password}</div>

          {/* <p className=" mt-5 text-[#989898] text-[13px]">
            Dengan mendaftar berarti kamu setuju dengan Terms of Service dan
            Privacy Policy
          </p> */}
          <div className=" mt-4 text-xs ">
            Sudah punya account?{" "}
            <Link href="/auth/login" className="text-[#4F46E5] font-bold">
              Login
            </Link>
          </div>
          <button
            className={` rounded-lg mt-3 text-white bg-[#4F46E5] h-16`}
            onClick={formik.handleSubmit}
          >
            Mendaftar
          </button>
        </div>
      </div>
    </>
  );
}
export default Page;
