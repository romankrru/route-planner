import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextInput.css';

const TextInput = props => (
  <input
    value={props.value}
    onChange={e => props.onChange(e.target.value)}
    className={styles.TextInput}
    type="text"
  />
);

TextInput.defaultProps = {
  value: '',
  onChange: () => {},
};

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextInput;
