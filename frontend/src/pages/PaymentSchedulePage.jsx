import EnSysBanner from '../components/EnSysBanner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/PaymentSchedulePage.module.css';

function PaymentSchedulePage() {
  const [paymentBookingData, setPaymentBookingData] = useState([]);
  const { username } = useParams();

  async function fetchPaymentBookingData() {
    try {
      if (!username) return;
      const response = await fetch(`http://localhost:3000/payment-booking/${username}/payment-schedule`);
      const data = await response.json();
      setPaymentBookingData(data.paymentBooking);
    } catch (error) {
      console.error('Error fetching student info', error.message);
    }
  }

  useEffect(() => {
    fetchPaymentBookingData();
  }, [username]);

  return (
    <div>
      <EnSysBanner />
      <div className={styles.mainContainer}>
        {paymentBookingData.map((paymentBooking, index) => (
          <div className={styles.subContainer} key={index}>
            <p>Please present this at the cashier window on your payment's scheduled date and time</p>
            <h2 className={styles.queueNum}>{paymentBooking.queueId}</h2>
            <p>
              <span className={styles.label}>Student ID: </span>
              <span className={styles.info}>{paymentBooking.studentId}</span>
            </p>
            <p>
              <span className={styles.label}>Date: </span>
              <span className={styles.info}>{paymentBooking.date}</span>
            </p>
            <p>
              <span className={styles.label}>Time: </span>
              <span className={styles.info}>{paymentBooking.time}</span>
            </p>
            <p>
              <span className={styles.label}>Tuition Amount: </span>
              <span className={styles.info}>Php __________</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentSchedulePage;
