import { useState, useEffect } from 'react';
import { Input, Checkbox, Button, FileInput } from '@mantine/core';
import { IconChevronDown, IconExclamationCircle } from '@tabler/icons-react';
import styles from '../styles/StudentRegistration.module.css';
import EnSysBanner from '../components/EnSysBanner';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      handleSubmit(username);
    }
  }, [username]);

  async function handleSubmit() {
    try {
      if (errors.email && errors.email === 'Invalid email format') {
        return;
      }

      const response = await fetch(
        'https://team-2-6ug6.onrender.com/register',
        {
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
            photo: formData.photo,
          }),
        }
      );

      const result = await response.json();

      if (result.message === 'Error! Username already exists.') {
        await toast.promise(
          fetch('https://team-2-6ug6.onrender.com/register', {
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
        return;
      }

      if (result.message === 'Error! Email already exists.') {
        await toast.promise(
          fetch('https://team-2-6ug6.onrender.com/register', {
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

      if (errors.email === 'Invalid email format') {
        updatedErrors.email = errors.email;
      }

      if (formData.username === '' && result.errors.username) {
        updatedErrors.username = result.errors.username;
      }

      if (formData.username.length < 4) {
        updatedErrors.username = result.errors.username;
      }

      if (formData.accept === false) {
        updatedErrors.accept = result.errors.accept;
      }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setFormData(initialFormData);
        try {
          toast.success('Success! Your form was submitted successfully.');
          setTimeout(() => {
            navigate(`/student-info/${result.newStudent.username}`);
          }, 2000);
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
        const response = await fetch(
          'https://team-2-6ug6.onrender.com/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              [name]: value,
            }),
          }
        );

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
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Invalid email format',
      }));
    } else if (name === 'username' && value.length < 4) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Minimum of 4 characters',
      }));
      console.log('error: Invalid username format');
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  return (
    <>
      <EnSysBanner />
      <Toaster />

      <div className={styles.studentInfoContainer}>
        <div className={styles.topInfo}>
          <h2>Student Information Sheet</h2>
          <FileInput
            accept="image/png,image/jpeg"
            placeholder="Upload Photo"
            name="photo"
            type="file"
            error={errors.photo}
          />
        </div>

        <div className={styles.nameContainer}>
          <p>First Name:</p>
          <Input.Wrapper
            className={styles.firstNameInput}
            error={errors.firstName}
          >
            <Input
              placeholder="Input first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              rightSectionPointerEvents="none"
              rightSection={
                errors.firstName && (
                  <IconExclamationCircle
                    style={{ width: 20, height: 20 }}
                    color="var(--mantine-color-error)"
                  />
                )
              }
            />
          </Input.Wrapper>
          <p>Last Name:</p>
          <Input.Wrapper
            className={styles.lastNameInput}
            error={errors.lastName}
          >
            <Input
              placeholder="Input last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              rightSectionPointerEvents="none"
              rightSection={
                errors.lastName && (
                  <IconExclamationCircle
                    style={{ width: 20, height: 20 }}
                    color="var(--mantine-color-error)"
                  />
                )
              }
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
              <option value="" disabled>
                Select a course
              </option>
              <option value="BS Civil Engineering">BS Civil Engineering</option>
              <option value="BS Information Technology">
                BS Information Technology
              </option>
              <option value="BS Entrepreneurship">BS Entrepreneurship</option>
            </Input>
          </Input.Wrapper>
          <p>Email:</p>
          <Input.Wrapper className={styles.emailInput} error={errors.email}>
            <Input
              placeholder="Input email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              rightSectionPointerEvents="none"
              rightSection={
                errors.email && (
                  <IconExclamationCircle
                    style={{ width: 20, height: 20 }}
                    color="var(--mantine-color-error)"
                  />
                )
              }
            />
          </Input.Wrapper>
        </div>
        <div className={styles.usernameContainer}>
          <p>Username:</p>
          <Input.Wrapper
            className={styles.usernameInput}
            error={errors.username}
          >
            <Input
              placeholder="Input username"
              name="username"
              maxLength="15"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              rightSectionPointerEvents="none"
              rightSection={
                errors.username && (
                  <IconExclamationCircle
                    style={{ width: 20, height: 20 }}
                    color="var(--mantine-color-error)"
                  />
                )
              }
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
          <Button variant="filled" color="gray" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default StudentRegistrationPage;
