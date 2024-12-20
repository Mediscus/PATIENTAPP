import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import styles from './appStyles-jss';

function Outer(props) {
  const {
    classes,
    children,
    gradient,
    decoration
  } = props;
  return (
    <div className={classNames(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
      <main className={classes.outerContent} id="mainContent">
        { decoration && <div className={classes.petal} /> }
        {children}
      </main>
    </div>
  );
}

Outer.propTypes = {
  classes: PropTypes.object.isRequired,
  gradient: PropTypes.bool.isRequired,
  decoration: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  gradient: state.ui.gradient,
  decoration: state.ui.decoration,
});

const OuterMaped = connect(
  mapStateToProps,
)(Outer);

export default (withStyles(styles)(OuterMaped));
