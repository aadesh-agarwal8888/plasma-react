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
            name: "XYZ",
            location: "Address XYZ",
            bg: "A+ (A-Positive)",
            contact: "11111111",
            requiredDate: new Date()
        },
        patientsTableHeader: ["Patient Name", "Patient Location", "Donation Date"],
        patients: [
            {
                name: "XYZ",
                location: "Address XYZ",
                bg: "A+ (A-Positive)",
                contact: "11111111",
                requiredDate: new Date()
            },
            {
                name: "XYZ",
                location: "Address XYZ",
                bg: "A+ (A-Positive)",
                contact: "11111111",
                requiredDate: new Date()
            },
            {
                name: "XYZ",
                location: "Address XYZ",
                bg: "A+ (A-Positive)",
                contact: "11111111",
                requiredDate: new Date()
            },
            {
                name: "XYZ",
                location: "Address XYZ",
                bg: "A+ (A-Positive)",
                contact: "11111111",
                requiredDate: new Date()
            },
        ],
        activeDonation: true,
        donationStatus: {
            msg: "",
            status: 0
        },
        confirmationStatusDialog: false
    }

    handleDonationStatusBtn = (status) => {
        var { donationStatus, confirmationStatusDialog } = this.state
        confirmationStatusDialog = true
        donationStatus.status = status
        switch (status) {
            case 0: donationStatus.msg = "DONATION SUCCESSFUL"
                break;
            case 1: donationStatus.msg = "DONATION UNSUCCESSFUL"
                break;
            case 2: donationStatus.msg = "REQUIREMENT ALREADY FULFILLED"
                break;
        }

        this.setState({ donationStatus, confirmationStatusDialog })
    }

    handleConfirmationStatus = () => {
        console.log("Donation Status: ", this.state.donationStatus);
        this.setState({ activeDonation: false, confirmationStatusDialog: false })
    }
    render() {
        var { classes } = this.props
        return (
            <React.Fragment>
                {this.state.activeDonation &&
                    <React.Fragment>
                        <Grid container alignItems="center" justify="center" style={{ border: "2px solid red", padding: 7, marginBottom: 10 }}>
                            <Grid item >
                                <ErrorIcon style={{ height: 40, width: 40, color: "red", marginBottom: 0, marginRight: 10 }}></ErrorIcon>
                            </Grid>
                            <Grid item >

                                <Typography variant="h6" style={{ whiteSpace: "pre-wrap" }}>{"A patient is waiting for you!"}</Typography>
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
                                            {this.state.patientDetails.name}
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
                                            {this.state.patientDetails.location}
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
                                            {this.state.patientDetails.bg}
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
                                            {this.state.patientDetails.requiredDate.toDateString()}
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
                                        onClick={() => this.handleDonationStatusBtn(0)}
                                    >
                                        Donation Successful
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        variant="contained"
                                        className={classes.donationStatusBtn}
                                        style={{ backgroundColor: "orangered" }}
                                        onClick={() => this.handleDonationStatusBtn(1)}

                                    >
                                        Donation Unsuccessful
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Button
                                        variant="contained"
                                        className={classes.donationStatusBtn}
                                        style={{ backgroundColor: "orange" }}
                                        onClick={() => this.handleDonationStatusBtn(2)}

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

                                {this.state.patientsTableHeader.map((head, id) => (
                                    <StyledTableCell key={id}>{head}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.patients.map((patient, id) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell>{patient.name}</StyledTableCell>
                                    <StyledTableCell>{patient.location}</StyledTableCell>
                                    <StyledTableCell>{patient.requiredDate.toDateString()}</StyledTableCell>
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