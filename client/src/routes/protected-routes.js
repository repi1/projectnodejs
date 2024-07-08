/** @format */
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import LoadingPage from "@/components/loading";
import { useRouter } from "next/navigation";

const guestOnly = "guestOnly";
const needLogin = "needLogin";
const adminOnly = "adminOnly";

class Route {
  constructor(path, type) {
    this.path = path;
    this.type = type;
  }
}

const routes = [];
routes.push(new Route("/"));
routes.push(new Route("/auth/login", guestOnly));
routes.push(new Route("/auth/register", guestOnly));
// routes.push(new Route("/admin/dashboard", adminOnly));

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRoute = routes.find((route) => route.path == pathname);
    console.log(userSelector.id);
    if (checkRoute?.type == adminOnly && userSelector.role != "Admin") {
      localStorage.setItem("path", pathname);
      return router.push("/auth/login");
    } else if (checkRoute?.type == needLogin && !userSelector.email)
      return router.push("/auth/login");
    else if (checkRoute?.type == guestOnly && userSelector.email)
      return router.push("/");
    else
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, [children, userSelector.id]);

  return <div>{isLoading ? <LoadingPage /> : children}</div>;
}
