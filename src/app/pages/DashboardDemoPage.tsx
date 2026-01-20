import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Info, BarChart3, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { SEOHead } from '@/app/components/SEOHead';
import { ChatbotWidget } from '@/app/components/ChatbotWidget';
import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DashboardDemoPage() {
  const revenueData = [
    { month: 'Jan', revenue: 45000, target: 42000 },
    { month: 'Feb', revenue: 52000, target: 48000 },
    { month: 'Mar', revenue: 49000, target: 50000 },
    { month: 'Apr', revenue: 63000, target: 55000 },
    { month: 'May', revenue: 58000, target: 58000 },
    { month: 'Jun', revenue: 71000, target: 62000 },
  ];

  const metrics = [
    {
      title: 'Monthly Revenue',
      value: '£71,000',
      change: '+18.2%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      explanation: 'Revenue is up 18.2% compared to last month. This puts us ahead of target.',
      status: 'good'
    },
    {
      title: 'Active Customers',
      value: '1,247',
      change: '+5.8%',
      trend: 'up',
      icon: <Activity className="w-6 h-6" />,
      explanation: 'Customer growth is healthy. 72 new customers acquired this month.',
      status: 'good'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.4%',
      trend: 'down',
      icon: <TrendingDown className="w-6 h-6" />,
      explanation: 'Conversion rate slightly below target. Consider reviewing landing pages.',
      status: 'warning'
    },
    {
      title: 'Avg. Order Value',
      value: '£156',
      change: '+12.1%',
      trend: 'up',
      icon: <BarChart3 className="w-6 h-6" />,
      explanation: 'Average order value is increasing—excellent indicator of customer value.',
      status: 'good'
    },
  ];

  const alerts = [
    {
      type: 'success',
      message: 'Revenue target exceeded by £9,000 this month',
      time: '2 hours ago'
    },
    {
      type: 'warning',
      message: 'Conversion rate below 3.5% threshold—review needed',
      time: '1 day ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Live Dashboard Demo - KPI Tracking & Insights | NIXRIX"
        description="See how we embed Power BI dashboards with real-time KPIs, plain-language insights, and automated alerts for data-driven businesses."
        keywords="KPI dashboard demo, Power BI integration, business intelligence, real-time analytics"
      />
      <ChatbotWidget />

      {/* Header */}
      <section className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-white text-sm font-semibold">Live Demo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              KPI Dashboard with Insights
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              This is an example of how we embed dashboards into your website with plain-language explanations next to every metric.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Alerts */}
          <ScrollReveal>
            <div className="mb-8 space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'success' 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-orange-50 border-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {alert.type === 'success' ? (
                        <Info className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-medium ${
                          alert.type === 'success' ? 'text-green-900' : 'text-orange-900'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`border-2 ${
                    metric.status === 'good' ? 'border-green-200' : 'border-orange-200'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${
                          metric.status === 'good' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {metric.icon}
                        </div>
                        <span className={`text-sm font-semibold ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                      <h3 className="text-sm text-gray-600 mb-1">{metric.title}</h3>
                      <p className="text-3xl font-bold text-gray-900 mb-3">{metric.value}</p>
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-xs text-blue-900 leading-relaxed">
                          <strong>What this means:</strong> {metric.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} name="Actual Revenue" />
                      <Line type="monotone" dataKey="target" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Insight:</strong> Revenue trend is consistently above target for the past 3 months, showing strong growth momentum.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#0D9488" name="Actual Revenue" />
                      <Bar dataKey="target" fill="#06B6D4" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Insight:</strong> We've exceeded our monthly target in 4 out of 6 months, with June showing the strongest performance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Features Explanation */}
          <ScrollReveal delay={0.3}>
            <Card className="mt-12 bg-gradient-to-r from-[#0D9488]/5 to-[#06B6D4]/5 border-2 border-[#0D9488]/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What You're Seeing
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">✓ Embedded Dashboards</h3>
                    <p className="text-sm text-gray-600">Power BI or custom dashboards embedded directly into your website</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">✓ Plain-Language Insights</h3>
                    <p className="text-sm text-gray-600">Every metric explained in simple English—no jargon</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">✓ Automated Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified when KPIs hit thresholds or targets</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">✓ Real-Time Data</h3>
                    <p className="text-sm text-gray-600">Live or scheduled refresh from your data sources</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-[#0D9488] hover:bg-[#0c8479] text-white">
                      Get Your Own Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
