import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type VehicleData = {
  immatriculation: string;
  typevehicule: string;
  datevisite: string;   // nom exact venant de l'API
  datevalidite: string;
  agences: string | null;
};

type VehicleStatus = 'valide' | 'retard';
type SearchResult = VehicleData & { statut: VehicleStatus } | 'not_found';

export const VehicleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get<VehicleData[]>(
        `http://localhost:3000/api/inspections/vehicles/${searchTerm.toUpperCase()}`
      );
      console.log("Données reçues de l'API :", response.data);
      const data = response.data[0];  // <-- prendre le premier élément

      if (!data) {
        setSearchResult('not_found');
        return;
      }

      const isValid: VehicleStatus = new Date(data.datevalidite) >= new Date() ? 'valide' : 'retard';

      setSearchResult({ ...data, statut: isValid });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setSearchResult('not_found');
      } else {
        console.error("Erreur lors de la recherche :", axiosError.message);
        setSearchResult(null);
      }
    }
  };

  const formatDate = (isoDate: string): string =>
    new Date(isoDate).toLocaleDateString('fr-FR');

  const getStatusBadge = (statut: VehicleStatus) => (
    <Badge className={statut === 'valide' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
      {statut === 'valide' ? 'À jour' : 'En retard'}
    </Badge>
  );

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
                        <p>{searchResult.typevehicule}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Statut:</span>
                        <div className="mt-1">{getStatusBadge(searchResult.statut)}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Dernier passage:</span>
                        <p>{formatDate(searchResult.datevisite)}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Date de validité:</span>
                        <p>{formatDate(searchResult.datevalidite)}</p>
                      </div>
                      <div>
                        <span className="font-semibold">Agence:</span>
                        <p>{searchResult.agences || 'Non renseignée'}</p>
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
