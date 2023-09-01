import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createServiceRequest } from 'apiSdk/service-requests';
import { serviceRequestValidationSchema } from 'validationSchema/service-requests';
import { ClientInterface } from 'interfaces/client';
import { ServiceInterface } from 'interfaces/service';
import { getClients } from 'apiSdk/clients';
import { getServices } from 'apiSdk/services';
import { ServiceRequestInterface } from 'interfaces/service-request';

function ServiceRequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ServiceRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createServiceRequest(values);
      resetForm();
      router.push('/service-requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ServiceRequestInterface>({
    initialValues: {
      status: '',
      requested_date: new Date(new Date().toDateString()),
      completed_date: new Date(new Date().toDateString()),
      client_id: (router.query.client_id as string) ?? null,
      service_id: (router.query.service_id as string) ?? null,
    },
    validationSchema: serviceRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Service Requests',
              link: '/service-requests',
            },
            {
              label: 'Create Service Request',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Service Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="requested_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Requested Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.requested_date ? new Date(formik.values?.requested_date) : null}
              onChange={(value: Date) => formik.setFieldValue('requested_date', value)}
            />
          </FormControl>
          <FormControl id="completed_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Completed Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.completed_date ? new Date(formik.values?.completed_date) : null}
              onChange={(value: Date) => formik.setFieldValue('completed_date', value)}
            />
          </FormControl>
          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            labelField={'first_name'}
          />
          <AsyncSelect<ServiceInterface>
            formik={formik}
            name={'service_id'}
            label={'Select Service'}
            placeholder={'Select Service'}
            fetcher={getServices}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/service-requests')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'service_request',
    operation: AccessOperationEnum.CREATE,
  }),
)(ServiceRequestCreatePage);
