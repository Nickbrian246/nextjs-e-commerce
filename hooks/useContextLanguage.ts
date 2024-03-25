import {LanguageContext} from '@/context/language/Language-context'
import React, { useContext } from 'react'
import { Language } from '@/context/language/Language-context'
type  currentLanguage = Language
type setCurrentLanguage = React.Dispatch<React.SetStateAction<Language>>
type useContextLanguage = [currentLanguage,setCurrentLanguage]
export default function useContextLanguage():useContextLanguage {
  const language = useContext(LanguageContext)
  if (!language) {
    throw new Error("useContextLanguage debe ser ultimado dentro de un LanguageContext provider")
  }
  const {currentLanguage,setCurrentLanguage} = language 
  return [currentLanguage, setCurrentLanguage]
}
