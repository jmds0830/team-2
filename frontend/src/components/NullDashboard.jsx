import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Flex, TextInput, PasswordInput, Tooltip } from '@mantine/core';
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

  const { username } = useParams();
  const navigate = useNavigate();

  const handleNavToStudReg = () => {
    navigate('/register');
  };

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
      const response = await fetch('https://team-2-6ug6.onrender.com/login', {
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

      if (response.ok) {
        const { username } = result.user;
        toast.success('Logged in successfully!');
        setOpen(false);
        setFormData(initialFormData);
        setErrors({});
        navigate(`/${username}`);
      } else {
        toast.error(result.message || 'An error occurred while logging in.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred while logging in.');
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors({});
  };

  const handleBlur = async (name, value) => {
    if (value.trim() === '') {
      try {
        const response = await fetch('https://team-2-6ug6.onrender.com/login', {
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

  const isLoginDisabled = formData.username === '' || formData.password === '';

  return (
    <Flex
      mih={50}
      gap="sm"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
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
            <TextInput
              className={styles.input}
              value={formData.username}
              name="username"
              placeholder="username"
              onChange={(event) =>
                handleChange(event.target.name, event.target.value)
              }
              onBlur={() => handleBlur('username', formData.username)}
              error={errors.username}
              size="md"
            />
            <PasswordInput
              className={styles.input}
              value={formData.password}
              name="password"
              placeholder="password"
              onChange={(event) =>
                handleChange(event.target.name, event.target.value)
              }
              onBlur={() => handleBlur('password', formData.password)}
              error={errors.password}
              size="md"
            />
            <Button
              size="md"
              variant="filled"
              color="gray"
              disabled={isLoginDisabled}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Flex>
        </Modal>
        <Button size="lg" variant="filled" color="gray" onClick={openModal}>
          Log In
        </Button>
      </div>
      <div className={styles.studentRegContainer}>
        <h3>New student? Sign Up here:</h3>
        <Button
          size="lg"
          variant="filled"
          color="gray"
          onClick={() => handleNavToStudReg()}
        >
          Create Account
        </Button>
      </div>
      <div className={styles.adminRegContainer}>
        <h3>School Admin?</h3>
        <Tooltip label="Feature coming soon!">
          <Button data-disabled size="lg" variant="filled" color="gray">
            Setup Account
          </Button>
        </Tooltip>
      </div>
    </Flex>
  );
}

export default NullDashboard;
