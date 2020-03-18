import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
export default function Count(props) {
  return (
    <Card>
      <CardContent>
        <Typography>Tartunnan saaneita Pohjois-Savossa:</Typography>
        <Typography variant="h4">{props.count}</Typography>
      </CardContent>
    </Card>
  );
}