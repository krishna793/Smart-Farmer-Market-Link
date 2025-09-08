import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';

const priceData = [
  { day: 'Mon', tomatoes: 42.0, carrots: 28.0, lettuce: 35.0, onions: 21.0 },
  { day: 'Tue', tomatoes: 43.5, carrots: 27.5, lettuce: 36.0, onions: 20.5 },
  { day: 'Wed', tomatoes: 45.0, carrots: 29.0, lettuce: 34.5, onions: 21.5 },
  { day: 'Thu', tomatoes: 42.5, carrots: 30.0, lettuce: 37.0, onions: 22.0 },
  { day: 'Fri', tomatoes: 46.0, carrots: 28.5, lettuce: 35.5, onions: 20.0 },
  { day: 'Sat', tomatoes: 47.5, carrots: 31.0, lettuce: 38.0, onions: 22.5 },
  { day: 'Sun', tomatoes: 44.0, carrots: 29.5, lettuce: 36.5, onions: 21.0 },
];

const volumeData = [
  { crop: 'Tomatoes', volume: 1250, color: '#ef4444' },
  { crop: 'Carrots', volume: 980, color: '#f97316' },
  { crop: 'Lettuce', volume: 750, color: '#22c55e' },
  { crop: 'Onions', volume: 560, color: '#8b5cf6' },
  { crop: 'Peppers', volume: 420, color: '#06b6d4' },
];

const marketStats = [
  {
    title: 'Total Revenue',
    value: '₹4,72,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Active Listings',
    value: '234',
    change: '+8.2%',
    trend: 'up',
    icon: Package,
    color: 'text-blue-600',
  },
  {
    title: 'Avg. Price/kg',
    value: '₹34.50',
    change: '-2.1%',
    trend: 'down',
    icon: TrendingDown,
    color: 'text-orange-600',
  },
  {
    title: 'Weekly Volume',
    value: '3,960 kg',
    change: '+15.3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-green-600',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketStats.map((stat, index) => (
          <Card key={index} className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trends Chart */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Weekly Price Trends</span>
            </CardTitle>
            <CardDescription>Average prices per kg over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`₹${value}`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="tomatoes" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="Tomatoes"
                />
                <Line 
                  type="monotone" 
                  dataKey="carrots" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                  name="Carrots"
                />
                <Line 
                  type="monotone" 
                  dataKey="lettuce" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  name="Lettuce"
                />
                <Line 
                  type="monotone" 
                  dataKey="onions" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  name="Onions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Volume Chart */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span>Trading Volume</span>
            </CardTitle>
            <CardDescription>Total volume traded this week (kg)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="crop" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value} kg`, '']}
                />
                <Bar 
                  dataKey="volume" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle>Recent Market Activity</CardTitle>
          <CardDescription>Latest transactions and price updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '2 mins ago', action: 'New listing', details: 'Saroj Kumar listed 50kg of Organic Tomatoes at ₹48/kg', type: 'listing' },
              { time: '5 mins ago', action: 'Bid placed', details: 'Green Valley Market bid ₹42/kg for 100kg Carrots', type: 'bid' },
              { time: '12 mins ago', action: 'Sale completed', details: 'Fresh Farms sold 75kg Lettuce to Urban Grocers at ₹36.50/kg', type: 'sale' },
              { time: '18 mins ago', action: 'Price update', details: 'Onion prices increased 5% due to high demand', type: 'price' },
              { time: '25 mins ago', action: 'New listing', details: 'Mountain View Farm listed 200kg Mixed Peppers at ₹55/kg', type: 'listing' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'listing' ? 'bg-green-500' :
                  activity.type === 'bid' ? 'bg-blue-500' :
                  activity.type === 'sale' ? 'bg-orange-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}