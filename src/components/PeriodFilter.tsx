import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PeriodFilterProps {
  onPeriodChange: (period: { start: string; end: string }) => void;
  startDate: string;
  endDate: string;
}

export const PeriodFilter: React.FC<PeriodFilterProps> = ({ onPeriodChange, startDate, endDate }) => {
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  // Synchroniser avec les props lorsqu'elles changent
  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  const handleApplyFilter = () => {
    onPeriodChange({ start: localStartDate, end: localEndDate });
  };

  const handlePresetPeriod = (months: number) => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    setLocalStartDate(startStr);
    setLocalEndDate(endStr);
    onPeriodChange({ start: startStr, end: endStr });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Date de début</Label>
          <Input
            id="start-date"
            type="date"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Date de fin</Label>
          <Input
            id="end-date"
            type="date"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => handlePresetPeriod(1)}>1 mois</Button>
        <Button variant="outline" size="sm" onClick={() => handlePresetPeriod(3)}>3 mois</Button>
        <Button variant="outline" size="sm" onClick={() => handlePresetPeriod(6)}>6 mois</Button>
        <Button variant="outline" size="sm" onClick={() => handlePresetPeriod(12)}>1 an</Button>
        <Button onClick={handleApplyFilter} className="bg-blue-600 hover:bg-blue-700">
          Appliquer
        </Button>
      </div>
    </div>
  );
};
