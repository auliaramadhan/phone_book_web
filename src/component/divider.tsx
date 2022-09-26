import styled from "@emotion/styled"
import { appColor } from "../theme"

interface IDivider {
   size?: number;
}

export const DividerH = styled.hr<IDivider>(
   props => ({
      height: props.size ?? 1,
      backgroundColor: appColor.divider,
      width: '100%',
      border: 0
   })
)

export const DividerV = styled.hr<IDivider>(
   props => ({
      width: props.size ?? 1,
      backgroundColor: appColor.divider,
      height: '100%',
      border: 0,
   })
)
