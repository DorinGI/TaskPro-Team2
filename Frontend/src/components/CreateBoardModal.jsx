import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import Modal from "./Modal";
import ReactEllipsis from "react-ellipsis-text";
import styles from "./CreateBoardModal.module.css";

const CreateBoardModal = ({ isOpen, onClose, onCreate }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: "icon1",
      background: "none",
    },
    onSubmit: (values) => {
      if (!values.title.trim()) return;
      onCreate(values);
      onClose();
    },
    validate: (values) => {
      const errors = {};
      if (!values.title.trim()) {
        errors.title = "Title is required";
      }
      return errors;
    },
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Board">
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.modalContainer}>
          <div>
            <input
              name="title"
              placeholder="Enter board title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className={`${styles.inputField} ${
                formik.errors.title ? styles.inputFieldError : ""
              }`}
            />
            {formik.errors.title && (
              <div style={{ color: "red" }}>{formik.errors.title}</div>
            )}
          </div>

          <div className={styles.tabsContainer}>
            <button
              onClick={() => setSelectedTab(0)}
              className={styles.tabButton}
            >
              Icon
            </button>
            <button
              onClick={() => setSelectedTab(1)}
              className={styles.tabButton}
            >
              Background
            </button>
          </div>

          {selectedTab === 0 && (
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="icon"
                  value="icon1"
                  onChange={formik.handleChange}
                  checked={formik.values.icon === "icon1"}
                />
                Icon 1
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="icon"
                  value="icon2"
                  onChange={formik.handleChange}
                  checked={formik.values.icon === "icon2"}
                />
                Icon 2
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="icon"
                  value="icon3"
                  onChange={formik.handleChange}
                  checked={formik.values.icon === "icon3"}
                />
                Icon 3
              </label>
            </div>
          )}

          {selectedTab === 1 && (
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="background"
                  value="none"
                  onChange={formik.handleChange}
                  checked={formik.values.background === "none"}
                />
                No Background
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="background"
                  value="bg1"
                  onChange={formik.handleChange}
                  checked={formik.values.background === "bg1"}
                />
                Background 1
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="background"
                  value="bg2"
                  onChange={formik.handleChange}
                  checked={formik.values.background === "bg2"}
                />
                Background 2
              </label>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <h4>
              <ReactEllipsis
                text="This is a very long text that should be truncated if it exceeds the space."
                length={30} // Setează lungimea maximă de caractere
              />
            </h4>
          </div>
          <div>
            <button type="submit" className={styles.createButton}>
              Create
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

CreateBoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateBoardModal;
