import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup, FormHelperText,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch
} from "@mui/material";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import * as Yup from 'yup'
import { FormType } from "../models/generalForm";
import { useQuery } from "@tanstack/react-query";
import { getFormData } from "../services/FormService";

export type SwitchArrayType = {
  name: string,
  value: boolean,
  label: string,
  subLabel: string
}

const GeneralForm = () => {

  const { data, isLoading, isError } = useQuery(['form-data'], getFormData)

  const initialValues = useMemo<FormType>(() => {
    return {
      conversationDownloadsEnabled: data?.data.conversationDownloadsEnabled,
      conversationClearEnabled: data?.data.conversationClearEnabled,
      collectUserInfoEnabled: data?.data.collectUserInfoEnabled,
      showLiveChatIcon: data?.data.showLiveChatIcon,
      emailEnabled: data?.data.emailEnabled,
      emailAddress: data?.data.conversationTranscripts.emailAddress,
      emailFrequency: data?.data.conversationTranscripts.emailFrequency,
      initMessage: data?.data.initMessage
    }
  }, [data?.data])

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string().required('Email is required').email('Please enter a valid email address')
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const switchArray: SwitchArrayType[] = [
    {
      name: "conversationDownloadsEnabled",
      value: formik.values.conversationDownloadsEnabled,
      label: "Allow users to download their conversations",
      subLabel: "Web Chat Only"
    },
    {
      name: "conversationClearEnabled",
      value: formik.values.conversationClearEnabled,
      label: "Allow users to clear their conversations",
      subLabel: "Web Chat Only"
    },
    {
      name: "collectUserInfoEnabled",
      value: formik.values.showLiveChatIcon,
      label: "Show live chat icon for instant connection",
      subLabel: "Web Chat Only"
    },
    {
      name: "showLiveChatIcon",
      value: formik.values.collectUserInfoEnabled,
      label: "Request user details prior to connecting",
      subLabel: "Name, email or contact number, and reason"
    },
    {
      name: "initMessage",
      value: formik.values.initMessage,
      label: "Receive transcripts by email",
      subLabel: "CSV file containing all conversations held in the selected period"
    }
  ]

  if (isLoading) {
    return <h2>Loading....</h2>
  }
  if (isError) {
    return <h2>Error....</h2>
  }

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ width: '100%' }}>
      <FormGroup>
        {
          switchArray.map((item) => (
            <>
              <FormControlLabel
                key={item.name}
                control={
                  <Switch sx={{ marginRight: '10px' }} checked={item.value} name={item.name}
                          value={item.value} onChange={formik.handleChange}/>
                }
                label={item.label}
                labelPlacement="end"
              />
              <FormHelperText sx={{ marginLeft: '58px', marginTop: '-10px' }}>{item.subLabel}</FormHelperText>
            </>
          ))
        }
        <FormHelperText sx={{ marginTop: '20px', marginBottom: '15px', fontSize: '14px' }}>Please provide an Email
          Address</FormHelperText>
        <FormControl sx={{ width: '50%' }}>
          <OutlinedInput
            sx={{ borderRadius: '10px', fieldset: { borderColor: formik.errors.emailAddress ? "#fa912e" : '' } }}
            name={"emailAddress"}
            value={formik.values.emailAddress} onChange={formik.handleChange}
            size={"small"} placeholder="Please enter a email address" disabled={!formik.values.initMessage}/>
          <FormHelperText sx={{ color: '#fa912e' }}>{formik.errors.emailAddress}</FormHelperText>
        </FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          sx={{ alignItems: 'center' }}
          onChange={formik.handleChange}
        >
          <FormHelperText sx={{ paddingRight: '75px', fontSize: '14px' }}>Frequency</FormHelperText>
          <FormControlLabel
            control={<Radio name="emailFrequency" checked={formik.values.emailFrequency === 'DAILY'} value="DAILY"/>}
            label="Daily"/>
          <FormControlLabel
            control={<Radio name="emailFrequency" checked={formik.values.emailFrequency === 'WEEKLY'} value="WEEKLY"/>}
            label="Weekly"/>
        </RadioGroup>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
          <Button variant="outlined" type="reset">Cancel</Button>
          <Button variant="contained" type="submit" disabled={!formik.dirty}>Save Changes</Button>
        </Box>
      </FormGroup>
    </form>
  )
}

export default GeneralForm;