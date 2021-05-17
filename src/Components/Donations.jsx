import React, { Component } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    withStyles,
    TableRow,
    Typography,
    Grid,
    Button,

} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutlineRounded"
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";
import config from "./config";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 15,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


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

class Donations extends Component {
    state = {
        patientDetails: {
        },
        donationsTableHeader: ["Patient Name", "Patient Location", "Donation Date", "Status"],
        donations: [],
        activeDonation: true,
        donationStatus: {
            msg: "",
            status: 0,
            color: ""
        },
        confirmationStatusDialog: false
    }

    componentDidMount() {
        this.getpastDonations();
    }

    getpastDonations = () => {
        axios.get(`${config.baseUrl}/home/donor/my-donations`).then(res => {
            if (res.data) {
                var { patientDetails, donations, activeDonation } = this.state;
                donations = res.data;
                if (donations[0].Donation_Details.Status === 11) {
                    patientDetails = donations[0];
                    activeDonation = true;
                    donations.shift();
                }
                this.setState({
                    patientDetails,
                    donations,
                    activeDonation
                })
            }
        })
    }

    getDonationStatus = (status) => {
        switch (status) {
            case 12: return { msg: "DONATION SUCCESSFUL", color: "green", status }
                break;
            case 13: return { msg: "DONATION UNSUCCESSFUL", color: "red", status }
                break;
            case 14: return { msg: "REQUIREMENT ALREADY FULFILLED", color: "orangeRed", status }
                break;
        }
    }

    handleDonationStatusBtn = (status) => {
        var { donationStatus, confirmationStatusDialog } = this.state
        confirmationStatusDialog = true
        donationStatus = this.getDonationStatus(status);
        this.setState({ donationStatus, confirmationStatusDialog })
    }

    handleConfirmationStatus = () => {
        var { donationStatus } = this.state
        console.log("Donation Status: ", donationStatus);
        axios.put(`${config.baseUrl}/home/donor/my-donations?status=${donationStatus.status}`).then(() => {
            this.getpastDonations();
            this.setState({ activeDonation: false, confirmationStatusDialog: false })
        }).catch(err => {
            alert("Error Occured. Please try again")
        })
    }
    render() {
        var { classes } = this.props
        return (
            <React.Fragment>
                {this.state.activeDonation && this.state.patientDetails.Receiver_Details &&
                    <React.Fragment>
                        <Grid container alignItems="center" justify="center" style={{ border: "2px solid red", padding: 7, marginBottom: 10 }}>
                            <Grid item >
                                <ErrorIcon style={{ height: 40, width: 40, color: "red", marginBottom: 0, marginRight: 10 }}></ErrorIcon>
                            </Grid>
                            <Grid item >

                                <Typography variant="h6" style={{ whiteSpace: "pre-wrap" }}>{"A donation is waiting for you!"}</Typography>
                            </Grid>
                        </Grid>
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
                                            {this.state.patientDetails.Receiver_Details.Name}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item container xs={12} spacing={1}>
                                    <Grid item xs={12} sm="auto">
                                        <Typography color="textSecondary" style={{ fontWeight: "bold" }}>
                                            {"Location:"}
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography style={{ fontWeight: "bold" }}>
                                            {`${this.state.patientDetails.Receiver_Details.Address.Street},${this.state.patientDetails.Receiver_Details.Address.City},${this.state.patientDetails.Receiver_Details.Address.State},${this.state.patientDetails.Receiver_Details.Address.Pincode}`}
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
                                            {this.state.patientDetails.Receiver_Details.Blood_Group}
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
                                            {this.state.patientDetails.Donation_Details.Commencement_Date.toString()}
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
                                        onClick={() => this.handleDonationStatusBtn(12)}
                                    >
                                        Donation Successful
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        variant="contained"
                                        className={classes.donationStatusBtn}
                                        style={{ backgroundColor: "orangered" }}
                                        onClick={() => this.handleDonationStatusBtn(13)}

                                    >
                                        Donation Unsuccessful
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        variant="contained"
                                        className={classes.donationStatusBtn}
                                        style={{ backgroundColor: "orange" }}
                                        onClick={() => this.handleDonationStatusBtn(14)}

                                    >
                                        Requirement Already Fulfilled
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </React.Fragment>
                }

                <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ fontWeight: "bold", fontSize: 20 }}
                >
                    My Donations
                 </Typography>
                <TableContainer component={Paper} style={{ marginTop: 10 }}>

                    <Table>
                        <TableHead>
                            <TableRow>

                                {this.state.donationsTableHeader.map((head, id) => (
                                    <StyledTableCell key={id}>{head}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.donations.length != 0 && this.state.donations.map((donation, id) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell>{donation.Receiver_Details.Name}</StyledTableCell>
                                    <StyledTableCell>{`${donation.Receiver_Details.Address.Street},${donation.Receiver_Details.Address.City},${donation.Receiver_Details.Address.State},${donation.Receiver_Details.Address.Pincode}`}</StyledTableCell>
                                    <StyledTableCell>{donation.Donation_Details.Date_Of_Completion}</StyledTableCell>
                                    <StyledTableCell>{() => {
                                        var status = this.getDonationStatus(donation.Donation_Details.Status);
                                        return status.msg;
                                        return (
                                            <Grid container alignItems="center" justify="flex-start" spacing={1} >
                                                <Grid item >
                                                    <span style={{ height: 10, width: 10, backgroundColor: status.color, borderRadius: "50%", display: "inline-block" }}></span>
                                                </Grid>
                                                <Grid item >
                                                    {status.msg}
                                                </Grid>
                                            </Grid>
                                        )
                                    }}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.state.confirmationStatusDialog && <ConfirmationDialog
                    setConfirmationDialog={this.state.confirmationStatusDialog}
                    onCancel={() => { this.setState({ confirmationStatusDialog: false }) }}
                    onConfirm={this.handleConfirmationStatus}
                    title={"Update Confirmation"}
                    message={"Are you sure you want to proceed with\n" + this.state.donationStatus.msg + "?"}
                >
                </ConfirmationDialog>}
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(Donations);