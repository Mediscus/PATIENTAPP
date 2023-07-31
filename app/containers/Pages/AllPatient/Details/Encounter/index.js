import React from "react";
import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Summary from "../Summary";
import { PatientEncounter } from "dan-components";
import { Box, Button } from "@mui/material";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';

const drawerWidth = 240 + 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    marginTop: '10px'
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerContent: {
    height: "3300px",
    overflowX: "scroll",
  },
  drawerPaper: {
    width: drawerWidth,
    position: "relative",
    height: "3355px",
    borderRadius: "10px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    borderRadius: "10px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    width: 100 % -drawerWidth,
  },
  contentShift: {
    borderRadius: "10px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Encounter(props) {
  const { data } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Current Visit Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <div className={classes.drawerContent}>
          <Summary encounter={true} add={false} visible={0} />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <Button style={{ margin: 5 }} variant="contained" color="primary" endIcon={<SaveOutlinedIcon />}>Save</Button>
          <Button
            style={{ margin: 5 }}
            variant="contained"
            endIcon={<FingerprintOutlinedIcon />}>Sign</Button>
          <Button style={{ margin: 5 }} variant="contained" color="secondary" endIcon={<PrintOutlinedIcon />}>Print</Button>
          <Button style={{ margin: 5 }} variant="contained" color="inherit" endIcon={<ShareOutlinedIcon />}>Share</Button>
        </Box>
        <PatientEncounter encounterData={data} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <Button style={{ margin: 5 }} variant="contained" color="primary" endIcon={<SaveOutlinedIcon />}>Save</Button>
          <Button
            style={{ margin: 5 }}
            variant="contained"
            endIcon={<FingerprintOutlinedIcon />}>Sign</Button>
          <Button style={{ margin: 5 }} variant="contained" color="secondary" endIcon={<PrintOutlinedIcon />}>Print</Button>
          <Button style={{ margin: 5 }} variant="contained" color="inherit" endIcon={<ShareOutlinedIcon />}>Share</Button>
        </Box>
      </main>
    </div>
  );
}
