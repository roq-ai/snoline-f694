import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  role: yup.string().nullable(),
  expertise: yup.string().nullable(),
  organization_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
  service_id: yup.string().nullable().required(),
});
