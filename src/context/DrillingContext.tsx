import React, { createContext, useContext, useState, useEffect } from 'react';
import { Well, DrillingTelemetry, RiskAlert, NotificationItem } from '../types';
import { dataStorage } from '../services/dataStorage';

interface DrillingContextType {
  activeWell: Well | null;
  telemetry: DrillingTelemetry;
  telemetryHistory: DrillingTelemetry[];
  riskAlert: RiskAlert | null;
  isStreaming: boolean;
  userCoords: { lat: number; lng: number; label: string } | null;
  selectedRadiusKm: number;
  setSelectedRadiusKm: (radius: number) => void;
  toggleStreaming: () => void;
  advanceDrillingDepth: (meters?: number) => void;
  acknowledgeRiskAlert: () => void;
  moveRiskToKanban: () => Promise<void>;
  requestUserLocation: () => void;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  refreshAllData: () => Promise<void>;
}

const DrillingContext = createContext<DrillingContextType | undefined>(undefined);

export const DrillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeWell, setActiveWell] = useState<Well | null>(null);
  const [riskAlert, setRiskAlert] = useState<RiskAlert | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [selectedRadiusKm, setSelectedRadiusKm] = useState<number>(10);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number; label: string } | null>(null);

  // Live Telemetry current tick & history for charts
  const [telemetry, setTelemetry] = useState<DrillingTelemetry>({
    timestamp: new Date().toLocaleTimeString(),
    depth: 2450.4,
    rop: 14.8,
    wob: 145.2,
    rpm: 124,
    torque: 16.8,
    flowRate: 2380,
    mudWeight: 1.18,
    standpipePressure: 2845,
    gasUnits: 18.5,
    status: 'Elevated Risk'
  });

  const [telemetryHistory, setTelemetryHistory] = useState<DrillingTelemetry[]>(() => {
    // Generate initial 15 history points
    const hist: DrillingTelemetry[] = [];
    const baseTime = Date.now() - 15 * 5000;
    for (let i = 0; i < 15; i++) {
      const t = new Date(baseTime + i * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      hist.push({
        timestamp: t,
        depth: +(2448.0 + (i * 0.16)).toFixed(1),
        rop: +(13.5 + Math.sin(i) * 2.2).toFixed(1),
        wob: +(140 + Math.cos(i) * 8).toFixed(1),
        rpm: Math.round(120 + Math.sin(i * 0.8) * 6),
        torque: +(15.5 + Math.sin(i * 0.5) * 1.8).toFixed(1),
        flowRate: Math.round(2360 + Math.cos(i) * 35),
        mudWeight: 1.18,
        standpipePressure: Math.round(2820 + Math.sin(i * 1.2) * 50),
        gasUnits: +(16 + Math.random() * 3).toFixed(1),
        status: i > 10 ? 'Elevated Risk' : 'Normal'
      });
    }
    return hist;
  });

  // Load initial data
  const refreshAllData = async () => {
    const well = await dataStorage.getActiveWell();
    const alert = await dataStorage.getRiskAlert();
    const notifs = await dataStorage.getNotifications();
    setActiveWell(well);
    setRiskAlert(alert);
    setNotifications(notifs);
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Request browser location
  const requestUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: 'Your Current Location'
          });
        },
        (err) => {
          console.warn('Geolocation denied or unavailable:', err);
          // Set asset control room coordinates
          setUserCoords({
            lat: 27.2880,
            lng: 95.3400,
            label: 'Duliajan eRTMAC Control Center (Default)'
          });
        }
      );
    }
  };

  useEffect(() => {
    requestUserLocation();
  }, []);

  // Live telemetry stream simulator (every 3 seconds)
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Micro fluctuation
        const depthStep = 0.05; // 5 cm per interval
        const nextDepth = +(prev.depth + depthStep).toFixed(2);
        const noise = (Math.random() - 0.5);

        // Near 2450m, torque and pressure show micro anomalies
        const nextTorque = +(16.8 + noise * 1.4).toFixed(1);
        const nextPressure = Math.round(2850 + noise * 65);
        const nextRop = +(14.5 + noise * 2.0).toFixed(1);
        const nextWob = +(144 + noise * 7).toFixed(1);
        const nextRpm = Math.round(124 + noise * 4);
        const nextFlow = Math.round(2380 + noise * 25);
        const nextGas = +(18.2 + Math.random() * 2.5).toFixed(1);

        const newTick: DrillingTelemetry = {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          depth: nextDepth,
          rop: nextRop,
          wob: nextWob,
          rpm: nextRpm,
          torque: nextTorque,
          flowRate: nextFlow,
          mudWeight: 1.18,
          standpipePressure: nextPressure,
          gasUnits: nextGas,
          status: 'Elevated Risk'
        };

        setTelemetryHistory((hist) => [...hist.slice(-24), newTick]);
        return newTick;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const toggleStreaming = () => {
    setIsStreaming(prev => !prev);
  };

  const advanceDrillingDepth = (meters = 5) => {
    setTelemetry(prev => {
      const nextDepth = +(prev.depth + meters).toFixed(1);
      return {
        ...prev,
        depth: nextDepth
      };
    });
  };

  const acknowledgeRiskAlert = () => {
    if (riskAlert) {
      const updated: RiskAlert = { ...riskAlert, status: 'acknowledged' };
      setRiskAlert(updated);
      dataStorage.saveRiskAlert(updated);
    }
  };

  const moveRiskToKanban = async () => {
    if (!riskAlert) return;
    await dataStorage.addKanbanCard({
      id: `card-${Date.now()}`,
      columnId: 'action_required',
      risk: `${riskAlert.riskType} in Upper Sandstone (${riskAlert.troubleZoneStart}–${riskAlert.troubleZoneEnd} m)`,
      well: riskAlert.wellName,
      depth: `${riskAlert.troubleZoneStart}–${riskAlert.troubleZoneEnd} m`,
      severity: riskAlert.severity,
      confidence: riskAlert.confidence,
      assignedEngineer: 'Operations Team Lead',
      timestamp: 'Just now',
      description: riskAlert.whyAlert[0] || 'Historical trouble zone active analog alert',
      evidenceCount: riskAlert.historicalEvidence.length,
      recommendedAction: riskAlert.recommendedAction,
      tags: ['Offset AI Alert', 'Mud Loss', 'Upper Sandstone']
    });

    await dataStorage.addNotification({
      id: `notif-${Date.now()}`,
      title: '📋 Risk Alert Pushed to Operations Board',
      message: `Card for Well ${riskAlert.wellName} moved to Action Required column.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      link: '/operations'
    });

    const notifs = await dataStorage.getNotifications();
    setNotifications(notifs);
  };

  const markNotificationAsRead = (id: string) => {
    dataStorage.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <DrillingContext.Provider value={{
      activeWell,
      telemetry,
      telemetryHistory,
      riskAlert,
      isStreaming,
      userCoords,
      selectedRadiusKm,
      setSelectedRadiusKm,
      toggleStreaming,
      advanceDrillingDepth,
      acknowledgeRiskAlert,
      moveRiskToKanban,
      requestUserLocation,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      refreshAllData
    }}>
      {children}
    </DrillingContext.Provider>
  );
};

export const useDrilling = () => {
  const context = useContext(DrillingContext);
  if (!context) {
    throw new Error('useDrilling must be used within a DrillingProvider');
  }
  return context;
};
