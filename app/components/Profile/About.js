import React from 'react';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import LocalPhone from '@mui/icons-material/LocalPhone';
import DateRange from '@mui/icons-material/DateRange';
import LocationOn from '@mui/icons-material/LocationOn';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import PapperBlock from '../PapperBlock';
import useStyles from './profile-jss';
import { Email } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FlagIcon from '@mui/icons-material/Flag';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LocationCityIcon from '@mui/icons-material/LocationCity';

function About(props) {
  const { classes, cx } = useStyles();

  return (
    <div>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        direction="row"
        spacing={3}
        mt={3}
      >
        {/*  */}
        <Grid item sm={12} md={12} xs={12}>
          <PapperBlock title="practitioner" icon="ion-ios-contact-outline" whiteBg noMargin desc="">
            <Divider className={classes.divider} />
            <List dense className={classes.profileList}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Official Mobile Number" secondary="+91 87459125410" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="official Mobile Status" secondary="Active" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Email />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="official Email Address" secondary="doctor@gmail.com" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Email />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="official Email Status" secondary="Yes" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="visible Profile Picture" secondary="No" />
              </ListItem>
            </List>
          </PapperBlock>
          <Divider className={classes.divider} />
        </Grid>
        {/*  */}

      </Grid>
    </div>
  );
}

About.propTypes = {
  data: PropTypes.array.isRequired
};

export default About;
