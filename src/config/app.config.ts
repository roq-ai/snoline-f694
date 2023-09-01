interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Member', 'Manager', 'Employee'],
  tenantName: 'Organization',
  applicationName: 'Snoline',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage Organization registration',
    "Manage Organization's details",
    'Manage services and charges',
    'Manage team members and their expertise',
    'Provide contact details of service providers',
  ],
};
