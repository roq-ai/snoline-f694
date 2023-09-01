import { ServiceInterface } from 'interfaces/service';
import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  service_charge?: number;
  service_type?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  service?: ServiceInterface[];
  team?: TeamInterface[];
  user?: UserInterface;
  _count?: {
    service?: number;
    team?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  service_type?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
