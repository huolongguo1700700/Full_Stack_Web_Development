import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { NewEntry } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<NewEntry, "id" | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const isDate = (date: string) => {
    return !isNaN(Date.parse(date));
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" }
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors:
        | { [field: string]: string }
        | {
            [key: string]: {
              [key: string]: string;
            };
          } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }

        if (!isDate(values.date)) {
          errors.date = "Wrong format";
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.healthCheckRating !== -1) {
          console.log('greater then - 1');
        }

        if (
          values.healthCheckRating !== -1
          && (Number(values.healthCheckRating) < 0 || Number(values.healthCheckRating) > 3)) {
          errors.healthCheckRating = "Valid health check rating between 0 and 3";
        }

        if (
          values.healthCheckRating === -1
          && (values.sickLeave?.startDate
          || values.sickLeave?.endDate)) {
            if (!isDate(values.sickLeave.startDate)) {
              errors = {
                ...errors,
                sickLeave: {
                  startDate: "Wrong format"
                }
              };
            }

            if (!isDate(values.sickLeave.endDate)) {
              errors = {
                ...errors,
                sickLeave: {
                  endDate: "Wrong format"
                }
              };
            }
          }
        
        if (
          values.healthCheckRating === -1
          && (values.discharge.date
          || values.discharge.criteria)) {
            if (!values.discharge.criteria)
              errors = {
                ...errors,
                discharge: {
                  criteria: requiredError
                }
              };

            if (!isDate(values.discharge.date))
              errors = {
                ...errors,
                discharge: {
                  date: "Wrong format"
                }
              };
          }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Field
              label="EmployerName"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
