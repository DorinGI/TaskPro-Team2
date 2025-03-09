import React, { useState } from 'react';
import data from '../background.json';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { selectCurrentDashboard } from 'redux/dashboards/dashboardsSelectors';
import { editDashboard } from 'redux/dashboards/dashboardsOperations';
import { selectPriority } from 'redux/dashboards/dashboardsSlice';
import styles from './FiltersModal.module.css'; // Import CSS module

const options = ['without', 'low', 'medium', 'high'];

const FiltersModal = () => {
  const dispatch = useDispatch();
  const currentDashboard = useSelector(selectCurrentDashboard);
  const [selectedBg, setSelectedBg] = useState(currentDashboard?.backgroundURL || '');

  const handleBgSelection = (url) => {
    setSelectedBg(url);
    dispatch(
      editDashboard({
        dashboardId: currentDashboard._id,
        updatedData: { backgroundURL: url },
      })
    );
  };

  return (
    <div className={styles.filtersModal__section}>
      <div className={styles.filtersModal__sectionTitle}>Filters</div>

      <Formik
        initialValues={{ priority: 'show all' }}
        onSubmit={() => {}} // Empty submission since we're using dispatch
      >
        {({ values, setFieldValue }) => (
          <div className={styles.filtersModal__modalForm}>
            {/* Background Selection */}
            <div className={styles.filtersModal__formWrapper}>
              <div className={styles.filtersModal__formTitle}>Backgrounds</div>
              <div className={styles.filtersModal__bgWrapper}>
                {data.map((bg, idx) => (
                  <div
                    key={idx}
                    className={styles.filtersModal__bgItem}
                    onClick={() => handleBgSelection(bg.url)}
                    style={{
                      borderColor: selectedBg === bg.url ? 'var(--modal-accent-color)' : 'transparent',
                    }}
                  >
                    {bg.url && (
                      <div
                        className={styles.filtersModal__customRadioBtn}
                        style={{ backgroundImage: `url(${bg.url})` }}
                      />
                    )}
                    <Field
                      type="radio"
                      name="background"
                      value={bg.url}
                      checked={selectedBg === bg.url}
                      className={styles.filtersModal__hiddenInput}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className={styles.filtersModal__formWrapper}>
              <div className={styles.filtersModal__formTitle}>Label Color</div>
              <div className={styles.filtersModal__showAllLabel} 
                   onClick={() => {
                     setFieldValue('priority', 'show all');
                     dispatch(selectPriority('show all'));
                   }}>
                Show all
              </div>

              <div className={styles.filtersModal__radioBtnWrapper}>
                {options.map((priority, idx) => (
                  <div key={idx} className={styles.filtersModal__priorityWrapper}>
                    <div 
                      className={`${styles.filtersModal__priorityLabel} ${values.priority === priority ? 'active' : ''}`}
                      onClick={() => {
                        setFieldValue('priority', priority);
                        dispatch(selectPriority(priority));
                      }}
                    >
                      <div 
                        className={`${styles.filtersModal__priorityDot} ${styles[`filtersModal__priorityDot--${priority}`]}`}
                      />
                      <Field 
                        type="radio" 
                        name="priority" 
                        value={priority} 
                        checked={values.priority === priority}
                        className={styles.filtersModal__hiddenInput}
                      />
                    </div>
                    
                    <div 
                      className={`${styles.filtersModal__priorityText} ${values.priority === priority ? 'active' : ''}`}
                    >
                      {priority === 'without' 
                        ? 'Without priority'
                        : priority[0].toUpperCase() + priority.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default FiltersModal;