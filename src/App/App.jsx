import { Component } from 'react';
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components';
import { fetchImages as fetch } from 'api/fetchImages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notiflix from 'notiflix';
import styles from './App.module.css';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import { animateScroll as scroll } from 'react-scroll';

const html = document.querySelector('html');

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    largeImageAlt: '',
    showModal: false,
    loading: false,
    showScrollToTop: false,
    showScrollToBottom: false,
    isAutoScrolling: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.showScrollers);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showScrollers);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadImages();
    }
  }

  // AUTO-SCROLL & SCROLL-ARROWS

  autoScroll = direction => {
    this.setState({ isAutoScrolling: true });
    if (direction === 'top') {
      scroll.scrollToTop({ duration: 1200 });
    } else {
      scroll.scrollToBottom({ duration: 1200 });
    }
    setTimeout(() => this.setState({ isAutoScrolling: false }), 1000);
  };

  showScrollers = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const isPageBottom = scrollHeight - scrollTop - clientHeight < 50;
    const isPageTop = scrollTop < 50;

    if (isPageTop) {
      this.setState({ showScrollToTop: false, showScrollToBottom: false });
    } else if (isPageBottom || this.state.isAutoScrolling) {
      this.setState({ showScrollToTop: true, showScrollToBottom: false });
    } else {
      this.setState({
        showScrollToTop: true,
        showScrollToBottom: true,
      });
    }
  };

  // FETCH FUNCTION: PROCESSING SEARCH RESULTS

  loadImages = async () => {
    const { query, page, images } = this.state;
    this.setState({ loading: true });

    try {
      const response = await fetch(query, page);
      console.log(response);
      const hits = response.hits;
      const totalHits = response.totalHits;

      if (hits.length === 0) {
        toast.warning(
          'Unfortunately, we could not find anything for your query.'
        );
        this.setState({ query: '' });
        return;
      }

      this.setState(
        {
          images: [...images, ...hits],
          totalImages: totalHits,
        },

        () => {
          this.setState({ prevTotalImages: totalHits });

          if (images.length === totalHits) {
            toast.success("That's all we found for your query at the moment");
          }
        }
      );
    } catch (error) {
      console.error(error);

      this.searchbar.setState({ query: '' });
      this.searchbar.input.blur();

      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Please try to reload the page!',
        'Reload',
        () => window.location.reload()
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  // HANDLERS: SUBMIT, LOAD, CLICK, CLOSE

  handleSubmit = query => {
    const { totalImages, prevTotalImages } = this.state;

    if (query !== this.state.query) {
      this.setState(
        {
          query,
          page: 1,
          images: [],
        },
        this.loadImages
      );
    } else {
      if (totalImages === prevTotalImages) {
        toast.info(
          <>
            No new images for the query "<strong>{query}</strong>"
          </>
        );
      } else {
        const extraImages = totalImages - prevTotalImages;
        toast.success(
          <>
            We've found <strong>{extraImages}</strong> extra images for the "
            <strong>{query}</strong>"
          </>
        );
      }
    }
  };

  handleImageClick = (largeImageURL, largeImageAlt) => {
    this.setState({ largeImageURL, largeImageAlt, showModal: true });
    html.style.overflow = 'hidden';
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.autoScroll('bottom');
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    html.style.overflow = 'auto';
  };

  // RENDER

  render() {
    const {
      images,
      loading,
      showModal,
      largeImageURL,
      largeImageAlt,
      totalImages,
      showScrollToTop,
      showScrollToBottom,
    } = this.state;

    const {
      handleSubmit,
      handleImageClick,
      handleLoadMore,
      handleCloseModal,
      autoScroll,
    } = this;

    return (
      <div className={styles.App}>
        <Searchbar
          ref={node => (this.searchbar = node)}
          onSubmit={handleSubmit}
        />
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {loading && <Loader />}
        {!loading && images.length < totalImages && (
          <Button onClick={handleLoadMore} />
        )}
        {showModal && (
          <Modal
            image={largeImageURL}
            alt={largeImageAlt}
            isOpen={showModal}
            onClose={handleCloseModal}
          />
        )}
        {showScrollToTop && (
          <FiArrowUpCircle
            className={styles.ScrollToTopArrow}
            onClick={() => autoScroll('top')}
          />
        )}
        {showScrollToBottom && (
          <FiArrowDownCircle
            className={styles.ScrollToBottomArrow}
            onClick={() => autoScroll('bottom')}
          />
        )}
        <ToastContainer autoClose={2800} />
      </div>
    );
  }
}

export default App;
