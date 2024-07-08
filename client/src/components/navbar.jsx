/** @format */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { functionLogout } from "../redux/slices/userSlice";
import UserIcon from "../assets/user.svg";
import { FaShoppingCart } from "react-icons/fa";
import defaultavatar from "../assets/default-avatar.jpg";
import Link from "next/link";
import Image from "next/image";
import supmart from "../../public/supmart.png";

export function NavbarComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(functionLogout());
    window.location.reload();
  };

  return (
    <div className="flex justify-between px-10 py-2 border-b-2 border-gray-200 items-center m-auto  max-w-screen-2xl w-full  sticky top-0 bg-white">
      <Link className="font-bold text-xl" href={"/"}>
        <Image src={supmart} alt="user icon" className="h-10 w-auto" />
      </Link>
      {userSelector?.id ? (
        <div className="flex gap-3 h-full items-center">
          <div className="p-3 rounded-xl hover:bg-gray-200">
            <FaShoppingCart className="text-xl" />
          </div>
          <Link href={`/profile/${userSelector?.id}`}>
            <div className="flex items-center gap-1 p-1 hover:bg-gray-200 hover:rounded-lg">
              {userSelector?.avatar_url ? (
                <Image
                  src={userSelector?.avatar_url}
                  alt="user icon"
                  className="rounded-full w-[32px] h-[32px] object-cover"
                />
              ) : (
                <Image
                  src={defaultavatar}
                  alt="user icon"
                  className="rounded-full w-[32px] h-[32px] object-cover"
                />
              )}
              {userSelector?.name}
            </div>
          </Link>
          <button
            className="rounded-md border-gray-500 border px-2 hover:bg-red-400 hover:text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
          <Image src={UserIcon} alt="user icon"></Image>
          <Link className="" href={"/auth/login"}>
            Login
          </Link>
          /
          <Link className=" " href={"/auth/register"}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
export default NavbarComponent;

export function NavbarAdminComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    console.log("test");
    dispatch(functionLogout());
  };

  return (
    <div className="sticky top-0">
      <div className="flex justify-around  py-5  border-gray-400 items-center m-auto  max-w-screen-2xl w-full   bg-white">
        {/* logo */}
        {/* <Link className="font-bold text-xl" href={"/admin/dashboard"}>
          <Image src={logo} alt="user icon" className="h-10 w-auto" />
        </Link> */}

        {/* login and register */}
        {userSelector?.id ? (
          <div className="flex gap-3">
            <div>Welcome, {userSelector?.name}</div>
            <button
              className="rounded-md border-gray-500 border px-2 hover:bg-red-400 hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
            <Image src={UserIcon}></Image>
            <Link className="" href={"/login"}>
              Login
            </Link>
            /
            <Link className=" " href={"/register"}>
              Register
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
