import React, { Component } from "react";
// import Loading from "./Loading";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
// import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import AlarmIcon from "@material-ui/icons/Alarm";
// import CalendarIcon from "@material-ui/icons/CalendarToday";
// import SettingsIcon from "@material-ui/icons/Settings";
// import ReturnIcon from "@material-ui/icons/KeyboardReturn";
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import PersonIcon from "@material-ui/icons/Person";
// import BooksIcon from "@material-ui/icons/Book";
// import Add from "@material-ui/icons/AddBoxRounded";
import FavoriteIcon from '@material-ui/icons/FavoriteRounded';
import RecentActorsIcon from '@material-ui/icons/RecentActorsRounded';
import AccessibleIcon from '@material-ui/icons/AccessibleRounded';
import AccessibilityIcon from '@material-ui/icons/AccessibilityRounded';

import { NavLink } from "react-router-dom";
// import AuthService from "../Auth";
// import logo from "./CompanyLogo.png";
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.03)"
    }
  },
  itemCategory: {
    backgroundColor: "secondary",
    boxShadow: "0 -1px 0 secondary inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  header: {
    fontSize: 24,
    color: theme.palette.common.white,
    paddingTop: 9,
    paddingBottom: 9
  },
  itemActiveItem: {
    color: "#0958a5"
  },
  itemPrimary: {
    fontSize: "inherit"
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2)
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    flexShrink: 0,
    width: "100%",
    backgroundColor: "white"
  },
  logoLink: {
    fontSize: 0,
    alignItems: "center",
    justifyContent: "center",

    //display: "flex"
  },
  logoImage: {
    cursor: "pointer"
  },
  logoDivider: {
    marginBottom: theme.spacing * 2
  }
});

class Navigator extends Component {
  state = {
    categories: [
      /*   
           id: "Return Book",
           icon: <ReturnIcon />,
           route: "/return",
           admin: true
         },
         {
           id: "Books",
           icon: <BooksIcon />,
           route: "/books",
           admin: true
         },
         {
           id: "Students",
           icon: <PersonIcon />,
           route: "/students",
           admin: true
         },
   
         {
           id: "Settings",
           icon: <SettingsIcon />,
           route: "/settings",
           admin: true
         }, */
      // {
      //   id: "Home",
      //   icon: <HomeIcon />,
      //   route: "/home",
      //   admin: true,
      //   parent: false
      // },
      {
        id: "I'm a Donor ",
        icon: <AccessibilityIcon />,
        admin: true,
        parent: true,
        open: true,
        children: [
          {
            id: "My Donations",
            icon: <RecentActorsIcon />,
            route: "/donations",
            admin: true,
          },
          {
            id: "New Donation",
            icon: <FavoriteIcon />,
            route: "/donation/new",
            admin: true,
          },
        ]
      },
      {
        id: "I'm a Receiver ",
        icon: <AccessibleIcon />,
        route: "/receiver",
        admin: true,
        parent: false
      },

    ]
  };


  handleExpand = (index) => {
    var { categories } = this.state
    categories[index].open = !categories[index].open
    this.setState({
      categories
    })
  }

  render() {
    const { classes, ...other } = this.props;

    return (
      <Drawer variant="permanent" {...other}>
        {/* <div className={classes.logoWrapper}>
          <BooksIcon
            style={{ height: 100, width: 100, color: "#FFFFFF" }}
          ></BooksIcon>
          <img src="./CompanyLogo.png" />
        </div> */}
        {/* 
        <div className={classes.logoWrapper}>

          <img
            style={{ width: "70%" }}
            className={classes.logoImage}
          // src={logo}
          />

        </div> */}

        <List disablePadding className={classes.root}>
          <ListItem
            className={clsx(classes.header)}
            style={{
              backgroundColor: "#232f3e"
            }}
          >
            <Grid
              container
              style={{
                width: "100%"
              }}
            >
              <Grid item xs={12} style={{ width: "100%" }} align="center">
                <Typography variant="h6" style={{ letterSpacing: 2 }}>Plasma</Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Typography variant="subtitle2">@ Covid-19 Project 2021</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider className={classes.profileDivider} />

          {this.state.categories.map(({ id, icon, route, parent, children, open }, index) => (
            <React.Fragment key={id}>

              <ListItem
                button
                component={!parent ? NavLink : ""}
                to={!parent ? route : undefined}
                onClick={parent ? () => this.handleExpand(index) : undefined}
                className={classes.item}
                activeClassName={classes.itemActiveItem}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }}
                >
                  {id}
                </ListItemText>
                {parent && (open ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {parent && <Collapse in={open} unmountOnExit>
                <List component="div" disablePadding>
                  {children.map((child, index) => (
                    <React.Fragment key={index} >
                      <Divider className={classes.divider} />
                      <ListItem
                        button
                        component={NavLink}
                        to={child.route}
                        className={classes.item} style={{ paddingLeft: 40 }}
                        activeClassName={classes.itemActiveItem}

                      >
                        <ListItemIcon className={classes.itemIcon}>{child.icon}</ListItemIcon>
                        <ListItemText
                          classes={{
                            primary: classes.categoryHeaderPrimary
                          }}
                        >
                          {child.id}
                        </ListItemText>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>}

              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer >
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);
