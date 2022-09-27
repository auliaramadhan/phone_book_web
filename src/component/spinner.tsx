import { css } from "@emotion/react";
import { appColor } from "../theme";



const Spinner : React.FC<{size? : number}> = ({size = 1}) => <div css={[css`
   border: ${size / 5}em solid #f3f3f3;
   border-top: ${size / 5}em solid ${appColor.primary};
   border-radius: 50%;
   width: ${size}em;
   height: ${size}em;
   @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
`, {
   animationDuration: '1s',
   animationIterationCount: 'infinite',
   animationName: 'spin',
   animationTimingFunction: 'linear',

}]}></div>;

export default Spinner;
