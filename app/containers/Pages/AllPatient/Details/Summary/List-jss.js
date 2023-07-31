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
    paddingLeft: 8,
    paddingRight: 8,
  },
  secondaryAction: {
    right: "0px",
  },
  iconBtn: {
    padding: 8,
    // fontSize: 16,
  },
  progress: {
    margin: theme.spacing(2),
  },
  dividerSpace: {
    margin: theme.spacing(1),
  },
  container: {
    padding: '10px',
    '& .slick-prev:before , .slick-next:before': {
      color: 'gray',
    }
  }


});

export default styles;
