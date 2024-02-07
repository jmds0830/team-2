import { useState } from 'react';
import {
  Input,
  Button,
  Flex,
} from '@mantine/core';
import { Modal } from 'antd';
import styles from '../styles/HomePage.module.css';
import EnSysBanner from '../components/enSysBanner';
import NullDashboard from '../components/NullDashboard';
import StudentDashboard from '../components/StudentDashboard';
import AdminDashboard from '../components/AdminDashboard';

function HomePage() {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <EnSysBanner />
      <Modal
        open={open}
        title="Log In"
        size="md"
        onCancel={handleCancel}
        footer={[]}
        width={300}
      >
        <Flex
          gap="xl"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
          }}
        >
          <Input
            size="md"
            radius="md"
            placeholder="username" />
          <Input
            size="md"
            radius="md"
            type="password"
            placeholder="password" />
          <Button
            size="md"
            variant="filled"
            color="gray"
          >Log In
          </Button>
        </Flex>
      </Modal>
      <Button
        className={styles.loginButton}
        size="md"
        variant="filled"
        color="gray"
        onClick={showModal}
      >Log In
      </Button>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.announcementContainer}>
            <h1>This is a placeholder for school announcements</h1>
            <p>EnSys is now up and running! You can now enroll and book your payment schedules online!</p>
          </div>
          <div className={styles.appIntroContainer}>
            <img src='/images/ensys-black.png' className={styles.articleImage} />
            <p>EnSys is an online enrollment system for students.
              Created in 2024, Ensys aims to provide a covenient registration process
              for students. It allows students to use their online school accounts
              to manage their subjects and book payment schedules anywhere with internet access.</p>
          </div>
          <div className={styles.appInstructionsContainer}>
            <h1>How to Use EnSys</h1>
            <p>Trouble using EnSys? Click the link to read the EnSys manual.</p>
          </div>
        </div>
        <NullDashboard />
      </div>
    </div>
  );
}

export default HomePage;
