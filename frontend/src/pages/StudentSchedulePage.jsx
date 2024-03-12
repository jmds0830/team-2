import { useEffect, useState } from 'react';
import EnSysBanner from '../components/EnSysBanner';
import styles from '../styles/StudentSchedulePage.module.css';
import { Button } from '@mantine/core';
import { useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function StudentSchedulePage() {
  const [studentData, setStudentData] = useState({});
  const { username } = useParams();

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  async function fetchData() {
    try {
      if (!username) return;
      const response = await fetch(
        `https://team-2-6ug6.onrender.com/subject-registration/${username}`
      );
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  let totalUnits = 0;

  if (studentData && studentData.student && studentData.student.subjects) {
    const subjects = studentData.student.subjects;

    for (let i = 0; i < subjects.length; i++) {
      totalUnits += subjects[i].units;
    }
  }

  useEffect(() => {
    fetchData();
  }, [username, fetchData]);

  function downloadPDF() {
    setTimeout(() => {
      const mainContainer = document.querySelector(`.${styles.mainContainer}`);
      const scheduleContainer = document.querySelector(
        `.${styles.scheduleContainer}`
      );
      const button = document.querySelector(`.${styles.button}`);

      const totalHeight = scheduleContainer.scrollHeight;
      button.style.display = 'none';
      scheduleContainer.style.height = totalHeight + 'px';
      mainContainer.style.marginTop = -80 + 'px';
      mainContainer.style.color = 'black';

      html2pdf()
        .from(mainContainer)
        .set({
          margin: 0.3,
          filename: 'student_schedule.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .save()
        .then(() => {
          scheduleContainer.style.height = '';
          mainContainer.style.marginTop = '';
          mainContainer.style.color = '';
          button.style.display = '';
        });
    }, 100);
  }

  return (
    <>
      <EnSysBanner />
      <div id="contentToConvert" className={styles.mainContainer}>
        <h2 className={styles.title}>
          Schedule for 1st Semester A.Y. {currentYear} - {nextYear}
        </h2>
        {studentData.student && (
          <div className={styles.studentInfoContainer}>
            <h3>
              <span className={styles.studentInfoTitle}>Name: </span>
              <span>
                {studentData.student.lastName}, {studentData.student.firstName}
              </span>
            </h3>
            <h3>
              <span className={styles.studentInfoTitle}>Student Number: </span>
              <span>{studentData.student.studentId}</span>
            </h3>
          </div>
        )}
        <div className={styles.grid}>
          <div className={styles.scheduleContainer}>
            {studentData.student && studentData.student.subjects?.length > 0 ? (
              studentData.student.subjects?.map((subject, index) => (
                <div className={styles.subjectContainer} key={index}>
                  <div className={styles.subjectInfoContainer}>
                    <span>
                      Subject:{' '}
                      <span className={styles.name}>
                        {subject?.subjectName}
                      </span>
                    </span>
                    <span>Code: {subject.subjectCode}</span>
                  </div>

                  <span>Units: {subject.units}</span>
                  <span>Schedule: {subject.date}</span>
                  <span>Time: {subject.time}</span>
                  <span>Instructor: {subject.instructor}</span>
                </div>
              ))
            ) : (
              <h3>No subjects added yet</h3>
            )}
          </div>
          <div className={styles.unitContainer}>
            <h4>Total Number of Units</h4>
            <h4>{totalUnits}</h4>
            <h4>Maximum Number of Units</h4>
            <h4>30</h4>
          </div>
        </div>
        <Button
          className={styles.button}
          variant="filled"
          color="gray"
          onClick={downloadPDF}
        >
          Download Schedule
        </Button>
      </div>
    </>
  );
}

export default StudentSchedulePage;
