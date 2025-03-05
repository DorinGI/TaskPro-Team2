import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { registerFormData } from '../../types';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import styles from './RegisterForm.module.css';
import { Icon } from '../Icon/Icon';
// import { useAppDispatch } from '../../hooks/auth';
import { registerUser } from '../../redux/authSlice';

// const registerSchema = yup.object().shape({
//   name: yup.string().min(2).max(20).required(),
//   email: yup.string().email().required(),
//   password: yup.string().min(7).max(14).required(),
// });

const RegisterForm = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm <
  // registerFormData >
  // {
  //   resolver: yupResolver(registerSchema),
  // };

  const [message, setMessage] = (useState < string) | (null > null);
  const [isError, setIsError] = useState < boolean > false; // ✅ Adăugăm stare pentru stil

  // const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      const resultAction = await dispatch(registerUser(data));

      console.log('📌 Rezultat registerUser:', resultAction); // ✅ Debugging - vezi răspunsul backend

      if (registerUser.fulfilled.match(resultAction)) {
        console.log(
          '✅ Utilizator înregistrat cu succes:',
          resultAction.payload
        );
        setMessage('✅ Utilizator înregistrat cu succes!');
        setIsError(false); // ✅ Stil verde pentru succes
        reset();
      } else if (registerUser.rejected.match(resultAction)) {
        console.error('❌ Eroare la înregistrare:', resultAction.payload);
        setMessage(
          resultAction.payload?.message || '❌ Eroare la înregistrare.'
        );
        setIsError(true); // ✅ Stil roșu pentru eroare
      }
    } catch (error) {
      console.error('❌ Eroare necunoscută la înregistrare:', error);
      setMessage('❌ Eroare necunoscută la înregistrare.');
      setIsError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formWrapCont}>
        <input
          className={styles.formInput}
          placeholder="Enter your name"
          {...register('name')}
        />
        <p className={styles.formError}>{errors?.name?.message}</p>

        <input
          className={styles.formInput}
          placeholder="Enter your email"
          {...register('email')}
        />
        <p className={styles.formError}>{errors?.email?.message}</p>

        <div className={styles.passwordWrap}>
          <input
            type="password"
            className={styles.formInput}
            placeholder="Create a password"
            {...register('password')}
          />
          <div className={styles.eye}>
            <Icon id="eye" size={18} />
          </div>
        </div>
        <p className={styles.formError}>{errors?.password?.message}</p>
      </div>

      <button className={styles.submitBtn} type="submit">
        Register Now
      </button>

      {/* ✅ Afișează mesajul cu stil diferit în funcție de eroare */}
      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
