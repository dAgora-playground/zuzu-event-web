import Layout from "@/components/Layout"
import MainProvider from "@/components/MainProvider"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainProvider>
  )
}
