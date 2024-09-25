import { cyan, orange, red, blue } from "@mui/material/colors";
import { lighten, darken, alpha } from "@mui/material/styles";
const drawerWidth = 240;
const height = "100vh";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: 800,
    zIndex: 1,
    position: "relative",
    backgroundColor:
      theme.palette.type === "dark"
        ? alpha(theme.palette.grey[800], 0.75)
        : alpha(theme.palette.background.paper, 0.9),
    backdropFilter: "saturate(180%) blur(20px)",
    overflow: "hidden",
    display: "flex",
    marginBottom: theme.spacing(3),
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light,
  },
  iconRed: {
    color: red[500],
  },
  iconOrange: {
    color: orange[500],
  },
  iconBlue: {
    color: blue[500],
  },
  iconCyan: {
    color: cyan[500],
  },
  appBar: {
    zIndex: 130,
    background: "none",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth})`,
    },
    "& button": {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1),
    },
  },
  flex: {
    flex: 1,
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    color: theme.palette.text.secondary,
    borderRadius: theme.rounded.big,
    boxShadow: theme.shadows[2],
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    margin: `${theme.spacing(2)} 0`,
  },
  addBtn: {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: 1000,
  },
  sidebar: {
    zIndex: 120,
  },
  search: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    font: "inherit",
    padding: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(
      1
    )} ${theme.spacing(9)}`,
    border: 0,
    display: "block",
    verticalAlign: "middle",
    whiteSpace: "normal",
    background: "none",
    margin: 0, // Reset for Safari
    color: "inherit",
    width: "100%",
    "&:focus": {
      outline: 0,
    },
  },
  InputBase: {
    "& > input, textarea": {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      display: "flex",
      border: `1px solid ${theme.palette.type === "dark"
        ? alpha(theme.palette.grey[500], 0.5)
        : alpha(theme.palette.grey[800], 0.4)
        }`,
      borderRadius: theme.spacing(1),
      height: "1em",
      fontSize: 12,
    },
  },
  SelectField: {
    '& .MuiInput-input': {
      padding: "5px 24px 5px 8px !important",
      fontSize: "12px",
    },
  },
  drawerPaper: {
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
    width: drawerWidth,
    background:
      theme.palette.type === "dark"
        ? darken(theme.palette.primary.light, 0.6)
        : lighten(theme.palette.primary.light, 0.5),
    border: "none",
    minHeight: "100%",
  },
  selected: {
    background:
      theme.palette.type === "dark"
        ? darken(theme.palette.primary.light, 0.5)
        : darken(theme.palette.primary.light, 0.05),
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    paddingLeft: 20,
    "& h3": {
      color: theme.palette.primary.dark,
    },
  },
  content: {
    flexGrow: 1,
    zIndex: 120,
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(4),
    },
    position: "relative",
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  title: {
    width: 205,
  },
  divider: {
    margin: "0 20px 0 10px",
  },
  /* Email List */
  column: {
    flexBasis: "33.33%",
    overflow: "hidden",
    paddingRight: "0 !important",
    paddingTop: 5,
    marginLeft: 20,
  },
  secondaryHeading: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("xs")]: {
      whiteSpace: "normal",
      paddingBottom: 10,
    },
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(
        3
      )}`,
    },
    "& section": {
      width: "100%",
    },
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  avatar: {},
  fromHeading: {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    "& $avatar": {
      width: 30,
      height: 30,
      marginRight: 20,
    },
  },
  topAction: {
    display: "flex",
    background:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[100],
    marginBottom: 20,
    alignItems: "center",
    padding: "0 20px",
    borderRadius: theme.rounded.medium,
  },
  category: {
    fontSize: 12,
    textTransform: "uppercase",
    display: "flex",
    "& svg": {
      fontSize: 16,
      marginRight: 5,
    },
  },
  markMenu: {
    "& svg": {
      marginRight: 10,
    },
  },
  headMail: {
    flex: 1,
  },
  field: {
    width: "100%",
    marginTop: 0,
    "& svg": {
      color: theme.palette.grey[400],
      fontSize: 18,
    },
  },
  hiddenDropzone: {
    display: "none",
  },
  bodyForm: {
    height: `calc(100vh - 145px)`,
    maxHeight: `calc(100vh - 145px)`,
    overflow: "auto",
    position: "relative",
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: "15px 10px",
    },
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  buttonArea: {
    background: theme.palette.primary.light,
    background:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[100],
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    textAlign: "right",
    padding: "10px 30px",
    "& button": {
      marginRight: 5,
    },
  },
  sendIcon: {
    marginLeft: 10,
  },
  boxIcon: {
    color: theme.palette.common.white,
    opacity: 0.7,
    fontSize: 50,
  },
  jcSB: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  jcL: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  jcR: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  jcSA: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  jcSE: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  jcC: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bgLightBlue: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },

  boxBg: {
    width: "100%",
    borderRadius: 8,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  defaultBG: {
    background: theme.palette.background.default,
  },
  counterIcon: {
    color: theme.palette.common.white,
    opacity: 0.7,
    fontSize: 84,
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 200,
    border: `1px solid ${theme.palette.divider}`,
    padding: "0 10px",
    color: theme.palette.text.primary,
  },
  toolbarEditor: {
    background: theme.palette.background.default,
    border: "none",
    "& > div": {
      background: theme.palette.background.paper,
      "& img": {
        filter: theme.palette.type === "dark" ? "invert(100%)" : "invert(0%)",
      },
      "& a": {
        color: theme.palette.text.primary,
        "& > div": {
          borderTopColor: theme.palette.text.primary,
        },
      },
    },
  },

  hg70: { height: 70 },
  txtStyle: { fontSize: 13, width: 150, marginBottom: 5 },

  pY10: { paddingTop: 10, paddingBottom: 10 },

  m0: { margin: 0 },
  mB0: { marginBottom: 0 },
  mB1: { marginBottom: 1 },
  mB2: { marginBottom: 2 },
  mB3: { marginBottom: 3 },
  mB5: { marginBottom: 5 },
  mB5: { marginBottom: 5 },
  mB8: { marginBottom: 8 },
  mB10: { marginBottom: 10 },
  mB12: { marginBottom: 12 },
  mB15: { marginBottom: 15 },
  mB18: { marginBottom: 18 },
  mB20: { marginBottom: 20 },
  mB22: { marginBottom: 22 },
  mB25: { marginBottom: 25 },

  mL0: { marginLeft: 0 },
  mL5: { marginLeft: 5 },
  mL8: { marginLeft: 8 },
  mL10: { marginLeft: 10 },
  mL12: { marginLeft: 12 },
  mL15: { marginLeft: 15 },
  mL18: { marginLeft: 18 },
  mL20: { marginLeft: 20 },
  mL22: { marginLeft: 22 },
  mL25: { marginLeft: 25 },

  mT0: { marginTop: 0 },
  mT5: { marginTop: 5 },
  mT8: { marginTop: 8 },
  mT10: { marginTop: 10 },
  mT12: { marginTop: 12 },
  mT15: { marginTop: 15 },
  mT16: { marginTop: 16 },
  mT17: { marginTop: 17 },
  mT18: { marginTop: 18 },
  mT19: { marginTop: 19 },
  mT20: { marginTop: 20 },
  mT22: { marginTop: 22 },
  mT25: { marginTop: 25 },

  mR0: { marginRight: 0 },
  mR5: { marginRight: 5 },
  mR8: { marginRight: 8 },
  mR10: { marginRight: 10 },
  mR12: { marginRight: 12 },
  mR15: { marginRight: 15 },
  mR18: { marginRight: 18 },
  mR20: { marginRight: 20 },
  mR22: { marginRight: 22 },
  mR25: { marginRight: 25 },
  sbl1: {
    "& * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  sbl2: {
    "& * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  sbl3: {
    "& * + *": {
      marginLeft: theme.spacing(3),
    },
  },
  table: {
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "0.75rem",
    width: "100%",
    "& > thead": {
      backgroundColor: theme.palette.background.default,
    },
    "& th": {
      fontWeight: "bold",
    },
    "& th, td": {
      verticalAlign: "middle",
      padding: "0.5em 0.5em",
      border: "1px solid rgba(0,0,0,0.16)",
      fontSize: 12,
    },
  },
  tableResponsive: {
    borderCollapse: "collapse",
    margin: 0,
    textAlign: "left",
    fontSize: "0.75rem",
    "& > thead": {
      backgroundColor: theme.palette.background.default,
    },
    "& th": {
      fontWeight: "bold",
    },
    "& th, td": {
      verticalAlign: "middle",
      padding: "0.5em 0.5em",
      border: "1px solid rgba(0,0,0,0.16)",
      fontSize: 12,
    },
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  black: {
    color: "black",
  },
  agGrid: {
    "& .ag-root-wrapper, .ag-paging-panel": {
      backgroundColor: `${theme.palette.background.default} !important`,
      color:
        theme.palette.type === "dark"
          ? `${alpha(theme.palette.grey[200], 0.9)} !important`
          : `${alpha(theme.palette.grey[900], 0.9)} !important`,
    },
    "&  .ag-icon-menu::before, .ag-icon-asc::before, .ag-icon-desc::before, .ag-icon-first::before, .ag-icon-previous::before, .ag-icon-next::before, .ag-icon-last::before":
    {
      color:
        theme.palette.type === "dark"
          ? `${alpha(theme.palette.grey[200], 0.9)} !important`
          : `${alpha(theme.palette.grey[900], 0.9)} !important`,
    },
    "& .ag-theme-alpine, .ag-header": {
      backgroundColor: `${theme.palette.background.default} !important`,
    },
    "& .ag-header-row": {
      color:
        theme.palette.type === "dark"
          ? `${alpha(theme.palette.grey[200], 0.9)} !important`
          : `${alpha(theme.palette.grey[900], 0.9)} !important`,
    },
    "& .ag-header-cell": {
      borderBottomColor: "rgba(0,0,0,0.16) !important",
      fontSize: 12,
    },
    "& .ag-row": {
      borderColor: "rgba(0,0,0,0.16) !important",
      "& .ag-cell:not(:last-child)": {
        borderRight: "1px solid rgba(0,0,0,0.16) !important",
      },
    },
    "& .ag-row-even, .ag-row-odd": {
      fontSize: "12px !important",
      color:
        theme.palette.type === "dark"
          ? `${alpha(theme.palette.grey[200], 0.9)} !important`
          : `${alpha(theme.palette.grey[900], 0.9)} !important`,
    },
    "& .ag-row-even": {
      backgroundColor: `${theme.palette.background.default} !important`,
    },
    "& .ag-row-odd": {
      backgroundColor: `${theme.palette.background.default} !important`,
    },
    "& .ag-theme-alpine .ag-paging-panel": {},
  },
  TextField: {
    "& .MuiInputLabel-formControl": {
      top: -5,
    },
    "& label + .MuiInput-formControl": {
      marginTop: 0,
    },
  },
  AutoComplete: {
    "& .MuiAutocomplete-inputRoot": {
      paddingTop: "0px !important",
      paddingBottom: "2px !important",
      top: 0,
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-of-type':
    {
      padding: "10px 0px 6px",
    },
    '& label + .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-of-type':
    {
      padding: "22px 0px 0px",
    },
  },
  AutoCompleteMain: {
    "& .MuiAutocomplete-inputRoot": {
      paddingRight: "4px !important",
      paddingTop: "0px !important",
      paddingBottom: "4px !important",
      top: 0,
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-of-type':
    {
      padding: "10px 0px 6px",
    },
    '& label + .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-of-type':
    {
      padding: "20px 0px 0px",
    },
    "& .MuiAutocomplete-inputRoot .MuiAutocomplete-endAdornment": {
      //display: "none",
    },
  },
  AutoCompleteSmall: {
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
      padding: "20px 0px 0px",
    },
    "& .MuiAutocomplete-inputRoot .MuiAutocomplete-endAdornment": {
      marginTop: "-10px !important",
    },
  },
  TableAutoCompleteMain: {
    "& .MuiAutocomplete-inputRoot": {
      paddingRight: "4px !important",
      paddingTop: "0px !important",
      paddingBottom: "4px !important",
      top: 0,
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-of-type':
    {
      padding: "4px 0px",
    },
    '& label + .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-of-type':
    {
      padding: "24px 0px 0px",
    },
    "& .MuiAutocomplete-inputRoot .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& .MuiFormHelperText-root": {
      lineHeight: "normal !important",
      marginTop: "0px !important"
    },
  },
  accordion: {
    boxShadow: "none",
    border: "none",
    marginBottom: 10,
    "&::before": {
      background: "transparent",
    },
  },
  accordionExpand: {
    marginBottom: 0,
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    margin: "0px !important",
    boxShadow: "0px 0px 0px 0px #039be5 !important",
    borderRadius: "16px",
  },
  accordionSummary: {
    minHeight: "35px !important",
    background: "#e7ecf1",
  },
  accordionSummaryExpand: {
    alignItems: "center",
    margin: "0px !important",
  },
  accordionIcon: {
    marginRight: "10px",
  },
  smallBtn: {
    maxWidth: "35px !important",
  },
  accordionDetail: {
    maxHeight: "190px",
    overflowX: "scroll",
  },
  bgGray: {
    background:
      theme.palette.type === "dark"
        ? alpha(theme.palette.grey[500], 0.5)
        : alpha(theme.palette.grey[800], 0.1),
  },
  btnBg: {
    display: "flex",
    gap: 10,
    padding: 10,
    borderRadius: 8,
  },
  remark: {
    "& .MuiInput-multiline": {
      padding: 0,
    },
    "& .MuiInput-input": {
      height: "50px !important",
    },
  },
});

export default styles;
