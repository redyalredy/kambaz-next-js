"use client";

import Link from "next/link";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function TOC() {
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink as={Link} href="/labs">
          Labs
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/labs/lab1">
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/labs/lab2">
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/labs/lab3">
          Lab 3
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink as={Link} href="/">
          Kambaz
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/redyalredy">
          My Github
        </NavLink>
      </NavItem>
    </Nav>
  );
}