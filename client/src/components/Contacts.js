import React from "react";
import { useSelector } from "react-redux";

export default function Contacts() {
  const contacts = useSelector((state) => state.contacts);
  return <></>;
}
