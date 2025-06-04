
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface DelayStatisticsProps {
  selectedPeriod: { start: string; end: string };
}

export const DelayStatistics: React.FC<DelayStatisticsProps> = ({ selectedPeriod }) => {
  const delayData = [
    { period: '3 mois', count: 87, color: '#f59e0b' },
    { period: '6 mois', count: 142, color: '#f97316' },
    { period: '9 mois', count: 65, color: '#dc2626' },
    { period: '12 mois', count: 89, color: '#b91c1c' },
    { period: '18 mois', count: 32, color: '#991b1b' },
    { period: '24+ mois', count: 18, color: '#7f1d1d' }
  ];

  const monthlyData = [
    { month: 'Jan', visites: 120 },
    { month: 'Fév', visites: 135 },
    { month: 'Mar', visites: 165 },
    { month: 'Avr', visites: 145 },
    { month: 'Mai', visites: 180 },
    { month: 'Juin', visites: 156 }
  ];

  const vehicleTypeData = [
    { name: 'Voitures', value: 1850, color: '#3b82f6' },
    { name: 'Utilitaires', value: 580, color: '#10b981' },
    { name: 'Camions', value: 280, color: '#f59e0b' },
    { name: 'Motos', value: 137, color: '#8b5cf6' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Delay Statistics Bar Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Statistiques de Retard par Période</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={delayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Visits Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution Mensuelle des Visites</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visites" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vehicle Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Type de Véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
