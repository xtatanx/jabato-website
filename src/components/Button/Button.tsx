import * as React from 'react';
import * as styles from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  to: string;
  variant?: 'primary' | 'ghost';
};

const Button = ({ children, to, variant = 'primary' }: ButtonProps) => {
  return (
    <a href={to} target="_blank" className={styles[variant]}>
      {children}
    </a>
  );
};

export default Button;
