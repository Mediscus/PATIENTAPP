const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),

  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    padding: "5px 10px",
  },
  listStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemRoot: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "5px",
  },
});
export default styles;
