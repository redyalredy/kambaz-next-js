import Link from "next/link";
export default function AccountNavigation() {
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

