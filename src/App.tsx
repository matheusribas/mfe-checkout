import { useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "@/components/ui/toast"
import { Wrapper } from "@/components/features/Wrapper"
import { useBoundStore } from "@/stores"
import type { CartItemType } from "@/components/shared/types"

const queryClient = new QueryClient()

interface AppProps {
  cart: CartItemType[]
}

function InnerApp({ cart }: AppProps) {
  const setCart = useBoundStore((state) => state.setCart)

  useEffect(() => setCart(cart), [cart, setCart])
  return <Wrapper />
}

export function App() {
  const cartProp = [
    {
      productId: 1,
      name: "Tênis Runner Pro",
      quantity: 1,
      unitPrice: 299.9,
    },
    {
      productId: 3,
      name: "Camiseta Essential",
      quantity: 2,
      unitPrice: 79.9,
    },
  ]
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <InnerApp cart={cartProp} />
        <Toaster />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
