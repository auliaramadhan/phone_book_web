import React, { useEffect, useState } from 'react'
import { appColor, appFont, appLayout, appTheme } from '../theme'
import { FaPlus, } from 'react-icons/fa'
import ButtonPrimary from '../component/ButtonPrimary'
import Spacing from '../component/spacing'
import InputTextField from '../component/InputTextField'
import useArray from '../utils/useArray';
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { ContactByPKQuery, IContactDetailReq } from '../utils/types/contact_list';
import { Get_Contact_Detail, Get_Contact_List } from '../graphql/listContact.graphql';
import { FavoriteCtx } from '../utils/context/favoriteContext'
import { AddContactRes, AddContactVar, AddNumberRes } from '../utils/types/contact_create'
import { AddContactWithPhones } from '../graphql/createContact'
import { clientApollo } from '../graphql/graphql';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ContacAddForm: React.FC = props => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [listNumber, setListNumber] = useArray<string>([''])

   const navigate = useNavigate()


   const [addContactMutation, addContacRes] = useMutation<AddContactRes, AddContactVar>(AddContactWithPhones)

   return (
      <article css={appTheme.mainApp}>
         <div css={[appLayout.column, { padding: '1em', alignItems: 'stretch' }]} >

            <Spacing y={'.5em'} />
            <div css={appLayout.column}>
               <InputTextField
                  name='firstName'
                  value={firstName}
                  onChange={e => {
                     setFirstName(e.target.value)
                  }}
                  aria-label='First Name'
                  placeholder='First Name'
                  id='firstName' />
               <InputTextField
                  name='lastName'
                  value={lastName}
                  aria-label='Last Name'
                  onChange={e => {
                     setLastName(e.target.value)
                  }}
                  placeholder='Last Name'
                  id='lastName' />
               {listNumber.map(
                  (v, i) => <InputTextField
                     key={i}
                     value={listNumber[i]}
                     name={`number${i}`}
                     placeholder={`+62`}
                     aria-label={`Number ${i}`}
                     onChange={(e) => {
                        const input = e.target.value
                        setListNumber.update(i, input)
                     }}
                  />
               )}
               <Spacing y={8} />
               <ButtonPrimary css={{ backgroundColor: appColor.secondaryBg }}
                  onClick={async (e) => {
                     setListNumber.push('')
                  }}
               >
                  <span css={appFont.body} >Tambah Nomor <FaPlus /></span>
               </ButtonPrimary>
            </div>
            <Spacing y={8} />
            <div css={[appLayout.rowCenter]}>
               <ButtonPrimary css={{ flex: 1 }}
                  onClick={async (e) => {
                     const regexNoSpecial = /^[a-zA-Z0-9 ]+$/
                     const numberRegex = /^\+?[0-9]+$/

                     // console.log(listNumber.every(e => numberRegex.test(e)))

                     if (!(!!firstName && !!lastName && listNumber.every(e => !!e))) {
                        toast('Data Harap Diisi', { position: 'bottom-center' })
                        return;
                     } else if (!(regexNoSpecial.test(firstName) && regexNoSpecial.test(lastName))) {
                        toast('Nama Tidak Memakai Karakter Spesial', { position: 'bottom-center' })
                        return;
                     } else if (!listNumber.every(e => numberRegex.test(e))) {
                        toast('Nomor tolong diisi angka', { position: 'bottom-center' })
                        return;
                     }
                     // return;
                     const dataReq = {
                        first_name: firstName,
                        last_name: lastName,
                        phones: listNumber.map(v => ({ number: v }))
                     }
                     console.log(dataReq)
                     const result = await addContactMutation({
                        variables: dataReq
                     }).catch(err => {
                        console.log(err)
                        // toast(err, { position: 'bottom-center' })
                     })
                     if (!result) {
                        toast('Terdapat Duplikat', { position: 'bottom-center' })
                     } else {
                        navigate(0)
                     }
                     // clientApollo.refetchQueries({
                     //    include:[Get_Contact_List]
                     // })
                  }}
               >
                  <span >Simpan <FaPlus /></span>
               </ButtonPrimary>
               <ToastContainer />

            </div>
         </div>
      </article>
   )
}

export default ContacAddForm