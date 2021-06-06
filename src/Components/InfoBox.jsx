import React from "react";
import {Card,CardContent,Typography} from "@material-ui/core"
import "./InfoBox.css"

export default function InfoBox({title,cases,total}) {
  return (
  <Card className="InfoBox">
    <CardContent>
    {/* Title */}
    <Typography color="textSecondary" className="InfoBox__title">
      {title}
    </Typography>

    {/* Cases */}
    <h3 className="InfoBox__cases">{cases}</h3>

    {/* Total */}
    <Typography className="InfoBox__total" color="textSecondary">
      {total} Total
    </Typography>
    
    </CardContent>
  </Card>)
}