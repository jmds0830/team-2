import { useState, useEffect } from 'react';
import { Grid, Image, Button } from '@mantine/core';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Modal, Input, Space } from 'antd';
import { useParams } from 'react-router-dom';
import EnSysBanner from '../components/enSysBanner';
import styles from '../styles/StudentInfo.module.css';

function StudentInfoPage() {
  const [studentData, setStudentData] = useState([]);
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function fetchStudentData() {
    try {
      if (!id) return;
      const response = await fetch(`http://localhost:3000/student-info/${id}`);
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student info:', error.message);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  return (
    <>
      <EnSysBanner />
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2 className={styles.modalTitle}>Change Password</h2>
        <Space direction="vertical">
          <span>Old Password</span>
          <Input.Password
            className={styles.input}
            placeholder="Input Old Password"
          />
          <span>New Password</span>
          <Input.Password
            placeholder="Input New Password"
            className={styles.input}
          />
          <span>Confirm New Password</span>
          <Input.Password
            placeholder="Confirm New Password"
            className={styles.input}
          />
        </Space>
      </Modal>
      <div>
        {studentData?.student?.map((student, index) => (
          <div className={styles.studentInfoContainer} key={index}>
            <div className={styles.title}>
              <h2>Student Information</h2>
              <Image
                radius="md"
                src={null}
                h={150}
                w={150}
                fallbackSrc="https://placehold.co/600x400?text=Student Photo"
              />
            </div>
            <Grid className={styles.grid} cols={2}>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>First Name: </span>
                <span className={styles.info}>{student.firstName}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Last Name: </span>
                <span className={styles.info}>{student.lastName}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span> Course: </span>
                <span className={styles.info}>{student.course}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>College: </span>
                <span className={styles.info}>{student.college}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Student Number: </span>
                <span className={styles.info}>{student.studentId}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Email: </span>
                <span className={styles.info}>{student.email}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Username: </span>
                <span className={styles.info}>{student.username}</span>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Password: </span>
                <span className={styles.info}>{student.password}</span>
                <Button variant="filled" color="gray" onClick={showModal}>
                  Change Password
                </Button>
              </Grid.Col>
            </Grid>
            <div className={styles.buttonContainer}>
              <Button variant="filled" color="gray">
                Edit Information
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudentInfoPage;
