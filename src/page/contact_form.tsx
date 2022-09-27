import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { appColor, appFont, appLayout, appTheme } from '../theme'
import { FaPause, FaStar, FaPhone, FaPlus, } from 'react-icons/fa'
import ButtonPrimary from '../component/ButtonPrimary'
import Spacing from '../component/spacing';
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
import Spinner from '../component/spinner'
import { toast, ToastContainer } from 'react-toastify'
import ReactModal from 'react-modal'
import 'react-toastify/dist/ReactToastify.css';

const ContacForm: React.FC = props => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [listNumber, setListNumber] = useArray<string>([''])
   const [showConfirm, setShowConfirm] = useState(false)

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

   const { favoritIds: favoritData, toggleOne } = React.useContext(FavoriteCtx)

   useEffect(() => {
      setFirstName(contactDetail.data?.contact_by_pk.first_name ?? '')
      setLastName(contactDetail.data?.contact_by_pk.last_name ?? '')
      setListNumber.set(contactDetail.data?.contact_by_pk.phones!.map((v) => v.number) ?? [])
   }, [contactDetail.data])

   const isFavorite = favoritData?.includes(contactDetail.data?.contact_by_pk.id!) ?? false

   const isLoading = (editContacRes.loading || editPhoneRes.loading || addPhoneRes.loading || deleteContactRes.loading)

   return (
      <article css={appTheme.mainApp}>
         {/* {isLoading &&
            <div css={appTheme.fullBgModal}>
               <Spinner />
            </div>
         } */}
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
            {/* <span>{JSON.stringify(favoritData)}</span> */}
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
                     aria-label={`Number ${i + 1}`}
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
                     onDelete()
                  }}
               >
                  <span css={appFont.body} >Hapus</span>
               </ButtonPrimary>
               <Spacing x={8} />
               <ButtonPrimary css={{ flex: 1 }}
                  onClick={onSave}

               >
                  <span >Simpan</span>
               </ButtonPrimary>
               <ToastContainer />

            </div>
         </div>
         {/* <ReactModal
            isOpen={showConfirm}
            css={{
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: appColor.bgModal,
               height: '100%',
               width: '100%',
               display:'flex',
               zIndex:'10001 !important',
               alignItems :'center',
               justifyContent :'center'
            }}
         >

            <div css={[appLayout.columnCenter,  appLayout.selfCenter, {width :'15em', height:'15em', backgroundColor :'white', borderRadius : '1em', padding: '1em'}]}>

               <div css={{flex : 1}} />
               <p css={appFont.body}>Apakah anda Yakin akan Menghapus data {contactDetail.data?.contact_by_pk.first_name}</p>
               <div css={{flex : 1}} />
               <div css={[appLayout.rowEnd]}>
                  <ButtonPrimary
                     css={{
                        backgroundColor: appColor.secondaryBg
                     }}
                     onClick={() => {
                        setShowConfirm(false)
                     }}
                  >
                     <span css={appFont.body}>Tidak</span>
                  </ButtonPrimary>
                  <Spacing x={16} />
                  <ButtonPrimary
                     onClick={() => {
                        setShowConfirm(false)
                     }}
                     children='Iya'
                  />
               </div>
               <div css={{flex : 1}} />
            </div>

         </ReactModal> */}
      </article>
   )

   async function onDelete() {
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
   }
   async function onSave(e: React.MouseEvent) {
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
      await editContactMutation({
         variables: {
            id: Number(param.id),
            _set: {
               first_name: firstName,
               last_name: lastName,
               // phones: listNumber.map(v => ({ number: v }))
            }
         }
      })
      const phones = contactDetail.data?.contact_by_pk.phones
      listNumber.forEach(async (v, i) => {
         if (i < (phones?.length ?? 0)) {
            if (v === phones![i].number!) {
               // continue
            } else {
               const req = {
                  new_phone_number: v,
                  pk_columns: {
                     contact_id: Number(param.id!),
                     number: phones![i].number!,
                  }
               }
               const data = await editPhoneMutation({
                  variables: req
               })
               if (!data.data?.update_phone_by_pk) {
                  toast('Maaf terjadi kesalahan', { toastId: 1, position: 'bottom-center' })
               }
               console.log(req, data)
            }
         } else {
            await addPhoneMutation({
               variables: {
                  contact_id: Number(param.id),
                  phone_number: v,
               }
            })
         }
      })


   }
}

export default ContacForm