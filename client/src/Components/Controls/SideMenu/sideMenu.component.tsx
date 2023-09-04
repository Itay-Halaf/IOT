import { useState } from "react";
import { SideMenuProperties } from "./sideMenu.models";
import styles from "./sideMenu.module.scss";
import { Button } from "../Button/button.component";

const SideMenu = (props: SideMenuProperties) => {
  const containerStyle = props.isOpen ? "open" : "closed";
  const closeEvent = props.closeEvent;

  const closeButton = closeEvent ? (
    <div className={styles.closeButton}>
      <Button onClick={closeEvent}>
        <div className={styles.closeIcon}></div>
      </Button>
    </div>
  ) : null;

  return (
    <div className={`${styles.sideMenuContainer} ${styles[containerStyle]}`}>
      <div className={styles.sideMenuContent}>
        {closeButton}
        {props.children}
      </div>
    </div>
  );
};

export { SideMenu };
