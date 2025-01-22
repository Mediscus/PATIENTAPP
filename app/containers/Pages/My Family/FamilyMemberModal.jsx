import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Close, Refresh } from "@mui/icons-material";
import { SET_IS_OPEN_FAMILY_MEMBERS_MODAL } from "../../../redux/constants/reduxFormConstants";
import "./style.css";
import { useState } from "react";
import moment from "moment";
import { getCookieData } from "../../../components/Common/storageFun";
import { getFamilyMemberList } from "./FamilyMemberAction";
import FamilyMemberForm from "./FamilyMemberForm";

const FamilyMemberModal = () => {
  const dispatch = useDispatch();
  const authToken = getCookieData("authToken");
  const { isOpenFamilyMemberModal, familyMembersList } = useSelector(
    (state) => state.familyMembers
  );

  const handleClose = () => {
    dispatch({ type: SET_IS_OPEN_FAMILY_MEMBERS_MODAL, payload: false });
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpenFamilyMemberModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="true"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 0,
          }}
        >
          Family Member
          <Box>
            <Tooltip title="Refresh" arrow>
              <IconButton
                onClick={() => getFamilyMemberList(authToken, dispatch)}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {/* <Box className="family-avatar-container">
            {avatarImg.map((img) => (
              <Avatar alt="fam-avatar" src={img} />
            ))}
          </Box> */}

          <FamilyMemberForm />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FamilyMemberModal;
