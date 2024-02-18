import { useEffect, useState } from 'react';
import EnSysBanner from '../components/EnSysBanner';
import styles from '../styles/StudentSchedulePage.module.css';
import { Button } from '@mantine/core';
import { useParams } from 'react-router-dom';

function StudentSchedulePage() {
  const [studentData, setStudentData] = useState([]);
  const { id } = useParams();

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  async function fetchData() {
    try {
      if (!id) return;
      const response = await fetch(`http://localhost:3000/student-info/${id}`);
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <EnSysBanner />

      <div>
        <h2 className={styles.title}>
          Schedule for 1st Semester A.Y. {currentYear} - {nextYear}
        </h2>
        {studentData.student?.map((student, index) => (
          <div className={styles.studentInfoContainer} key={index}>
            <h3>
              <span className={styles.studentInfoTitle}>Name: </span>
              <span>
                {student.lastName}, {student.firstName}
              </span>
            </h3>
            <h3>
              <span className={styles.studentInfoTitle}>Student Number: </span>
              <span>{student.studentId}</span>
            </h3>
          </div>
        ))}
        <div className={styles.grid}>
          <div className={styles.scheduleContainer}>
            {studentData.student && studentData.student.length > 0 ? (
              studentData.student[0].subjects?.map((subject, index) => (
                <div className={styles.subjectContainer} key={index}>
                  <div className={styles.subjectInfoContainer}>
                    <h3>Subject: {subject?.subjectName}</h3>
                    <h3>Code: {subject.subjectCode}</h3>
                  </div>

                  <span>Units: {subject.units}</span>
                  <span>Schedule: {subject.date}</span>
                  <span>Time: {subject.time}</span>
                  <span>Instructor: {subject.instructor}</span>
                  <hr />
                </div>
              ))
            ) : (
              <h3>No subjects added yet</h3>
            )}
          </div>
          <div className={styles.unitContainer}>
            <h4>Total Number of Units</h4>
            <h4>0</h4>
            <h4>Maximum Number of Units</h4>
            <h4>30</h4>
          </div>
        </div>
        <Button className={styles.button} variant="filled" color="gray">
          Download Schedule
        </Button>
      </div>
    </>
  );
}

export default StudentSchedulePage;
