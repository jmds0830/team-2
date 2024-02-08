import { useState, useEffect } from 'react';
import {
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import styles from '../styles/HomePage.module.css';
import EnSysBanner from '../components/enSysBanner';
import NullDashboard from '../components/NullDashboard';
import StudentDashboard from '../components/StudentDashboard';
import AdminDashboard from '../components/AdminDashboard';

function HomePage() {
  const [imageSource, setImageSource] = useState('images/ensys-black.png');

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (computedColorScheme === 'dark') {
      setImageSource('images/ensys.png');
    } else {
      setImageSource('images/ensys-black.png');
    }
  }, [computedColorScheme]);

  return (
    <div>
      <EnSysBanner />
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.announcementContainer}>
            <h1>This is a placeholder for school announcements</h1>
            <p>EnSys is now up and running! You can now enroll and book your payment schedules online!</p>
          </div>
          <div className={styles.appIntroContainer}>
            <img src={imageSource} className={styles.articleImage} />
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
