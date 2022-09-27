import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { appColor, appFont, appLayout, appTheme } from '../theme'
import { FaPause, FaStar, FaPhone, FaPlus, } from 'react-icons/fa'
import ButtonPrimary from '../component/ButtonPrimary'
import Spacing from '../component/spacing'
import { DividerH } from '../component/divider';
import InputTextField from '../component/InputTextField'
import useArray from '../utils/useArray';
import { useNavigate, useParams, } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { ContactByPKQuery, IContactDetailReq } from '../utils/types/contact_list';
import { Get_Contact_Detail, Get_Contact_List } from '../graphql/listContact.graphql'
import { useLocalStorage } from '../utils/useStorage';
import { clientApollo } from '../graphql/graphql';
import { FavoriteCtx } from '../utils/context/favoriteContext'
import { EditContact, EditPhoneNumber } from '../graphql/editContact';
import { EditContactRes, EditContactVar, EditPhoneNumberRes, EditPhoneNumberVar } from '../utils/types/contact_edit';
import { DeleteContactPhoneRes as DeleteContactRes, DeleteContactPhoneVar as DeleteContactVar } from '../utils/types/contact_delete';
import { AddContactWithPhones, AddNumberToContact } from '../graphql/createContact'
import { AddNumberlVar, AddNumberRes } from '../utils/types/contact_create'
import { DeleteContactPhone } from '../graphql/deleteContact';

const ContacForm: React.FC = props => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [listNumber, setListNumber] = useArray<string>([''])

   const param = useParams()
   const navigate = useNavigate()

   // const [favorite, setFavorite] = useLocalStorage<number[]>('favorite', [])

   const contactDetail = useQuery<ContactByPKQuery, IContactDetailReq>(Get_Contact_Detail, {
      variables: {
         id: Number(param.id)
      }
   })
   const [editContactMutation, editContacRes] = useMutation<EditContactRes, EditContactVar>(EditContact)
   const [editPhoneMutation, editPhoneRes] = useMutation<EditPhoneNumberRes, EditPhoneNumberVar>(EditPhoneNumber)
   const [addPhoneMutation, addPhoneRes] = useMutation<AddNumberRes, AddNumberlVar>(AddNumberToContact)
   const [deleteContactMutation, deleteContactRes] = useMutation<DeleteContactRes, DeleteContactVar>(DeleteContactPhone)

   const { favoritData, toggleOne } = React.useContext(FavoriteCtx)

   useEffect(() => {
      setFirstName(contactDetail.data?.contact_by_pk.first_name ?? '')
      setLastName(contactDetail.data?.contact_by_pk.last_name ?? '')
      setListNumber.set(contactDetail.data?.contact_by_pk.phones!.map((v) => v.number) ?? [])
   }, [contactDetail.data])

   const isFavorite = favoritData?.includes(contactDetail.data?.contact_by_pk.id!) ?? false


   return (
      <article css={appTheme.mainApp}>
         <div css={[appLayout.column, { padding: '1em', alignItems: 'stretch' }]} >
            <div css={[appLayout.rowVCenter]} >
               <div css={[appLayout.columnCenter, appTheme.circle('6em', 'yellow')]}>
                  <span css={[appFont.bodyBold]} >
                     {contactDetail.data?.contact_by_pk.first_name!.substring(0, 2).toUpperCase()}
                  </span>
               </div>
               <Spacing x={'1em'} />
               <div css={appLayout.column} >
                  <p css={appFont.title} >{`${contactDetail.data?.contact_by_pk.first_name!} ${contactDetail.data?.contact_by_pk.last_name}`}</p>
                  <p css={appFont.body} >{contactDetail.data?.contact_by_pk.phones![0].number}</p>
                  {/* <p css={appFont.body} >{'Expand Other Number'} <FaChevronDown /> </p> */}
               </div>

               <Spacing x={'1em'} />
               <div css={[appLayout.rowEnd, { flex: 1, alignItems: 'center' }]} >
                  <FaStar size={24}
                     color={isFavorite ? appColor.primary : appColor.divider}
                     onClick={(e) => {
                        toggleOne!(contactDetail.data?.contact_by_pk.id!)
                        // clientApollo.refetchQueries({ include: [] })

                     }} />
                  <Spacing x={'1em'} />
                  <ButtonPrimary css={{
                     maxHeight: '6em',
                     height: '4em',
                     paddingRight: '2em',
                     paddingLeft: '2em'
                  }} >
                     <span css={{ marginRight: 12 }} >Call</span>  <FaPhone />
                  </ButtonPrimary>
               </div>
            </div>
            {/* <span>{JSON.stringify(contactDetail.data?.contact_by_pk)}</span> */}
            <Spacing y={'.5em'} />
            <DividerH />
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
                  onClick={(e) => {
                     setListNumber.push('')
                  }}
               >
                  <span css={appFont.body} >Tambah Nomor <FaPlus /></span>
               </ButtonPrimary>
            </div>
            <Spacing y={8} />
            <div css={[appLayout.rowCenter]}>
               <ButtonPrimary css={{ backgroundColor: appColor.secondaryBg, flex: 1 }}
                  onClick={async (e) => {
                     const data = await deleteContactMutation({
                        variables: {
                           id: Number(param.id)
                        }
                     })
                     if (data.data?.delete_contact_by_pk) {
                        clientApollo.refetchQueries({
                           include: [Get_Contact_List]
                        })
                        navigate('/')
                     }
                  }}
               >
                  <span css={appFont.body} >Hapus</span>
               </ButtonPrimary>
               <Spacing x={8} />
               <ButtonPrimary css={{ flex: 1 }}
                  onClick={async (e) => {
                     editContactMutation({
                        variables: {
                           id: Number(param.id),
                           _set: {
                              first_name: firstName,
                              last_name: lastName,
                              phones: listNumber.map(v => ({ number: v }))
                           }
                        }
                     })
                     const phones = contactDetail.data?.contact_by_pk.phones
                     listNumber.forEach(async (v, i) => {
                        if (i < (phones?.length ?? 0)) {
                           await editPhoneMutation({
                              variables: {
                                 new_phone_number: v,
                                 pk_columns: {
                                    contact_id: phones![i].id!,
                                    number: phones![i].number!,
                                 }
                              }
                           })
                        } else {
                           addPhoneMutation({
                              variables: {
                                 contact_id: Number(param.id),
                                 phone_number: v,
                              }
                           })
                        }
                     })
                  }}

               >
                  <span css={appFont.body} >Simpan</span>
               </ButtonPrimary>

            </div>
         </div>
      </article>
   )
}

export default ContacForm