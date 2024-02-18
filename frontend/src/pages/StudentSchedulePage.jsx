import { useEffect, useState } from 'react';
import EnSysBanner from '../components/EnSysBanner';
import styles from '../styles/StudentSchedulePage.module.css';
import { Button } from '@mantine/core';
import { useParams } from 'react-router-dom';

function StudentSchedulePage() {
  const [studentData, setStudentData] = useState({});
  const { username } = useParams();

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  async function fetchData() {
    try {
      if (!username) return;
      const response = await fetch(
        `http://localhost:3000/subject-registration/${username}`
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

  return (
    <>
      <EnSysBanner />
      <div className={styles.mainContainer}>
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
                  <hr />
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
        <Button className={styles.button} variant="filled" color="gray">
          Download Schedule
        </Button>
      </div>
    </>
  );
}

export default StudentSchedulePage;
