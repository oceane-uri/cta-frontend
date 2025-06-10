import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Car, AlertTriangle, CheckCircle } from "lucide-react";

export const DashboardStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    month: 0,
    day: 0,
    delay: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [totalRes, monthRes, dayRes, delayRes] = await Promise.all([
          axios.get("https://cta-api.onrender.com/api/inspections/stats/total-plates"),
          axios.get("https://cta-api.onrender.com/api/inspections/stats/monthly"),
          axios.get("https://cta-api.onrender.com/api/inspections/stats/daily"),
          axios.get("https://cta-api.onrender.com/api/inspections/stats/total-retards")
        ]);

        setStats({
          total: totalRes.data.total,
          month: monthRes.data.count,
          day: dayRes.data.count,
          delay: delayRes.data.count
        });
      } catch (err) {
        console.error("Erreur chargement stats", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Véhicules",
      value: stats.total.toLocaleString(),
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "CTA ce Mois",
      value: stats.month.toLocaleString(),
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "CTA Aujourd’hui",
      value: stats.day.toLocaleString(),
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      title: "En Retard",
      value: stats.delay.toLocaleString(),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
