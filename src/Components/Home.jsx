import React, { Component } from "react";

import {
  withStyles,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

const styles = theme => ({
  table: {
    overflowX: "auto",
    [theme.breakpoints.up("xs")]: {
      width: 280
    },
    [theme.breakpoints.up("sm")]: {
      width: 400
    },
    [theme.breakpoints.up("md")]: {
      width: 600
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%"
    }
  }
});
class Home extends Component {
  state = {
    issueDetailsHeading: [
      "Sr No.",
      "Gr No.",
      "Book Id",
      "Book name",
      "Issued By",
      "Booked time",
      ""
    ],
    issueDetails: [
      {
        bookID: 1,
        userID: "10000",
        bookName: "The Alchemist",
        studName: "Parth Sangahvi",
        bookTimeStamp: "1/1/1999"
      },
      {
        bookID: 2,
        userID: "20000",
        bookName: "Revolution 2020",
        studName: "XYZ",
        bookTimeStamp: "1/1/1999"
      }
    ],

    loading: false
  };

  render() {
    // if (this.state.loading) {
    //   return <Loading />;
    // }
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ fontWeight: "bold", fontSize: 15, letterSpacing: 3 }}
        >
          BOOKING
        </Typography>
        <br></br>
        <br></br>

        <Typography variant="h4" style={{ fontSize: 25, letterSpacing: 2 }}>
          Today's Bookings
        </Typography>
        <br></br>

        <Paper
          className={classes.table}
          style={{ padding: 10, borderRadius: 5 }}
        >
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  {this.state.issueDetailsHeading.map((heading, idx) => (
                    <TableCell>{heading}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.issueDetails.map((i, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{i.userID}</TableCell>
                    <TableCell>{i.bookID}</TableCell>
                    <TableCell>{i.bookName}</TableCell>
                    <TableCell>{i.studName}</TableCell>
                    <TableCell>
                      {i.bookTimeStamp === "0001-01-01T00:00:00Z"
                        ? "---"
                        : new Date(i.bookTimeStamp).toDateString() +
                          " " +
                          new Date(i.bookTimeStamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true
                            }
                          )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "secondary", color: "white" }}
                        onClick={() => {
                          alert(i.bookName + " issued by " + i.studName + ".");
                        }}
                      >
                        Issue Book
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
