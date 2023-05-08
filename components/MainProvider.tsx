import { PropsWithChildren } from "react"

import { WagmiConfig, createClient } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  ConnectKitProvider,
  getDefaultClientConfig,
} from "@crossbell/connect-kit"

const queryClient = new QueryClient()
const wagmiClient = createClient(
  getDefaultClientConfig({ appName: "dAgora Zuzu" }),
)

const MainProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default MainProvider
