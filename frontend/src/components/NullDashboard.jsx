import { useState, useRef } from 'react';
import {
  Input,
  Button,
  Flex,
} from '@mantine/core';
import { Modal } from 'antd';
import styles from './styles/NullDashboard.module.css';

function NullDashboard() {
  const [open, setOpen] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    clearInputFields();
  };

  const clearInputFields = () => {
    usernameRef.current.value = '';
    passwordRef.current.value = '';
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
      <div className={styles.loginContainer}>
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
              placeholder="username"
              ref={usernameRef}
            />
            <Input
              size="md"
              radius="md"
              type="password"
              placeholder="password"
              ref={passwordRef}
            />
            <Button
              size="md"
              variant="filled"
              color="gray"
            >Log In
            </Button>
          </Flex>
        </Modal>
        <Button
          size="lg"
          variant="filled"
          color="gray"
          onClick={showModal}
        >Log In
        </Button>
      </div>
      <div className={styles.studentRegContainer}>
        <h3>New student? Sign Up here:</h3>
        <Button
          size="lg"
          variant="filled"
          color="gray"
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