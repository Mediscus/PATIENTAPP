import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import { Formik } from "formik";
import { withStyles } from "@mui/styles";
import styles from "../../../../Pages-jss";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import { FloatingPanel, MaterialDropZone } from "dan-components";

function AddFamilyHistory(props) {
  const { open, closeForm } = props;
  const { height } = useWindowDimensions();

  const [viewFile, setViewFile] = useState(null); // Track file to view
  const [openDialog, setOpenDialog] = useState(false); // Dialog to show the file

  const handleViewFile = (file) => {
    if (file) {
      setViewFile(file);
    } else {
      setViewFile(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewFile(null);
  };

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="ECG"
      extraSize={false}
    >
      <Formik
        initialValues={{ reportFile: [] }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Files Submitted: ", values.reportFile);
          setSubmitting(false);
          closeForm();
        }}
      >
        {({ handleSubmit, isSubmitting, setFieldValue, values }) => {
          const callBackOnDrop = (data) => {
            console.log("Files dropped: ", data);
            setFieldValue("reportFile", data);
          };

          return (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Upload ECG Report
                </Typography>
                <div
                  style={{
                    height: height - 180,
                    maxHeight: height - 180,
                    overflowY: "auto",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <MaterialDropZone
                        acceptedFiles={[
                          "image/jpeg",
                          "image/png",
                          "image/bmp",
                          "application/pdf",
                        ]}
                        callBackOnDrop={callBackOnDrop}
                        showPreviews
                        maxSize={5000000}
                        filesLimit={5}
                        text="Drag and drop report files (images or PDFs) here"
                        showPreviewsInDropzone
                        dropZoneClass={{
                          border: "2px dashed #ccc",
                          backgroundColor: "#fafafa",
                          padding: "20px",
                        }}
                      />
                    </Grid>

                    {/* Keep the View button always visible */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          values.reportFile.length > 0
                            ? handleViewFile(values.reportFile[0])
                            : handleViewFile(null)
                        }
                      >
                        View Uploaded File
                      </Button>
                    </Grid>
                  </Grid>
                </div>

                <Box
                  mt={3}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={closeForm}
                  >
                    Discard
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                  >
                    Save&nbsp;
                    <Send />
                  </Button>
                </Box>

                {/* Dialog to show the uploaded file */}
                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  maxWidth="md"
                  fullWidth
                >
                  <DialogContent>
                    <Typography variant="h6">
                      {viewFile
                        ? "Uploaded File Preview"
                        : "No file to view. Please upload a file first."}
                    </Typography>
                    {viewFile ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "500px",
                          overflow: "auto",
                        }}
                      >
                        {viewFile.type.includes("pdf") ? (
                          <embed
                            src={URL.createObjectURL(viewFile)}
                            type="application/pdf"
                            width="100%"
                            height="500px" // Limit the height for PDFs
                            style={{ borderRadius: "4px" }}
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(viewFile)}
                            alt="Uploaded Preview"
                            style={{
                              width: "100%",
                              objectFit: "contain",
                              maxHeight: "500px", // Limit the height for images
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </Box>
                    ) : null}
                    <Button
                      onClick={handleCloseDialog}
                      color="secondary"
                      style={{ marginTop: "10px" }}
                    >
                      Close
                    </Button>
                  </DialogContent>
                </Dialog>
              </Box>
            </form>
          );
        }}
      </Formik>
    </FloatingPanel>
  );
}

export default withStyles(styles)(AddFamilyHistory);
