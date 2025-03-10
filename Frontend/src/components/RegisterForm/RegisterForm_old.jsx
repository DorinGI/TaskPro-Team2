import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styles from "./RegisterForm.module.css";
import { Icon } from "../Icon/Icon";
import { registerUser } from "../../redux/auth/authSlice";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data));

      console.log("📌 Rezultat registerUser:", resultAction);

      if (registerUser.fulfilled.match(resultAction)) {
        console.log(
          "✅ Utilizator înregistrat cu succes:",
          resultAction.payload
        );
        setMessage("✅ Utilizator înregistrat cu succes!");
        setIsError(false);
        reset();
      } else if (registerUser.rejected.match(resultAction)) {
        console.error("❌ Eroare la înregistrare:", resultAction.payload);
        setMessage(
          resultAction.payload?.message || "❌ Eroare la înregistrare."
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("❌ Eroare necunoscută la înregistrare:", error);
      setMessage("❌ Eroare necunoscută la înregistrare.");
      setIsError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formWrapCont}>
        <input
          className={styles.formInput}
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        <p className={styles.formError}>{errors.name?.message}</p>

        <input
          className={styles.formInput}
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        <p className={styles.formError}>{errors.email?.message}</p>

        <div className={styles.passwordWrap}>
          <input
            type="password"
            className={styles.formInput}
            placeholder="Create a password"
            {...register("password", { required: "Password is required" })}
          />
          <div className={styles.eye}>
            <Icon id="eye" size={18} />
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
