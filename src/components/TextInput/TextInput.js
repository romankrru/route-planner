import React from 'react';

import styles from './TextInput.css';

const TextInput = (props) => {
  return (
    <input
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={styles.TextInput}
      type="text"
    />
  );
};

export default TextInput;