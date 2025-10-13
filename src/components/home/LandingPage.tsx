import { ArrowRight, Package, BarChart3, AlertTriangle, TrendingUp, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const features = [
    {
      icon: Package,
      title: 'Smart Inventory Tracking',
      description: 'Real-time stock levels with automated reorder alerts and comprehensive item management.',
      color: 'teal'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed reports and visualizations to optimize your inventory performance.',
      color: 'blue'
    },
    {
      icon: AlertTriangle,
      title: 'Intelligent Alerts',
      description: 'Proactive notifications for low stock, reorder points, and critical inventory events.',
      color: 'yellow'
    },
    {
      icon: TrendingUp,
      title: 'Performance Insights',
      description: 'Track fast-moving items, analyze trends, and make data-driven decisions.',
      color: 'green'
    }
  ];

  const stats = [
    { label: 'Inventory Accuracy', value: '99.8%' },
    { label: 'Cost Reduction', value: '25%' },
    { label: 'Time Saved', value: '40hrs/week' },
    { label: 'User Satisfaction', value: '4.9/5' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
          <div className="text-center w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              Optimize Your 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600"> Inventory Management</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Streamline your warehouse operations with intelligent stock tracking, automated alerts, 
              and powerful analytics. Take control of your supply chain with our comprehensive inventory solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 w-full">
              <Button 
                onClick={() => onNavigate('inventory')}
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                Start Managing Inventory
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => onNavigate('reports')}
                size="lg"
                className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 hover:text-teal-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-2">
                <div className="text-3xl font-bold text-teal-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Everything you need to manage your inventory efficiently</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}-100 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Warehouse Operations
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our smart inventory management system helps businesses reduce costs, 
                improve accuracy, and streamline operations with cutting-edge technology.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Real-time stock level monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Automated reorder point alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Comprehensive movement tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Advanced analytics and reporting</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={() => onNavigate('inventory')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Total Inventory Value</p>
                      <p className="text-3xl font-bold">$2,847,392</p>
                    </div>
                    <TrendingUp className="w-8 h-8 opacity-80" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Items In Stock</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <p className="text-sm opacity-90">Low Stock Alerts</p>
                      <p className="text-2xl font-bold text-yellow-300">3</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 opacity-80" />
                    <span className="text-sm opacity-90">5 active warehouse operators</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 w-full">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Inventory?
          </h2>
          <p className="text-lg sm:text-xl text-teal-100 mb-8">
            Join thousands of businesses that trust our inventory management solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <Button 
              onClick={() => onNavigate('inventory')}
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              Start Free Trial
            </Button>
            <Button 
              onClick={() => onNavigate('reports')}
              size="lg"
              className="bg-white text-teal-600 border-2 border-white hover:bg-teal-50 hover:text-teal-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};