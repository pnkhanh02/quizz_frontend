import React, { useEffect, useReducer } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import MyLibraryPage from './pages/MyLibraryPage';
import QuizDetailsPage from './pages/QuizDetailsPage';
import { StateProvider } from './contex/AppContext';
import EditQuestionPage from './pages/EditQuestionPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import EditQuizPage from './pages/EditQuizPage';
import TestComponentPage from './pages/TestComponent';
import ExplorePage from './pages/ExplorePage';
import NewQuizPage from './pages/NewQuizPage';


function App() {

  

  

  return (

    <BrowserRouter>
    <StateProvider>
      <Routes>
            <Route path="/" element={<LoginRegisterPage />} />
            <Route path="/homepage" element={<HomePage />}/>
            <Route path="/dashboard" element={<DashboardPage />}/>
            <Route path="/createdByMe/:createdBy" element={<MyLibraryPage />} />
            <Route path="/quizDetails/:quizId" element={<QuizDetailsPage />} />
            <Route path="/editQuestion" element={<EditQuestionPage />} />
            <Route path="/editQuiz/:quizId" element={<EditQuizPage />} />
            <Route path="/newQuiz/:quizId" element={<NewQuizPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<ExplorePage />} />
            <Route path="/test" element={<TestComponentPage />} />
      </Routes>
      </StateProvider>
      <ToastContainer/>
    </BrowserRouter>
        
  );
}

export default App;