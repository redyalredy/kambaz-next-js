import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../database";
import assignmentsData from "../database/assignments.json";
import { v4 as uuidv4 } from "uuid";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil?: string;
  moduleId?: string;
}

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image?: string;
  description?: string;
}

interface CoursesState {
  courses: Course[];
  assignments: Assignment[];
}

const initialState: CoursesState = {
  courses: courses,
  assignments: assignmentsData as Assignment[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }: PayloadAction<Course>) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
      state.assignments = state.assignments.filter((a) => a.course !== courseId);
    },
    updateCourse: (state, { payload: course }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
    setCourses: (state, { payload: courses }: PayloadAction<Course[]>) => {
      state.courses = courses;
    },

    addAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments.push({ ...assignment, _id: uuidv4() });
    },
    updateAssignment: (state, { payload: assignment }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
    deleteAssignment: (state, { payload: assignmentId }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },
  },
});

export const {
  addNewCourse,
  deleteCourse,
  updateCourse,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = coursesSlice.actions;

export default coursesSlice.reducer;
