import { useState, useEffect } from 'react';
import { Grid, Image, Button } from '@mantine/core';
import { Modal, Space, Input, Select } from 'antd';
import { useParams } from 'react-router-dom';
import EnSysBanner from '../components/enSysBanner';
import styles from '../styles/StudentInfo.module.css';

function StudentInfoPage() {
  const [studentData, setStudentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const { id } = useParams();

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
      setStudentData(data.student);
    } catch (error) {
      console.error('Error fetching student info:', error.message);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
    setEditedValues({ ...studentData });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/student-info/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedValues),
      });

      const updatedData = await response.json();
      console.log('Student information updated successfully:', updatedData);
      setEditMode(false);
      fetchStudentData();
    } catch (error) {
      console.error('Error fetching student info:', error.message);
    }
  };

  const handleChange = (name, value) => {
    if (name === 'course') {
      const collegeValue = getCollege(value);
      setEditedValues((prevData) => ({
        ...prevData,
        [name]: value,
        college: collegeValue,
      }));
    } else {
      setEditedValues((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const getCollege = (course) => {
    switch (course) {
      case 'BS Civil Engineering':
        return 'Engineering';
      case 'BS Information Technology':
        return 'Information Technology';
      case 'BS Entrepreneurship':
        return 'Business';
      default:
        return '';
    }
  };

  return (
    <>
      <EnSysBanner />
      <Modal
        style={{ top: 100 }}
        className={styles.modal}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={450}
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
        {studentData.map((student, index) => (
          <div className={styles.studentInfoContainer} key={index}>
            <div className={styles.title}>
              <h2>Student Information</h2>
              <Image
                radius="md"
                src={null}
                h={120}
                w={120}
                fallbackSrc="https://placehold.co/600x400?text=Student Photo"
              />
            </div>
            <Grid className={styles.grid} cols={2}>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>First Name: </span>
                {editMode ? (
                  <Input
                    className={styles.inputFirst}
                    size="small"
                    name="firstName"
                    value={editedValues.firstName}
                    placeholder={student.firstName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span className={styles.info}>{student.firstName}</span>
                )}
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Last Name: </span>
                {editMode ? (
                  <Input
                    className={styles.inputLast}
                    size="small"
                    name="lastName"
                    value={editedValues.lastName}
                    placeholder={student.lastName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span className={styles.info}>{student.lastName}</span>
                )}
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span> Course: </span>
                {editMode ? (
                  <Select
                    size="small"
                    name="course"
                    defaultValue={student.course}
                    value={editedValues.course}
                    onChange={(value) => {
                      handleChange('course', value);
                      handleChange('college', getCollege(value));
                    }}
                    style={{
                      width: 200,
                    }}
                    options={[
                      {
                        value: 'BS Civil Engineering',
                        label: 'BS Civil Engineering',
                      },
                      {
                        value: 'BS Information Technology',
                        label: 'BS Information Technology',
                      },
                      {
                        value: 'BS Entrepreneurship',
                        label: 'BS Entrepreneurship',
                      },
                    ]}
                  />
                ) : (
                  <span className={styles.info}>{student.course}</span>
                )}
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
                {editMode ? (
                  <Input
                    className={styles.inputEmail}
                    radius="md"
                    size="xs"
                    name="email"
                    value={editedValues.email}
                    placeholder={student.email}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span className={styles.info}>{student.email}</span>
                )}
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Username: </span>
                {editMode ? (
                  <Input
                    className={styles.inputUsername}
                    size="small"
                    name="username"
                    value={editedValues.username}
                    placeholder={student.username}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span className={styles.info}>{student.username}</span>
                )}
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
              {editMode ? (
                <Button variant="filled" color="gray" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button variant="filled" color="gray" onClick={handleEdit}>
                  Edit Information
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudentInfoPage;
