import { GenericResponse } from './generic_response';

export interface IContactListVar {
   distinct_on?: [keyof Contact];
   limit?: number;
   offset?: number;
   order_by?: [keyof Contact];
   where?: any;
}


export interface IContactDetailReq {
   id : number
}

// export type IContactListRes = GenericResponse<'contact', Contact[]>
// export type IContactDetailRes = GenericResponse<'contact', Contact>

export interface ContactQuery {
   contact : Contact[]
}
export interface ContactByPKQuery {
   contact_by_pk : Contact
}
export interface Contact {
   created_at?: Date;
   first_name?: string;
   id?:         number;
   last_name?:  string;
   phones?:     Phone[];
}

export interface Phone {
   number:     string;
   created_ad?: Date;
   id?:         number;
}
export default {}