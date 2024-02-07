import {
  Button,
  Flex,
} from '@mantine/core';
import styles from './styles/StudentDashboard.module.css';

function StudentDashboard() {
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
        >View Schedule</Button>
        <br />
        <Button
          className={styles.sCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
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