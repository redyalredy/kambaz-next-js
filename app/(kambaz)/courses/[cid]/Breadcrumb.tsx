"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({
    course,
  }: {
    course: { name: string } | undefined;
  }) {
    const pathname = usePathname();
  
    const parts = pathname.split("/").filter(Boolean);
  
    const rawSection =
      parts.includes("people")
        ? "People"
        : parts[parts.length - 1];
  
    const formattedSection =
      rawSection?.charAt(0).toUpperCase() +
      rawSection?.slice(1);
  
    return (
      <span>
        {course?.name} &gt; {formattedSection}
      </span>
    );
  }