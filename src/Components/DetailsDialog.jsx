import React, { Component } from "react";
import {
    Typography,
    Grid,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    IconButton,
    Divider,
    withStyles
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/ClearRounded";

const styles = theme => ({
    fullfilled: {
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 12,
        paddingBottom: 12,
    }
});
class DetailsDialog extends Component {
    state = {}
    render() {
        var { classes, isDoner, details } = this.props
        return (
            <Dialog
                open={this.props.setDetailsDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle style={{ paddingRight: 10 }}>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        style={{ width: "100%", }}
                    >
                        <Grid item xs={11}>
                            <Typography variant="h6" style={{ color: "secondary" }}>
                                {isDoner ? "Patient you will HELP!" : "Donor Details"}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}  >
                            <IconButton
                                onClick={() => this.props.closeDialog()}

                            >
                                <ClearIcon></ClearIcon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider light />
                <DialogContent style={{ paddingTop: 20 }}>
                    <Grid container spacing={2} style={{ overflow: "hidden" }}>

                        <Grid item container xs={12} spacing={1}>
                            <Grid item xs={12} sm="auto">
                                <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                    {"Name:"}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ fontWeight: "bold" }}>
                                    {details.name}
                                </Typography>
                            </Grid>
                        </Grid>

                        {!isDoner && <Grid item container xs={12} spacing={1}>
                            <Grid item xs={12} sm="auto" >
                                <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                    {"Contact:"}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography style={{ fontWeight: "bold" }}>
                                    {details.contact}
                                </Typography>
                            </Grid>
                        </Grid>}

                        {isDoner && <>
                            <Grid item container xs={12} spacing={1}>
                                <Grid item xs={12} sm="auto">
                                    <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                        {"Location:"}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography style={{ fontWeight: "bold" }}>
                                        {details.location}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} spacing={1}>
                                <Grid item xs={12} sm="auto">
                                    <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                        {"Blood Group:"}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography style={{ fontWeight: "bold" }}>
                                        {details.bg}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} spacing={1}>
                                <Grid item xs={12} sm="auto">
                                    <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                        {"Date of Requirement:"}
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography style={{ fontWeight: "bold" }}>
                                        {details.requiredDate.toDateString()}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </>}

                    </Grid>
                </DialogContent>
                <Divider light style={{ marginTop: 30 }}></Divider>
                <DialogActions >
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.registerBtn}
                        onClick={() => this.props.closeDialog()}
                    >
                        Close
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.registerBtn}
                    >{isDoner ? "Donate" : "Thank for Donation"}

                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(DetailsDialog);