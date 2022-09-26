
import styled from '@emotion/styled'
import React from 'react'

interface ISpacing {
   x? : number | string,
   y? : number | string,
   left? : number | string,
   right? : number | string,
   top? : number | string,
   bottom? : number | string,

}

const Spacing = styled.div<ISpacing>(
   props => ({
      display : 'flex',
     marginLeft : props.left ?? props.x,
     marginRight : props.right ?? props.x,
     marginTop : props.top ?? props.y,
     marginBottom : props.bottom ?? props.y,
     
   })
 )
 
export default Spacing