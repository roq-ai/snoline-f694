import * as yup from 'yup';

export const serviceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  charge: yup.number().integer().nullable(),
  organization_id: yup.string().nullable().required(),
});
