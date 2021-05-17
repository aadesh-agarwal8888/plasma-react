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
    Button
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { Component } from "react";
import AuthService from "../Auth";
import config from "./config";
import Details from "./Details";
import DetailsDialog from "./DetailsDialog";


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

class Donor extends Component {
    state = {
        registered: false,
        patientsTableHeader: ["Patient Name", "Patient Location", "Contact", "Requirement Date", ""],
        patients: [],
        selectedPatient: {},
        detailsDialog: false,
        errMsg: ""
    }

    componentDidMount() {
        this.checkDoner()
    }

    checkDoner = () => {
        return axios.get(`${config.baseUrl}/home/donor`).then(res => {
            this.setState({
                registered: res.data.registered
            })
            if (res.data.registered) {
                axios.get(`${config.baseUrl}/home/donor/find-receivers`).then(res => {
                    if (res.data) {

                        this.setState({
                            patients: res.data
                        })
                    }
                }).catch(err => {
                    this.setState({
                        errMsg: err.response.data
                    })
                    console.log("error fetching doners: ", err);
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }



    selectPatient = (patient) => {
        var { selectedPatient, detailsDialog } = this.state
        selectedPatient = patient
        detailsDialog = true
        this.setState({
            selectedPatient,
            detailsDialog
        })
    }

    handleDetailsDialogClose = () => {
        var { detailsDialog, selectedPatient } = this.state
        detailsDialog = false
        selectedPatient = {}
        this.setState({
            detailsDialog,
            selectedPatient
        })
    }

    onRegister = (details) => {
        console.log("Doner details: ", details);
        axios.post(`${config.baseUrl}/home/donor`, details).then(res => {
            console.log(res);
            this.setState({ registered: true })
        }).catch(err => {
            alert("Error occured. Please try again fater some time.")
        })
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.registered ? (

                    <Details
                        isDoner={true}
                        onRegister={this.onRegister}
                    >

                    </Details>
                ) : (
                    <>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            style={{ fontWeight: "bold", fontSize: 20 }}
                        >
                            Patients who needs your help.
                </Typography>
                        <TableContainer component={Paper} style={{ marginTop: 18 }}>

                            <Table>
                                <TableHead>
                                    <TableRow>

                                        {this.state.patientsTableHeader.map((head, id) => (
                                            <StyledTableCell key={id}>{head}</StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.patients.length != 0 ? (
                                        this.state.patients.map((patient, id) => (
                                            <StyledTableRow key={id}>
                                                <StyledTableCell>{patient.Name}</StyledTableCell>
                                                <StyledTableCell>{`${patient.Address.Street},${patient.Address.City},${patient.Address.State},${patient.Address.Pincode}`}</StyledTableCell>
                                                <StyledTableCell>{patient.Contact}</StyledTableCell>
                                                <StyledTableCell>{patient.Date_Of_Requirement ? patient.Date_Of_Requirement : "---"}</StyledTableCell>

                                                <StyledTableCell>
                                                    <Button
                                                        color="primary"
                                                        style={{ textDecoration: "underline" }}
                                                        onClick={() => this.selectPatient(patient)}
                                                    >
                                                        Donate Plasma
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))

                                    ) : (
                                        <StyledTableRow key={"noReveivers"} style={{ textTransform: "capitalize" }}>
                                            {this.state.errMsg !== "" ? this.state.errMsg : "No receivers Found"}
                                        </StyledTableRow>
                                    )}


                                </TableBody>
                            </Table>
                        </TableContainer>

                    </>
                )}
                {this.state.detailsDialog &&
                    <DetailsDialog
                        setDetailsDialog={this.state.detailsDialog}
                        closeDialog={this.handleDetailsDialogClose}
                        isDoner={true}
                        details={this.state.selectedPatient}
                    >
                    </DetailsDialog>}
            </React.Fragment>
        );
    }
}

export default Donor;