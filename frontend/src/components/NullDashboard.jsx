import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  Input,
  Button,
  Flex,
} from '@mantine/core';
import { Modal } from 'antd';
import styles from './styles/NullDashboard.module.css';

function NullDashboard() {
  const initialFormData = {
    username: '',
    password: '',
  };
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const openModal = () => {
    setOpen(true);
    navigate('/login');
  };

  const closeModal = () => {
    setOpen(false);
    navigate('/');
    setFormData(initialFormData);
    setErrors({});
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();

      const updatedErrors = {};

      if (formData.username === '' && result.errors.username) {
        updatedErrors.username = result.errors.username;
      }

      if (formData.password === '' && result.errors.password) {
        updatedErrors.password = result.errors.password;
      }

      setErrors(updatedErrors);

      if (Object.keys(updatedErrors).length === 0) {
        setFormData(initialFormData);
        try {
          toast.success('Logged in successfully!');
          navigate('/');
          setOpen(false);
        } catch (error) {
          console.error('Error logging in:', error);
          toast.error('An error occurred while logging in.');
        }
      }
    } catch (error) {
      console.error('Error logging in.', error.message);
    }
  }

  const clearInputFields = () => {
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };

  const navigate = useNavigate();

  const handleNavToStudReg = () => {
    navigate('/register');
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
        const response = await fetch('http://localhost:3000/login', {
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
    <Flex
      mih={50}
      gap="sm"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Toaster position='top-center' />
      <div className={styles.loginContainer}>
        <Modal
          open={open}
          title="Log In"
          size="md"
          onCancel={closeModal}
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
              value={formData.username}
              name='username'
              size="md"
              radius="md"
              placeholder="username"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
            />
            <Input
              value={formData.password}
              name='password'
              size="md"
              radius="md"
              type="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
            />
            <Button
              size="md"
              variant="filled"
              color="gray"
              onClick={handleLogin}
            >Log In
            </Button>
          </Flex>
        </Modal>
        <Button
          size="lg"
          variant="filled"
          color="gray"
          onClick={openModal}
        >Log In
        </Button>
      </div>
      <div className={styles.studentRegContainer}>
        <h3>New student? Sign Up here:</h3>
        <Button
          size="lg"
          variant="filled"
          color="gray"
          onClick={() => handleNavToStudReg()}
        >Create Account</Button>
      </div>
      <div className={styles.adminRegContainer}>
        <h3>School Admin?</h3>
        <Button
          size="lg"
          variant="filled"
          color="gray"
        >Setup Account</Button>
      </div>
    </Flex>
  );
}

export default NullDashboard;