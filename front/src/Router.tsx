import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Plans } from './pages/Plans'
import { Contracts } from './pages/Contracts'
import SigIn from './pages/SigIn'
import { Payments } from './pages/Payments'

export function Router() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route index path="/login" element={<SigIn />} />
      <Route index path="/plans" element={<Plans />} />
      <Route index path="/contracts" element={<Contracts />} />
      <Route index path="/contracts/:contractId/payments" element={<Payments />} />
    </Routes>
    
  )
}
