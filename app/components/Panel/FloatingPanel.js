import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import classNames from "classnames";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandIcon from "@mui/icons-material/CallMade";
import MinimizeIcon from "@mui/icons-material/CallReceived";
import { useTheme } from "@mui/material/styles";
import styles from "./panel-jss";
import { Box, useMediaQuery } from "@mui/material";
import useWindowDimensions from "dan-utils/useWindowDimensions";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function FloatingPanel(props) {
  const [expanded, setExpanded] = useState(false);
  const [ToggleHelper, setToggleHelper] = useState(false);
  // const { height } = useWindowDimensions();

  const {
    classes,
    openForm,
    closeForm,
    children,
    branch,
    title,
    extraSize,
    width,
    helper,
    helperComponent,
  } = props;

  const toggleExpand = () => {
    setExpanded((expand) => !expand);
  };

  const toggleHelper = () => {
    setToggleHelper(!ToggleHelper);
  };
  // function isWidthDown() {
  //   const theme = useTheme();
  //   // console.log(useMediaQuery(theme.breakpoints.down('sm')))
  //   // return ;
  // }

  // useEffect(() => {
  //   isWidthDown()
  // }, [])
  

  return (
    <Box>
      <div
        className={classNames(
          classes.formOverlay,
          openForm && (false || expanded)
            ? classes.showForm
            : classes.hideForm
        )}
      />
      <div
        className={classNames(
          !openForm ? classes.hideForm : classes.showForm,
          expanded ? classes.expanded : "",
          classes.floatingFormContainer,
          extraSize && classes.large
        )}
      >
        {helper && (
          <div className={classNames(classes.floatingFormHelper)}>
            <div className={classes.drawerButton} onClick={toggleHelper}>
              &nbsp;
            </div>
            <section
              className={classNames(
                classes.floatingFormHelperSection,
                classes.formTheme,
                ToggleHelper
                  ? classes.showHelperSection
                  : classes.hideHelperSection
              )}
              style={{ height: "100vh" - 50 }}
            >
              <div className={classNames(classes.floatingFormHelperContent)}>
                {helperComponent}
              </div>
            </section>
          </div>
        )}

        <section
          className={classNames(classes.floatingForm, classes.formTheme)}
        >
          <header>
            {title}
            <div className={classes.btnOpt}>
              <Tooltip title={expanded ? "Exit Full Screen" : "Full Screen"}>
                <IconButton
                  className={classes.expandButton}
                  onClick={() => toggleExpand()}
                  aria-label="Expand"
                  size="large">
                  {expanded ? <MinimizeIcon /> : <ExpandIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton
                  className={classes.closeButton}
                  onClick={() => closeForm(branch)}
                  aria-label="Close"
                  size="large">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </header>
          {children}
        </section>
      </div>
    </Box>
  );
}

FloatingPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  branch: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  title: PropTypes.string,
  extraSize: PropTypes.bool,
  helper: PropTypes.bool.isRequired,
  helperComponent: PropTypes.node,
};

FloatingPanel.defaultProps = {
  title: "Add New Item",
  extraSize: false,
  helper: false,
  branch: "Hello",
};

const FloatingPanelResponsive = withWidth()(FloatingPanel);
export default withStyles(styles)(FloatingPanelResponsive);
