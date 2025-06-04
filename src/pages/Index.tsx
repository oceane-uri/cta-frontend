
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardStats } from "@/components/DashboardStats";
import { DelayStatistics } from "@/components/DelayStatistics";
import { VehicleSearch } from "@/components/VehicleSearch";
import { VehicleList } from "@/components/VehicleList";
import { PeriodFilter } from "@/components/PeriodFilter";
import { AgencyStatistics } from "@/components/AgencyStatistics";

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState({ start: '', end: '' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tableau de Bord CTA
          </h1>
          <p className="text-lg text-gray-600">
            Gestion et suivi des contrôles techniques automobiles
          </p>
        </div>

        {/* Statistics Overview */}
        <DashboardStats />

        {/* Period Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtres de Période</CardTitle>
            <CardDescription>
              Sélectionnez une période pour analyser les données
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PeriodFilter onPeriodChange={setSelectedPeriod} />
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="statistics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="statistics">Statistiques</TabsTrigger>
            <TabsTrigger value="search">Recherche</TabsTrigger>
            <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
            <TabsTrigger value="agencies">Agences</TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className="space-y-6">
            <DelayStatistics selectedPeriod={selectedPeriod} />
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <VehicleSearch />
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-6">
            <VehicleList />
          </TabsContent>

          <TabsContent value="agencies" className="space-y-6">
            <AgencyStatistics selectedPeriod={selectedPeriod} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
