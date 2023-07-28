import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
  tags,
}) => (
  <li className={styles.GalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      className={styles.GalleryImage}
      onClick={() => onImageClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
