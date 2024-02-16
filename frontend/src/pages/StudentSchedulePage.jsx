import { useEffect, useState, useRef } from 'react';
import EnSysBanner from '../components/EnSysBanner';
import styles from '../styles/StudentSchedulePage.module.css';
import { Button } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';

function StudentShedulePage() {
  const [studentData, setStudentData] = useState([]);
  const { id } = useParams();

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  async function fetchStudentData() {
    try {
      if (!id) return;
      const response = await fetch(`http://localhost:3000/student-info/${id}`);
      const data = await response.json();
      setStudentData(data.student);
    } catch (error) {
      console.error('Error fetching student info', error.message);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id]);
  return (
    <>
      <EnSysBanner />

      <div>
        <h2 className={styles.title}>
          Schedule for 1st Semester A.Y. {currentYear} - {nextYear}
        </h2>
        {studentData.map((student, index) => (
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
          <div className={styles.scheduleContainer}></div>
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

export default StudentShedulePage;
