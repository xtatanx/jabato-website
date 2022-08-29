import * as React from 'react';
import * as styles from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
