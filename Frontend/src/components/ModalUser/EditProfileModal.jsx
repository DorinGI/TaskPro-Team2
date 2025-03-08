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
            {currentImageUrl && (
              <img
                src={currentImageUrl}
                alt="user"
                className={styles.userImage}
              />
            )}
            <button
              onClick={() => document.querySelector('.input-field').click()}
              className={styles.customButton}
            >
              <svg className={styles.plusIcon}>
                <use href={sprite + '#icon-plus'} />
              </svg>
              <input
                type="file"
                accept="image/*"
                className={`${styles.hiddenInput} input-field`}
                onChange={handleImageUpload}
              />
            </button>
          </div>
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
