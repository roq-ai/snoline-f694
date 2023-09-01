import * as yup from 'yup';

export const clientValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  contact_number: yup.string().nullable(),
  email_id: yup.string().nullable(),
  preferred_service: yup.string().nullable().required(),
});
