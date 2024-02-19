import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Flex,
} from '@mantine/core';
import styles from '../components/styles/NullPaymentBooking.module.css';
import { Toaster } from 'react-hot-toast';
import EnSysBanner from '../components/EnSysBanner';

function NullPaymentBooking() {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleNavToSubjReg = () => {
    navigate(`/subject-registration/${username}`);
  }

  return (
    <div>
      <Toaster position="top-center" />
      <EnSysBanner />
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
            View Schedule is available after adding subjects to your schedule
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
    </div>
  );
}

export default NullPaymentBooking;