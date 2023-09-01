const mapping: Record<string, string> = {
  clients: 'client',
  organizations: 'organization',
  services: 'service',
  'service-requests': 'service_request',
  teams: 'team',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
