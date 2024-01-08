import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { WagmiConfig } from 'wagmi'

import { App } from './App'
import { config } from './wagmi'
import SignUp from './components/pages/CreateProvider'
import LandingPage from './components/pages/LandingPage'
import BuyCryptoPage from './components/pages/BuyCryptoPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path='/'
      element={<App />}
      >
        <Route index element={<LandingPage />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='buy-crypto' element={<BuyCryptoPage />} />
    </Route>
  ));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  </React.StrictMode>,
)
