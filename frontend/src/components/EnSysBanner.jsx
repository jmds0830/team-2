import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Tooltip,
} from '@mantine/core';
import { IconSun, IconMoon, IconUserCircle } from '@tabler/icons-react';
import styles from './styles/EnSysBanner.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EnSysBanner() {
  const [imageSource, setImageSource] = useState('/images/ensys-black.png');
  const navigate = useNavigate();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const { username } = useParams();

  useEffect(() => {
    if (computedColorScheme === 'dark') {
      setImageSource('/images/ensys-animated.gif');
    } else {
      setImageSource('/images/ensys-black.png');
    }
  }, [computedColorScheme]);

  const handleReturnToHomePage = () => {
    if (!username) {
      navigate('/');
    } else {
      navigate(`/${username}`);
    }
  };

  const handleNavToStudentInfoPage = () => {
    navigate(`/student-info/${username}`);
  }

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContents}>
        <img
          src={imageSource}
          className={computedColorScheme === 'dark' ? styles.nameImageDark : styles.nameImage}
          onClick={() => handleReturnToHomePage()}
        />

        <div className={styles.toggleButton}>
          {username &&
            <ActionIcon
              autoContrast
              radius={'xl'}
              variant="default"
              size="sm"
            >
              <IconUserCircle
                className={styles.userIcon}
                stroke={1.5}
                onClick={handleNavToStudentInfoPage}
              />
            </ActionIcon>
          }
            <ActionIcon
              autoContrast
              radius={'xl'}
              onClick={() =>
                setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
              }
              variant="default"
              size="sm"
              aria-label="Toggle color scheme"
            >
              <div
                className={
                  computedColorScheme === 'light' ? styles.light : styles.dark
                }
              >
                <IconSun className={styles.icon} stroke={1.5} />
                <IconMoon
                  className={`${styles.icon} ${styles['icon-dark']}`}
                  stroke={1.5}
                />
              </div>
            </ActionIcon>
        </div>
      </div>
    </div>
  );
}

export default EnSysBanner;
