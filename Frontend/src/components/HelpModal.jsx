import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./HelpModal.module.css";
import Modal from "./Modal";

const HelpModal = ({ isOpen, onClose }) => {
  const [userEmail, setUserEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      email: userEmail || "",
      comment: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      comment: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("/api/help", values);
        console.log("Form submitted:", response.data);
        onClose();
      } catch (error) {
        console.error("Error sending request:", error.response?.data || error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (userEmail) {
      formik.setFieldValue("email", userEmail);
    }
  }, [userEmail]);
  // Funcția de succes pentru Google Login
  // const handleLoginSuccess = (response) => {
  //  const email = response?.credential?.email;
  //  setUserEmail(email); // Setează email-ul utilizatorului în state pentru a-l pre-popula în formular
  // };

  // Funcția de eșec pentru Google Login
  // const handleLoginFailure = (error) => {
  //  console.log("Login failed:", error);
  //};

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Need Help?"
      className={styles.helpModal}
    >
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
            <div className={styles.errorMessage}>{formik.errors.email}</div>
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
            <div className={styles.errorMessage}>{formik.errors.comment}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </Modal>
  );
};

HelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HelpModal;
