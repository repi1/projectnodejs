/** @format */

import { axiosInstance } from "@/axios/axios";
import { functionLogin, functionLogout } from "../slices/userSlice";

export const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance().get("/users", {
        params: { email, password },
      });
      // console.log(res.data.result);
      if (res.data.result?.id) {
        const { name } = res.data.result;

        alert("welcome " + name);
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("user", res.data.token);
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      alert("wrong email/password ");

      return err.message;
    }
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user");
      const res = await axiosInstance().get("/users/keep-login", {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.result?.id) {
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("user", res.data.token);
      } else {
        alert("user not found");
        throw Error("user not found");
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      dispatch(functionLogout);
      return err.message;
    }
  };
};
