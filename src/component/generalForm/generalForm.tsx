import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  OutlinedInput,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { Fragment, useMemo } from 'react';
import * as Yup from 'yup';
import { FormType } from '../../models/generalForm';
import { useGeneralForm } from '../../hooks/useGeneralForm';
import './generalForm.css';

export type SwitchArrayType = {
  name: string;
  value: boolean;
  label: string;
  subLabel: string;
};

const GeneralForm = () => {
  const { data, isLoading, isError } = useGeneralForm();

  const initialValues = useMemo<FormType>(() => {
    return {
      conversationDownloadsEnabled: data?.conversationDownloadsEnabled ?? false,
      conversationClearEnabled: data?.conversationClearEnabled ?? false,
      collectUserInfoEnabled: data?.collectUserInfoEnabled ?? false,
      showLiveChatIcon: data?.showLiveChatIcon ?? false,
      emailEnabled: data?.conversationTranscripts.emailEnabled ?? false,
      emailAddress: data?.conversationTranscripts.emailAddress ?? '',
      emailFrequency: data?.conversationTranscripts.emailFrequency ?? 'DAILY',
      initMessage: data?.initMessage ?? false,
    };
  }, [data]);

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('GeneralFormData', JSON.stringify(values, null, 2));
    },
  });

  const switchArray: SwitchArrayType[] = [
    {
      name: 'conversationDownloadsEnabled',
      value: formik.values.conversationDownloadsEnabled,
      label: 'Allow users to download their conversations',
      subLabel: 'Web Chat Only',
    },
    {
      name: 'conversationClearEnabled',
      value: formik.values.conversationClearEnabled,
      label: 'Allow users to clear their conversations',
      subLabel: 'Web Chat Only',
    },
    {
      name: 'showLiveChatIcon',
      value: formik.values.showLiveChatIcon,
      label: 'Show live chat icon for instant connection',
      subLabel: 'Web Chat Only',
    },
    {
      name: 'collectUserInfoEnabled',
      value: formik.values.collectUserInfoEnabled,
      label: 'Request user details prior to connecting',
      subLabel: 'Name, email or contact number, and reason',
    },
    {
      name: 'initMessage',
      value: formik.values.initMessage,
      label: 'Receive transcripts by email',
      subLabel: 'CSV file containing all conversations held in the selected period',
    },
  ];

  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>Error....</h2>;
  }

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className={'w-100'}>
      <FormGroup>
        {switchArray.map((item) => (
          <Fragment key={item.name}>
            <FormControlLabel
              control={
                <Switch
                  className={'switch'}
                  checked={item.value}
                  name={item.name}
                  value={item.value}
                  onChange={formik.handleChange}
                />
              }
              label={item.label}
              labelPlacement="end"
            />
            <FormHelperText className={'switchHelperText'}>{item.subLabel}</FormHelperText>
          </Fragment>
        ))}
        <FormHelperText className={'emailHelperText'}>
          Please provide an Email Address
        </FormHelperText>
        <FormControl className={'w-50'}>
          <OutlinedInput
            sx={{
              borderRadius: '10px',
              fieldset: { borderColor: formik.errors.emailAddress ? '#fa912e' : '' },
            }}
            name={'emailAddress'}
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            size={'small'}
            placeholder="Please enter a email address"
            disabled={!formik.values.initMessage}
          />
          <FormHelperText sx={{ color: '#fa912e' }}>{formik.errors.emailAddress}</FormHelperText>
        </FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          sx={{ alignItems: 'center' }}
          onChange={formik.handleChange}
        >
          <FormHelperText className={'frequencyText'}>Frequency</FormHelperText>
          <FormControlLabel
            control={
              <Radio
                name="emailFrequency"
                checked={formik.values.emailFrequency === 'DAILY'}
                value="DAILY"
              />
            }
            label="Daily"
          />
          <FormControlLabel
            control={
              <Radio
                name="emailFrequency"
                checked={formik.values.emailFrequency === 'WEEKLY'}
                value="WEEKLY"
              />
            }
            label="Weekly"
          />
        </RadioGroup>
        <Box className={'buttonBox'}>
          <Button variant="outlined" type="reset">
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={!formik.dirty}>
            Save Changes
          </Button>
        </Box>
      </FormGroup>
    </form>
  );
};

export default GeneralForm;
