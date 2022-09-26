import React, { useCallback, useState, useEffect } from "react"

export function useLocalStorage<T extends {} | null>(key: string, defaultValue: T) {
   return useStorage<T>(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T extends {} | null>(key: string, defaultValue: T) {
   return useStorage<T>(key, defaultValue, window.sessionStorage)
}

function useStorage<T extends {} | null>(key: string, defaultValue: T, storageObject: Storage): [
   T,
   React.Dispatch<React.SetStateAction<T>>,
   () => void,
] {
   const [value, setValue] = useState<T>(() => {
      const jsonValue = storageObject.getItem(key)
      if (jsonValue != null) return JSON.parse(jsonValue)

      if (typeof defaultValue === "function") {
         return defaultValue()
      } else {
         return defaultValue
      }
   })

   useEffect(() => {
      if (value === undefined) return storageObject.removeItem(key)
      storageObject.setItem(key, JSON.stringify(value))
   }, [key, value, storageObject])

   const remove = useCallback(() => {
      setValue(null as T)
   }, [])
   

   return [value, setValue, remove]
}