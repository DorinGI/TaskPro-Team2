import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterForm.module.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // Import eye icons

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(32).required('Numele este obligatoriu'),
  email: Yup.string().email('Adresa de e-mail nu este validă').required('E-mailul este obligatoriu'),
  password: Yup.string().min(8).max(64).required('Parola este obligatorie'),
});

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.formWrapCont}>
            <label>Nume</label>
            <Field type="text" name="name" className={styles.formInput} placeholder="Enter your name" />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>

          <div className={styles.formWrapCont}>
            <label>Email</label>
            <Field type="email" name="email" className={styles.formInput} placeholder="Enter your email" />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </div>

          <div className={styles.formWrapCont}>
            <label>Parola</label>
            <div className={styles.passwordContainer}>
              <Field
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                className={styles.formInput}
                placeholder="Create a password"
              />
              <span className={styles.eyeIconRight} onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </span>
            </div>
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.submitButton}>Register Now</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
