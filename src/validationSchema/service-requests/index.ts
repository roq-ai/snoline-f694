import * as yup from 'yup';

export const serviceRequestValidationSchema = yup.object().shape({
  status: yup.string().nullable(),
  requested_date: yup.date().nullable(),
  completed_date: yup.date().nullable(),
  client_id: yup.string().nullable().required(),
  service_id: yup.string().nullable().required(),
});
