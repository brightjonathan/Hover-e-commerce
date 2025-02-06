import React from 'react';
import Card from "../Card/Card";
import styles from "./InforBox.module.scss";

const InforBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  )
}

export default InforBox;
