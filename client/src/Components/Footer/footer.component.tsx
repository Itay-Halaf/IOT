import { FooterProperties } from "./footer.models";
import styles from "./footer.module.scss";

const Footer = (props: FooterProperties) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerLogo}>{props.children}</div>
    </div>
  );
};

export { Footer };
