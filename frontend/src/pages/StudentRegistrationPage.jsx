import React from 'react';
import {
  Input,
  Checkbox,
  Button,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon, IconChevronDown } from '@tabler/icons-react';
import styles from '../styles/StudentRegistrationPage.module.css';

function StudentRegistrationPage() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <>
      <div className={styles.toggleButton}>
        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
          }
          variant="default"
          size="xl"
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

      <div className={styles.studentInfoContainer}>
        <h2 className={styles.title}>Student Information Sheet</h2>
        <div className={styles.nameContainer}>
          <p>First Name:</p>
          <Input
            className={styles.firstNameInput}
            radius="md"
            placeholder="Input first name"
          />
          <p>Last Name:</p>
          <Input
            className={styles.lastNameInput}
            radius="md"
            placeholder="Input last name"
          />
        </div>

        <div className={styles.courseContainer}>
          <p>Course:</p>
          <Input
            className={styles.courseInput}
            component="select"
            rightSection={<IconChevronDown size={14} stroke={1.5} />}
            pointer
            mt="md"
          >
            <option value="civil">BS Civil Engineering</option>
            <option value="information">BS Information Technology</option>
            <option value="entrep">BS Entrepreneurship</option>
          </Input>
          <p>Email:</p>
          <Input
            className={styles.emailInput}
            radius="md"
            placeholder="Input email"
          />
        </div>
        <div className={styles.usernameContainer}>
          <p>Username:</p>
          <Input
            className={styles.usernameInput}
            radius="md"
            placeholder="Input username"
          />
        </div>
        <div className={styles.checkboxContainer}>
          <Checkbox
            className={styles.checkbox}
            label="I hereby declare that the above-stated information is true to the best of my knowledge and belief."
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="filled">Submit</Button>
        </div>
      </div>
    </>
  );
}

export default StudentRegistrationPage;
