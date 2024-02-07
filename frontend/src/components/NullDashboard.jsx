import {
  Input,
  Button,
  Flex,
} from '@mantine/core';
import styles from './styles/NullDashboard.module.css';

function NullDashboard() {
  return ( 
    <Flex
          mih={50}
          gap="sm"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <div className={styles.studentRegContainer}>
            <h3>New student? Sign Up here:</h3>
            <Input
              size="lg"
              radius="md"
              placeholder="username"
            />
            <br />
            <Input
              size="lg"
              radius="md"
              placeholder="youremail@mail.com"
            />
            <br />
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