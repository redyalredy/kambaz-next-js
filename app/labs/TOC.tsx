"use client";

import Link from "next/link";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink as={Link} className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`} href="/labs">
          Labs
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}href="/labs/lab1">
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`} href="/labs/lab2">
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`} href="/labs/lab3">
          Lab 3
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} className={`nav-link ${pathname.endsWith("lab4") ? "active" : ""}`} href="/labs/lab4">
          Lab 4
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} className={`nav-link ${pathname.endsWith("lab5") ? "active" : ""}`} href="/labs/lab5">
          Lab 5
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/">
          Kambaz
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/redyalredy/kambaz-next-js" id="wd-github">
          My Github
        </NavLink>
      </NavItem>
    </Nav>
  );
}