import * as React from "react";
import PropTypes from 'prop-types';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Stack justifyContent={"center"} spacing={2} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
      )}
    </>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  isLoading: false
};

export default Loader;
