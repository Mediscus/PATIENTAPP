import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, PatientTimeline, WritePost } from 'dan-components';
import timelineData from 'dan-api/dummy/timelineData';
import makeStyles from '@mui/styles/makeStyles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Link } from '@mui/material';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Timeline() {

  const classes = useStyles();

  const title = brand.name + ' - Blank Page';
  const description = brand.desc;

  const submitPost = () => {
    console.log('Write submit post');
  }

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
      <PapperBlock title="Patient Timeline" desc="Patient Treatment Timeline">
        <Accordion style={{ marginBottom: 10 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Box mt={1} p={1} border={1} borderRadius="5px">
                <Typography variant='body2' component="h1">Postural Orthostatic Tachycardia Syndrome (POTS; 1% of adolescents)</Typography>
                <Typography variant='caption'>25/10/2022</Typography>
              </Box>
              <Box mt={1} ml={1} p={1} border={1} borderRadius="5px">
                <Typography variant='body2' component="h1">Familial Hypercholesterolemia</Typography>
                <Typography variant='caption'>25/10/2022</Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Button style={{ margin: 5 }} variant="contained" color="primary">Add To Flow Sheet</Button>
              <Button style={{ margin: 5 }} variant="contained">Add Documents</Button>
              <Button style={{ margin: 5 }} variant="contained" color="secondary">Update Status</Button>
              <Button style={{ margin: 5 }} variant="contained" color="inherit">I am recovered, Close LOOP</Button>
            </Box>
            <PatientTimeline dataTimeline={timelineData} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ margin: 5 }} variant="contained" color="primary">Add To Flow Sheet</Button>
              <Button style={{ margin: 5 }} variant="contained">Add Documents</Button>
              <Button style={{ margin: 5 }} variant="contained" color="secondary">Update Status</Button>
              <Button style={{ margin: 5 }} variant="contained" color="inherit">I am recovered, Close LOOP</Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Box mt={1} p={1} border={1} borderRadius="5px">
                <Typography variant='body2' component="h1">Diabetes Mellitus, Type I, in children </Typography>
                <Typography variant='caption'>25/10/2022</Typography>
              </Box>
              <Box mt={1} ml={1} p={1} border={1} borderRadius="5px">
                <Typography variant='body2' component="h1">Familial Hypercholesterolemia</Typography>
                <Typography variant='caption'>25/10/2022</Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Button style={{ margin: 5 }} variant="contained" color="primary">Add To Flow Sheet</Button>
              <Button style={{ margin: 5 }} variant="contained">Add Documents</Button>
              <Button style={{ margin: 5 }} variant="contained" color="secondary">Update Status</Button>
              <Button style={{ margin: 5 }} variant="contained" color="inherit">I am recovered, Close LOOP</Button>
            </Box>
            <PatientTimeline dataTimeline={timelineData} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ margin: 5 }} variant="contained" color="primary">Add To Flow Sheet</Button>
              <Button style={{ margin: 5 }} variant="contained">Add Documents</Button>
              <Button style={{ margin: 5 }} variant="contained" color="secondary">Update Status</Button>
              <Button style={{ margin: 5 }} variant="contained" color="inherit">I am recovered, Close LOOP</Button>
            </Box>
          </AccordionDetails>
        </Accordion>

      </PapperBlock>
    </div>
  );
}

export default Timeline;
