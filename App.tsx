import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Leaf, TrendingUp, Users, ShoppingCart, Truck, Wallet, Mic, Cloud, LogOut } from 'lucide-react';
import { Button } from './components/ui/button';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { FarmerSection } from './components/FarmerSection';
import { BuyerSection } from './components/BuyerSection';
import { TransportSection } from './components/TransportSection';
import { PaymentSection } from './components/PaymentSection';
import { VoiceInterface } from './components/VoiceInterface';
import { CropAdvisory } from './components/CropAdvisory';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', type: '' });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ name: '', type: '' });
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={setIsLoggedIn} setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">🌱 Growfinity</h1>
                <p className="text-sm text-gray-600">Farm to Market Connection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-green-600" />
                  <span>2.5L+ Farmers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                  <span>50K+ Buyers</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.type}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-6 w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
              <TabsTrigger 
                value="dashboard"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="farmer"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Leaf className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Farmer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="buyer"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Buyer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="transport"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Truck className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Transport</span>
              </TabsTrigger>
              <TabsTrigger 
                value="advisory"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Cloud className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Advisory</span>
              </TabsTrigger>
              <TabsTrigger 
                value="payment"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Wallet className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Payment</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="farmer" className="space-y-6">
            <VoiceInterface />
            <FarmerSection />
          </TabsContent>

          <TabsContent value="buyer" className="space-y-6">
            <BuyerSection />
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <TransportSection />
          </TabsContent>

          <TabsContent value="advisory" className="space-y-6">
            <CropAdvisory />
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <PaymentSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}