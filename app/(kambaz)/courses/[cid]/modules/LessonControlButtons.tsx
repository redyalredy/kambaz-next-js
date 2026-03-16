import { Button } from "react-bootstrap";

interface LessonControlButtonsProps {
  lesson: any;
  canEdit: boolean; 
}

export default function LessonControlButtons({ lesson, canEdit }: LessonControlButtonsProps) {
  if (!canEdit) return null; 

  return (
    <div>
      <Button size="sm" variant="warning" className="me-2">Edit</Button>
      <Button size="sm" variant="danger">Delete</Button>
    </div>
  );
}
