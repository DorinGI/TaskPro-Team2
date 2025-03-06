import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styles from "./LoginForm.module.css";
import { Icon } from "../Icon/Icon";
import { loginUser } from "../../redux/auth/authSlice";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordState, setPasswordState] = useState("password");
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data));
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const togglePasswordState = () => {
    setPasswordState((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <input
        className={styles.formInput}
        placeholder="Enter your email"
        {...register("email", { required: "Email is required" })}
      />
      <p className={styles.formError}>{errors.email?.message}</p>

      <div className={styles.passwordWrap}>
        <input
          type={passwordState} // ✅ Folosim starea corectă
          className={styles.formInput}
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        <div onClick={togglePasswordState} className={styles.eye}>
          <Icon id="eye" size={18} />
        </div>
      </div>
      <p className={styles.formError}>{errors.password?.message}</p>

      {errorMessage && <p className={styles.formError}>{errorMessage}</p>}

      <button className={styles.submitBtn} type="submit">
        Log in now
      </button>
    </form>
  );
};

export default LoginForm;
