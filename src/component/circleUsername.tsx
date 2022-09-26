import React from 'react'
import { appColor, appFont, appLayout, appTheme } from '../theme'
import react from '@vitejs/plugin-react';
import Spacing from './spacing';
import { css, Theme } from '@emotion/react';

interface ICircleUsername extends React.HTMLAttributes<HTMLDivElement> {
   name: string
   number: string
   selected? : boolean
}

const CircleUsername: React.FC<ICircleUsername> = ({ name, number, selected = false, ...divAttr }) => {
   return (
      <div {...divAttr} css={[appLayout.rowVCenter, cardCircle, selected && cardSelected]} >
         <div css={[appLayout.columnCenter, appTheme.circle('3em', 'yellow')]} >
            <span css={[appFont.bodyBold]} >
               {name.substring(0, 2).toUpperCase()}
            </span>
         </div>
         <Spacing x={'.5em'} />
         <div>
            <p css={appFont.bodyBold} >{name}  </p>
            <p css={appFont.subtitle} >{number}</p>
         </div>
      </div>
   )
}

export default CircleUsername

const cardCircle = css({
   backgroundColor: appColor.primaryBg,
   // boxShadow: [ ],
   borderRadius : '.5em',
   alignItems: 'center',
   alignSelf: 'self-start',
   padding: '.5em',
   marginRight : '1em',
   transition : ['all', '300ms']
})

const cardSelected = css({
   borderTopLeftRadius: '4em',
   borderBottomLeftRadius: '4em',
   marginRight : 0,
   marginLeft : '1em'

})



