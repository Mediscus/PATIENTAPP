import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import FloatingPanel from "../../../Panel/FloatingPanel";
import styles from "../../PatientEncounter-jss";
import css from "dan-styles/Form.scss";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import {
  convertFromRaw,
  convertFromHTML,
  BlockMapBuilder,
  DefaultDraftBlockRenderMap,
  EditorState,
  convertToRaw,
  Modifier,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { assesmentFormSchema } from "dan-api/schema";
import htmlToDraft from "html-to-draftjs";
import { Map } from "immutable";
import {
  Button,
  IconButton,
  Box,
  TextField,
  FormHelperText,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import Add from "@mui/icons-material/Add";
import useWindowDimensions from "dan-utils/useWindowDimensions";
import ChiefComplaintHelper from "./ChiefComplaintHelper/index";
import { Formik } from "formik";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import apiCall from "dan-redux/apiInterface";

function ChiefComplaintForm(props) {
  const { classes, encounterData, setMessage, data, open, callBack, closeForm } = props;
  const [editorContent, setEditorContent] = useState("");
  const { height, width } = useWindowDimensions();
  const patientId = useParams();
  let EditorRef;

  const contentBlock = ContentState.createFromBlockArray(
    convertFromHTML(editorContent)
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentBlock)
  );

  const onEditorStateChange = (
    editorStateParams,
    setFieldValue,
    extraValue
  ) => {
    if (extraValue) {
      setEditorContent(editorContent + extraValue);
    } else {
      setEditorState(editorStateParams);
      const value = draftToHtml(
        convertToRaw(editorStateParams.getCurrentContent())
      );
      setEditorContent(value);
      setFieldValue("detail", editorContent);
    }
  };

  const setEditor = (editor) => {
    EditorRef = editor;
  };

  const focusEditor = () => {
    if (EditorRef) {
      EditorRef.focusEditor();
    }
  };

  const sendTextToEditor = (text) => {
    onEditorStateChange("", "", text);
    setEditorState(insertText(text));
    focusEditor();
  };

  const extendedBlockRenderMap = Map({
    button: {
      element: "button",
      //aliasedElements: ['p'],
      //wrapper: <Button />,
    },
    div: {
      element: "div",
      aliasedElements: ["p"],
      wrapper: <Box />,
    },
  }).merge(DefaultDraftBlockRenderMap);

  const insertText = (text) => {
    const htmlContent = convertFromHTML(
      text,
      undefined,
      extendedBlockRenderMap
    );

    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const htmlContentMap = BlockMapBuilder.createFromArray(
      htmlContent.contentBlocks
    );

    const newContent = Modifier.replaceWithFragment(
      currentContent,
      currentSelection,
      htmlContentMap
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );
    return EditorState.forceSelection(
      newEditorState,
      newContent.getSelectionAfter()
    );
  };

  const postChiefCompliant = async (
    values,
    setErrors,
    setStatus,
    setSubmitting
  ) => {
    if (
      values.detail == "<p></p>\n" ||
      values.detail == "<p></p>\n" ||
      values.detail == ""
    ) {
      setErrors({ detail: "Detail Required" });
    } else {
      await apiCall("ehr/chief-compliant", "post", values)
        .then((res) => {
          if (res && res.Status === "Success") {
            data ? setMessage("update_success") : setMessage("success");
            setStatus({ success: true });
            callBack(true);
          }
        })
        .catch((Error) => {
          let ErrorMessage = Error.ErrorMessage;
          if (Error.ErrorMessage && Array.isArray(Error.ErrorMessage)) {
            ErrorMessage = Error.ErrorMessage.join("\n");
          }
          setMessage(ErrorMessage);
        });
    }
  };

  const sendTextEditor = (value) => {
    if (value && value.detail !== "undefined") {
      sendTextToEditor(value.detail);
    }
  };

  useEffect(() => {
    sendTextEditor(data);
  }, [data]);

  return (
    <FloatingPanel
      openForm={open}
      closeForm={closeForm}
      title="Chief Complaints"
      extraSize={false}
      helper={true}
      helperComponent={<ChiefComplaintHelper />}
    >
      <Formik
        initialValues={
          data
            ? {
              patientRef: data.patient_ref,
              encounterRef: encounterData.appointment_id,
              compliantRef: data.compliant_id,
              category: data.category,
              detail: data.detail,
            }
            : {
              patientRef: patientId.patientRef,
              encounterRef: encounterData.appointment_id,
              compliantRef: '',
              category: "",
              detail: "<p></p>\n",
            }
        }
        validationSchema={assesmentFormSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          postChiefCompliant(values, setErrors, setStatus, setSubmitting);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <section
              className={css.bodyForm}
              style={{ maxHeight: height - 140 }}
            >
              <div>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      type="text"
                      name="category"
                      label="Category"
                      placeholder="Enter Category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.category ? errors.category : ""}
                      error={touched.category ? errors.category : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Editor
                      ref={setEditor}
                      editorState={editorState}
                      editorClassName={classes.textEditor}
                      toolbarClassName={classes.toolbarEditor}
                      editorStyle={{
                        fontSize: 12,
                        margin: 0,
                        height: height - 250,
                      }}
                      onEditorStateChange={(event) => {
                        onEditorStateChange(event, setFieldValue, "");
                      }}
                      blockRenderMap={extendedBlockRenderMap}
                      toolbar={{
                        options: [
                          "inline",
                          "fontSize",
                          "colorPicker",
                          "list",
                          "textAlign",
                          "link",
                        ],
                        inline: { inDropdown: true },
                        color: true,
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                      }}
                    />
                    {errors.detail && (
                      <FormHelperText error>{errors.detail}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </div>
            </section>
            <div className={css.buttonArea}>
              <Grid
                container
                xs={12}
                md={12}
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
              >
                <Button>Save as Template</Button>
                <Box>
                  <Button type="button" onClick={() => closeForm()}>Discard</Button>
                  <Button variant="contained" color="secondary" type="submit">
                    Save&nbsp;
                    <Send className={classes.sendIcon} />
                  </Button>
                </Box>
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    </FloatingPanel>
  );
}

ChiefComplaintForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChiefComplaintForm);
