import styles from '../styles/PaymentBookingPage.module.css';
import EnSysBanner from '../components/EnSysBanner';
import NullPaymentBooking from '../components/NullPaymentBooking';
import StudentPaymentBooking from '../components/StudentPaymentBooking';

function PaymentBookingPage() {

  return (
    <div>
      <EnSysBanner />
      <div>
        <StudentPaymentBooking />
      </div>
    </div>
  );
}

export default PaymentBookingPage;
