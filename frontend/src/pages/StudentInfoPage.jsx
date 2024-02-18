import { useState, useEffect } from 'react';
import { Grid, Image, Button, Input, PasswordInput } from '@mantine/core';
import { IconChevronDown, IconExclamationCircle } from '@tabler/icons-react';
import { Modal, Space } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import EnSysBanner from '../components/EnSysBanner';
import styles from '../styles/StudentInfo.module.css';
import toast, { Toaster } from 'react-hot-toast';

function StudentInfoPage() {
  const [studentData, setStudentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [errors, setErrors] = useState({});

  const { username } = useParams();
  const navigate = useNavigate();

  const isDisabled =
    editedValues.oldPassword === '' ||
    editedValues.newPassword === '' ||
    editedValues.confirmNewPassword === '';

  const showModal = () => {
    setIsModalOpen(true);
    navigate(`/student-info/${username}/change-password`);
    isDisabled;
  };

  const handleOk = async () => {
    try {
      const hasErrors = Object.values(errors).some((error) => error !== '');
      if (hasErrors) {
        console.error('Cannot save due to validation errors');
        return;
      }

      const response = await fetch(
        `http://localhost:3000/student-info/${username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: editedValues.newPassword }),
        }
      );

      const result = await response.json();
      console.log('Password updated', result);

      if (response.ok) {
        setIsModalOpen(false);
        navigate(`/student-info/${username}`);
        setErrors({});
        setEditedValues((prevValues) => ({
          ...prevValues,
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }));
        toast.success('Password updated successfully.');
      }
    } catch (error) {
      console.error('Error saving new password', error.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate(`/student-info/${username}`);
    setErrors({});
    setEditedValues((prevValues) => ({
      ...prevValues,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }));
  };

  async function fetchStudentData() {
    try {
      if (!username) return;
      const response = await fetch(
        `http://localhost:3000/student-info/${username}`
      );
      const data = await response.json();
      setStudentData(data.student);
    } catch (error) {
      console.error('Error fetching student info', error.message);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [username]);

  const handleEdit = () => {
    setEditMode(true);
    setEditedValues({ ...studentData });
    navigate(`/student-info/${username}/edit-information`);
  };

  const handleSave = async () => {
    try {
      const hasErrors = Object.values(errors).some((error) => error !== '');
      if (hasErrors) {
        console.error('Cannot save due to validation errors');
        return;
      }

      const response = await fetch(
        `http://localhost:3000/student-info/${username}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedValues),
        }
      );

      const result = await response.json();
      console.log('Student updated:', result);

      if (result.message === 'Error! Username already exists.') {
        toast.error('Username already exists. Please input a different one.');
        return;
      }

      if (result.message === 'Error! Email already exists.') {
        toast.error('Email already exists. Please input a different one.');
        return;
      }

      if (response.ok) {
        setEditMode(false);
        fetchStudentData();
        navigate(`/student-info/${editedValues.username}`);
        toast.success('Student information updated successfully.');
      }
    } catch (error) {
      console.error('Error fetching student info', error.message);
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email format';
        console.log('error: Invalid email format');
      }
    }

    if (name === 'username') {
      if (value.length < 4) {
        error = 'Minimum of 4 characters';
        console.log('error: Invalid username format');
      }
    }

    if (
      (name === 'email' && !value.trim()) ||
      (name === 'username' && !value.trim())
    ) {
      error = '';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePasswordBlur = (e) => {
    const { name, value } = e.target;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let error = '';

    if (name === 'oldPassword' && value !== studentData[0].password) {
      error = 'Must match old password';
      console.log('Must match old password');
      console.log(studentData[0].password);
    }

    if (name === 'newPassword') {
      setEditedValues((prevData) => ({
        ...prevData,
        newPassword: value,
      }));
    }

    if (name === 'newPassword' && !regex.test(value)) {
      error =
        'Must be at least eight characters, at least one uppercase, one lowercase, one number and one special character';
    }

    if (name === 'confirmNewPassword') {
      if (editedValues.newPassword !== value) {
        error = 'New passwords must match';
        console.log('New passwords must match');
      }
    }

    if (
      (name === 'oldPassword' && !value.trim()) ||
      (name === 'newPassword' && !value.trim()) ||
      (name === 'confirmNewPassword' && !value.trim())
    ) {
      error = '';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
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
      <Toaster />

      <Modal
        style={{ top: 100 }}
        className={styles.modal}
        open={isModalOpen}
        onCancel={handleCancel}
        width={450}
        footer={[]}
      >
        <h2 className={styles.modalTitle}>Change Password</h2>
        <Space direction="vertical">
          <span>Old Password</span>
          <PasswordInput
            className={styles.input}
            placeholder="Input Old Password"
            name="oldPassword"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            error={errors.oldPassword}
            value={editedValues.oldPassword}
          />
          <span>New Password</span>
          <PasswordInput
            className={styles.input}
            placeholder="Input New Password"
            name="newPassword"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            error={errors.newPassword}
            value={editedValues.newPassword}
          />
          <span>Confirm New Password</span>
          <PasswordInput
            className={styles.input}
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            error={errors.confirmNewPassword}
            value={editedValues.confirmNewPassword}
          />
          <Button
            className={styles.savePassword}
            color="gray"
            onClick={handleOk}
            disabled={isDisabled}
          >
            Save
          </Button>
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
                h={115}
                w={115}
                fallbackSrc="https://placehold.co/600x400?text=Student Photo"
              />
            </div>
            <Grid className={styles.grid} cols={2}>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>First Name: </span>
                {editMode ? (
                  <Input
                    className={styles.inputFirst}
                    size="xs"
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
                    size="xs"
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
                  <Input
                    className={styles.inputCourse}
                    size="xs"
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    name="course"
                    defaultValue={student.course}
                    value={editedValues.course}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleChange('course', value);
                      handleChange('college', getCollege(value));
                    }}
                  >
                    <option
                      value="BS Civil Engineering"
                      label="BS Civil Engineering"
                    >
                      BS Civil Engineering
                    </option>
                    <option
                      value="BS Information Technology"
                      label="BS Information Technology"
                    >
                      BS Information Technology
                    </option>
                    <option
                      value="BS Entrepreneurship"
                      label="BS Entrepreneurship"
                    >
                      BS Entrepreneurship
                    </option>
                  </Input>
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
                <Input.Wrapper
                  className={styles.inputWrapper}
                  error={errors.email}
                >
                  {editMode ? (
                    <Input
                      className={styles.inputEmail}
                      size="xs"
                      name="email"
                      value={editedValues.email}
                      placeholder={student.email}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
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
                  ) : (
                    <span className={styles.info}>{student.email}</span>
                  )}
                </Input.Wrapper>
              </Grid.Col>
              <Grid.Col className={styles.grid} span={5.5}>
                <span>Username: </span>
                <Input.Wrapper
                  className={styles.inputWrapper}
                  error={errors.username}
                >
                  {editMode ? (
                    <Input
                      className={styles.inputUsername}
                      size="xs"
                      name="username"
                      maxlength="15"
                      value={editedValues.username}
                      placeholder={student.username}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
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
                  ) : (
                    <span className={styles.info}>{student.username}</span>
                  )}
                </Input.Wrapper>
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
