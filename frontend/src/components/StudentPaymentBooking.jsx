import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import toast from 'react-hot-toast';
import styles from './styles/StudentPaymentBooking.module.css';

function StudentPaymentBooking() {
  const [studentData, setStudentData] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const { username } = useParams();
  const navigate = useNavigate();

  async function fetchStudentData() {
    try {
      if (!username) return;
      const response = await fetch(`http://localhost:3000/payment-booking/${username}`);
      const data = await response.json();
      setStudentData(data.student);
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [username]);

  const handleBookPaymentSched = async () => {
    try {
      if (!selectedDateTime) {
        toast.error('Please select a date and time for the payment schedule.');
        return;
      }

      const date = selectedDateTime.toISOString().split('T')[0];
      const time = selectedDateTime.toLocaleTimeString('en-US', { hour12: true });

      const response = await fetch(`http://localhost:3000/payment-booking/${username}/book-schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          time,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setTimeout(() => {
          navigate(`/payment-booking/${username}/payment-schedule`);
        }, 2000);
      } else {
        const responseData = await response.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('Error creating payment schedule:', error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {studentData.map((student, index) => (
        <div className={styles.leftContainer} key={index}>
          <p>
            <span className={styles.label}>Name: </span>
            <span className={styles.info}>{student.firstName} {student.lastName}</span>
          </p>
          <p>
            <span className={styles.label}>Student Number: </span>
            <span className={styles.info}>{student.studentId}</span>
          </p>
          <p>
            <span className={styles.label}>College: </span>
            <span className={styles.info}>{student.college}</span>
          </p>
          <p>
            <span className={styles.label}>Course: </span>
            <span className={styles.info}>{student.course}</span>
          </p>
          <p>
            <span className={styles.label}>Payment Info: </span>
          </p>
          <p className={styles.indent}>Total Number of Units: __ / 30</p>
          <p className={styles.indent}>Total Tuition Amount: Php ________</p>
        </div>
      ))}
      <div className={styles.rightContainer}>
        Please select preferred date for payment:
        <DateTimePicker
          className={styles.dateTimePicker}
          clearable
          defaultValue={null}
          placeholder="Pick date and time"
          onChange={setSelectedDateTime}
        />
        <Button
          size="md"
          variant="filled"
          color="gray"
          onClick={handleBookPaymentSched}
        >Book Payment Schedule
        </Button>
      </div>
    </div>
  );
}

export default StudentPaymentBooking;