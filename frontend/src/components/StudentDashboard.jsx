import { Button, Flex } from '@mantine/core';
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
        const response = await fetch(
          `https://team-2-6ug6.onrender.com/${username}`
        );
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
      const response = await fetch(
        `https://team-2-6ug6.onrender.com/${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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

  const handleNavToSchedule = async () => {
    try {
      if (!username) return;
      const response = await fetch(
        `https://team-2-6ug6.onrender.com/${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.subjects.length > 0) {
          navigate(`/my-schedule/${username}`);
        } else {
          navigate(`/null-schedule/${username}`);
        }
      }
    } catch (error) {
      console.error('Error navigating to schedule:', error);
    }
  };

  const handleNavToSubjRegistration = () => {
    navigate(`/subject-registration/${username}`);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://team-2-6ug6.onrender.com/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.reload();
        }, 500);
        navigate('/');
      } else {
        const data = await response.json();
        console.error(
          'Error logging out:',
          data.error || 'An error occurred while logging out.'
        );
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
          onClick={handleNavToSubjRegistration}
        >
          Registration
        </Button>
        <br />
        <Button
          className={styles.sCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
          onClick={handleNavToSchedule}
        >
          View Schedule
        </Button>
        <br />
        <Button
          className={styles.sCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
          onClick={handleNavToPaymentBooking}
        >
          Payment Booking
        </Button>
        <br />
        <Button
          className={styles.sBButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Flex>
    </div>
  );
}

export default StudentDashboard;
