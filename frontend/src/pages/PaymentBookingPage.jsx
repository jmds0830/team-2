import EnSysBanner from '../components/EnSysBanner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NullPaymentBooking from '../components/NullPaymentBooking';
import StudentPaymentBooking from '../components/StudentPaymentBooking';
import { Toaster } from 'react-hot-toast';

function PaymentBookingPage() {
  const [studentData, setStudentData] = useState([]);
  const { id } = useParams();

  async function fetchStudentData() {
    try {
      if (!id) return;
      const response = await fetch(
        `http://localhost:3000/payment-booking/${id}`
      );
      const data = await response.json();
      setStudentData(data.student);
    } catch (error) {
      console.error('Error fetching student info', error.message);
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  return (
    <div>
      <Toaster position="top-center" />
      <EnSysBanner />
      <div>
        <StudentPaymentBooking />
      </div>
    </div>
  );
}

export default PaymentBookingPage;
