import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};
export const deleteCourse = async (id: string) => {
    const { data } = await axios.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: any) => {
    const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}/modules/${moduleId}`
    );
    return response.data;
  };

export const updateModule = async (courseId: string, module: any) => {
    const { data } = await axios.put(
        `${COURSES_API}/${courseId}/modules/${module._id}`,
        module
      );
      return data;
     
  };
  

  export const findUsersForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
  };

  export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  };
  
  export const createQuizForCourse = async (courseId: string, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
  };
  
  export const deleteQuiz = async (courseId: string, quizId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}/quizzes/${quizId}`
    );
    return response.data;
  };
  
  export const updateQuiz = async (
    courseId: string,
    quiz: any
  ) => {
    const response = await axios.put(
      `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
      quiz
    );
    return response.data;
  };
  export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/quizzes/${quizId}`);
    return response.data;
  };
  
  export const publishQuiz = async (quizId: string) => {
    const response = await axios.put(`${HTTP_SERVER}/api/quizzes/${quizId}/publish`);
    return response.data;
  };
  
  export const unpublishQuiz = async (quizId: string) => {
    const response = await axios.put(`${HTTP_SERVER}/api/quizzes/${quizId}/unpublish`);
    return response.data;
  };
  
  export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/quizzes/${quizId}/questions`);
    return response.data;
  };
  
  export const findQuestionById = async (questionId: string) => {
    const response = await axios.get(`${HTTP_SERVER}/api/questions/${questionId}`);
    return response.data;
  };
  
  export const createQuestionForQuiz = async (quizId: string, question: any) => {
    const response = await axios.post(
      `${HTTP_SERVER}/api/quizzes/${quizId}/questions`,
      question
    );
    return response.data;
  };
  
  export const updateQuestion = async (
    quizId: string,
    questionId: string,
    question: any
  ) => {
    const response = await axios.put(
      `${HTTP_SERVER}/api/quizzes/${quizId}/questions/${questionId}`,
      question
    );
    return response.data;
  };
  
  export const deleteQuestion = async (quizId: string, questionId: string) => {
    const response = await axios.delete(
      `${HTTP_SERVER}/api/quizzes/${quizId}/questions/${questionId}`
    );
    return response.data;
  };
  
  export const submitAttempt = async (
    quizId: string,
    userId: string,
    answers: any[]
  ) => {
    const response = await axios.post(`${HTTP_SERVER}/api/quizzes/${quizId}/attempts`, {
      userId,
      answers,
    });
    return response.data;
  };
  
  export const findLastAttemptForQuiz = async (quizId: string, userId: string) => {
    const response = await axios.get(
      `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/${userId}/last`
    );
    return response.data;
  };



  
