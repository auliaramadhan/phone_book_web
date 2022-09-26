
import { css } from '@emotion/react'
import React from 'react'
import { appFont } from '../theme'
import { appColor } from '../theme/Color';

const formDiv = css({
   display: 'flex',
   alignItems: 'start',
   position: 'relative',
   paddingTop: '1em',
   flex :1,
   width : '100%'
   // backgroundColor :'red',
})

const formLabel = css({
   position: 'absolute',
   top: 4,
   left: 16,
   zIndex: 10,
   padding: 0,
   margin: 0,
   display: 'block',
   transition: '0.2s',
   flex :1,
   backgroundColor: appColor.whiteBg
})


const formField = css({
   padding: '1em',
   backgroundColor: 'transparent',
   borderWidth: 1,
   borderColor: appColor.divider,
   borderRadius: 8,
   flex: 1,
   ":focus": {
      borderColor: appColor.divider,
   }

})


const InputTextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
   return (
      <div css={formDiv}>
         <input css={[formField, appFont.body]} type="input" {...props} />
         <label css={[appFont.inputLabel, formLabel]} >{props['aria-label']}</label>
      </div>
   )
}

export default InputTextField