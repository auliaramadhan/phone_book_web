import { Contact, Phone } from './contact_list';
import { GenericResponse } from './generic_response';

export interface DeleteContactPhoneVar {
   id: number;
}

export type DeleteContactPhoneRes = GenericResponse<'delete_contact_by_pk', Contact >


// export type IContactListRes = GenericResponse<'contact', Contact[]>
// export type IContactDetailRes = GenericResponse<'contact', Contact>

export default {}