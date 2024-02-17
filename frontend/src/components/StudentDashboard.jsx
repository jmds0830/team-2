import {
  Button,
  Flex,
} from '@mantine/core';
import styles from './styles/StudentDashboard.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function StudentDashboard() {
  const [studentData, setStudentData] = useState([]);

  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudentData() {
      try {
        if (!username) return;
        const response = await fetch(`http://localhost:3000/${username}`);
        const data = await response.json();
        setStudentData(data.student);
      } catch (error) {
        console.error('Error fetching student info', error.message);
      }
    }

    fetchStudentData();
  }, [username]);

  const handleNavToPaymentBooking = async () => {
    try {
      if (!username) return;
  
      const response = await fetch(`http://localhost:3000/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Payment Schedule booked for student') {
          navigate(`/payment-booking/${username}/payment-schedule`);
        } else {
          navigate(`/payment-booking/${username}`);
        }
      }
    } catch (error) {
      console.error('Error navigating to payment booking:', error);
    }
  };

  const handleNavToSchedule = () => {
    navigate('/my-schedule/:id');
  }

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const data = await response.json();
        console.error('Error logging out:', data.error || 'An error occurred while logging out.');
        toast.error(data.error || 'An error occurred while logging out.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('An error occurred while logging out.');
    }
  };

  return (
    <div className={styles.studentDashboard}>
      <Flex
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Button
          className={styles.sDButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
        >Registration</Button>
        <br />
        <Button
          className={styles.sCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
          onClick={handleNavToSchedule}
        >View Schedule</Button>
        <br />
        <Button
          className={styles.sCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
          onClick={handleNavToPaymentBooking}
        >Payment Booking</Button>
        <br />
        <Button
          className={styles.sBButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
          onClick={handleClick}>Log Out</Button>
      </Flex >
    </div>
  );
}

export default StudentDashboard;