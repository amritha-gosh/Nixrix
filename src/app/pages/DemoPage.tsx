import { TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';

export function DemoPage() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 49000 },
    { month: 'Apr', revenue: 58000 },
    { month: 'May', revenue: 62000 },
    { month: 'Jun', revenue: 53000 },
  ];

  const leadsData = [
    { month: 'Jan', leads: 120, converted: 32 },
    { month: 'Feb', leads: 145, converted: 38 },
    { month: 'Mar', leads: 130, converted: 31 },
    { month: 'Apr', leads: 168, converted: 42 },
    { month: 'May', leads: 185, converted: 48 },
    { month: 'Jun', leads: 195, converted: 39 },
  ];

  const trafficData = [
    { name: 'Organic Search', value: 42 },
    { name: 'Direct', value: 28 },
    { name: 'Social Media', value: 18 },
    { name: 'Paid Ads', value: 12 },
  ];

  const COLORS = ['#0D9488', '#06B6D4', '#10B981', '#F59E0B'];

  const insights = [
    {
      title: 'Revenue Trend',
      icon: <TrendingUp className="w-6 h-6 text-[#0D9488]" />,
      meaning: 'Your revenue has grown 18% over the last 6 months, with a notable spike in April and May.',
      action: 'Consider what worked well in April/May and replicate those strategies. Investigate the June dip.',
    },
    {
      title: 'Leads & Conversion',
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      meaning: 'Lead volume is up 63% since January, but conversion rate dropped from 26% to 20% in June.',
      action: 'Review your sales process and follow-up timing. More leads may mean less qualified prospects—consider tightening lead filters.',
    },
    {
      title: 'Traffic Channels',
      icon: <Info className="w-6 h-6 text-[#06B6D4]" />,
      meaning: 'Organic search drives 42% of your traffic. Social media contributes 18% but converts at a lower rate.',
      action: 'Invest more in SEO to grow your strongest channel. Test converting social traffic with targeted landing pages.',
    },
  ];

  const alerts = [
    {
      title: 'Revenue dropped 15% vs last week',
      severity: 'warning',
      message: 'Weekly revenue is down from £15,200 to £12,900. Check if any campaigns ended or if there was a holiday period.',
      icon: <TrendingDown className="w-5 h-5" />,
    },
    {
      title: 'Lead volume increased, conversion decreased',
      severity: 'info',
      message: 'You received 15% more leads this week, but conversion rate is down 8%. Consider lead quality and follow-up speed.',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
  ];

  const dataSources = [
    { name: 'Google Analytics / GA4', logo: '📊' },
    { name: 'Shopify', logo: '🛍️' },
    { name: 'Stripe', logo: '💳' },
    { name: 'Google Ads', logo: '🎯' },
    { name: 'Meta Ads', logo: '📱' },
    { name: 'Excel / Google Sheets', logo: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0D9488]/5 to-[#06B6D4]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Demo Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              This is what your intelligent business dashboard could look like—complete with real-time data,
              plain-language explanations, and recommended actions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Dashboards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-1 shadow-md border-2 border-gray-200">
                <div className="bg-gray-100 px-4 py-2 rounded-t border-b">
                  <p className="text-sm font-semibold text-gray-700">Sample KPI Dashboard (Demo Data)</p>
                </div>
                <div className="p-6 space-y-8">
                  {/* Revenue Chart */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `£${value.toLocaleString()}`} />
                        <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Leads Chart */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads & Conversions</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={leadsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="leads" fill="#06B6D4" name="Total Leads" />
                        <Bar dataKey="converted" fill="#0D9488" name="Converted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Traffic Sources */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={trafficData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {trafficData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Insights */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">What You're Seeing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {insights.map((insight, index) => (
                    <div key={index} className="border-l-4 border-[#0D9488] pl-4 py-2">
                      <div className="flex items-center mb-2">
                        {insight.icon}
                        <h4 className="ml-2 font-semibold text-gray-900">{insight.title}</h4>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Meaning:</strong> {insight.meaning}
                      </p>
                      <p className="text-sm text-[#0D9488]">
                        <strong>Action:</strong> {insight.action}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Automated Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alerts.map((alert, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  alert.severity === 'warning' ? 'border-orange-500' : 'border-blue-500'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div
                      className={`${
                        alert.severity === 'warning' ? 'text-orange-500' : 'text-blue-500'
                      } mr-3`}
                    >
                      {alert.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{alert.title}</h3>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            We Connect to Your Data Sources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {dataSources.map((source, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{source.logo}</div>
                  <p className="text-sm text-gray-700 font-medium">{source.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-l-4 border-[#06B6D4]">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security & Privacy</h3>
              <p className="text-gray-600">
                This demo uses sample data. Client dashboards can be secured behind login, with role-based
                access controls and encrypted data connections. We never store sensitive data—your dashboards
                connect directly to your data sources via secure APIs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chatbot Widget */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChatbotWidget />
        </div>
      </section>
    </div>
  );
}