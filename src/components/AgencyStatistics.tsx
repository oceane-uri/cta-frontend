
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AgencyStatisticsProps {
  selectedPeriod: { start: string; end: string };
}

export const AgencyStatistics: React.FC<AgencyStatisticsProps> = ({ selectedPeriod }) => {
  const agencyData = [
    { name: 'CTA Paris Nord', visites: 287, voitures: 180, utilitaires: 67, camions: 25, motos: 15 },
    { name: 'CTA Lyon Centre', visites: 234, voitures: 156, utilitaires: 45, camions: 20, motos: 13 },
    { name: 'CTA Marseille Sud', visites: 198, voitures: 120, utilitaires: 38, camions: 28, motos: 12 },
    { name: 'CTA Toulouse', visites: 165, voitures: 98, utilitaires: 32, camions: 18, motos: 17 },
    { name: 'CTA Bordeaux', visites: 143, voitures: 89, utilitaires: 28, camions: 15, motos: 11 }
  ];

  const vehicleTypeData = [
    { agence: 'Paris Nord', voitures: 180, utilitaires: 67, camions: 25, motos: 15 },
    { agence: 'Lyon Centre', voitures: 156, utilitaires: 45, camions: 20, motos: 13 },
    { agence: 'Marseille Sud', voitures: 120, utilitaires: 38, camions: 28, motos: 12 },
    { agence: 'Toulouse', voitures: 98, utilitaires: 32, camions: 18, motos: 17 },
    { agence: 'Bordeaux', voitures: 89, utilitaires: 28, camions: 15, motos: 11 }
  ];

  return (
    <div className="space-y-6">
      {/* Visits by Agency */}
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

      {/* Vehicle Types by Agency */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Types de Véhicules par Agence</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={vehicleTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="agence" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="voitures" stackId="a" fill="#3b82f6" />
              <Bar dataKey="utilitaires" stackId="a" fill="#10b981" />
              <Bar dataKey="camions" stackId="a" fill="#f59e0b" />
              <Bar dataKey="motos" stackId="a" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agency Summary Cards */}
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
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Voitures:</span>
                  <span>{agency.voitures}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Utilitaires:</span>
                  <span>{agency.utilitaires}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Camions:</span>
                  <span>{agency.camions}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Motos:</span>
                  <span>{agency.motos}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
