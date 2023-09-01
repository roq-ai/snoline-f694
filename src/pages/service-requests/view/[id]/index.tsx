import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text, Image, Button } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';
import { EntityImage } from 'components/entity-image';
import { FiEdit2 } from 'react-icons/fi';

import { getServiceRequestById } from 'apiSdk/service-requests';
import { ServiceRequestInterface } from 'interfaces/service-request';

function ServiceRequestViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ServiceRequestInterface>(
    () => (id ? `/service-requests/${id}` : null),
    () =>
      getServiceRequestById(id, {
        relations: ['client', 'service'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

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
              label: 'Service Request Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper wrapperProps={{ border: 'none', gap: 3, p: 0 }}>
              <Flex alignItems="center" w="full" justifyContent={'space-between'}>
                <Box>
                  <Text
                    sx={{
                      fontSize: '1.875rem',
                      fontWeight: 700,
                      color: 'base.content',
                    }}
                  >
                    Service Request Details
                  </Text>
                </Box>
                {hasAccess('service_request', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                  <NextLink href={`/service-requests/edit/${id}`} passHref legacyBehavior>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      mr={2}
                      padding="0rem 0.5rem"
                      height="24px"
                      fontSize="0.75rem"
                      variant="outline"
                      color="state.info.main"
                      borderRadius="6px"
                      border="1px"
                      borderColor="state.info.transparent"
                      leftIcon={<FiEdit2 width="12px" height="12px" color="state.info.main" />}
                    >
                      Edit
                    </Button>
                  </NextLink>
                )}
              </Flex>

              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem label="Status" text={data?.status} />

                <FormListItem
                  label="Requested Date"
                  text={
                    data?.requested_date
                      ? format(parseISO(data?.requested_date as unknown as string), 'dd-MM-yyyy')
                      : ''
                  }
                />

                <FormListItem
                  label="Completed Date"
                  text={
                    data?.completed_date
                      ? format(parseISO(data?.completed_date as unknown as string), 'dd-MM-yyyy')
                      : ''
                  }
                />

                <FormListItem
                  label="Created At"
                  text={data?.created_at ? format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy') : ''}
                />

                <FormListItem
                  label="Updated At"
                  text={data?.updated_at ? format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy') : ''}
                />

                {hasAccess('client', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Client"
                    text={
                      <Link as={NextLink} href={`/clients/view/${data?.client?.id}`}>
                        {data?.client?.first_name}
                      </Link>
                    }
                  />
                )}
                {hasAccess('service', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="Service"
                    text={
                      <Link as={NextLink} href={`/services/view/${data?.service?.id}`}>
                        {data?.service?.name}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
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
    operation: AccessOperationEnum.READ,
  }),
)(ServiceRequestViewPage);
