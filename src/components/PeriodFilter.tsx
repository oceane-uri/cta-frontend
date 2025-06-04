
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PeriodFilterProps {
  onPeriodChange: (period: { start: string; end: string }) => void;
}

export const PeriodFilter: React.FC<PeriodFilterProps> = ({ onPeriodChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApplyFilter = () => {
    onPeriodChange({ start: startDate, end: endDate });
  };

  const handlePresetPeriod = (months: number) => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);

    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    setStartDate(startStr);
    setEndDate(endStr);
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Date de fin</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetPeriod(1)}
        >
          1 mois
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetPeriod(3)}
        >
          3 mois
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetPeriod(6)}
        >
          6 mois
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePresetPeriod(12)}
        >
          1 an
        </Button>
        <Button
          onClick={handleApplyFilter}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Appliquer
        </Button>
      </div>
    </div>
  );
};
