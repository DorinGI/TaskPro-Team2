import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import styles from './LoginForm.module.css';
import { Icon } from '../Icon/Icon';
import { loginUser } from '../../redux/auth/authSlice';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Adresa de e-mail nu este validă')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Adresa de e-mail nu este validă')
    .required('Adresa de e-mail este obligatorie'),
  password: Yup.string()
    .min(8, 'Parola trebuie să aibă cel puțin 8 caractere')
    .max(64, 'Parola nu poate avea mai mult de 64 de caractere')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/, 'Parola trebuie să conțină litere, cifre și caractere speciale')
    .required('Parola este obligatorie'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [passwordState, setPasswordState] = useState('password');

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.formWrapCont}>
            <label>Email</label>
            <Field type="email" name="email" className={styles.formInput} placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </div>

          <div className={styles.formWrapCont}>
            <label>Parola</label>
            <div className={styles.passwordContainer}>
              <Field type={passwordState} name="password" className={styles.formInput} placeholder="Enter your password" />
              <span className={styles.eyeIconRight} onClick={() => setPasswordState(passwordState === 'password' ? 'text' : 'password')}>
                <Icon name="eye" />
              </span>
            </div>
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.submitButton}>Log in</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
