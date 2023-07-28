import { Component } from 'react';
import { Loader } from 'components';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  state = { loaded: false };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { image, alt, isOpen } = this.props;
    const { loaded } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.Overlay} onClick={this.handleOverlayClick}>
        <div className={styles.Modal}>
          {!loaded && <Loader />}
          <img
            src={image}
            alt={alt}
            onLoad={this.handleLoad}
            style={{ display: loaded ? 'block' : 'none' }}
          />
          <p>{alt}</p>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Modal;
