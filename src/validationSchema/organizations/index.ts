import * as yup from 'yup';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  service_charge: yup.number().integer().nullable(),
  service_type: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
