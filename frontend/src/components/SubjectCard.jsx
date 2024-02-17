import { Card, Text } from '@mantine/core';

const SubjectCard = ({ subject }) => {
  const { subjectName, subjectCode, units, date, time, instructor, slots } = subject;

  return (
    <Card shadow="xs" padding="md" radius="md">
      <Text size="xl" weight={700} style={{ marginBottom: '0.5rem' }}>
        {subjectName}
      </Text>
      <Text size="sm" color="gray" style={{ marginBottom: '0.5rem' }}>
        Subject Code: {subjectCode}
      </Text>
      <Text size="sm" style={{ marginBottom: '0.5rem' }}>
        Units: {units}
      </Text>
      <Text size="sm" style={{ marginBottom: '0.5rem' }}>
        Date: {date}
      </Text>
      <Text size="sm" style={{ marginBottom: '0.5rem' }}>
        Time: {time}
      </Text>
      <Text size="sm" style={{ marginBottom: '0.5rem' }}>
        Instructor: {instructor}
      </Text>
      <Text size="sm" style={{ marginBottom: 0 }}>
        Slots: {slots}
      </Text>
    </Card>
  );
};

export default SubjectCard;