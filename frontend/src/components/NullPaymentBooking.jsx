import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Flex,
} from '@mantine/core';
import styles from './styles/NullPaymentBooking.module.css';

function NullPaymentBooking() {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleNavToSubjReg = () => {
    navigate(`/subject-registration/${username}`);
  }

  return (
    <Flex
      gap="xl"
      justify="center"
      align="center"
      direction="column"
    >
      <div className={styles.container} >
      <img className={styles.uhOhImg} src='/images/uh-oh.gif' />
      <h1
        className={styles.pageMessage}
      >
        Payment Booking is available after adding subjects to your schedule
      </h1>
      </div>
      <Button
        size="md"
        variant="filled"
        color="gray"
        onClick={handleNavToSubjReg}
      >Go to Subject Registration
      </Button>
    </Flex>
  );
}

export default NullPaymentBooking;