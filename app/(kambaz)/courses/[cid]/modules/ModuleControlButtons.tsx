"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface ModuleControlButtonsProps {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: ModuleControlButtonsProps) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;

  if (!currentUser || currentUser.role === "STUDENT") return null;

  return (
    <div className="float-end d-flex align-items-center">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-3" onClick={() => deleteModule(moduleId)} />
      <span className="me-2">
        <GreenCheckmark />
      </span>
      <BsPlus className="fs-2 me-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
