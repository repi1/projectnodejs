"use client";
import Image from "next/image";
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { NavbarComponent } from "../../../components/navbar";
import { useFormik } from "formik";
import { axiosInstance } from "@/axios/axios";
import { CiEdit } from "react-icons/ci";
import { TransactionsCard } from "../../../components/alltransaction";
import defaultavatar from "../../../assets/default-avatar.jpg";

// export const metadata = {
//   title: `Profile`,
//   description: "tempat jualan tiket :)",
// };

export function Page({ params }) {
  // const { profileId } = params;
  // const user = (await axiosInstanceSSR().get("users/" + profileId)).data.result;
  // console.log(user);

  // const transactions = (
  //   await axiosInstanceSSR().get("transactions/" + profileId)
  // ).data.result;
  const userSelector = useSelector((state) => state.auth);

  const initialEvent = {
    name: "",
    email: "",
    birthDate: null,
    avatarURL: null,
  };

  const formik = useFormik({
    initialValues: initialEvent,
    onSubmit: () => {
      console.log("test");
      save();
    },
  });
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  function edit() {
    formik.setFieldValue("name", userSelector.name);
    formik.setFieldValue("email", userSelector.email);
    formik.setFieldValue("birthDate", userSelector.birthDate);
    formik.setFieldValue("avatarURL", userSelector.avatarURL);
  }
  useEffect(() => {
    edit();
  }, []);

  const save = () => {
    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("email", formik.values.email);
    formData.append("birthDate", formik.values.birthDate);

    if (formik.values.avatarURL instanceof File) {
      formData.append("avatarURL", formik.values.avatarURL);
    }

    axiosInstance()
      .patch("/users/" + userSelector.id, formData)
      .then(() => {
        alert("Data user berhasil diedit");
        location.reload();
      })
      .catch((err) => {
        alert("error saat diedit");
        console.log(err);
      });
  };

  const renderFile = (e) => {
    console.log(e.target.files[0]);
    formik.setFieldValue("avatarURL", e.target.files[0]);
  };

  const upload = useRef(null);

  return (
    <>
      <NavbarComponent />
      <div className="flex justify-center">
        <div className="p-6 mb-6 flex gap-2 justify-center items-center w-full bg-orange-100 text-gray-500">
          <form
            id="form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="grid grid-cols-2"
          >
            <div className="w-1/4 h-full flex flex-col justify-center items-center gap-2">
              {userSelector?.avatar_url ? (
                <Image
                  src={userSelector?.avatar_url}
                  alt="user icon"
                  className="w-[120px] h-[120px] object-cover rounded-full"
                />
              ) : (
                <Image
                  src={defaultavatar}
                  alt="user icon"
                  className="w-[120px] h-[120px] object-cover rounded-full"
                />
              )}
              <input
                type="file"
                placeholder="avatarURL"
                className="border p-1 w-32 lg:w-96 hidden"
                id="avatarURL"
                onChange={(e) => renderFile(e)}
                ref={upload}
              />
              <button
                className="flex justify-center items-center bg-gray-50 p-1 hover:bg-white rounded-lg gap-1"
                type="button"
                onClick={() => {
                  upload.current.click();
                }}
              >
                <CiEdit className=" text-xl" />
                Upload
              </button>
            </div>
            <div className="w-3/4 h-full grid items-center">
              <div className="flex justify-between text-xl">
                <p className="font-semibold">Name: </p>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 w-32 lg:w-96"
                  required
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex justify-between text-xl">
                <p className="font-semibold">Email: </p>
                <input
                  type="text"
                  placeholder=""
                  className="border p-1 w-32 lg:w-96"
                  required
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex justify-between text-xl">
                <p className="font-semibold">Date: </p>
                <input
                  type="date"
                  id="birthDate"
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                />
              </div>
              <button
                className="bg-black text-white p-1 px-2 rounded-md w-24 "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {/* <div className="w-1/4 h-full flex flex-col justify-center items-center gap-2">
            {userSelector?.avatar_url ? (
              <Image
                src={userSelector?.avatar_url}
                alt="user icon"
                className="w-[64px] h-[64px] object-cover rounded-full"
              />
            ) : (
              <Image
                src={defaultavatar}
                alt="user icon"
                className="w-[64px] h-[64px] object-cover rounded-full"
              />
            )}
            <button className="flex justify-center items-center bg-gray-50 p-1 hover:bg-white rounded-lg gap-1">
              <CiEdit className=" text-xl" />
              Change
            </button>
          </div>
          <div className="w-3/4 h-full">
            <div className="flex justify-between text-xl">
              <p className="font-semibold">User ID: </p>
              <p>{userSelector.id}</p>
            </div>
            <div className="flex justify-between text-xl">
              <p className="font-semibold">Name: </p>
              <p>{userSelector.name}</p>
            </div>
            <div className="flex justify-between text-xl">
              <p className="font-semibold">Email: </p>
              <p>{userSelector.email}</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Page;
