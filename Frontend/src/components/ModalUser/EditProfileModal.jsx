import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/auth/selector';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchUser } from '../../redux/auth/authSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import sprite from '../../assets/sprite.svg';
import styles from './EditProfileModal.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, and one lowercase letter'
    ),
});

const EditProfileModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { name, email, avatarURL } = useSelector(selectUser);
  const [showPassword, setShowPassword] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(avatarURL);

  const initialValues = {
    image: currentImageUrl,
    name,
    email,
    password: '',
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    setFileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = upload => {
        setCurrentImageUrl(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit = values => {
    const { name, email, password } = values;
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    if (fileImage) {
      formData.append('avatarURL', fileImage);
    }

    dispatch(fetchUser(formData));
    closeModal();
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <h2>Edit Profile</h2>
        <div className={styles.editWrapper}>
          <div className={styles.imageWrapper}>
            {/* Dacă nu există imagine, afișăm SVG-ul */}
            {currentImageUrl ? (
              <img
                src={currentImageUrl}
                alt="user"
                className={styles.userImage}
              />
            ) : (
              <svg
                width="56"
                height="48"
                viewBox="0 0 56 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.defaultSvg}
              >
                <circle cx="28.3333" cy="11.3334" r="11.3334" fill="#151515" />
                <path
                  d="M55.7529 49.812C55.7529 46.1512 55.0319 42.5263 53.6309 39.1441C52.23 35.762 50.1766 32.6889 47.5881 30.1004C44.9995 27.5118 41.9264 25.4584 38.5443 24.0575C35.1622 22.6566 31.5372 21.9355 27.8764 21.9355C24.2157 21.9355 20.5907 22.6566 17.2086 24.0575C13.8265 25.4584 10.7534 27.5118 8.16482 30.1004C5.57625 32.6889 3.52289 35.762 2.12197 39.1441C0.721045 42.5263 -3.20036e-07 46.1512 0 49.812L27.8765 49.812H55.7529Z"
                  fill="#151515"
                />
              </svg>
            )}
          </div>
          {/* Buton "+" suprapus peste imagine */}
          <label htmlFor="fileInput" className={styles.uploadBtn}>
            <svg viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleImageUpload}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, values }) => (
              <form className={styles.authForm}>
                <div className={styles.authFormWrapper}>
                  {errors.name && (
                    <div className={styles.errorSection}>{errors.name}</div>
                  )}
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    className={styles.authFormField}
                  />
                </div>
                <div className={styles.authFormWrapper}>
                  {errors.email && (
                    <div className={styles.errorSection}>{errors.email}</div>
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    className={styles.authFormField}
                  />
                </div>
                <div className={styles.authFormWrapper}>
                  {errors.password && (
                    <div className={styles.errorSection}>{errors.password}</div>
                  )}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    className={styles.authFormField}
                  />
                  <div
                    className={styles.authFormPasswordIcon}
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
                <button type="submit" className={styles.authFormSubmitButton}>
                  Send
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
