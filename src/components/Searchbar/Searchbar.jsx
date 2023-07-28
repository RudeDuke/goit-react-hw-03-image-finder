import { Component, React } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import { FiX } from 'react-icons/fi';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.warning('Please enter what you are looking for 😊.');
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  clearInput = () => {
    this.setState({ query: '' });
    this.input.focus();
  };

  render() {
    return (
      <div className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchButton}>
            <ImSearch />
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
            ref={node => (this.input = node)}
          />

          {this.state.query && (
            <button
              type="button"
              className={styles.ClearButton}
              onClick={this.clearInput}
            >
              <FiX />
            </button>
          )}
        </form>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
