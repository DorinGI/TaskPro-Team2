import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './RegisterForm.module.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Numele trebuie să aibă cel puțin 2 caractere')
    .max(32, 'Numele nu poate avea mai mult de 32 de caractere')
    .required('Numele este obligatoriu'),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Adresa de e-mail nu este validă')
    .required('E-mailul este obligatoriu'),
  password: Yup.string()
    .min(8, 'Parola trebuie să aibă cel puțin 8 caractere')
    .max(64, 'Parola nu poate avea mai mult de 64 de caractere')
    .matches(/^[^\s]+$/, 'Parola nu poate conține spații')
    .required('Parola este obligatorie'),
});

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('📩 [SENDING REQUEST]:', values);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log('✅ [BACKEND RESPONSE]:', data);

      if (response.ok) {
        setFormMessage({ type: 'success', text: '✅ Utilizator înregistrat cu succes!' });
        resetForm();
      } else {
        console.error('🚨 [REGISTER ERROR]:', data);
        setFormMessage({ type: 'error', text: data.msg || '❌ A apărut o eroare la înregistrare.' });
      }
    } catch (error) {
      console.error('❌ [REGISTER ERROR]:', error);
      setFormMessage({ type: 'error', text: '⚠️ Eroare server. Încearcă din nou!' });
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleBlur, handleChange, isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.formWrapCont}>
            <label>Nume</label>
            <Field
              type="text"
              name="name"
              className={styles.formInput}
              placeholder="Enter your name"
              autoComplete="name"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.name && errors.name && <div className={styles.formError}>{errors.name}</div>}
          </div>

          <div className={styles.formWrapCont}>
            <label>Email</label>
            <Field
              type="email"
              name="email"
              className={styles.formInput}
              placeholder="Enter your email"
              autoComplete="email"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email && <div className={styles.formError}>{errors.email}</div>}
          </div>

          <div className={styles.formWrapCont}>
            <label>Parola</label>
            <div className={styles.passwordContainer}>
              <Field
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                className={styles.formInput}
                placeholder="Create a password"
                autoComplete="new-password"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className={styles.eyeIconRight} onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </span>
            </div>
            {touched.password && errors.password && <div className={styles.formError}>{errors.password}</div>}
          </div>

          {/* ✅ Afișăm mesajul de succes sau eroare în UI, fără alert() */}
          {formMessage && (
            <div className={formMessage.type === 'success' ? styles.successMessage : styles.errorMessage}>
              {formMessage.text}
            </div>
          )}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
