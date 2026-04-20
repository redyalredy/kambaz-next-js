import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courses/reducer";
import modulesReducer from "./courses/[cid]/modules/reducer";
import accountReducer from "./account/reducer";
import quizzesReducer from "./courses/[cid]/quizzes/reducer";

const store = configureStore({
 reducer: { coursesReducer, modulesReducer, accountReducer, quizzesReducer


 },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;