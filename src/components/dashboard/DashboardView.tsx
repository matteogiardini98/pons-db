
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDashboardMetrics } from '@/utils/data';

const DashboardView = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setMetrics(getDashboardMetrics());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-secondary rounded w-64"></div>
          <div className="h-64 bg-secondary rounded w-full max-w-3xl"></div>
          <div className="h-64 bg-secondary rounded w-full max-w-3xl"></div>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const industryData = Object.entries(metrics.byIndustry).map(([name, value]) => ({
    name,
    value,
  }));

  const functionData = Object.entries(metrics.byFunction).map(([name, value]) => ({
    name,
    value,
  }));

  const businessTypeData = Object.entries(metrics.byBusinessType).map(([name, value]) => ({
    name,
    value,
  }));

  const technicalLevelData = Object.entries(metrics.byTechnicalLevel).map(([name, value]) => ({
    name,
    value,
  }));

  const euComplianceData = [
    { name: 'GDPR Compliant', value: metrics.gdprCompliant },
    { name: 'EU Data Residency', value: metrics.euDataResidency },
  ];

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="min-h-screen pt-20">
      <div className="container-tight py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-medium mb-4">AI Solutions Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl">
            Gain insights into AI solutions landscape across industries, functions, and technical requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total AI Tools" 
            value={metrics.totalTools} 
            description="Solutions in database" 
          />
          <StatsCard 
            title="GDPR Compliant" 
            value={`${Math.round((metrics.gdprCompliant / metrics.totalTools) * 100)}%`} 
            description="Of tools are GDPR compliant" 
          />
          <StatsCard 
            title="EU Data Residency" 
            value={`${Math.round((metrics.euDataResidency / metrics.totalTools) * 100)}%`} 
            description="Store data within EU borders" 
          />
        </div>

        <Tabs defaultValue="industries" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="functions">Functions</TabsTrigger>
            <TabsTrigger value="business-types">Business Types</TabsTrigger>
            <TabsTrigger value="technical-levels">Technical Levels</TabsTrigger>
            <TabsTrigger value="eu-compliance">EU Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="industries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tools by Industry</CardTitle>
                <CardDescription>
                  Distribution of AI tools across different industries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip 
                        formatter={(value: any) => [`${value} tools`, 'Count']}
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                      />
                      <Bar dataKey="value" fill="#0f172a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="functions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tools by Business Function</CardTitle>
                <CardDescription>
                  Distribution of AI tools across different business functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={functionData} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip 
                        formatter={(value: any) => [`${value} tools`, 'Count']}
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                      />
                      <Bar dataKey="value" fill="#0f172a" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business-types" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tools by Business Type</CardTitle>
                <CardDescription>
                  Distribution of tools across different business types
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={businessTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {businessTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value} tools`, 'Count']}
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical-levels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tools by Technical Level</CardTitle>
                <CardDescription>
                  Distribution of tools by required technical expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={technicalLevelData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {technicalLevelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value} tools`, 'Count']}
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eu-compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>EU Compliance</CardTitle>
                <CardDescription>
                  Tools compliance with EU regulations and data residency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={euComplianceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`${value} tools`, 'Count']}
                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                      />
                      <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatsCard = ({ title, value, description }: StatsCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

export default DashboardView;
