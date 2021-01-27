import React from "react";

// Material UI
import MUIList from "@material-ui/core/List";
import { useFontStyles } from "../styles";

export default function List({ children }) {
  const fontClasses = useFontStyles();

  return <MUIList className={fontClasses.general}>{children}</MUIList>;
}
