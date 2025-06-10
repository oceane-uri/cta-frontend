import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface DelayStatisticsProps {
  selectedPeriod: { start: string; end: string };
}

export const DelayStatistics: React.FC<DelayStatisticsProps> = ({
  selectedPeriod,
}) => {
  const { data: delayData = [], isLoading, error } = useQuery({
  queryKey: ["delays"],
  queryFn: async () => {
    const res = await axios.get("http://localhost:3000/api/inspections/stats/retards/plaque-unique");
    const raw = res.data;

    // Transforme l'objet en tableau pour BarChart
    const formatted = Object.entries(raw).map(([period, count]) => ({
      period,
      count,
    }));

    return formatted;
  },
});

  
  const vehicleTypeData = [
    { name: "Voitures", value: 1850, color: "#3b82f6" },
    { name: "Utilitaires", value: 580, color: "#10b981" },
    { name: "Camions", value: 280, color: "#f59e0b" },
    { name: "Motos", value: 137, color: "#8b5cf6" },
  ];

  if (isLoading) return <p>Chargement des statistiques...</p>;
  if (error) return <p>Erreur de chargement des données.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Delay Statistics Bar Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Statistiques de Retard par Période</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.isArray(delayData) && delayData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={delayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>Aucune donnée de retard disponible.</p>
          )}
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
