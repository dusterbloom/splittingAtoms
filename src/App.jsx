import React from 'react'
import { Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Groups from './pages/Groups'
import GroupDetail from './pages/GroupDetail'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import { useWallet } from './contexts/WalletContext'

function ProtectedRoute({ children }) {
  const { address } = useWallet()
  if (!address) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/groups" 
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/groups/:groupId" 
            element={
              <ProtectedRoute>
                <GroupDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/expenses" 
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
