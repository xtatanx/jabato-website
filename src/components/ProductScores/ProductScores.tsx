import * as React from 'react';
import { useState } from 'react';
import { useParallax } from 'react-scroll-parallax';
import * as styles from './product-scores.module.scss';

export enum Bitterness {
  L = 'Bajo',
  ML = 'Medio Bajo',
  M = 'Medio',
  MH = 'Medio Alto',
  H = 'Alto',
}

export enum Carbonation {
  L = 'Baja',
  ML = 'Media Baja',
  M = 'Media',
  MH = 'Media Alta',
  H = 'Alta',
}

const fillClassnames = {
  L: 'low',
  ML: 'mediumLow',
  M: 'medium',
  MH: 'mediumHigh',
  H: 'high',
};

type ProductScoresProps = {
  bitterness?: Bitterness;
  carbonation?: Carbonation;
  alcohol: number;
  ref: React.RefObject<HTMLElement>;
};

const maxAlcohol = 15;

const ProductScores = ({
  bitterness,
  alcohol,
  carbonation,
}: ProductScoresProps) => {
  const alcoholPercentage = () => {
    return `${alcohol}%`;
  };

  const bitternessClassName = () => {
    switch (bitterness) {
      case Bitterness.L:
        return styles[fillClassnames.L];
      case Bitterness.ML:
        return styles[fillClassnames.ML];
      case Bitterness.M:
        return styles[fillClassnames.M];
      case Bitterness.MH:
        return styles[fillClassnames.MH];
      case Bitterness.H:
        return styles[fillClassnames.H];
    }
  };

  const carbonationClassName = () => {
    switch (carbonation) {
      case Carbonation.L:
        return styles[fillClassnames.L];
      case Carbonation.ML:
        return styles[fillClassnames.ML];
      case Carbonation.M:
        return styles[fillClassnames.M];
      case Carbonation.MH:
        return styles[fillClassnames.MH];
      case Carbonation.H:
        return styles[fillClassnames.H];
    }
  };

  const calculateAlcoholFill = () => {
    if (offScreen) return 0;
    return `${(alcohol / maxAlcohol) * 100}%`;
  };

  const [offScreen, setOffscreen] = useState(true);
  const scoresParallax = useParallax({
    rootMargin: {
      top: -120,
      left: 0,
      right: 0,
      bottom: 0,
    },
    onEnter: () => {
      setOffscreen(false);
    },
  });

  return (
    <div
      ref={scoresParallax.ref}
      className={offScreen ? styles.wrapperOffscreen : styles.wrapper}
    >
      <div>
        <div className={styles.header}>
          <span>Alcohol</span>
          <span>{alcoholPercentage()}</span>
        </div>
        <div className={styles.bar}>
          <div className={styles.rail}></div>
          <div
            className={styles.fill}
            style={{
              width: calculateAlcoholFill(),
            }}
          ></div>
        </div>
      </div>
      {bitterness && (
        <div>
          <div className={styles.header}>
            <span>Amargor</span>
            <span>{bitterness}</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.rail}></div>
            <div className={bitternessClassName()}></div>
          </div>
        </div>
      )}
      {carbonation && (
        <div>
          <div className={styles.header}>
            <span>Carbonatación</span>
            <span>{carbonation}</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.rail}></div>
            <div className={carbonationClassName()}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScores;
