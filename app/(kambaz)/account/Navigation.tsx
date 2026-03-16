"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["profile"] : ["signin", "signup"];

 return (
  <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
  <Link
    href="/account/signin"
    className="list-group-item border-0 active"
  >
    Signin
  </Link>

  <Link
    href="/account/signup"
    className="list-group-item border-0 text-danger"
  >
    Signup
  </Link>

  <Link
    href="/account/profile"
    className="list-group-item border-0 text-danger"
  >
    Profile
  </Link>
</div>
);}

