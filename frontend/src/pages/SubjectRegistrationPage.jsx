import EnSysBanner from '../components/EnSysBanner';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import styles from '../styles/SubjectRegistrationPage.module.css';
import { Button, Card } from '@mantine/core';
import { useParams } from 'react-router-dom';

function SubjectRegistrationPage() {
  const [subjectData, setSubjectData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { username } = useParams();

  async function fetchSubjectData() {
    try {
      const response = await fetch('http://localhost:3000/admin/all-subjects');
      const data = await response.json();
      setSubjectData(data);
    } catch (error) {
      console.error('Error fetching subjects', error.message);
    }
  }

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const filteredSubjects = subjectData.filter(
    (subject) =>
      subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const isSubjectAdded = (subjectCode) => {
    return studentData.student.subjects.some(
      (subject) => subject.subjectCode === subjectCode
    );
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  const handleAdd = async (subject) => {
    try {
      const response = await fetch(
        `http://localhost:3000/subject-registration/${username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            units: subject.units,
            date: subject.date,
            time: subject.time,
            instructor: subject.instructor,
            slots: subject.slots,
          }),
        }
      );
      toast.success('Subject successfully added.');
      fetchData();
    } catch (error) {
      console.error('Error adding subjects', error.message);
    }
  };

  const handleRemove = async (subject) => {
    try {
      const response = await fetch(
        `http://localhost:3000/subject-registration/${username}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            units: subject.units,
            date: subject.date,
            time: subject.time,
            instructor: subject.instructor,
            slots: subject.slots,
          }),
        }
      );
      toast.success('Subject successfully removed.');
      fetchData();
    } catch (error) {
      console.error('Error adding subjects', error.message);
    }
  };

  let totalUnits = 0;
  let totalAmount = 0;
  let miscellaneousFee = 1902.24;

  if (studentData && studentData.student && studentData.student.subjects) {
    const subjects = studentData.student.subjects;

    for (let i = 0; i < subjects.length; i++) {
      totalUnits += subjects[i].units;
      totalAmount = totalUnits * 1000 + miscellaneousFee;
      totalAmount = totalAmount.toFixed(2);
    }
  }

  return (
    <div>
      <Toaster position="top-center" />
      <EnSysBanner />
      <div className={styles.mainContainer}>
        <div className={styles.subjectContainer}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search subject name or subject code"
            value={searchQuery}
            onChange={handleChange}
          />
          <div className={styles.subjectListerContainer}>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject, index) => (
                <div className={styles.subjectLister} key={index}>
                  <div className={styles.subjectInfoContainer}>
                    <span>
                      Subject:{' '}
                      <span className={styles.name}>{subject.subjectName}</span>
                    </span>
                    <span>Code: {subject.subjectCode}</span>
                    <span>Units {subject.units}</span>
                    <span>Schedule: {subject.date}</span>
                    <span>Time: {subject.time}</span>
                    <span>Instructor: {subject.instructor}</span>
                    <span>Available Slots: {subject.slots}</span>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      variant="filled"
                      color="gray"
                      onClick={() => handleAdd(subject)}
                      disabled={isSubjectAdded(subject.subjectCode)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="filled"
                      color="gray"
                      onClick={() => handleRemove(subject)}
                      disabled={!isSubjectAdded(subject.subjectCode)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <h3>No matching subjects</h3>
            )}
          </div>
        </div>

        <div className={styles.subContainer}>
          <div className={styles.studentNameContainer}>
            <h3 className={styles.studentName}>
              {studentData.student?.firstName}'s Subjects
            </h3>
          </div>

          <div className={styles.scheduleContainer}>
            {studentData.student &&
            studentData.student.subjects &&
            studentData.student.subjects.length > 0 ? (
              studentData.student.subjects.map((subject, index) => (
                <div className={styles.studentSubjectContainer} key={index}>
                  <div className={styles.studentSubjectInfo}>
                    <span>
                      Subject:{' '}
                      <span className={styles.name}>{subject.subjectName}</span>
                    </span>
                    <span>Code: {subject.subjectCode}</span>
                    <span>Units: {subject.units}</span>
                  </div>
                  <div className={styles.studentSubjectInfo}>
                    <span>Schedule: {subject.date}</span>
                    <span>Time: {subject.time}</span>
                    <span>Instructor: {subject.instructor}</span>
                  </div>
                  <div className={styles.studentSubjectInfo}>
                    <Button
                      className={styles.subjectRemove}
                      variant="filled"
                      color="gray"
                      onClick={() => handleRemove(subject)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <h3>No subjects added yet</h3>
            )}
          </div>

          <div className={styles.paymentInfoContainer}>
            <p>
              Miscellaneous Fee:{' '}
              <span className={styles.name}>₱{miscellaneousFee}</span>
            </p>
            <p>
              Total Units: <span className={styles.name}>{totalUnits}</span>
            </p>
            <p>
              Total Amount: <span className={styles.name}>₱{totalAmount}</span>
            </p>
            <Button variant="filled" color="gray">
              Go to Payment Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectRegistrationPage;
