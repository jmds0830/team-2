import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid } from '@mantine/core';
import styles from './styles/StudentPaymentBooking.module.css';

function StudentPaymentBooking() {
  const [studentData, setStudentData] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchStudentData() {
    try {
      if (!id) return;
      const response = await fetch(`http://localhost:3000/payment-booking/${id}`);
      const data = await response.json();
      setStudentData(data.student);
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  return (
    <div>
      {studentData.map((student, index) => (
        <div className={styles.mainContainer}>
          <div className={styles.rightContainer}>
            <Grid className={styles.grid} cols={2}>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Name: </span>
                <span className={styles.info}>{student.firstName} {student.lastName}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Student Number: </span>
                <span className={styles.info}>{student.studentId}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>College: </span>
                <span className={styles.info}>{student.college}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Course: </span>
                <span className={styles.info}>{student.course}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Payment Info: </span>
                  <Grid.Col className={styles.grid} span={5.5}>
                    <span>Total Number of Units: </span>
                    <span> / 30</span>
                  </Grid.Col>
                  <Grid.Col className={styles.grid} span={5.5}>
                    <span>Total Tuition Amount: </span>
                    <span>Php </span>
                  </Grid.Col>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentPaymentBooking;