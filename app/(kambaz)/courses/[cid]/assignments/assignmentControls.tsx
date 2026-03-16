"use client";

import { FormControl, Button } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

interface AssignmentControlsProps {
  canEdit: boolean;
}

export default function AssignmentControls({ canEdit }: AssignmentControlsProps) {
  const router = useRouter();
  const { cid } = useParams();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  if (!currentUser || currentUser.role === "STUDENT") return null;

  const handleAddAssignment = () => {
    router.push(`/courses/${cid}/assignments/new`);
  };

  return (
    <div
      id="wd-assignment-controls"
      className="d-flex justify-content-between align-items-center mb-4"
    >
      <div className="wd-search-wrapper">
        <FaSearch className="wd-search-icon" />
        <FormControl
          size="lg"
          placeholder="Search..."
          id="wd-search-assignment"
          className="wd-search-input"
          disabled={!canEdit} 
        />
      </div>

      {canEdit && (
        <div>
          <Button variant="secondary" size="lg" className="me-2">
            <FaPlus className="me-2" />
            Group
          </Button>

          <Button
            variant="danger"
            size="lg"
            onClick={handleAddAssignment}
          >
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      )}
    </div>
  );
}
