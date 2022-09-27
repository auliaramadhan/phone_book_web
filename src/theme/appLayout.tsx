import { css } from '@emotion/react';


export const column = css({ display: 'flex', flexDirection: 'column', alignItems : 'start' })
export const columnCenter = css({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', })
export const columnVCenter = css({ display: 'flex', flexDirection: 'column', alignItems: 'center', })
export const columnHCenter = css({ display: 'flex', flexDirection: 'column', justifyContent: 'center', })

export const row = css({ display: 'flex', flexDirection: 'row', })
export const rowHCenter = css({ display: 'flex', flexDirection: 'row', justifyContent: 'center',  alignItems : 'start'})
export const rowVCenter = css({ display: 'flex', flexDirection: 'row', alignItems: 'center', })
export const rowCenter = css({ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', })
export const rowEnd = css({ display: 'flex', flexDirection: 'row', justifyContent: 'end', })
export const rowStart = css({ display: 'flex', flexDirection: 'row', justifyContent: 'start', })
export const rowSpaceAround = css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', })
export const rowSpaceBetween = css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', })
export const rowSpaceEvenly = css({ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', })
export const rowTop = css({ display: 'flex', flexDirection: 'row', alignItems: 'start', })
export const rowBottom = css({ display: 'flex', flexDirection: 'row', alignItems: 'end', })

export const selfCenter = css({ alignSelf: 'center' })
export const absoluteCenter = css({ top: 0,left: 0,right: 0,bottom: 0,position :'absolute' })

export default {}