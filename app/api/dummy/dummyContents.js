import avatarApi from "../images/avatars";
const dummyContents = {
  user: {
    name: "John Doe",
    title: "Administrator",
    avatar: avatarApi[6],
    status: "online",
  },
  text: {
    title: "Lorem ipsum",
    subtitle: "Ut a lorem eu odio cursus laoreet.",
    sentences:
      "Donec lacus sem, scelerisque sed ligula nec, iaculis porttitor mauris.",
    paragraph:
      "Sed rutrum augue libero, id faucibus quam aliquet sed. Phasellus interdum orci quam, volutpat ornare eros rhoncus sed. Donec vestibulum leo a auctor convallis. In dignissim consectetur molestie. Vivamus interdum tempor dui, nec posuere augue consequat sit amet. Suspendisse quis semper quam. Nullam nec neque sem.",
    date: "Jan 9, 2018",
  },
  patient: {
    name: "Mr Abdul Sheikh",
    regNo: "JR987654",
    age: "30 Yrs",
    gender: "Male",
    dob: "01/02/1992",
    mob: "+91-9146726853",
  },
};

export default dummyContents;
