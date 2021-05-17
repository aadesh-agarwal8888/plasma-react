import React from "react";
import { Component } from "react";
import {
    Paper,
    Typography,
    Grid,
    Button,
    withStyles
} from "@material-ui/core";
const styles = theme => ({
    paper: {
        marginTop: 5,
        padding: 20,
    },
    donationStatusBtn: {
        color: "white",
        padding: "15px 0px",
        width: 230
    }

});
class DonationStatus extends Component {
    state = {
    }

    render() {

        var { classes, isDonor, personDetails, donationDetails } = this.props;

        return (
            <React.Fragment>
                <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ fontWeight: "bold", fontSize: 20 }}
                >
                    Details
            </Typography>
                <Paper className={classes.paper} style={{ marginBottom: 20 }}>
                    <Grid container spacing={2} style={{ overflow: "hidden" }}>

                        <Grid item container xs={12} spacing={1}>
                            <Grid item xs={12} sm="auto">
                                <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                    {"Name:"}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ fontWeight: "bold" }}>
                                    {personDetails.Name}
                                </Typography>
                            </Grid>
                        </Grid>

                        {isDonor && <Grid item container xs={12} spacing={1}>
                            <Grid item xs={12} sm="auto">
                                <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                    {"Location:"}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography style={{ fontWeight: "bold" }}>
                                    {`${personDetails.Address.Street},${personDetails.Address.City},${personDetails.Address.State},${personDetails.Address.Pincode}`}
                                </Typography>
                            </Grid>
                        </Grid>}

                        <Grid item container xs={12} spacing={1}>
                            <Grid item xs={12} sm="auto">
                                <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                    {"Blood Group:"}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography style={{ fontWeight: "bold" }}>
                                    {!isDonor ? personDetails.Blood_Group : personDetails.Blood_Group_Required}
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
                                    {donationDetails.Commencement_Date}
                                </Typography>
                            </Grid>
                        </Grid>


                    </Grid>
                    <br></br>
                    <Grid container spacing={1} alignItems="center" justify="space-around">
                        <Grid item xs={12} sm="auto">
                            <Button
                                variant="contained"
                                className={classes.donationStatusBtn}
                                style={{ backgroundColor: "yellowgreen" }}
                                onClick={() => this.props.handleDonationStatusBtn(12, personDetails, donationDetails)}
                            >
                                Donation Successful
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Button
                                variant="contained"
                                className={classes.donationStatusBtn}
                                style={{ backgroundColor: "orangered" }}
                                onClick={() => this.props.handleDonationStatusBtn(13, personDetails, donationDetails)}

                            >
                                Donation Unsuccessful
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <Button
                                variant="contained"
                                className={classes.donationStatusBtn}
                                style={{ backgroundColor: "orange" }}
                                onClick={() => this.props.handleDonationStatusBtn(14, personDetails, donationDetails)}

                            >
                                Requirement Already Fulfilled
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(DonationStatus);