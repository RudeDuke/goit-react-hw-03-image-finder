import { ImageGalleryItem } from 'components';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ webformatURL, largeImageURL, tags }, index) => (
      <ImageGalleryItem
        key={index} // use the index as the key
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        tags={tags}
        onImageClick={() => onImageClick(largeImageURL, tags)}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
