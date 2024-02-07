import {
  Button,
  Flex,
} from '@mantine/core';
import styles from './styles/AdminDashboard.module.css';

function AdminDashboard() {
  return (
    <div className={styles.adminDashboard}>
      <Flex
        mih={50}
        gap="sm"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Button
          className={styles.aDButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
        >Manage Subjects</Button>
        <br />
        <Button
          className={styles.aCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
        >Manage Professors</Button>
        <br />
        <Button
          className={styles.aCButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
        >View Payment Bookings</Button>
        <br />
        <Button
          className={styles.aBButton}
          size="lg"
          variant="filled"
          color="gray"
          fullWidth
        >Log Out</Button>
      </Flex >
    </div>
  );
}

export default AdminDashboard;