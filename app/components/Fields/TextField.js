import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
} from "@mui/material";

const TextField = (props) => {
  const {
    id,
    label,
    value,
    error,
    placeholder,
    helperText,
    onChange,
    onBlur,
    select,
    children,
    fullWidth,
    inputProps,
    ...other
  } = props;
  return (
    <FormControl
      fullWidth={fullWidth}
      variant="standard"
      error={Boolean(error)}
    >
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      {select ? (
        <Select
          style={
            label
              ? { paddingBottom: "0px" }
              : { paddingBottom: "0px", paddingTop: "0px" }
          }
          id={id}
          variant="standard"
          {...other}
        >
          {children}
        </Select>
      ) : (
        <Input
          style={
            label
              ? { paddingBottom: "0px" }
              : { paddingBottom: "0px", paddingTop: "0px" }
          }
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputProps={inputProps}
          {...other}
        />
      )}
      <FormHelperText id={`${id}-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextField;
