import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import styles from './styles/EnSysBanner.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnSysBanner() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const [imageSource, setImageSource] = useState('images/ensys-black.png');
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    navigate('/');
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContents}>
        <img 
          src={imageSource} 
          className={styles.nameImage}
          onClick={() =>
            handleReturnToHomePage()
          } />
        <div className={styles.toggleButton}>
          <ActionIcon
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
              <IconSun
                className={styles.icon}
                stroke={1.5}
                onClick={() => setImageSource('images/ensys.png')}
              />
              <IconMoon
                className={`${styles.icon} ${styles['icon-dark']}`}
                stroke={1.5}
                onClick={() => setImageSource('images/ensys-black.png')}
              />
            </div>
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}

export default EnSysBanner;