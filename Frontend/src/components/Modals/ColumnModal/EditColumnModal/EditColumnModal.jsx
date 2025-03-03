/*import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editColumn } from "redux/dashboards/dashboardsOperations";
import sprite from "../../../../assets/sprite.svg";
import styles from "../../ColumnModal/ColumnModal.module.css"; // Importă CSS-ul modular

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const EditColumnModal = ({ title, columnId, closeModal }) => {
  const dispatch = useDispatch();

  const initialValues = { title };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(editColumn({ columnId, title: values.title }));
    resetForm();
    closeModal();
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Edit column</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values }) => (
          <Form className={styles.modalForm}>
            <div className={styles.formWrapper}>
              <ErrorMessage
                name="title"
                component="div"
                className={styles.errorSection}
              />
              <Field
                type="text"
                id="text"
                name="title"
                placeholder="Title"
                className={styles.titleInput}
                onChange={handleChange}
                value={values.title}
              />
            </div>

            <button type="submit" className={styles.authFormSubmitButton}>
              <span className={styles.buttonPlus}>
                <svg width="16" height="16" className={styles.plusIcon}>
                  <use href={sprite + "#icon-plus"} />
                </svg>
              </span>
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditColumnModal;*/
