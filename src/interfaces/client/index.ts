import { ServiceRequestInterface } from 'interfaces/service-request';
import { ServiceInterface } from 'interfaces/service';
import { GetQueryInterface } from 'interfaces';

export interface ClientInterface {
  id?: string;
  first_name: string;
  last_name: string;
  contact_number?: string;
  email_id?: string;
  preferred_service: string;
  created_at?: any;
  updated_at?: any;
  service_request?: ServiceRequestInterface[];
  service?: ServiceInterface;
  _count?: {
    service_request?: number;
  };
}

export interface ClientGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  contact_number?: string;
  email_id?: string;
  preferred_service?: string;
}
