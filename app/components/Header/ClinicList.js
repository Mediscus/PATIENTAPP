import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { Menu, MenuItem, ListItemText, Avatar, ListItemAvatar, Chip, Divider } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { dataApi } from "dan-api/dummy/ClinicData";
import styles from "./header-jss";
import messageStyles from "dan-styles/Messages.scss";

function ClinicList(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [clinicData, setClinicData] = useState(dataApi.slice(0, 4));
  const [clinic, setClinic] = useState({
    clinicName: "Complete Health Clinic",
    address: "xyz Square , near of Shiva Temple",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClinic = (data) => {
    setClinic(data);
    setAnchorEl(null);
  };
  let img =
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80";
  return (
    <div>
      <Chip
        style={{
          backgroundColor: "transparent",
          color: "#fff",
          height: "40px",
        }}
        avatar={<Avatar alt="Natacha" src={img} />}
        label={clinic.clinicName}
        onDelete={handleClick}
        variant="default"
        deleteIcon={<ArrowDropDownIcon style={{ color: "#fff" }} />}
      />
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {clinicData.map((data, ind) => {
          return (
            <>
              <MenuItem key={ind} onClick={() => handleClinic(data)}>
                <div className={messageStyles.messageInfo}>
                  <ListItemAvatar>
                    <Avatar alt="User Name" src={img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.clinicName}
                    secondary={data.address}
                  />
                </div>
              </MenuItem>
              <Divider variant="inset" />
            </>
          );
        })}
      </Menu>
    </div>
  );
}

export default withStyles(styles)(ClinicList);
