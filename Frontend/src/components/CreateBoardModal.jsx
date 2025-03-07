import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { saveBoard } from "../redux/boardsSlice";
import Modal from "./Modals/Modal.jsx";
import styles from "./CreateBoardModal.module.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Must be at least 1 character")
    .max(50, "Maximum 50 characters"),
});

const iconOptions = [
  { value: "icon-project" },
  { value: "icon-star" },
  { value: "icon-loading" },
  { value: "icon-puzzle" },
  { value: "icon-container" },
  { value: "icon-lightning" },
  { value: "icon-colors" },
  { value: "icon-hexagon" },
];

const backgroundOptions = [
  {
    value: "none",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/none.png",
  },
  {
    value: "bg1",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-flowers.png",
  },
  {
    value: "bg2",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-starry-sky.png",
  },
  {
    value: "bg3",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-flowering-tree.png",
  },
  {
    value: "bg4",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-crescend.png",
  },
  {
    value: "bg5",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-green-leaves.png",
  },
  {
    value: "bg6",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-clouds.png",
  },
  {
    value: "bg7",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-strait.png",
  },
  {
    value: "bg8",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-sphere.png",
  },
  {
    value: "bg9",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-month.png",
  },
  {
    value: "bg10",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-yacht.png",
  },
  {
    value: "bg11",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-air-ballon.png",
  },
  {
    value: "bg12",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-stone.png",
  },
  {
    value: "bg13",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-seashore.png",
  },
  {
    value: "bg14",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-ballons.png",
  },
  {
    value: "bg15",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-galaxy.png",
  },
];

const CreateBoardModal = ({ isOpen, onClose, boardToEdit }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: boardToEdit?.title || "",
      icon: boardToEdit?.icon || iconOptions[0].value,
      background: boardToEdit?.background || backgroundOptions[0].value,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(saveBoard({
          ...values,
          _id: boardToEdit?._id, // Use _id instead of id
        }));
        onClose();
      } catch (error) {
        console.error("Failed to save board:", error);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={boardToEdit ? "Edit Board" : "New Board"}
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="title"
            placeholder="Board title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.title && formik.errors.title ? styles.error : ""
            }`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className={styles.errorMessage}>
              {formik.errors.title}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Choose Icon</h3>
          <div className={styles.iconGrid}>
            {iconOptions.map((icon) => (
              <label key={icon.value} className={styles.iconOption}>
                <input
                  type="radio"
                  name="icon"
                  value={icon.value}
                  checked={formik.values.icon === icon.value}
                  onChange={formik.handleChange}
                  className={styles.hiddenRadio}
                />
                <div
                  className={`${styles.iconContainer} ${
                    formik.values.icon === icon.value ? styles.selected : ""
                  }`}
                >
                  <svg className={styles.icon}>
                    <use href={`/icons/symbol-defs.svg#${icon.value}`} />
                  </svg>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Background</h3>
          <div className={styles.backgroundGrid}>
            {backgroundOptions.map((bg) => (
              <label key={bg.value} className={styles.backgroundOption}>
                <input
                  type="radio"
                  name="background"
                  value={bg.value}
                  checked={formik.values.background === bg.value}
                  onChange={formik.handleChange}
                  className={styles.hiddenRadio}
                />
                <div
                  className={`${styles.backgroundPreview} ${
                    formik.values.background === bg.value ? styles.selected : ""
                  }`}
                  style={{ backgroundImage: `url(${bg.image})` }}
                />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {boardToEdit ? "Update Board" : "Create Board"}
        </button>
      </form>
    </Modal>
  );
};

CreateBoardModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  boardToEdit: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    background: PropTypes.string,
  }),
};

export default CreateBoardModal;