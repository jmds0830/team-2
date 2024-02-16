import EnSysBanner from '../components/EnSysBanner';
import NullPaymentBooking from '../components/NullPaymentBooking';
import StudentPaymentBooking from '../components/StudentPaymentBooking';
import { Toaster } from 'react-hot-toast';

function PaymentBookingPage() {

  return (
    <div>
      <Toaster position='top-center' />
      <EnSysBanner />
      <div>
        <StudentPaymentBooking />
      </div>
    </div>
  );
}

export default PaymentBookingPage;
