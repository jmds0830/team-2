import {
  Button,
  Flex,
} from '@mantine/core';
import styles from './styles/StudentDashboard.module.css';
import { useNavigate } from 'react-router';

function StudentDashboard() {
  const navigate = useNavigate();

  const handleNavToPaymentBooking = () => {
    navigate('/payment-booking/:id');
  }

  const handleNavToSchedule = () => {
    navigate('/my-schedule/:id');
  }

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
        >Log Out</Button>
      </Flex >
    </div>
  );
}

export default StudentDashboard;