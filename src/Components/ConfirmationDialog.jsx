import React, { Component } from "react";
import {
    withStyles,
    Typography,
    Grid,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    IconButton,
    Divider
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/ClearRounded";
import ErrorIcon from "@material-ui/icons/ErrorOutlineRounded"

const styles = theme => ({

});

class ConfirmationDialog extends Component {
    state = {}
    render() {
        var { title, message } = this.props
        return (
            <Dialog
                open={this.props.setConfirmationDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle style={{ paddingRight: 10 }}>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        style={{ width: "100%" }}
                    >
                        <Grid item xs={11}>
                            <Typography variant="h6" style={{ color: "secondary" }}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                onClick={() => this.props.onCancel()}
                            >
                                <ClearIcon></ClearIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider light />
                <DialogContent style={{ paddingTop: 20 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item >
                            <ErrorIcon color="primary" style={{ height: 40, width: 40, margin: 0 }}></ErrorIcon>
                        </Grid>
                        <Grid item >

                            <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>{message}</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Divider light style={{ marginTop: 30 }}></Divider>
                <DialogActions >
                    <Button
                        variant="outlined"
                        color="primary"
                        // className={classes.registerBtn}
                        onClick={() => this.props.onCancel()}
                    >
                        Close
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        // className={classes.registerBtn}
                        onClick={() => this.props.onConfirm()}
                    >
                        Confirm
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ConfirmationDialog);