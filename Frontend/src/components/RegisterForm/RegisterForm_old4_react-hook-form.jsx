import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import styles from "./RegisterForm.module.css";
import { Icon } from "../Icon/Icon";
import { registerUser } from "../../redux/auth/authSlice";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // 🔹 Schema de validare cu Yup
  const validationSchema = Yup.object().shape({
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    console.log("📌 Datele trimise la API:", data);
    try {
      const resultAction = await dispatch(registerUser(data));
      console.log("📌 Rezultat registerUser:", resultAction);

      if (registerUser.fulfilled.match(resultAction)) {
        console.log("✅ Utilizator înregistrat cu succes:", resultAction.payload);
        setMessage("✅ Utilizator înregistrat cu succes!");
        setIsError(false);
        reset();
      } else if (registerUser.rejected.match(resultAction)) {
        console.error("❌ Eroare la înregistrare:", resultAction.payload);
        setMessage(resultAction.payload?.message || "❌ Eroare la înregistrare.");
        setIsError(true);
        alert("Eroare la înregistrare: " + resultAction.payload?.message);
      }
    } catch (error) {
      console.error("❌ Eroare necunoscută la înregistrare:", error);
      setMessage("❌ Eroare necunoscută la înregistrare.");
      setIsError(true);
      alert("Eroare necunoscută la înregistrare");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formWrapCont}>
        {/* 🔹 Nume */}
        <input
          className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
          placeholder="Enter your name"
          {...register("name")}
        />
        <p className={styles.formError}>{errors.name?.message}</p>

        {/* 🔹 E-mail */}
        <input
          className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
          placeholder="Enter your email"
          {...register("email")}
        />
        <p className={styles.formError}>{errors.email?.message}</p>

        {/* 🔹 Parola */}
        <div className={styles.passwordWrap}>
          <input
            type={showPassword ? "text" : "password"}
            className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
            placeholder="Create a password"
            {...register("password")}
          />
          <div className={styles.eye} onClick={togglePasswordVisibility}>
            <Icon id={showPassword ? "eye-off" : "eye"} size={18} />
          </div>
        </div>
        <p className={styles.formError}>{errors.password?.message}</p>
      </div>

      <button className={styles.submitBtn} type="submit">
        Register Now
      </button>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
