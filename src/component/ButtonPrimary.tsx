

import styled from '@emotion/styled'
import React from 'react'
import { appColor, appFont } from '../theme'
import { bodyBold } from '../theme/appFont';

const ButtonPrimary = styled.button([
   {
      ...appFont.buttonPrimary,
      backgroundColor: appColor.primary,
      borderRadius: '.25em',
      padding: '.5em',
      border : 0,
      
   },
])

export default ButtonPrimary