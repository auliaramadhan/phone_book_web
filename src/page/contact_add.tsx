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

const ContacAddForm: React.FC = props => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [listNumber, setListNumber] = useArray<string>([''])


   const { favoritData, toggleOne } = React.useContext(FavoriteCtx)

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
                     const dataReq = {
                        first_name: firstName,
                        last_name: lastName,
                        phones: listNumber.map(v => ({ number: v }))
                     }
                     console.log(dataReq)
                     await addContactMutation({
                        variables:  dataReq
                     })
                     clientApollo.refetchQueries({
                        include:[Get_Contact_List]
                     })
                  }}
               >
                  <span css={appFont.body} >Simpan <FaPlus /></span>
               </ButtonPrimary>

            </div>
         </div>
      </article>
   )
}

export default ContacAddForm