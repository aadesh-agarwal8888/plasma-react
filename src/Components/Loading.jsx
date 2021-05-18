import React, { Component } from "react";
import { Backdrop, CircularProgress, withStyles } from "@material-ui/core";

const styles = theme => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
});

class Loading extends Component {
  state = {};
  render() {
    const { classes, msg, loading } = this.props

    return (
      <Backdrop open={loading} className={classes.backdrop}>
        <span style={{ marginRight: 10 }}>{msg}</span>
        <CircularProgress
          style={{
            color: "inherit",
          }}
        />
      </Backdrop>
    );
  }
}

export default withStyles(styles)(Loading);
