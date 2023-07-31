import React from "react";
import { Helmet } from "react-helmet";
import { Cover } from "dan-components";
import bgCover from "dan-images/petal_bg.svg";

function UserProfile() {
  const userData = {
    id: "somesh07@sbx",
    fullName: "Somesh Babasaheb Khade",
    name: {
      first: "Somesh",
      middle: "Babasaheb",
      last: "Khade",
    },
    gender: "M",
    dateOfBirth: {
      date: 30,
      month: 4,
      year: 1996,
    },
    hasTransactionPin: false,
    healthId: "91-2361-4626-8412",
    address:
      "C/O : Babasaheb Khade At Shivaji Nagar Ashti Taluka Partur Dist Jalna Ashti",
    stateName: "Maharashtra",
    stateCode: "27",
    districtName: "Jalna",
    districtCode: "479",
    aadhaarVerified: false,
    profilePhoto:
      "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",

    kycStatus: "VERIFIED",

    kycDocumentType: null,
    mobile: "7387791658",
    mobileVerified: true,
    email: "khadesomesh3@gmail.com",
    emailVerified: false,
    countryName: "INDIA",
    pincode: "431507",
    abhaAddresses: [
      {
        fullName: "somesh babasaheb khade",
        phrAddress: "somesh11@sbx",
        profilePhoto: "",
      },
      {
        fullName: "somemsh babasaheb khade",
        phrAddress: "somesh28@sbx",
        profilePhoto: "",
      },
      {
        fullName: "somesh babasaheb khade",
        phrAddress: "somesh111@sbx",
        profilePhoto: "",
      },
      {
        fullName: "somesh babasaheb khade",
        phrAddress: "somesh09@sbx",
        profilePhoto: "",
      },
      {
        fullName: "somesh babasaheb khade",
        phrAddress: "someshsbx09@sbx",
        profilePhoto: "",
      },
      {
        fullName: "Somesh Babasaheb Khade",
        phrAddress: "somesh07@sbx",
        profilePhoto: "profile photo",
      },
    ],
  };

  const title = userData.fullName + " - Profile";
  const description = "User profile description";

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div>
        <Cover
          coverImg={bgCover}
          avatar={userData.profilePhoto}
          name={userData.fullName}
          desc={`Health Professional Id: ${userData.healthId}`}
        />
        {/* <About /> */}
      </div>
    </div>
  );
}

export default UserProfile;
