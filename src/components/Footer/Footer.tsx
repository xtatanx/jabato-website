import * as React from 'react';
import * as styles from './footer.module.scss';
import { StaticImage } from 'gatsby-plugin-image';
import InstagramIcon from '../../images/instagram-icon.svg';
import WhatsappIcon from '../../images/whatsapp-icon.svg';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.branding}>
        <StaticImage
          className={styles.image}
          src="../../images/footer-image.png"
          alt=""
          width={390}
          height={356}
        ></StaticImage>
        <div className={styles.stamp}>
          <StaticImage
            src="../../images/jabato-stamp.png"
            alt=""
            width={390}
            height={390}
          ></StaticImage>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.socialContainer}>
          <h2 className={styles.hashtag}>#apulsoyfrentera</h2>
          <div className={styles.icons}>
            <a
              href="https://www.instagram.com/jabato.cerveceria/?hl=en"
              target="_blank"
            >
              <InstagramIcon></InstagramIcon>
            </a>
            <a href="https://wa.me/573027366778" target="_blank">
              <WhatsappIcon></WhatsappIcon>
            </a>
          </div>
        </div>
        <div className={styles.legal}>
          <small>
            Prohíbase el expendio de bebidas embriagantes a menores de edad, el
            exceso de alcohol es perjudicial para la salud.
          </small>
        </div>
      </div>
      <div className={styles.rights}>
        <small>2022 Jabato Cervecería — Todos los derechos reservados</small>
      </div>
    </footer>
  );
};

export default Footer;
