import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import amberCan from '../images/lata-amber.png';
import porterCan from '../images/lata-porter.png';
import seltzerCan from '../images/lata-seltzer.png';
import caramel from '../images/i-caramel.png';
import tangerine from '../images/i-tangerine.png';
import coffee from '../images/i-coffee.png';
import lemon from '../images/i-lemon.png';
import watermelon from '../images/i-watermelon.png';
import * as styles from './index.module.scss';
import { useParallax } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import ProductScores from '../components/ProductScores';
import HopIcon from '../images/hop.svg';
import {
  Bitterness,
  Carbonation,
} from '../components/ProductScores/ProductScores';

const IndexPage = () => {
  const amberParallax = useParallax({
    speed: 15,
  });
  const porterParallax = useParallax({
    speed: 15,
  });
  const porterParallax2 = useParallax({
    speed: 15,
  });
  const seltzerParallax = useParallax({
    speed: 15,
  });

  const tangerineParallax = useParallax({
    speed: 18,
  });

  const caramelParallax = useParallax({
    speed: 10,
  });

  const coffeeParallax = useParallax({
    speed: 18,
  });

  const caramelParallax2 = useParallax({
    speed: 10,
  });

  const lemonParallax = useParallax({
    speed: 10,
  });

  const watermelonParallax = useParallax({
    speed: 18,
  });
  return (
    <ParallaxProvider>
      <Layout>
        <Hero></Hero>
        <section className={styles.mainBlock}>
          <div className={styles.container}>
            <h1 className={styles.title}>Cervezas con carácter</h1>
          </div>
        </section>
        <section className={styles.amberBlock}>
          <div className={styles.amberBg}>
            <div className={styles.amberBgLeft}></div>
            <div className={styles.amberBgRight}></div>
          </div>
          <div className={styles.beerContainer}>
            <img
              className={styles.amberCan}
              src={amberCan}
              alt=""
              ref={amberParallax.ref}
            />
            <div className={styles.beerContent}>
              <h2 className={styles.beerTitle}>Amber Ale</h2>
              <p className={styles.beerDescription}>
                Con un color ámbar, notas a caramelo y un carácter cítrico, la
                hace nuestra cerveza favorita. Tiene el perfecto balance entre
                el dulce de la malta y el amargo de los lúpulos, es muy
                refrescante y con sabroso cuerpo.
              </p>
              <ProductScores
                bitterness={Bitterness.M}
                carbonation={Carbonation.ML}
                alcohol={5.5}
              ></ProductScores>
            </div>
            <img
              className={styles.caramel}
              src={caramel}
              alt=""
              ref={caramelParallax.ref}
            />
            <img
              className={styles.tangerine}
              src={tangerine}
              alt=""
              ref={tangerineParallax.ref}
            />
          </div>
        </section>
        <section className={styles.porterBlock}>
          <div className={styles.porterBg}>
            <div className={styles.porterBgLeft}></div>
            <div className={styles.porterBgRight}></div>
          </div>
          <div className={styles.beerContainer}>
            <img
              className={styles.porterCan}
              src={porterCan}
              alt=""
              ref={porterParallax.ref}
            />
            <div className={styles.beerContent}>
              <h2 className={styles.beerTitle}>Porter</h2>
              <p className={styles.beerDescription}>
                Cerveza tipo porter con notas a caramelo, chocolate y café, le
                agregamos una adición extra de café Campo Alto(un
                emprendimiento, como nosotros) justo antes de empacarla, que le
                da mucha más fuerza a su sabor.
              </p>
              <ProductScores
                bitterness={Bitterness.M}
                carbonation={Carbonation.ML}
                alcohol={5.5}
              ></ProductScores>
            </div>
            <img
              className={styles.coffee}
              src={coffee}
              alt=""
              ref={coffeeParallax.ref}
            />
            <img
              className={styles.caramel2}
              src={caramel}
              alt=""
              ref={caramelParallax2.ref}
            />
          </div>
        </section>
        <section className={styles.porterBlock2}>
          <div className={styles.porterBg}>
            <div className={styles.porterBgRight}></div>
            <div className={styles.porterBgLeft}></div>
          </div>
          <div className={styles.beerContainer}>
            <div className={styles.beerContent2}>
              <h2 className={styles.beerTitle}>Porter</h2>
              <p className={styles.beerDescription}>
                Cerveza tipo porter con notas a caramelo, chocolate y café, le
                agregamos una adición extra de café Campo Alto(un
                emprendimiento, como nosotros) justo antes de empacarla, que le
                da mucha más fuerza a su sabor.
              </p>
              <ProductScores
                bitterness={Bitterness.M}
                carbonation={Carbonation.ML}
                alcohol={5.5}
              ></ProductScores>
            </div>
            <img
              className={styles.porterCan}
              src={porterCan}
              alt=""
              ref={porterParallax2.ref}
            />
            <img
              className={styles.coffee}
              src={coffee}
              alt=""
              ref={coffeeParallax.ref}
            />
            <img
              className={styles.caramel2}
              src={caramel}
              alt=""
              ref={caramelParallax2.ref}
            />
          </div>
        </section>
        <section className={styles.seltzerBlock}>
          <div className={styles.seltzerBg}>
            <div className={styles.seltzerBgLeft}></div>
            <div className={styles.seltzerBgRight}></div>
          </div>
          <div className={styles.beerContainer}>
            <img
              className={styles.seltzerCan}
              src={seltzerCan}
              alt=""
              ref={seltzerParallax.ref}
            />
            <div className={styles.beerContent}>
              <h2 className={styles.beerTitle}>Seltzer</h2>
              <p className={styles.beerDescription}>
                Agua con gas, alcohol y mucho sabor. Dulce, acida, refrescante y
                con un ligero toque amargo, es una bebida elegante, algunos la
                consideran una opción saludable, nosotros solo creemos que es un
                hit!
              </p>
              <ProductScores alcohol={5.5}></ProductScores>
            </div>
            <img
              className={styles.lemon}
              src={lemon}
              alt=""
              ref={lemonParallax.ref}
            />
            <img
              className={styles.watermelon}
              src={watermelon}
              alt=""
              ref={watermelonParallax.ref}
            />
          </div>
        </section>
        <section className={styles.secondaryBlock}>
          <div className={styles.container}>
            <div className={styles.secondaryContent}>
              <p>
                Somos los luchadores, los que damos el salto al vacío, los que
                aun cuando tenemos miedo lo intentamos
              </p>
              <HopIcon className={styles.hopIcon}></HopIcon>
              <h2>Somos grandes, desde pequeños</h2>
            </div>
          </div>
        </section>
      </Layout>
    </ParallaxProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Jabato Cerveceria | Cervezas con carácter</title>
    <meta
      name="description"
      content="Cervezas artesanales con carácter. Ven y averigua porque somos la cervecería que nació grande desde pequeña."
    />
  </>
);
