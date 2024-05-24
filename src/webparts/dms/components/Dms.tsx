import * as React from "react";
import styles from "./Dms.module.scss";

import { Route, HashRouter, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function DmsWebPart(props) {
  return (
    <HashRouter>
      <div style={{ width: "100%" }} className={styles.section}>
        <Navbar />
      </div>
    </HashRouter>
  );
}
