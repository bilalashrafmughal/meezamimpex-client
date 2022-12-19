import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function BackdropLoader(props) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color="inherit" />
      <div />
      <p> {props.message} </p>
    </Backdrop>
  );
}
