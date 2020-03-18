import React from "react";

import Alert from "@material-ui/lab/Alert";

export default function Disclaimer() {
  return (
    <div>
      <Alert severity="error">
        Sivulla näkyvä data kertoo ainoastaan testatut ja uutisoidut tapaukset!
      </Alert>
    </div>
  );
}
