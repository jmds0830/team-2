import EnSysBanner from '../components/EnSysBanner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NullPaymentBooking from '../components/NullPaymentBooking';
import StudentPaymentBooking from '../components/StudentPaymentBooking';
import { Toaster } from 'react-hot-toast';

function PaymentBookingPage() {
  const [studentData, setStudentData] = useState([]);
  const { username } = useParams();

  async function fetchStudentData() {
    try {
      if (!username) return;
      const response = await fetch(
        `http://localhost:3000/payment-booking/${username}`
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

  return (
    <div>
      <Toaster position="top-center" />
      <EnSysBanner />
      <div>
        {studentData && studentData.length > 0 && studentData[0].subjects && studentData[0].subjects.length > 0 ? (
          <StudentPaymentBooking />
        ) : (
          <NullPaymentBooking />
        )}
      </div>
    </div>
  );
}

export default PaymentBookingPage;
