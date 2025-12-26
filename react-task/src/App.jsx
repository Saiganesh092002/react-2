import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersProfile from "./Components/UsersProfile";
import EditModal from "./Components/EditModal";
import Create from "./Components/Create";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersProfile />} />
        <Route path="/edit/:id" element={<EditModal />} />
         <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}
