import React from "react";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  DialogActions,
  DialogContent,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  footerBg: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    padding: `${theme.spacing(1)}px ${theme.spacing(5)}px`,
  },
}));

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function FullModal(props) {
  const { title, children, showModal, handleClose, handleSave, btnLabel } = props;
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={showModal}
      onClose={handleClose}
      TransitionComponent={Transition}
    //scroll={scroll}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {/*  {btnLabel &&
            <Button autoFocus color="inherit" onClick={() => handleSave()}>
              {btnLabel}&nbsp;&nbsp;&nbsp;
              <SendIcon />
            </Button>
          } */}
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
}

FullModal.propTypes = {
  showModal: PropTypes.bool,
};

FullModal.defaultProps = {
  showModal: false,
};

export default FullModal;
