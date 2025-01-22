import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Info from "@mui/icons-material/Info";
import Warning from "@mui/icons-material/Warning";
import Check from "@mui/icons-material/CheckCircle";
import Error from "@mui/icons-material/RemoveCircle";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import dummy from "dan-api/dummy/dummyContents";
import messageStyles from "dan-styles/Messages.scss";
import avatarApi from "dan-api/images/avatars";
import link from "dan-api/ui/link";
import styles from "./header-jss";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "dan-redux/actions/loginAndRegister";
import {
  expireCookie,
  getCookieData,
  setCookieData,
} from "../Common/storageFun";
import { SET_IS_OPEN_FAMILY_MEMBERS_MODAL } from "../../redux/constants/reduxFormConstants";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import IMG1 from "../../assets/men1-illustration.png";
import IMG2 from "../../assets/men2-illustration.png";
import IMG3 from "../../assets/old-man-illustration.png";
import IMG4 from "../../assets/old-women-illustration.png";
import IMG5 from "../../assets/young-women-illustration.png";
import "./style.css";
import moment from "moment";
import { changeLoggedInUser } from "../../containers/Pages/My Family/FamilyMemberAction";

function UserMenu(props) {
  const { classes, dark } = props;
  const dispatch = useDispatch();
  const userDetails = getCookieData("userDetails");
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null,
  });
  const { anchorEl, openMenu } = menuState;

  const [isSelectFamMember, setIsSelectFamMember] = useState(false);
  const avatarImg = [IMG1, IMG4, IMG3, IMG2, IMG5];
  const { familyMembersList, familyMemberListLoader } = useSelector(
    (state) => state.familyMembers
  );
  const { loggedInUser } = useSelector((state) => state.login);

  const handleMenu = (menu) => (event) => {
    const { openMenu } = menuState;
    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget,
    });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const handleLogOut = () => {
    setMenuState({ anchorEl: null, openMenu: null });
    dispatch(userLogout());
    expireCookie("authToken");
    expireCookie("refreshToken");
  };

  return (
    <div>
      <IconButton
        aria-haspopup="true"
        onClick={handleMenu("notification")}
        color="inherit"
        className={classNames(
          classes.notifIcon,
          dark ? classes.dark : classes.light
        )}
        size="large"
      >
        <Badge className={classes.badge} badgeContent={4} color="secondary">
          <i className="ion-ios-notifications-outline" />
        </Badge>
      </IconButton>
      <Menu
        id="menu-notification"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
        open={openMenu === "notification"}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageInfo}>
            <ListItemAvatar>
              <Avatar alt="User Name" src={avatarApi[0]} />
            </ListItemAvatar>
            <ListItemText
              primary={dummy.text.subtitle}
              secondary={dummy.text.date}
            />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageInfo}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Info />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={dummy.text.sentences}
              className={classes.textNotif}
              secondary={dummy.text.date}
            />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Check />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={dummy.text.subtitle}
              className={classes.textNotif}
              secondary={dummy.text.date}
            />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageWarning}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Warning />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={dummy.text.subtitle}
              className={classes.textNotif}
              secondary={dummy.text.date}
            />
          </div>
        </MenuItem>
        <Divider variant="inset" />
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageError}>
            <ListItemAvatar>
              <Avatar className={messageStyles.icon}>
                <Error />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Suspendisse pharetra pulvinar sollicitudin. Aenean ut orci eu odio cursus lobortis eget tempus velit. "
              className={classes.textNotif}
              secondary="Jan 9, 2016"
            />
          </div>
        </MenuItem>
      </Menu>
      <Button onClick={handleMenu("user-setting")}>
        <Avatar alt={dummy.user.name} src={dummy.user.avatar} />{" "}
        <IconButton>
          {menuState.openMenu ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Button>
      <Menu
        id="menu-appbar"
        PaperProps={{ sx: { width: "500px" } }}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: "top",
        //   horizontal: "right",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "right",
        // }}
        open={openMenu === "user-setting"}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to={link.profile}>
          My Profile
        </MenuItem>
        {/* <MenuItem onClick={handleClose} component={Link} to={link.calendar}>My Calendar</MenuItem> */}
        <MenuItem onClick={handleClose} component={Link} to={link.email}>
          My Inbox
          {/*  <ListItemIcon>
            <Badge className={classNames(classes.badge, classes.badgeMenu)} badgeContent={2} color="secondary" />
          </ListItemIcon> */}
        </MenuItem>

        <Accordion
          expanded={isSelectFamMember}
          onChange={() => setIsSelectFamMember(!isSelectFamMember)}
          className="accordition-container"
        >
          <AccordionSummary
            aria-controls="family-member-content"
            id="family-member-header"
          >
            <Box className="main-collapse-container">
              <Typography>Select Family Member</Typography>
              <Box className="collapse-container">
                <Box className="family-avatar-container">
                  {avatarImg.map((img) => (
                    <Avatar
                      alt="fam-avatar"
                      src={img}
                      sx={{ width: 24, height: 24 }}
                    />
                  ))}
                </Box>
                <IconButton>
                  {isSelectFamMember ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {familyMemberListLoader ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress style={{ color: "#fff" }} />
              </Box>
            ) : (
              <>
                <MenuItem
                  className="family-menu-container"
                  onClick={() => changeLoggedInUser(userDetails, dispatch)}
                  sx={{
                    border:
                      loggedInUser.user_id === userDetails.user_id &&
                      "2px solid #013F72",
                  }}
                >
                  <Avatar
                    sx={{
                      border:
                        loggedInUser.user_id === userDetails.user_id &&
                        "2px solid #013f729e",
                    }}
                  >
                    {userDetails.first_name[0]}
                  </Avatar>
                  {userDetails.first_name + " " + userDetails.last_name} (You)
                </MenuItem>
                {familyMembersList.map((familyMember) => (
                  <MenuItem
                    className="family-menu-container"
                    onClick={() => changeLoggedInUser(familyMember, dispatch)}
                    sx={{
                      border:
                        loggedInUser.user_id === familyMember.id &&
                        "2px solid #013F72",
                    }}
                  >
                    <Avatar
                      sx={{
                        border:
                          loggedInUser.user_id === familyMember.id &&
                          "2px solid #013f729e",
                      }}
                    >
                      {familyMember.first_name[0]}
                    </Avatar>
                    {familyMember.first_name + " " + familyMember.last_name}
                  </MenuItem>
                ))}
              </>
            )}

            <MenuItem
              className="family-menu-container"
              onClick={() => {
                handleClose();
                dispatch({
                  type: SET_IS_OPEN_FAMILY_MEMBERS_MODAL,
                  payload: true,
                });
              }}
            >
              <Box className="member-avatar-container">
                <Avatar sx={{ width: 25, height: 25 }}>
                  <Add />
                </Avatar>
              </Box>
              Add Family Member
            </MenuItem>
          </AccordionDetails>
        </Accordion>
        <MenuItem
          onClick={handleLogOut}
          component={Link}
          to={link.changePassword}
        >
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOut} component={Link} to="/">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};

UserMenu.defaultProps = {
  dark: false,
};

export default withStyles(styles)(UserMenu);
