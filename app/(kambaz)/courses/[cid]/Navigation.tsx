"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  if (!cid) return null;

  return (
    <ListGroup id="wd-courses-navigation" className="rounded-0 fs-5">
      {links.map((link) => {
        const lower = link.toLowerCase();
        const path =
          lower === "people"
            ? `/courses/${cid}/people/table`
            : `/courses/${cid}/${lower}`;
        const isActive = pathname === path;

        return (
          <ListGroupItem
            key={link}
            as="div"
            className="p-0 border-0"  
          >
            <Link
              href={path}
              className={`wd-nav-link d-block w-100 px-3 py-2 ${
                isActive ? "active" : "inactive"
              }`}
            >
              {link}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}