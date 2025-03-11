import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import { Icon } from "../Icon/Icon";
import { loginUser } from "../../redux/auth/authSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(""); // 🔹 Stocăm eroarea de la server
  const dispatch = useDispatch();

  // 🔹 Schema de validare cu Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresa de e-mail nu este validă")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "E-mail invalid")
      .required("E-mailul este obligatoriu"),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Parola nu poate conține spații")
      .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
      .max(64, "Parola trebuie să aibă maximum 64 de caractere")
      .required("Parola este obligatorie"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError(""); // 🔹 Resetăm mesajul de eroare anterior
    try {
      const resultAction = await dispatch(loginUser(values));

      if (loginUser.rejected.match(resultAction)) {
        console.error("❌ Utilizator inexistent!");
        setServerError("Utilizator inexistent! (user și/sau parolă incorecte)"); // 🔹 Setăm eroarea
        resetForm(); // 🔹 Resetăm formularul
      }
    } catch (error) {
      console.error("❌ Eroare la autentificare:", error);
      setServerError("Eroare la autentificare. Te rugăm să încerci din nou.");
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldTouched }) => (
        <Form className={styles.form} autoComplete="off">
          {/* 🔹 E-mail */}
          <Field
            className={`${styles.formInput} ${errors.email && touched.email ? styles.inputError : ""}`}
            name="email"
            placeholder="Enter your email"
            onFocus={() => setServerError("")} // 🔹 Șterge eroarea când utilizatorul dă click pe email
          />
          <ErrorMessage className={styles.formError} name="email" component="p" />

          {/* 🔹 Parola */}
          <div className={styles.passwordWrap}>
            <Field
              type={showPassword ? "text" : "password"}
              className={`${styles.formInput} ${errors.password && touched.password ? styles.inputError : ""}`}
              name="password"
              placeholder="Enter your password"
            />
            <div className={styles.eye} onClick={() => setShowPassword((prev) => !prev)}>
              <Icon id={showPassword ? "eye-off" : "eye"} size={18} />
            </div>
          </div>
          <ErrorMessage className={styles.formError} name="password" component="p" />

          {/* 🔹 Mesaj de eroare de la server */}
          {serverError && <p className={styles.serverError}>{serverError}</p>}

          <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in now"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
