
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const VehicleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Simulated vehicle data
  const vehicleDatabase = {
    'AB-123-CD': {
      immatriculation: 'AB-123-CD',
      type: 'Voiture particulière',
      dernierPassage: '2024-03-15',
      dateValidite: '2026-03-15',
      agence: 'CTA Paris Nord',
      statut: 'valide'
    },
    'EF-456-GH': {
      immatriculation: 'EF-456-GH',
      type: 'Utilitaire',
      dernierPassage: '2023-01-20',
      dateValidite: '2025-01-20',
      agence: 'CTA Lyon Centre',
      statut: 'retard'
    }
  };

  const handleSearch = () => {
    const result = vehicleDatabase[searchTerm.toUpperCase()];
    setSearchResult(result || 'not_found');
  };

  const getStatusBadge = (statut) => {
    if (statut === 'valide') {
      return <Badge className="bg-green-100 text-green-800">À jour</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">En retard</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recherche par Plaque d'Immatriculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Entrez la plaque (ex: AB-123-CD)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              Rechercher
            </Button>
          </div>

          {searchResult && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                {searchResult === 'not_found' ? (
                  <p className="text-center text-gray-500">
                    Aucun véhicule trouvé avec cette plaque d'immatriculation.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Immatriculation:</span>
                        <p className="text-lg font-bold text-blue-600">
                          {searchResult.immatriculation}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold">Type de véhicule:</span>
                        <p>{searchResult.type}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Statut:</span>
                        <div className="mt-1">{getStatusBadge(searchResult.statut)}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Dernier passage:</span>
                        <p>{searchResult.dernierPassage}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Date de validité:</span>
                        <p>{searchResult.dateValidite}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Agence:</span>
                        <p>{searchResult.agence}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
