import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styles from "./HelpModal.module.css";

const HelpModal = ({ isOpen, onClose }) => {
  const [userEmail, setUserEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      email: userEmail || "",
      comment: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      comment: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters"),
    }),
    onSubmit: (values) => {
      // Aici poți trimite cererea către server
      console.log("Form submitted:", values);
      // De exemplu, trimite cererea la server:
      // axios.post('/api/help', values);
      onClose(); // Închide modalul după trimiterea formularului
    },
  });

  // Funcția de succes pentru Google Login
  const handleLoginSuccess = (response) => {
    const email = response?.credential?.email;
    setUserEmail(email); // Setează email-ul utilizatorului în state pentru a-l pre-popula în formular
  };

  // Funcția de eșec pentru Google Login
  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };

  return (
    isOpen && (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <h2>Need Help?</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Câmpul pentru email */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Câmpul pentru mesaj */}
            <div className={styles.inputGroup}>
              <textarea
                id="comment"
                name="comment"
                placeholder="Comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.comment && formik.errors.comment ? "error" : ""
                }
              />
              {formik.touched.comment && formik.errors.comment ? (
                <div className="error-comment">{formik.errors.comment}</div>
              ) : null}
            </div>

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  );
};

HelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HelpModal;
