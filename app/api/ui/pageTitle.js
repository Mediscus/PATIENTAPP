const pageTitle = [
  {
    uri: "/app/all-patient",
    title: "New Patient",
  },
  {
    uri: "/app/all-patient/details",
    title: "Patient Details",
  },
];

const getPageTitle = (uri, defaultTitle) => {
  let title = pageTitle.filter((p) => p.uri === uri);
  if (title.length > 0) {
    return title[0].title;
  }
  return defaultTitle;
};

export default getPageTitle;
