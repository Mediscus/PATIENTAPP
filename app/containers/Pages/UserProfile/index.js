import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummyData/dummyContents';
import { useSelector } from 'react-redux';
import { Cover, About } from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';

function UserProfile() {
  const title = brand.name + ' - Profile';
  const description = brand.desc;

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
          avatar={dummy.user.avatar}
          name={dummy.user.name}
          desc="Health Professional Type : Doctor"
        />
        <About />
      </div>
    </div>
  );
}

export default UserProfile;
