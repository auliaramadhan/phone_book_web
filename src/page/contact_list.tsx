import React, { useContext, useRef, useState } from 'react'
import { appFont, appTheme } from '../theme'
import { FaStar } from 'react-icons/fa'
import CircleUsername from '../component/circleUsername'
import Spacing from '../component/spacing'
import { useQuery, useMutation } from '@apollo/client'
import { Get_Contact_List } from '../graphql/listContact.graphql'
import { ContactQuery, IContactListVar } from '../utils/types/contact_list';
import { InView } from "react-intersection-observer";

import { useParams, useNavigate, NavigateFunction } from 'react-router-dom'
import { useLocalStorage } from '../utils/useStorage'


const ContactList = () => {

   const contactList = useQuery<ContactQuery, IContactListVar>(Get_Contact_List, {
      variables: {
         limit: 10,
         offset: 0
      }
   })

   const [favorite, setFavorite, remove] = useLocalStorage<number[]>('favorite', [])
   // const {favorite, setFavorite} = useContext(FavoriteContext)

   const param = useParams()
   const navigation: NavigateFunction = useNavigate()

   const isMax = useRef(false)

   // const favorite = React.useMemo(() => contactList.data?.contact.map((v,i) =>), [contactList.data])

   return (
      <aside css={appTheme.sideBar} >
         <div css={{
            textAlign: 'start',
            padding: '1em',
            paddingRight: 0,
            flex: 1,
            flexDirection: 'column',
         }} >
            <div css={{ paddingRight: '1em' }}>
               <p css={appFont.h3}>Contact List </p>
               <Spacing y={10} />
               <span> <FaStar /> <span css={[appFont.title]}>Favorite </span></span>
               <br />

            </div>
            <Spacing y={4} />
            {
               contactList.data?.contact.filter((kontak) => favorite?.includes(kontak.id!)).map(
                  (kontak, i) =>
                     <CircleUsername
                        css={{ marginBottom: '.5em' }}
                        selected={param['*'] == kontak.id}
                        name={`${kontak.first_name} ${kontak.last_name}`}
                        number={kontak.phones![0].number}
                        onClick={e => {
                           navigation(`/${kontak.id!}`)
                        }} />
               )

            }
            <Spacing y={4} />
            <span css={[appFont.title]}>Your Contacts </span>
            <Spacing y={4} />
            <span>{JSON.stringify(param)}</span>
            {
               contactList.data?.contact.map((kontak, i) =>
                  <CircleUsername
                     css={{ marginBottom: '.5em' }}
                     selected={param['*'] == kontak.id}
                     name={`${kontak.first_name} ${kontak.last_name}`}
                     number={kontak.phones![0].number}
                     onClick={e => {
                        navigation(`/${kontak.id!}`)
                     }} />
               )
            }
            <InView
               onChange={async (inView) => {
                  if (inView && isMax.current) {
                     const currentLength = contactList.data?.contact.length;
                     const data = await contactList.fetchMore({
                        variables: {
                           offset: currentLength,
                           limit: 10,
                        },
                     });
                     console.log('cek length', data.data.contact.length)
                     if (data.data.contact.length < 10) {
                        isMax.current = true;
                     }
                  }
               }}
            />

         </div>
      </aside>
   )
}

export default ContactList