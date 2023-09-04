import { HeaderProperties } from "./header.models";
import styles from "./header.module.scss";

const Header = (props: HeaderProperties) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLogo}>{props.children}</div>
    </div>
  );
};

export { Header };
