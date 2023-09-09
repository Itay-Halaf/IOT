import { CSSProperties, useEffect } from "react";
import { SnackbarProperties } from "./snackbar.models";
import styles from "./snackbar.module.scss";

const Snackbar = (props: SnackbarProperties) => {
  const [snackbarPop, setSnackbarPop] = props.snackbarPopState;
  const style: CSSProperties = snackbarPop
    ? {
        right: "30px",
      }
    : {};

  useEffect(() => {
    setTimeout(() => {
      if (snackbarPop) setSnackbarPop(false);
    }, 2000);
  }, [snackbarPop, setSnackbarPop]);

  return (
    <div style={style} className={styles.snackbarContainer}>
      <div className={styles.snackbarContent}>{props.children}</div>
    </div>
  );
};

export { Snackbar };
