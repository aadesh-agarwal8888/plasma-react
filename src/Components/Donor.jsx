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
import React from "react";
import { Component } from "react";
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
        patientsTableHeader: ["Patient Name", "Patient Location", "Requirement Date", ""],
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
        selectedPatient: {},
        detailsDialog: false
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

    render() {
        return (
            <React.Fragment>
                {!this.state.registered ? (

                    <Details
                        isDoner={true}
                        onRegister={() => { this.setState({ registered: true }) }}
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
                                    {this.state.patients.map((patient, id) => (
                                        <StyledTableRow key={id}>
                                            <StyledTableCell>{patient.name}</StyledTableCell>
                                            <StyledTableCell>{patient.location}</StyledTableCell>
                                            <StyledTableCell>{patient.requiredDate.toDateString()}</StyledTableCell>
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
                                    ))}
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
                        onRegister={() => { this.setState({ registered: true }) }}
                    >
                    </DetailsDialog>}
            </React.Fragment>
        );
    }
}

export default Donor;