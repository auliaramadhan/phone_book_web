import { Contact, Phone } from './contact_list';
import { GenericResponse } from './generic_response';

export interface AddContactVar {
   first_name: string;
   last_name: string;
   phones: Phone[];
}


export interface AddNumberlVar {
   contact_id: number;
   phone_number: string;
}
export type AddContactRes = GenericResponse<'insert_contact', { returning : Contact} >
export type AddNumberRes = GenericResponse<'insert_phone', {returning : Contact} >


// export type IContactListRes = GenericResponse<'contact', Contact[]>
// export type IContactDetailRes = GenericResponse<'contact', Contact>

export default {}