import React from "react";
import { Component } from "react";
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
import Details from "./Details";
import DetailsDialog from "./DetailsDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import axios from "axios";
import config from "./config";
import Loading from "./Loading"
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
    fullfilled: {
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 12,
        paddingBottom: 12,
    }
});
class Receiver extends Component {
    state = {
        loading: true,
        registered: false,
        donorsTableHeader: ["Donor Name", "Donor Contact", ""],
        donors: [],
        selectedReceiver: {},
        completeConfirmationDialog: false,
        detailsDialog: false,
        errMsg: "",
        loadingMsg: "Checking Registration..."
    }

    componentDidMount() {
        this.checkReceiver();
    }

    checkReceiver = () => {
        return axios.get(`${config.baseUrl}/home/receiver`).then(res => {
            this.setState({
                registered: res.data.registered,
            })
            if (res.data.registered) {
                this.setState({
                    loadingMsg: "Fetching donor list...",
                })
                axios.get(`${config.baseUrl}/home/receiver/find-donors`).then(res => {

                    this.setState({
                        donors: res.data ? res.data : [],
                        loading: false
                    })

                }).catch(err => {
                    this.setState({
                        errMsg: err.response.data,
                        loading: false
                    })
                    console.log("error fetching receivers: ", err);
                })
            }
            else {

                this.setState({
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false
            })
            window.location.reload()
        })
    }

    selectReceiver = (receiver) => {
        var { selectedReceiver, detailsDialog } = this.state
        selectedReceiver = receiver
        detailsDialog = true
        this.setState({
            selectedReceiver,
            detailsDialog
        })
    }

    handleDetailsDialogClose = () => {
        var { detailsDialog } = this.state
        detailsDialog = false
        this.setState({
            detailsDialog
        })
    }

    handleCompleteConfirmation = () => {
        console.log("Dont want plasma anymore.");
        this.setState({
            completeConfirmationDialog: false
        })
    }
    onRegister = (details) => {
        console.log("Doner details: ", details);
        axios.post(`${config.baseUrl}/home/receiver`, details).then(res => {
            console.log(res);
            this.setState({ registered: true })
        }).catch(err => {
            console.log(err.response.data);
            alert("Error occured. Please try again fater some time.")
        })
    }


    render() {
        const { classes } = this.props

        if (this.state.loading) {
            return (
                <Loading loading={this.state.loading} msg={this.state.loadingMsg}></Loading>
            );
        }


        return (
            <React.Fragment>
                {!this.state.registered ? (

                    <Details
                        isDoner={false}
                        onRegister={this.onRegister}

                    ></Details>
                ) : (
                    <>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            style={{ fontWeight: "bold", fontSize: 20 }}
                        >
                            Doners ready to donate.
                </Typography>
                        <TableContainer component={Paper} style={{ marginTop: 18 }}>

                            <Table>
                                <TableHead>
                                    <TableRow>

                                        {this.state.donorsTableHeader.map((head, id) => (
                                            <StyledTableCell key={id}>{head}</StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.donors.length !== 0 ? (

                                        this.state.donors.map((donor, id) => (
                                            <StyledTableRow key={id}>
                                                <StyledTableCell>{donor.Name}</StyledTableCell>
                                                <StyledTableCell>{donor.Contact}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Button
                                                        color="primary" style={{ textDecoration: "underline" }}
                                                        onClick={() => this.selectReceiver(donor)}
                                                    >
                                                        View Donor Details
                                                   </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    ) : (
                                        <StyledTableRow key={"noDonor"} style={{ textTransform: "capitalize" }}>
                                            {this.state.errMsg !== "" ? this.state.errMsg : "No Donors Found"}
                                        </StyledTableRow>
                                    )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container style={{ marginTop: 20 }}>
                            <Grid item xs={12} align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.fullfilled}
                                    onClick={() => this.setState({
                                        completeConfirmationDialog: true
                                    })}
                                >
                                    Requirement Completed
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
                {this.state.detailsDialog &&
                    <DetailsDialog
                        setDetailsDialog={this.state.detailsDialog}
                        closeDialog={this.handleDetailsDialogClose}
                        isDoner={false}
                        details={this.state.selectedReceiver}
                    >
                    </DetailsDialog>}
                {this.state.completeConfirmationDialog &&
                    <ConfirmationDialog
                        setConfirmationDialog={this.state.completeConfirmationDialog}
                        onCancel={() => { this.setState({ completeConfirmationDialog: false }) }}
                        onConfirm={this.handleCompleteConfirmation}
                        title={"Requirement Completed Confirmation"}
                        message={"Is your requirement for plasma complete?\nPlease hit confirm to proceed."}
                    >
                    </ConfirmationDialog>}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Receiver);