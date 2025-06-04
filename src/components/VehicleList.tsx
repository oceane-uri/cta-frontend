
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const VehicleList = () => {
  const [searchFilter, setSearchFilter] = useState('');

  const vehicles = [
    {
      immatriculation: 'AB-123-CD',
      type: 'Voiture particulière',
      dernierPassage: '2024-03-15',
      dateValidite: '2026-03-15',
      agence: 'CTA Paris Nord',
      statut: 'valide'
    },
    {
      immatriculation: 'EF-456-GH',
      type: 'Utilitaire',
      dernierPassage: '2023-01-20',
      dateValidite: '2025-01-20',
      agence: 'CTA Lyon Centre',
      statut: 'retard'
    },
    {
      immatriculation: 'IJ-789-KL',
      type: 'Camion',
      dernierPassage: '2024-01-10',
      dateValidite: '2025-01-10',
      agence: 'CTA Marseille Sud',
      statut: 'valide'
    },
    {
      immatriculation: 'MN-012-OP',
      type: 'Moto',
      dernierPassage: '2022-12-05',
      dateValidite: '2024-12-05',
      agence: 'CTA Toulouse',
      statut: 'retard'
    },
    {
      immatriculation: 'QR-345-ST',
      type: 'Voiture particulière',
      dernierPassage: '2024-02-28',
      dateValidite: '2026-02-28',
      agence: 'CTA Bordeaux',
      statut: 'valide'
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.immatriculation.toLowerCase().includes(searchFilter.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchFilter.toLowerCase()) ||
    vehicle.agence.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getStatusBadge = (statut) => {
    if (statut === 'valide') {
      return <Badge className="bg-green-100 text-green-800">À jour</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">En retard</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste de Tous les Véhicules</CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Filtrer par plaque, type ou agence..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Immatriculation</TableHead>
                <TableHead>Type de Véhicule</TableHead>
                <TableHead>Dernier Passage</TableHead>
                <TableHead>Date de Validité</TableHead>
                <TableHead>Agence</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.immatriculation}>
                  <TableCell className="font-medium">
                    {vehicle.immatriculation}
                  </TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.dernierPassage}</TableCell>
                  <TableCell>{vehicle.dateValidite}</TableCell>
                  <TableCell>{vehicle.agence}</TableCell>
                  <TableCell>{getStatusBadge(vehicle.statut)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Total: {filteredVehicles.length} véhicule(s)
        </div>
      </CardContent>
    </Card>
  );
};
