import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { saveBoard } from "../redux/boardsSlice";
import Modal from "./Modal";
import styles from "./CreateBoardModal.module.css";

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
    image:
      process.env.PUBLIC_URL + "/boarder_backgrounds/icon-flowering-tree.png",
  },
  {
    value: "bg4",
    image: process.env.PUBLIC_URL + "/boarder_backgrounds/icon-crescend.png",
  },
  {
    value: "bg5",
    image:
      process.env.PUBLIC_URL + "/boarder_backgrounds/icon-green-leaves.png",
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
      title: boardToEdit ? boardToEdit.title : "",
      icon: boardToEdit ? boardToEdit.icon : iconOptions[0].value,
      background: boardToEdit
        ? boardToEdit.background
        : backgroundOptions[0].value,
    },
    onSubmit: async (values) => {
      if (!values.title.trim()) return;

      await dispatch(
        saveBoard({ ...values, id: boardToEdit ? boardToEdit.id : undefined })
      );

      onClose();
    },
    validate: (values) => {
      const errors = {};
      if (!values.title.trim()) {
        errors.title = "Title required";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (boardToEdit) {
      formik.setValues({
        title: boardToEdit.title,
        icon: boardToEdit.icon,
        background: boardToEdit.background,
      });
    }
  }, [boardToEdit, formik]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={boardToEdit ? "Edit Board" : "New Board"}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.modalBody}>
          <div>
            <input
              name="title"
              placeholder="Title"
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
          <h3>Icons</h3>
          <div className={styles.radioGroup}>
            {iconOptions.map((icon) => (
              <label key={icon.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="icon"
                  value={icon.value}
                  onChange={formik.handleChange}
                  checked={formik.values.icon === icon.value}
                  className={styles.hiddenRadio}

                />
                <div
                  className={`${styles.iconContainer} ${
                    formik.values.icon === icon.value ? styles.selectedIcon : ""
                  }`}
                >
                  <svg className={styles.icon}>
                    <use xlinkHref={`/icons/symbol-defs.svg#${icon.value}`} />
                  </svg>
                </div>
              </label>
            ))}
          </div>
          <h3>Background</h3>
          <div className={styles.backgroundGrid}>
            {backgroundOptions.map((bg) => (
              <label key={bg.value} className={styles.radioLabel}>

                <input
                  type="radio"
                  name="background"
                  value={bg.value}
                  onChange={formik.handleChange}
                  checked={formik.values.background === bg.value}
                  className={styles.hiddenRadio}
                />
                <div
                  className={`${styles.backgroundContainer} ${
                    formik.values.background === bg.value
                      ? styles.selectedBackground
                      : ""
                  }`}
                  style={{ backgroundImage: `url(${bg.image})` }}
                ></div>
              </label>
            ))}
          </div>

          <div className={styles.createButtonWrapper}>
            <button
              type="submit"
              className={styles.createButton}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              <div className={styles.plusBox}>+</div>
              {boardToEdit ? "Update" : "Create"}
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
  boardToEdit: PropTypes.object,
};

export default CreateBoardModal;
