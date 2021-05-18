import axios from "axios";
import React, { Component } from "react";
import config from "./config";
import DonationStatus from "./DonationStatus";
import ErrorIcon from "@material-ui/icons/ErrorOutlineRounded"
import {
    withStyles,
    Typography,
    Grid,

} from "@material-ui/core";
import ConfirmationDialog from "./ConfirmationDialog";
import Loading from "./Loading";
class MyDonors extends Component {
    state = {
        donorDetails: [],
        selectedDonor: {
            Donation_Details: {},
            Donor_Details: {}
        },
        donationStatus: {
            msg: "",
            status: 0,
            color: ""
        },
        confirmationStatusDialog: false,
        loading: true,
        loadingMsg: "Fetching awaiting donors..."
    }

    componentDidMount() {
        this.getMyDonors();
    }

    getMyDonors = () => {
        axios.get(`${config.baseUrl}/home/receiver/my-donors`).then(res => {

            if (res.data) {
                var { donorDetails } = this.state;
                donorDetails = res.data;
                this.setState({ donorDetails })
            }
            this.setState({ loading: false })
        }).catch(err => {
            console.log(err.response.data);
            this.setState({ loading: false })
            alert("Error fetching current donors.")
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

    handleDonationStatusBtn = (status, personDetails, donationDetails) => {
        var { donationStatus, confirmationStatusDialog, selectedDonor } = this.state
        confirmationStatusDialog = true
        donationStatus = this.getDonationStatus(status);
        selectedDonor.Donor_Details = personDetails;
        selectedDonor.Donation_Details = donationDetails

        this.setState({ selectedDonor })
        this.setState({ donationStatus, confirmationStatusDialog })
    }

    getDonationStatusHeader = () => {
        var { donorDetails } = this.state;
        var length = donorDetails.length
        var color = "red";
        var msg = "Donors are waiting for you!";
        if (length == 0) {
            color = "";
            msg = "Sorry! Currently no Donors available."
        }
        else if (length == 1) {
            msg = "A Donor is waiting for you!"
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
    handleConfirmationStatus = () => {
        var { selectedDonor, donationDetails, donationStatus } = this.state
        console.log("Selected Donor: ", selectedDonor);
        axios.put(`${config.baseUrl}/home/receiver/my-donors?id=${selectedDonor.Donor_Details.ID}&status=${donationStatus.status}`).then(() => {
            this.getMyDonors();
        }).catch(err => {
            alert("Error Occured. Please try again")
        })
        this.setState({ confirmationStatusDialog: false })
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading loading={this.state.loading} msg={this.state.loadingMsg}></Loading>
            );
        }

        return (
            <React.Fragment>
                <>

                    {this.getDonationStatusHeader()}
                    { this.state.donorDetails.length ? (
                        this.state.donorDetails.map((donor, index) => (
                            <DonationStatus
                                key={index}
                                personDetails={donor.Donor_Details}
                                donationDetails={donor.Donation_Details}
                                isDonor={false}
                                handleDonationStatusBtn={this.handleDonationStatusBtn}
                            ></DonationStatus>
                        ))
                    ) : (undefined)
                    }
                </>
                {this.state.confirmationStatusDialog && <ConfirmationDialog
                    setConfirmationDialog={this.state.confirmationStatusDialog}
                    onCancel={() => { this.setState({ confirmationStatusDialog: false }) }}
                    onConfirm={this.handleConfirmationStatus}
                    title={"Update Confirmation"}
                    message={"Are you sure you want to proceed with\n" + this.state.donationStatus.msg + "?"}
                >
                </ConfirmationDialog>}
            </React.Fragment>
        );
    }
}

export default MyDonors;