import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { ServiceInterface } from 'interfaces/service';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  organization_id: string;
  user_id: string;
  role?: string;
  expertise?: string;
  service_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  user?: UserInterface;
  service?: ServiceInterface;
  _count?: {};
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
  user_id?: string;
  role?: string;
  expertise?: string;
  service_id?: string;
}
