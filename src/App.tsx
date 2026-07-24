import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BenefitsPage from './pages/BenefitsPage'
import BenefitDetailPage from './pages/BenefitDetailPage'
import MedsPage from './pages/MedsPage'
import ContactsPage from './pages/ContactsPage'

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/benefits/:id" element={<BenefitDetailPage />} />
        <Route path="/meds" element={<MedsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}
