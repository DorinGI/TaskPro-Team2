import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RegisterForm.module.css";
import { Icon } from "../Icon/Icon";
import { registerUser } from "../../redux/auth/authSlice";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // 🔹 Schema de validare cu Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z0-9@#$%^&*()_+=[\]{}|\\,.!?-]+$/, "Numele conține caractere invalide")
      .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
      .max(32, "Numele trebuie să aibă maximum 32 de caractere")
      .required("Numele este obligatoriu"),
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

  const handleSubmit = async (values, { resetForm }) => {
    console.log("📌 Datele trimise la API:", values);
    try {
      const resultAction = await dispatch(registerUser(values));
      console.log("📌 Rezultat registerUser:", resultAction);

      if (registerUser.fulfilled.match(resultAction)) {
        console.log("✅ Utilizator înregistrat cu succes:", resultAction.payload);
        resetForm();
      } else {
        console.error("❌ Eroare la înregistrare:", resultAction.payload);
        alert("Eroare la înregistrare: " + resultAction.payload?.message);
      }
    } catch (error) {
      console.error("❌ Eroare necunoscută la înregistrare:", error);
      alert("Eroare necunoscută la înregistrare");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formWrapCont}>
            {/* 🔹 Nume */}
            <Field
              className={`${styles.formInput} ${errors.name && touched.name ? styles.inputError : ""}`}
              name="name"
              placeholder="Enter your name"
            />
            <ErrorMessage className={styles.formError} name="name" component="p" />

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
                placeholder="Create a password"
              />
              <div className={styles.eye} onClick={() => setShowPassword((prev) => !prev)}>
                <Icon id={showPassword ? "eye-off" : "eye"} size={18} />
              </div>
            </div>
            <ErrorMessage className={styles.formError} name="password" component="p" />
          </div>

          <button className={styles.submitBtn} type="submit">
            Register Now
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
