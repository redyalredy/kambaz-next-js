"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const pathname = usePathname();

  const linkClass = (path: string) =>
    `list-group-item border-0 ${
      pathname === path ? "active" : "text-danger"
    }`;

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

      {!currentUser && (
        <>
          <Link href="/account/signin" className={linkClass("/account/signin")}>
            Signin
          </Link>

          <Link href="/account/signup" className={linkClass("/account/signup")}>
            Signup
          </Link>
        </>
      )}

      {currentUser && (
        <Link href="/account/profile" className={linkClass("/account/profile")}>
          Profile
        </Link>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link href="/account/users" className={linkClass("/account/users")}>
          Users
        </Link>
      )}

    </div>
  );
}