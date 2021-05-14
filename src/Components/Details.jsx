import {
    Grid,
    Paper,
    TextField,
    withStyles,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Typography,
    Switch,
    Hidden
} from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const styles = theme => ({
    paper: {
        marginTop: 5,
        padding: 20,
    },
    formField: {
        width: 280
    },
    registerBtn: {
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 12,
        paddingBottom: 12
    }
});

class Details extends Component {
    state = {
        formData: {
            name: "",
            contact: "",
            shareContact: false,
            bg: "",
            street: "",
            city: "",
            pincode: "",
            state: "",
            datePositive: new Date(),
            dateNegative: new Date(),
            dateOfRequirement: new Date()
        }
    }

    handleChange = (event, status) => {
        var { formData } = this.state
        var change = null
        if (event.target) {
            change = event.target.value
        }
        else {
            change = event
        }
        if (status === 0)
            formData.name = change;
        else if (status === 1)
            formData.contact = change;
        else if (status === 2)
            formData.shareContact = !formData.shareContact
        else if (status === 3)
            formData.bg = change
        else if (status === 4)
            formData.street = change
        else if (status === 5)
            formData.pincode = change
        else if (status === 6)
            formData.city = change
        else if (status === 7)
            formData.state = change
        else if (status === 8)
            formData.datePositive = change
        else {
            if (this.props.isDoner) {
                formData.dateNegative = change
                formData.dateOfRequirement = ""
            }
            else {
                formData.dateOfRequirement = change
                formData.dateNegative = ""
            }
        }
        this.setState({
            formData
        })
    }


    handleRegister = () => {
        console.log("Donor: " + this.props.isDoner + ", registered: ", this.state.formData);
    }

    render() {
        const { classes, isDoner } = this.props
        var person = ""
        if (isDoner)
            person = "Donor"
        else
            person = "Patient"
        return (
            <React.Fragment>
                <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ fontWeight: "bold", fontSize: 20 }}
                >
                    Personal Details
                </Typography>
                <Paper className={classes.paper}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                className={classes.formField}
                                label={`${person}'s Name`}
                                id="name"
                                value={this.state.formData.name}
                                placeholder={`Please enter ${person}'s Name`}
                                variant="outlined"
                                size="small"
                                onChange={(e) => this.handleChange(e, 0)}
                            />

                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item>

                                <TextField
                                    className={classes.formField}
                                    label={`${person}'s Contact`}
                                    id="contact"
                                    value={this.state.formData.contact}
                                    placeholder={`Please enter ${person}'s Contact`}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => this.handleChange(e, 1)}

                                />
                            </Grid>
                            {isDoner ? (
                                <Grid item>
                                    <Switch
                                        checked={this.state.formData.shareContact}
                                        onChange={(e) => this.handleChange(e, 2)}
                                        name="shareContact"
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                    <Typography variant="caption">Share your contact with patients?</Typography>
                                </Grid>
                            ) : (undefined)}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formField} size="small">
                                <InputLabel id="bgLabel">Blood Group</InputLabel>
                                <Select
                                    labelId="bgLabel"
                                    id="bg"
                                    value={this.state.formData.bg}
                                    onChange={(e) => this.handleChange(e, 3)}
                                    label="Blood Group"
                                >
                                    <MenuItem value={"A+"}>A+</MenuItem>
                                    <MenuItem value={"A-"}>A-</MenuItem>
                                    <MenuItem value={"B+"}>B+</MenuItem>
                                    <MenuItem value={"B-"}>B-</MenuItem>
                                    <MenuItem value={"O+"}>O+</MenuItem>
                                    <MenuItem value={"O-"}>O-</MenuItem>
                                    <MenuItem value={"AB+"}>AB+</MenuItem>
                                    <MenuItem value={"AB+"}>AB-</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
                <br></br>
                <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ fontWeight: "bold", fontSize: 20 }}
                >
                    {`${person}'s Address`}
                </Typography>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>


                        <Grid item container spacing={2} alignItems="center">
                            <Grid item >
                                <TextField
                                    className={classes.formField}
                                    label="Street"
                                    id="street"
                                    value={this.state.formData.street}
                                    placeholder="Please enter street"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => this.handleChange(e, 4)}

                                />

                            </Grid>
                            <Grid item >
                                <TextField
                                    className={classes.formField}
                                    label="Pincode"
                                    id="pincode"
                                    value={this.state.formData.pincode}
                                    placeholder="Please enter Pincode"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => this.handleChange(e, 5)}

                                />
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2} alignItems="center">

                            <Grid item >
                                <TextField
                                    className={classes.formField}
                                    label="City"
                                    id="city"
                                    value={this.state.formData.city}
                                    placeholder="Please enter City"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => this.handleChange(e, 6)}

                                />
                            </Grid>
                            <Grid item >
                                <TextField
                                    className={classes.formField}
                                    label="State"
                                    id="state"
                                    value={this.state.formData.state}
                                    placeholder="Please enter State"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => this.handleChange(e, 7)}

                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <br></br>
                <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ fontWeight: "bold", fontSize: 20 }}
                >
                    Medical Details
                </Typography>
                <Paper className={classes.paper}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container spacing={2}>


                            <Grid item container spacing={1} alignItems="center">
                                <Grid item >
                                    <Typography>Date tested +ve &nbsp;&nbsp;&nbsp;</Typography>
                                </Grid>
                                <Grid item >

                                    <KeyboardDatePicker
                                        inputVariant="outlined"
                                        style={{ marginTop: 3 }}
                                        className={classes.formField}
                                        margin="normal"
                                        id="testPositive"
                                        format="dd MMM, yyyy"
                                        size="small"
                                        value={this.state.formData.datePositive}
                                        onChange={(e) => this.handleChange(e, 8)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={1} alignItems="center">

                                <Grid item >
                                    {isDoner ? (

                                        <Typography>Date tested -ve &nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                    ) : (
                                        <>
                                            <Hidden smDown>

                                                <Typography style={{ marginRight: 39 }}>Date of <br></br>Requirement</Typography>
                                            </Hidden>
                                            <Hidden mdUp>

                                                <Typography style={{ marginRight: 39 }}>Date of Requirement</Typography>
                                            </Hidden>
                                        </>
                                    )}

                                </Grid>
                                <Grid item >
                                    <KeyboardDatePicker
                                        inputVariant="outlined"
                                        size="small"
                                        style={{ marginTop: 3 }}
                                        className={classes.formField}

                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="dd MMM, yyyy"
                                        value={isDoner ? this.state.formData.dateNegative : this.state.formData.dateOfRequirement}
                                        onChange={(e) => this.handleChange(e, 9)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.registerBtn}
                                    onClick={() => this.props.onRegister()}
                                >
                                    Register as {`${person}`}
                                </Button>
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Paper>




            </React.Fragment>

        );
    }
}

export default withStyles(styles)(Details);