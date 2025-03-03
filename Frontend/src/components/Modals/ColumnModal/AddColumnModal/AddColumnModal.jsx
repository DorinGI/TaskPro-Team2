/*import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addColumn } from "../../../../redux/dashboards/dashboardsOperations";
import { selectColumns } from "../../../../redux/dashboards/dashboardsSelectors";
import sprite from "../../../../assets/sprite.svg";
import styles from "../../ColumnModal/ColumnModal.module.css"; // Importă CSS-ul modular

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const initialValues = {
  title: "",
};

const AddColumnModal = ({ dashboardId, closeModal }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns) || []; // Verificare pentru undefined

  const handleSubmit = (values, { resetForm }) => {
    const { title } = values;

    const alreadyExists = columns.findIndex((item) => {
      return item.title.toLowerCase() === title.toLowerCase();
    });

    if (alreadyExists >= 0) {
      return `${columns[alreadyExists].title} is already added to contact list`;
    }

    dispatch(addColumn({ dashboardId, title }));
    resetForm();
    closeModal();
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Add column</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <input
              type="text"
              id="text"
              name="title"
              placeholder="Title"
              className={styles.titleInput}
              onChange={handleChange}
              value={values.title}
            />

            <button type="submit" className={styles.authFormSubmitButton}>
              <span className={styles.buttonPlus}>
                <svg width="16" height="16">
                  <use href={sprite + "#icon-plus"} />
                </svg>
              </span>
              Add
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddColumnModal;*/
