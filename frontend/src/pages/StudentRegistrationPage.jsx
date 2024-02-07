import React, { useState } from 'react';
import { Input, Checkbox, Button, useComputedColorScheme } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import styles from '../styles/StudentRegistrationPage.module.css';
import EnSysBanner from '../components/enSysBanner';
import toast, { Toaster } from 'react-hot-toast';

function StudentRegistrationPage() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    course: '',
    email: '',
    username: '',
    accept: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  async function handleSubmit() {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          course: formData.course,
          email: formData.email,
          username: formData.username,
          accept: formData.accept,
        }),
      });

      const result = await response.json();

      if (result.message === 'Error! Username already exists.') {
        await toast.promise(
          fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: formData.username,
            }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Username already exists.');
            }
            return response.json();
          }),
          {
            error: 'Username already exists. Please input a different one.',
          }
        );
        // toast.error('Username already exists. Please input a different one.');
        return;
      }

      if (result.message === 'Error! Email already exists.') {
        await toast.promise(
          fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
            }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Email already exists.');
            }
            return response.json();
          }),
          {
            error: 'Email already exists. Please input a different one.',
          }
        );
        // toast.error('Email already exists. Please input a different one.');
        return;
      }

      const updatedErrors = {};

      if (formData.firstName === '' && result.errors.firstName) {
        updatedErrors.firstName = result.errors.firstName;
      }

      if (formData.lastName === '' && result.errors.lastName) {
        updatedErrors.lastName = result.errors.lastName;
      }

      if (formData.course === '' && result.errors.course) {
        updatedErrors.course = result.errors.course;
      }

      if (formData.email === '' && result.errors.email) {
        updatedErrors.email = result.errors.email;
      }

      if (formData.username === '' && result.errors.username) {
        updatedErrors.username = result.errors.username;
      }

      if (!formData.accept) {
        updatedErrors.accept = result.errors.accept;
      }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setFormData(initialFormData);
        try {
          await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
            }),
          });
          toast.success('Success! Your form was submitted successfully.');
        } catch (error) {
          console.error('Error submitting form:', error);
          toast.error('An error occurred while submitting the form.');
        }
      }
    } catch (error) {
      console.error('Error creating profile.', error.message);
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;

    if (value.trim() === '') {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [name]: value,
          }),
        });

        const result = await response.json();

        if (result.errors && result.errors[name]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: result.errors[name],
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <EnSysBanner />
      <Toaster />

      <div className={styles.studentInfoContainer}>
        <h2 className={styles.title}>Student Information Sheet</h2>
        <div className={styles.nameContainer}>
          <p>First Name:</p>
          <Input.Wrapper
            className={styles.firstNameInput}
            error={errors.firstName}
          >
            <Input
              radius="md"
              placeholder="Input first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Input.Wrapper>
          <p>Last Name:</p>
          <Input.Wrapper
            className={styles.lastNameInput}
            error={errors.lastName}
          >
            <Input
              radius="md"
              placeholder="Input last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Input.Wrapper>
        </div>
        <div className={styles.courseContainer}>
          <p>Course:</p>
          <Input.Wrapper className={styles.courseInput} error={errors.course}>
            <Input
              component="select"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
              pointer
              mt="md"
              name="course"
              value={formData.course}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" selected disabled>
                Select a course
              </option>
              <option value="civil">BS Civil Engineering</option>
              <option value="information">BS Information Technology</option>
              <option value="entrep">BS Entrepreneurship</option>
            </Input>
          </Input.Wrapper>
          <p>Email:</p>
          <Input.Wrapper className={styles.emailInput} error={errors.email}>
            <Input
              radius="md"
              placeholder="Input email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Input.Wrapper>
        </div>
        <div className={styles.usernameContainer}>
          <p>Username:</p>
          <Input.Wrapper className={styles.emailInput} error={errors.username}>
            <Input
              className={styles.usernameInput}
              radius="md"
              placeholder="Input username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Input.Wrapper>
        </div>
        <div className={styles.checkboxContainer}>
          <Checkbox
            className={styles.checkbox}
            label="I hereby declare that the above-stated information is true to the best of my knowledge and belief."
            error={errors.accept}
            name="accept"
            value={formData.accept}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="filled" color="gray" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default StudentRegistrationPage;
