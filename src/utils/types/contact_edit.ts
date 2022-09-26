import { Contact, Phone } from './contact_list';
import { GenericResponse } from './generic_response';

export interface EditContactVar {
   id: number;
   _set: Contact;
}


export interface EditPhoneNumberVar {
   pk_columns: {
      number: string;
      contact_id: number;
   };
   new_phone_number: string;
}

export type EditContactRes = GenericResponse<'update_contact_by_pk', Contact >
export type EditPhoneNumberRes = GenericResponse<'update_phone_by_pk', Contact >


// export type IContactListRes = GenericResponse<'contact', Contact[]>
// export type IContactDetailRes = GenericResponse<'contact', Contact>

export default {}