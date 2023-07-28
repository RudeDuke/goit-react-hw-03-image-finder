import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <ThreeDots color="#3f51b5" height={80} width={80} />
    </div>
  );
};

export default Loader;
