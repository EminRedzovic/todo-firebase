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

  // const checkUserLoggedIn = () => {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       unsubscribe();
  //       resolve(user);
  //     }, reject);
  //   });
  // };

  // const auth = async () => {
  //   try {
  //     const user = await checkUserLoggedIn();
  //     if (user?.uid) {
  //       console.log(user?.uid);

  //       dispatch(authState.actions.setData({ id: user.uid }));
  //     }
  //   } catch (error) {
  //     console.error("Došlo je do greške pri proveri autentikacije:", error);
  //   }
  // };
  // useEffect(() => {
  //   auth();
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
