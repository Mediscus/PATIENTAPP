import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    AutoComplete: {
        "& .MuiInputBase-root": {
            padding: "0px !important",
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child':
        {
            padding: "11px !important",
            fontSize: "14px",
        },
        "& input::placeholder": {
            fontSize: "14px !important",
        },
        '& label + .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child':
        {
            padding: "24px 0px 0px",
        }
    }
}));

