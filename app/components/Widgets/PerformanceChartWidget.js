import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Grid from "@mui/material/Grid";
import classNames from "classnames";
import Dvr from "@mui/icons-material/Dvr";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Healing from "@mui/icons-material/Healing";
import FilterCenterFocus from "@mui/icons-material/FilterCenterFocus";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import LocalActivity from "@mui/icons-material/LocalActivity";
import Typography from "@mui/material/Typography";
import "dan-styles/vendors/rechart/styles.css";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { dataPerformance } from "dan-api/chart/chartData";
import colorfull from "dan-api/palette/colorfull";
import styles from "./widget-jss";
import PapperBlock from "../PapperBlock";
import { Box } from "@mui/material";

const color = {
  main: colorfull[2],
  secondary: colorfull[3],
  third: colorfull[0],
  fourth: colorfull[1],
};

function PerformanceChartWidget(props) {
  const { classes } = props;
  return (
    <PapperBlock whiteBg title="Monthly analysis">
      <Box>
        <ul className={classes.bigResume}>
          <li>
            <Avatar className={classNames(classes.avatar, classes.blueAvatar)}>
              <Dvr />
            </Avatar>
            <Typography variant="h6">
              <span className={classes.blueText}>40</span>
              <Typography>Total Patient</Typography>
            </Typography>
          </li>
          <li>
            <Avatar className={classNames(classes.avatar, classes.tealAvatar)}>
              <CheckCircle />
            </Avatar>
            <Typography variant="h6">
              <span className={classes.tealText}>25</span>
              <Typography>Complete</Typography>
            </Typography>
          </li>
          <li>
            <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
              <Healing />
            </Avatar>
            <Typography variant="h6">
              <span className={classes.pinkText}>17</span>
              <Typography>Active Patient</Typography>
            </Typography>
          </li>
          <li>
            <Avatar
              className={classNames(classes.avatar, classes.purpleAvatar)}
            >
              <LocalActivity />
            </Avatar>
            <Typography variant="h6">
              <span className={classes.purpleText}>18</span>
              <Typography>Referrals</Typography>
            </Typography>
          </li>
        </ul>
        <div className={classes.chartWrap}>
          <div className={classes.chartFluid}>
            <ResponsiveContainer>
              <ComposedChart data={dataPerformance}>
                <XAxis dataKey="name" tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickSize={3}
                  tickLine={false}
                  tick={{ stroke: "none" }}
                />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="basis"
                  stackId="2"
                  dataKey="ActivePatient"
                  stroke="none"
                  fill={color.secondary}
                />
                <Area
                  type="monotone"
                  stackId="1"
                  stroke="none"
                  dataKey="Patient"
                  fill={color.fourth}
                />
                <Area
                  type="monotone"
                  stackId="3"
                  dataKey="Referrals"
                  stroke="none"
                  fill={color.main}
                />
                <Line
                  type="monotone"
                  dataKey="Complete"
                  strokeWidth={2}
                  stroke={color.third}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Box>
    </PapperBlock>
  );
}

PerformanceChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PerformanceChartWidget);
