import EnSysBanner from '../components/EnSysBanner';
import { Toaster } from 'react-hot-toast';
import styles from '../styles/SubjectRegistrationPage.module.css';
import SearchBar from '../components/SearchBar';
import SubjectCard from '../components/SubjectCard';


function SubjectRegistrationPage() {
  return (
    <div>
      <Toaster position='top-center' />
      <EnSysBanner />
      <div className={styles.mainContainer}>
        <div className={styles.subjectContainer}>
          <SearchBar className={styles.searchBar} />
          <div className={styles.subjectLister}>
            {/* The idea is to render all the available subject cards here and filter it when search bar is used */}
            {/* SubjectCard.jsx is a component you can use to render the information of subjects */}
            {/* <SubjectCard className={styles.subjectCard} /> manipulate card width to fit on the width of the container*/}
          </div>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.scheduleContainer}>
            {/* Similar in format and rendering to your SchedulePage */}
            {/* Suggestion ko na gawin mo component yung list ng subjects pare para pwede mo na lang din i-render dito */}
          </div>
          <div className={styles.paymentInfoContainer}>
            {/* Almost similar format to your SchedulePage except may column na for Total Price (Price per unit is Php1000) */}
            {/* Add a Miscellaneous fee of Php 1902.24 (Date yan ng presentation haha) that will be addded to the tuition*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectRegistrationPage;