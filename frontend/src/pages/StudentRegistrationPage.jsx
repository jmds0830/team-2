import { useState, useEffect } from 'react';
import { Input, Checkbox, Button, FileInput } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import styles from '../styles/StudentRegistrationPage.module.css';
import EnSysBanner from '../components/enSysBanner';
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
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      handleSubmit(id);
    }
  }, [id]);

  async function handleSubmit() {
    try {
      if (errors.email && errors.email === 'Invalid email format') {
        return;
      }

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
          photo: formData.photo,
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

      if (formData.accept === false) {
        updatedErrors.accept = result.errors.accept;
      }

      // if (formData.image === null && result.errors.image) {
      //   updatedErrors.image = result.errors.image;
      // }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setFormData(initialFormData);
        try {
          toast.success('Success! Your form was submitted successfully.');
          setTimeout(() => {
            navigate(`/student-info/${result.newStudent.studentId}`);
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

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({ ...prevData, image: file }));
  //   }
  // };

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
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Invalid email format',
      }));
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
          <Input.Wrapper
            className={styles.usernameInput}
            error={errors.username}
          >
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
          <Button variant="filled" color="gray" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default StudentRegistrationPage;
