import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
export default function Count(props) {
  const [tooltipIsOpen, setTooltipIsOpen] = React.useState(false);
  console.log("count :" + props.count);
  return (
    <Card>
      <CardContent>
        <Typography>Tartunnan saaneita:</Typography>
        <Typography variant="h4">{props.count}</Typography>
        {props.count ? (
          <Fragment>
            <Typography>Arvio todellisesta tartuntojen määrästä:</Typography>
            <Typography variant="h4">
              {props.count * 20} - {props.count * 30}
              <Tooltip
                open={tooltipIsOpen}
                title="Perustuu THL:n
                 antamaan haastatteluun:
                 https://yle.fi/uutiset/3-11259147"
              >
                <IconButton onClick={() => setTooltipIsOpen(!tooltipIsOpen)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          </Fragment>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
