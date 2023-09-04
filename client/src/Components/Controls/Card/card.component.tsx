import { CardProperties } from "./card.models";
import styles from "./card.module.scss";

const Card = (props: CardProperties) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>{props.children}</div>
    </div>
  );
};

export { Card };
