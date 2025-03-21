import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./AuthPage.module.css";
// import NotFoundPage from '../NotFoundPage/NotFoundPage';

const AuthPage = () => {
  const { id } = useParams();

  // if (id !== 'register' && id !== 'login') {
  //   return <NotFoundPage />;
  // }

  return (
    <div className={styles.page}>
      <div className={styles.formCont}>
        <div className={styles.formNavCont}>
          <NavLink
            className={id === "login" ? styles.formLink : styles.activeLink}
            to="/auth/register"
          >
            Registration
          </NavLink>
          <NavLink
            className={id === "register" ? styles.formLink : styles.activeLink}
            to="/auth/login"
          >
            Log in
          </NavLink>
        </div>
        {id === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthPage;
