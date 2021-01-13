import React, { useState } from "react";
import Contacts from "../components/Contacts";

// Material UI
import Grid from "@material-ui/core/Grid";

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <Grid container>
      <Grid container item>
        <Contacts />
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}
