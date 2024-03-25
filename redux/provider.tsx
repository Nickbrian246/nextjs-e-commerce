"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import LanguageProvider from "@/context/language/Language-context";
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
            <LanguageProvider>
            {children}
            </LanguageProvider>
          </Provider>;
}
