import React from 'react'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { PeriodFilter } from "./PeriodFilter";
import axios from "axios";

interface AgencyStatisticsProps {
  selectedPeriod: { start: string; end: string };
  setSelectedPeriod: (period: { start: string; end: string }) => void;
}

type RawDataItem = {
  agences: string;
  typevehicule: string;
  total: number;
};

type AgencyData = {
  name: string;
  visites: number;
  [vehicleType: string]: string | number;
};

export const AgencyStatistics: React.FC<AgencyStatisticsProps> = ({ selectedPeriod, setSelectedPeriod }) => {
  const { data: agencyRawData = [], isLoading, error } = useQuery<RawDataItem[]>({
    queryKey: ["agencyStats", selectedPeriod],
    queryFn: async () => {
      const res = await axios.get("https://cta-api.onrender.com/api/inspections/stats/periode", {
        params: {
          startDate: selectedPeriod.start,
          endDate: selectedPeriod.end,
        },
      });
      return res.data;
    },
  });

  const agenciesMap: Record<string, AgencyData> = {};
  const allVehicleTypes = new Set<string>();

  agencyRawData.forEach((item: RawDataItem) => {
    const agency = item.agences;
    const type = item.typevehicule || "Autre";
    const total = item.total;

    allVehicleTypes.add(type);

    if (!agenciesMap[agency]) {
      agenciesMap[agency] = {
        name: agency,
        visites: 0,
      };
    }

    agenciesMap[agency][type] = total;
    agenciesMap[agency].visites += total;
  });

  const agencyData: AgencyData[] = Object.values(agenciesMap);

   // Calcul du total global des visites sur la période
  const totalGlobalVisites = agencyData.reduce((acc, agency) => acc + agency.visites, 0);

  if (isLoading) return <p>Chargement des statistiques...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  return (
    <div className="space-y-6">
      {/* Period Filter */}
      <Card>
        <CardHeader>
            <CardTitle>Filtres de Période</CardTitle>
            <CardDescription>
              Sélectionnez une période pour analyser les données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PeriodFilter
  onPeriodChange={setSelectedPeriod}
  startDate={selectedPeriod.start}
  endDate={selectedPeriod.end}
/>

          </CardContent>
      </Card>
      {/* Total global des visites dans la période */}
      <Card>
        <CardHeader>
          <CardTitle>Total des visites effectuées</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-center">{totalGlobalVisites}</p>
        </CardContent>
      </Card>
      {/* Visites globales */}
      <Card>
        <CardHeader>
          <CardTitle>Nombre de Visites par Agence</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visites" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Répartition des types de véhicules */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Types de Véhicules par Agence</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={agencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              {[...allVehicleTypes].map((type, index) => (
                <Bar
                  key={type}
                  dataKey={type}
                  stackId="a"
                  fill={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#14b8a6"][index % 6]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Détail par agence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agencyData.map((agency, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{agency.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total visites:</span>
                  <span className="font-bold">{agency.visites}</span>
                </div>
                {[...allVehicleTypes].map((type) => (
                  <div className="flex justify-between text-sm text-gray-600" key={type}>
                    <span>{type}:</span>
                    <span>{agency[type] ?? 0}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
