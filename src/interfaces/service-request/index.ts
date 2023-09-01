import { ClientInterface } from 'interfaces/client';
import { ServiceInterface } from 'interfaces/service';
import { GetQueryInterface } from 'interfaces';

export interface ServiceRequestInterface {
  id?: string;
  client_id: string;
  service_id: string;
  status?: string;
  requested_date?: any;
  completed_date?: any;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  service?: ServiceInterface;
  _count?: {};
}

export interface ServiceRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  client_id?: string;
  service_id?: string;
  status?: string;
}
