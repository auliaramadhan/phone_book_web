import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { appColor, appFont, appLayout, appTheme } from '../theme'
import { FaPause, FaStar, FaPhone, FaPlus, } from 'react-icons/fa'
import ButtonPrimary from '../component/ButtonPrimary'
import Spacing from '../component/spacing'
import { DividerH } from '../component/divider';
import InputTextField from '../component/InputTextField'
import useArray from '../utils/useArray';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { ContactByPKQuery, IContactDetailReq } from '../utils/types/contact_list';
import { Get_Contact_Detail } from '../graphql/listContact.graphql'
import { useLocalStorage } from '../utils/useStorage';

const ContacForm: React.FC = props => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [listNumber, setListNumber] = useArray<string>([''])

   const param = useParams()

   const [favorite, setFavorite] = useLocalStorage<number[]>('favorite', [])

   const contactDetail = useQuery<ContactByPKQuery, IContactDetailReq>(Get_Contact_Detail, {
      variables: {
         id: Number(param.id)
      }
   })

   useEffect(() => {
      setFirstName(contactDetail.data?.contact_by_pk.first_name ?? '')
      setLastName(contactDetail.data?.contact_by_pk.last_name ?? '')
      setListNumber.set(contactDetail.data?.contact_by_pk.phones!.map((v) => v.number) ?? [])
   }, [contactDetail.data])

   const isFavorite = favorite.includes(contactDetail.data?.contact_by_pk.id!)


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
                        if (isFavorite) {
                           setFavorite(list => list.filter(v => v != contactDetail.data?.contact_by_pk.id!))
                           return;
                        }
                        setFavorite([...favorite, contactDetail.data?.contact_by_pk.id!])
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
                  onClick={(e) => {
                     setListNumber.push('')
                  }}
               >
                  <span css={appFont.body} >Tambah Nomor <FaPlus /></span>
               </ButtonPrimary>
               <ButtonPrimary css={{ flex: 1 }}
                  onClick={(e) => {
                     setListNumber.push('')
                  }}
               >
                  <span css={appFont.body} >Tambah Nomor <FaPlus /></span>
               </ButtonPrimary>

            </div>
         </div>
      </article>
   )
}

export default ContacForm