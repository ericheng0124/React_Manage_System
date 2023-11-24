import React from 'react';
import styles from './LinkButton.module.css'

const LinkButton = (props) => {
  return (
      <button className={styles.linkButton} {...props}>{props.children}</button>
  );
};

export default LinkButton;