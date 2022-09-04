import * as React from 'react';
import * as styles from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  to: string;
};

const Button = ({ children, to }: ButtonProps) => {
  return (
    <a href={to} target="_blank" className={styles.button}>
      {children}
    </a>
  );
};

export default Button;
