import React from "react";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import MyLibraryPage from "../pages/MyLibraryPage";
import ReportPage from "../pages/ReportPage";
import LoginRegisterPage from "../pages/LoginRegisterPage";
import SettingPage from "../pages/SettingPage";


const router = [
  {
    path: "/", 
   page: HomePage },
   {
    path: "/login", 
   page: LoginRegisterPage },
  {
     path: "/admin", 
    page: AdminPage  },
  {
    path: "/createdByMe", 
    page: MyLibraryPage  },
  {
    path: "/Report", 
    page: ReportPage  },
    {
      path: "/setting", 
     page: SettingPage  },
];

export default router;
