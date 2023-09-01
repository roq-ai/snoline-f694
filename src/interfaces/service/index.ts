import { ClientInterface } from 'interfaces/client';
import { ServiceRequestInterface } from 'interfaces/service-request';
import { TeamInterface } from 'interfaces/team';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ServiceInterface {
  id?: string;
  name: string;
  description?: string;
  charge?: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  client?: ClientInterface[];
  service_request?: ServiceRequestInterface[];
  team?: TeamInterface[];
  organization?: OrganizationInterface;
  _count?: {
    client?: number;
    service_request?: number;
    team?: number;
  };
}

export interface ServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
}
