import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@mui/styles/withStyles';
import 
{Typography, Card, CardHeader, CardMedia, CardContent, CardActions, Menu, MenuItem, IconButton, Icon, Avatar, Tooltip, Link} 
from '@mui/material';

/* import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip'; */

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Comment from './Comment';
import styles from './jss/timeline-jss';
import TimelineContent from './TimelineContent';

const optionsOpt = [
  'Option 1',
  'Option 2',
  'Option 3',
];

const ITEM_HEIGHT = 48;

function Timeline(props) {
  const [anchorElOpt, setAnchorElOpt] = useState(null);
  const [openComment, setOpenComment] = useState(false);
  const {
    classes,
    dataTimeline,
    onlike,
    commentIndex,
    submitComment,
    fetchComment
  } = props;

  const handleClickOpt = event => {
    setAnchorElOpt(event.currentTarget);
  };

  const handleCloseOpt = () => {
    setAnchorElOpt(null);
  };

  const handleOpenComment = (data) => {
    fetchComment(data);
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const getItem = dataArray => dataArray.map((data, ind) => (
    <div key={data.id + "data"}>
      <div className={classes.iconBullet}>
        <Tooltip id={'tooltip-icon-' + data.id} title={data.date+' '+data.time}>
          <Icon className={classes.icon}>
            {data.icon}
          </Icon>
        </Tooltip>
      </div>
      <Card className={classes.cardSocmed}>
        <CardHeader
          avatar={
            <Avatar alt="avatar" src={data.user.avatar} className={classes.avatar} />
          }
          title={data.user.name}
          subheader={data.date}
        />
        {data.image !== '' && (
          <CardMedia
          component="img"
            className={classes.media}
            image={data.image}
            title={data.name}
          />
        )}
       <CardContent>
          <TimelineContent data={data.data} type={data.user.type} />
        </CardContent>
      </Card>
    </div>
  ));

  return (
    <Fragment>
      <Menu
        id="long-menu"
        anchorEl={anchorElOpt}
        open={Boolean(anchorElOpt)}
        onClose={handleCloseOpt}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {optionsOpt.map(option => (
          <MenuItem key={option} onClick={handleCloseOpt}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      {dataTimeline.length > 0 && (
        <Comment
          open={openComment}
          handleClose={handleCloseComment}
          submitComment={submitComment}
          dataComment={dataTimeline[commentIndex].comments}
        />
      )}
      <div className={classes.timeline}>
        {dataTimeline.length > 0 && getItem(dataTimeline)}
      </div>
    </Fragment>
  );
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
  onlike: PropTypes.func,
  dataTimeline: PropTypes.array.isRequired,
  fetchComment: PropTypes.func,
  submitComment: PropTypes.func,
  commentIndex: PropTypes.number,
};

Timeline.defaultProps = {
  onlike: () => (false),
  fetchComment: () => { },
  submitComment: () => { },
  commentIndex: 0,
};

export default withStyles(styles)(Timeline);
