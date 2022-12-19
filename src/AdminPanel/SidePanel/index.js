import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CategoryIcon from "@material-ui/icons/Category";
import ProductIcon from "@material-ui/icons/GolfCourseRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Components/ReducersActions/Actions";

const listofLinks = [
  {
    displayText: "Category",
    path: "/admin/categories",
    icon: <CategoryIcon htmlColor="white" />,
  },
  {
    displayText: "Products",
    path: "/admin/products",
    icon: <ProductIcon htmlColor="white" />,
  },
];

const useStyles = makeStyles({
  listIcon: {
    paddingRight: "8px",
    color: "red",
  },

  drawerRoot: {
    "& .MuiPaper-root": {
      width: "270px",
      backgroundColor: "rgb(214, 0, 52)",
    },
  },
  listItem: {
    textAlign: "center",
    color: "white",
    "& a": {
      color: "white",
      marginLeft: "8px",
      textTransform: "uppercase",
      "& .MuiTypography-root": {
        fontSize: "13px",
      },
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },

  // AVATAR
  avatarBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "16px 0",
  },
  avatarRoot: {
    width: "60px",
    height: "60px",
  },
  logoutButton: {
    textAlign: "center",
    width: "100%",
    margin: "15px 0 15px 0px",
    "& button": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      color: "white",
      fontSize: "20px",
      marginTop: "3px",
    },
    "& svg": {
      fill: "white",
      marginTop: "-5px",
    },
  },
});

export default function SidePanel() {
  const classes = useStyles();
  const dispatch = useDispatch();

  let [count, setCount] = useState(0);

  const onLinkClick = () => {
    setCount(count + 1);
  };

  const logout = () => {
    window.localStorage.removeItem("meezam");
    dispatch(logoutAction());
  };

  return (
    <div>
      {/* DRAWER==================> */}
      <Drawer
        classes={{ root: classes.drawerRoot }}
        variant="permanent"
        open={true}
      >
        <div className={classes.avatarBox}>
          <Avatar
            classes={{ root: classes.avatarRoot }}
            sizes="90px"
            alt="meezam Impax"
            src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
          />
        </div>
        <div className={classes.logoutButton}>
          <ExitToAppIcon />
          <button onClick={logout}> Logout </button>
        </div>
        <Divider />

        <List>
          {listofLinks.map((link, index) => (
            <ListItem
              key={`nav-link-${index}`}
              selected={link.path === window.location.pathname ? true : false}
              className={classes.listItem}
            >
              <CategoryIcon classes={{ root: classes.listItem }} />{" "}
              <NavLink
                onClick={onLinkClick}
                activeClassName={classes.activeClassName}
                to={link.path}
              >
                {" "}
                <ListItemText primary={link.displayText} />{" "}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
