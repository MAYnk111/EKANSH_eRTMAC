import React, { useState, useEffect } from 'react';
import { Kanban, ShieldCheck, RefreshCw } from 'lucide-react';
import { dataStorage } from '../services/dataStorage';
import { KanbanCard, KanbanColumnId } from '../types';
import { KanbanBoard } from '../components/kanban/KanbanBoard';

export const OperationsBoardPage: React.FC = () => {
  const [cards, setCards] = useState<KanbanCard[]>([]);

  const loadCards = async () => {
    const data = await dataStorage.getKanbanCards();
    setCards(data);
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleUpdateColumn = async (cardId: string, newCol: KanbanColumnId) => {
    // Update local state immediately for snappy UX
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, columnId: newCol } : c));
    // Persist to storage/Firestore
    await dataStorage.updateKanbanCardColumn(cardId, newCol);
  };

  const handleAddCard = async (cardData: Partial<KanbanCard>) => {
    const newCard: KanbanCard = {
      id: cardData.id || `card-${Date.now()}`,
      columnId: cardData.columnId || 'detected',
      risk: cardData.risk || 'Operational Anomaly',
      well: cardData.well || 'AA-12',
      depth: cardData.depth || '2450 m',
      severity: cardData.severity || 'high',
      confidence: cardData.confidence || 85,
      assignedEngineer: cardData.assignedEngineer || 'Operations Engineer',
      timestamp: 'Just now',
      description: cardData.description || 'Logged risk card',
      evidenceCount: cardData.evidenceCount || 1,
      recommendedAction: cardData.recommendedAction || 'Inspect telemetry parameters.',
      tags: cardData.tags || ['Operations']
    };

    setCards(prev => [newCard, ...prev]);
    await dataStorage.addKanbanCard(newCard);
  };

  return (
    <div className="space-y-6">
      <KanbanBoard
        cards={cards}
        onUpdateColumn={handleUpdateColumn}
        onAddCard={handleAddCard}
      />
    </div>
  );
};
