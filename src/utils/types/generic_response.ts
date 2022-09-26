

// export interface GenericResponse<S extends string, T >  {
//    data?: {
//       [key in S] : T
//    };
//    error? : Error[];
// }

export interface Error {
   extensions: Extensions;
   message:    string;
}

export interface Extensions {
   path: string;
   code: string;
}


export type GenericResponse<S extends string, T > = {
   [key in S] : T
}