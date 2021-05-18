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
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";
import config from "./config";
import DonationStatus from "./DonationStatus";
import ErrorIcon from "@material-ui/icons/ErrorOutlineRounded";
import Loading from "./Loading";


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
        activeDonation: false,
        donationStatus: {
            msg: "",
            status: 0,
            color: ""
        },
        confirmationStatusDialog: false,
        loading: true,
        loadingMsg: "Fetching your donations..."
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
                    activeDonation,
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err.response.data);
            alert("Some Error occured!");
            window.location.reload();
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

    getDonationStatusHeader = () => {
        var { activeDonation } = this.state;
        var color = "red";
        var msg = "A Patient is waiting for you!";
        if (!activeDonation) {
            color = "green";
            msg = "Currently there are no donations in your calender."
        }

        return (
            <Grid container alignItems="center" justify="center" style={{ border: `2px solid ${color}`, padding: 7, marginBottom: 10 }}>
                <Grid item >
                    <ErrorIcon style={{ height: 40, width: 40, color: color, marginBottom: 0, marginRight: 10 }}></ErrorIcon>
                </Grid>
                <Grid item >
                    <Typography variant="h6" style={{ whiteSpace: "pre-wrap" }}>{msg}</Typography>
                </Grid>
            </Grid>
        )
    }

    getDonationStatusComponent = (status) => {
        var status = this.getDonationStatus(status);
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
    }

    render() {
        var { classes } = this.props
        if (this.state.loading) {
            return (
                <Loading loading={this.state.loading} msg={this.state.loadingMsg}></Loading>
            );
        }
        return (
            <React.Fragment>
                <>
                    {this.getDonationStatusHeader()}
                    {this.state.activeDonation && this.state.patientDetails.Receiver_Details &&
                        <DonationStatus
                            personDetails={this.state.patientDetails.Receiver_Details}
                            donationDetails={this.state.patientDetails.Donation_Details}
                            isDonor={true}
                            handleDonationStatusBtn={this.handleDonationStatusBtn}
                        ></DonationStatus>
                    }
                </>

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
                                    <StyledTableCell>{this.getDonationStatusComponent(donation.Donation_Details.Status)}</StyledTableCell>
                                    {/* <StyledTableCell>{this.getDonationStatus(donation.Donation_Details.Status).msg}</StyledTableCell> */}
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