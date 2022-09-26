import { css } from '@emotion/react';
import { appColor } from './Color';

const breakpoints = [576, 768, 992, 1200]
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

export const gridParent = css`
   height : 100%;
   display: grid;
   grid-template-columns: repeat(6, 1fr);
   grid-template-rows: repeat(5, 1fr);
   grid-column-gap: 0px;
   grid-row-gap: 0px;
`
export const sideBar = css` 
   grid-area: 1 / 1 / 6 / 3; 
   background: ${appColor.secondaryBg};
   ${mq[1]} {
      grid-area: 1 / 1 / 6 / 7;
   }
   `
export const mainApp = css` 
   grid-area: 1 / 3 / 6 / 7;
   background: ${appColor.primaryBg};
   ${mq[1]} {
      grid-area: 1 / 1 / 6 / 7;
   }
 `

export const circle = (size: number | string, color = 'transparent') => css({
   height: size,
   width: size,
   borderRadius: 100,
   backgroundColor: color,
})


export default {}