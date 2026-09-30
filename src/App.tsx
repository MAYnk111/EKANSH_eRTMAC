import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DrillingProvider } from './context/DrillingContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { WellExplorerPage } from './pages/WellExplorerPage';
import { WellDetailPage } from './pages/WellDetailPage';
import { NearbyWellsMapPage } from './pages/NearbyWellsMapPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { RiskAnalysisPage } from './pages/RiskAnalysisPage';
import { ReportsPage } from './pages/ReportsPage';
import { ErtmacLivePage } from './pages/ErtmacLivePage';
import { OperationsBoardPage } from './pages/OperationsBoardPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-oil-navy-950 flex items-center justify-center text-cyan-400 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>INITIALIZING eRTMAC TELEMETRY GRID...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <AuthProvider>
      <DrillingProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes inside AppLayout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="wells" element={<WellExplorerPage />} />
              <Route path="wells/:id" element={<WellDetailPage />} />
              <Route path="nearby-map" element={<NearbyWellsMapPage />} />
              <Route path="knowledge-graph" element={<KnowledgeGraphPage />} />
              <Route path="risk-analysis" element={<RiskAnalysisPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="ertmac-live" element={<ErtmacLivePage />} />
              <Route path="operations" element={<OperationsBoardPage />} />
              <Route path="ai-assistant" element={<AiAssistantPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DrillingProvider>
    </AuthProvider>
  );
}

export default App;
