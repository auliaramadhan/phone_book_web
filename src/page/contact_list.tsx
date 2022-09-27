import React, { useContext, useRef, useState } from 'react'
import { appColor, appFont, appTheme } from '../theme'
import { FaPlus, FaStar } from 'react-icons/fa'
import CircleUsername from '../component/circleUsername'
import Spacing from '../component/spacing'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { Get_Contact_List } from '../graphql/listContact.graphql'
import { ContactQuery, IContactListVar } from '../utils/types/contact_list';
import { InView } from "react-intersection-observer";

import { useParams, useNavigate, NavigateFunction } from 'react-router-dom'
import { useLocalStorage } from '../utils/useStorage'
import { FavoriteCtx } from '../utils/context/favoriteContext'
import ButtonPrimary from '../component/ButtonPrimary'
import useUpdateEffect from '../utils/useUpdateEffect'


const ContactList = () => {
   const [contactListFetch ,contactListQuery] = useLazyQuery<ContactQuery, IContactListVar>(Get_Contact_List, {
      variables: {
         limit: 100,
         offset: 0
      },
   })

   React.useEffect(() => {
      contactListFetch()
   }, [])

   const { favoritIds, toggleOne } = React.useContext(FavoriteCtx)

   const param = useParams()
   const navigation: NavigateFunction = useNavigate()

   const isMax = useRef(false)

   const favorite = React.useMemo(() => contactListQuery.data?.contact.filter((kontak) => favoritIds?.includes(kontak.id!)) ?? [], [contactListQuery.data, favoritIds])
   const nonFavorite = React.useMemo(() => contactListQuery.data?.contact.filter((kontak) => !favoritIds?.includes(kontak.id!)) ?? [], [contactListQuery.data, favoritIds])

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
               <ButtonPrimary css={{ flex: 1 }}
                  onClick={(e) => {
                     navigation('/new')
                     // setOffset(state => state + 1)
                  }}
               >
                  <span >Tambah Contact <FaPlus /></span>
               </ButtonPrimary>
               <Spacing y={4} />
               <span> <FaStar /> <span css={[appFont.title]}>Favorite </span></span>
               <br />

            </div>
            <Spacing y={4} />
            {
               favorite.map(
                  (kontak, i) =>
                     <CircleUsername
                        css={{ marginBottom: '.5em' }}
                        selected={param['*'] == kontak.id}
                        name={`${kontak.first_name} ${kontak.last_name}`}
                        number={kontak.phones?.length ? kontak.phones![0]!.number : ''}
                        onClick={e => {
                           navigation(`/${kontak.id!}`)
                        }} />
               )

            }
            <Spacing y={4} />
            <span css={[appFont.title]}>Your Contacts </span>
            <Spacing y={4} />
            {/* <span>{JSON.stringify(favorite)}</span> */}
            {
               nonFavorite.map((kontak, i) =>
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
                  if (inView && !contactListQuery.loading) {
                     const currentLength = contactListQuery.data?.contact.length;
                     const data = await contactListQuery.fetchMore({
                        variables: {
                           offset: currentLength,
                           limit: 10,
                        },
                        // updateQuery(previousQueryResult, options) {
                        //    const data: ContactQuery = {
                        //       contact: [
                        //          ...previousQueryResult.contact,
                        //          ...options.fetchMoreResult.contact,
                        //       ]
                        //    }
                        //    console.log(data, options)
                        //    return data
                        // },
                     });
                     console.log('cek length after', data.data?.contact.length, data)
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