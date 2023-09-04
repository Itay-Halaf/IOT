import { ButtonProperties } from "./button.models";
import styles from './button.module.scss';

const Button = (props: ButtonProperties) => {
  return (
    <div className={styles.buttonContainer}>
      {props.children}
      <button className={styles.buttonControl} onClick={props.onClick}></button>
    </div>
  );
};

export { Button };
