import React from 'react'
import { useLocalStorage } from '../useStorage'

interface IFavoritContext {
   favoritData?: number[];
   setFavorit?: (favs: number[]) => void;
   toggleOne?: (favId: number) => void;
}

export const FavoriteCtx = React.createContext<IFavoritContext>({})


export const FavoriteProvider: React.FC<any> = (props) => {
   const [favoritData, setFavoritData] = useLocalStorage<number[]>('favorite', [])

   const setFavorit = (numbers: number[]) => {
      const data = [...new Set(numbers)]
      setFavoritData(data)
   }
   const toggleOne = (favId: number) => {
      setFavoritData(state => {
         let data = [...new Set(state)]
         if (state.includes(favId)) {
            data = data.filter(v => v != favId)
         } else {
            data.push(favId)
         }
         setFavoritData(data)
         return data
      })
   }

   return (
      <FavoriteCtx.Provider value={{ favoritData, setFavorit, toggleOne }}  >
         {props.children}
      </FavoriteCtx.Provider>
   )
}
