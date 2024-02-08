import { useState, useEffect } from 'react';
import { Grid, Image, Button } from '@mantine/core';
import { useParams } from 'react-router-dom';
import EnSysBanner from '../components/enSysBanner';
import styles from '../styles/StudentInfo.module.css';

function StudentInfoPage() {
  const [studentData, setStudentData] = useState([]);
  const { id } = useParams();

  async function fetchStudentData() {
    try {
      if (!id) return;
      const response = await fetch(`http://localhost:3000/student-info/${id}`);
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student info:', error.message);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  return (
    <>
      <EnSysBanner />
      <div>
        {studentData?.student?.map((student, index) => (
          <div className={styles.studentInfoContainer} key={index}>
            <div className={styles.title}>
              <h2>Student Information</h2>
              <Image
                radius="md"
                src={null}
                h={150}
                w={150}
                fallbackSrc="https://placehold.co/600x400?text=Student Photo"
              />
            </div>
            <Grid className={styles.grid} cols={2}>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>First Name: </span>
                <span className={styles.info}>{student.firstName}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Last Name: </span>
                <span className={styles.info}>{student.lastName}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span> Course: </span>
                <span className={styles.info}>{student.course}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>College: </span>
                <span className={styles.info}>{student.college}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Student Number: </span>
                <span className={styles.info}>{student.studentId}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Email: </span>
                <span className={styles.info}>{student.email}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Username: </span>
                <span className={styles.info}>{student.username}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Password: </span>
                <span className={styles.info}>{student.password}</span>
                <Button variant="filled" color="gray">
                  Change Password
                </Button>
              </Grid.Col>
            </Grid>
            <div className={styles.buttonContainer}>
              <Button variant="filled" color="gray">
                Edit Information
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudentInfoPage;
