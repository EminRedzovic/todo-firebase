import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Todo from "./pages/Todo/Todo";
import { Provider, useDispatch, useSelector } from "react-redux";
import { authSlice } from "./store/authSlice";
import { store } from "./store/store";

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Todo />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
