import React from 'react'
import { ClassNames, css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { appColor } from './Color';

export const fontDefault = (theme: Theme) => css({
   fontSize: '1rem',
   color: appColor.primaryText,
   fontWeight: 'normal',
   fontFamily: ['Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
   // letterSpacing : 1.5
})

export const h1 = (theme: Theme) => css([fontDefault(theme), { fontSize: '3.2rem', fontWeight: 'bold', letterSpacing: -1.5 }]);
export const h2 = (theme: Theme) => css([fontDefault(theme), { fontSize: '2.4rem', fontWeight: 'bold', letterSpacing: -0.5 }]);
export const h3 = (theme: Theme) => css([fontDefault(theme), { fontSize: '2rem', fontWeight: 'bold' }]);
export const h4 = (theme: Theme) => css([fontDefault(theme), { fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: 0.25 }]);
export const h5 = (theme: Theme) => css([fontDefault(theme), { fontSize: '1.4rem', fontWeight: 'bold' }]);
export const h6 = (theme: Theme) => css([fontDefault(theme), { fontSize: '1rem', fontWeight: 'bold', letterSpacing: 0.15 }]);

export const title = (theme: Theme) => css([fontDefault(theme), { fontSize: '1.2rem', fontWeight: 'bold', }]);
export const titleSemiB = (theme: Theme) => css([fontDefault(theme), { fontSize: '1.2rem', fontWeight: 'bold' }]);

export const body = (theme: Theme) => css([fontDefault(theme)]);
export const bodyBold = (theme: Theme) => css([fontDefault(theme), { fontWeight: 'bold' }]);
export const bodySemiB = (theme: Theme) => css([fontDefault(theme), { fontWeight: 600 }]);
export const subtitle = (theme: Theme) => css([fontDefault(theme), { color: appColor.secondaryText }]);
export const subtitleBold = (theme: Theme) => css([fontDefault(theme), { fontWeight: 'bold', color: appColor.secondaryText }]);
export const subtitleSemiB = (theme: Theme) => css([fontDefault(theme), { fontWeight: 600, color: appColor.secondaryText }]);
export const caption = (theme: Theme) => css([fontDefault(theme), { fontSize: '1rem', color: appColor.secondaryText }]);
export const captionBold = (theme: Theme) => css([fontDefault(theme), { fontSize: '1rem', fontWeight: 'bold', color: appColor.secondaryText }]);
export const captionSemiB = (theme: Theme) => css([fontDefault(theme), { fontSize: '1rem', fontWeight: 600, color: appColor.secondaryText }]);

export const inputLabel = (theme: Theme) => css([fontDefault(theme), {fontWeight :'bold', color : appColor.secondaryText }]);


export default {}