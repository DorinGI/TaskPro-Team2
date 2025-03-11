import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./LoginForm.module.css";
import { Icon } from "../Icon/Icon";
import { loginUser } from "../../redux/auth/authSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(loginUser(values));
    } catch (error) {
      setErrors({ email: "Login failed. Please try again." });
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form} autoComplete="off">
          {/* 🔹 E-mail */}
          <Field
            className={`${styles.formInput} ${errors.email && touched.email ? styles.inputError : ""}`}
            name="email"
            placeholder="Enter your email"
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

          <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in now"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
