import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email je obavezno polje, unesite email")
    .email("Email format nije dobar"),
  // .matches(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!.,#]).+$/i,
  //   "Email moze da sadrzi samo slova, brojeve i tacku"
  // )
  password: yup
    .string()
    .required("Sifra je obavezno polje, unesite sifru")
    .min(6, "Sifra mora da ima najmanje 6 karaktera")
    .max(50, "Sifra mora da ima najvise 50 karaktera"),
  // .matches(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!.,#]).+$/i,
  //   "Nije dobra sifra"
  // ),
});
const Login = () => {
  const checkUserLoggedIn = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };

  const consoleLog = async () => {
    try {
      const user = await checkUserLoggedIn();
      if (user?.id !== undefined) {
        navigate("/todo");
      }
    } catch (error) {
      console.error("Došlo je do greške pri proveri autentikacije:", error);
    }
  };

  consoleLog();
  const navigate = useNavigate();
  const submitForm = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/todo");
    });
  };

  // setTimeout(() => {
  //   if (auth?.currentUser?.uid !== undefined) {
  //     return navigate("/todo");
  //   }
  return (
    <div
      className="login-wrapper"
      //   style={{
      //     backgroundColor: theme.palette.background,
      //   }}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          submitForm(values.email, values.password);
        }}
        validationSchema={loginSchema}
      >
        {({
          values, // formikov state
          errors, // errors = { email: 'Neispravan email' }
          touched, // touched = { email: true }
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div>
            <center>
              <Typography variant="h4" color={"primary"} gutterBottom>
                Login Page
              </Typography>
            </center>
            <Box my={2}>
              <TextField
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <Typography variant="body1" color={"error"}>
                {errors.email && touched.email && errors.email}
              </Typography>
            </Box>
            <Box my={2}>
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              <Typography variant="body1" color={"error"}>
                {errors.password && touched.password && errors.password}
              </Typography>
            </Box>
            <center>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </center>
            {/* <button onClick={handleSubmit} type="button">
            Submit
          </button> */}
          </div>
        )}
      </Formik>
    </div>
  );
};
// };

export default Login;
