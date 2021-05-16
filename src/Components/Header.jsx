import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {
  Button,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import AuthService from "../Auth";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import { theme } from "../App";
import AuthService from "../Auth";
// import { Link } from "react-router-dom";
// import BooksIcon from "@material-ui/icons/MenuBookSharp";
const styles = () => ({
  title: {
    flexGrow: 1,
    letterSpacing: 2,
    [theme.breakpoints.up("xs")]: {
      fontSize: 20,
      padding: 5
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 25,
      padding: 20
    }
  },
  /*logoImage: {
    cursor: "pointer",

    [theme.breakpoints.up("xs")]: {
      height: 40,
      width: 43,
      marginLeft: 10
    },
    [theme.breakpoints.up("md")]: {
      height: 60,
      width: 63,
      marginLeft: 10
    }
  },*/
  logout: {

    fontSize: 15,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 10
    }
  },
  logoutButton: {
    // "&:hover,&:focus": {
    //   backgroundColor:
    // },
    color: "white",
    [theme.breakpoints.down("xs")]: {
      borderRadius: 50
    }
  }
});

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        elevation={0}

      >
        <Toolbar
          style={{
            display: "flex",
            backgroundColor: "primary",
            justifyContent: "space-between"
          }}
        >
          <Hidden smUp>
            <IconButton
              aria-label="Open drawer"
              onClick={onDrawerToggle}
              className={classes.menuButton}
              style={{
                color: "white"
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {/* <Link className={classes.logoLink} to="/home">
            <BooksIcon
              className={classes.logoImage}
              style={{ color: "grey" }}
            ></BooksIcon>
          </Link> */}
          <Hidden mdUp>

            <Typography
              variant="h6"
            >
              Let us fight with COVID together!
          </Typography>
          </Hidden>
          <Hidden smDown>

            <Typography
              variant="h5"
              className={classes.title}
            >
              Let us fight with COVID together!
          </Typography>
          </Hidden>
          <Button className={classes.logoutButton} onClick={() => {
            new AuthService().logout();
          }}
            href="/"
          >
            <PowerIcon
              style={{
                color: "secondary"
              }}
            ></PowerIcon>
            <Typography variant="caption" className={classes.logout}>
              {"Logout"}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}

        color="primary"
        position="static"
        elevation={0}
      >

      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
