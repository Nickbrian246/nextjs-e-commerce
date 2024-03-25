import React,{ReactNode, createContext, useState} from 'react'
interface Props{
  children:ReactNode
}

export type Language = "es" | "en"

interface LanguageContext {
  currentLanguage:Language,
  setCurrentLanguage:React.Dispatch<React.SetStateAction<Language>>
}
export const LanguageContext = createContext<LanguageContext | undefined>(undefined)

export default function LanguageProvider({children}:Props) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>("es")

    const contextValue:LanguageContext= {
      currentLanguage,
      setCurrentLanguage
    }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
