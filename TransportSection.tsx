import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Truck, MapPin, Clock, Phone, Star, Navigation, Package2, AlertCircle } from 'lucide-react';

interface Vehicle {
  id: string;
  driverName: string;
  vehicleNumber: string;
  type: string;
  capacity: string;
  currentLocation: string;
  status: 'available' | 'in_transit' | 'loading' | 'maintenance';
  rating: number;
  phone: string;
}

interface Shipment {
  id: string;
  from: string;
  to: string;
  crop: string;
  quantity: string;
  vehicleId: string;
  driverName: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  estimatedTime: string;
  cost: number;
}

const vehicles: Vehicle[] = [
  {
    id: 'TRK001',
    driverName: 'Suresh Kumar',
    vehicleNumber: 'DL-01-AB-1234',
    type: 'Small Truck',
    capacity: '5 tons',
    currentLocation: 'Delhi',
    status: 'available',
    rating: 4.5,
    phone: '+91-98765-43210'
  },
  {
    id: 'TRK002',
    driverName: 'Rajesh Singh',
    vehicleNumber: 'HR-26-CD-5678',
    type: 'Mini Truck',
    capacity: '3 tons',
    currentLocation: 'Gurgaon',
    status: 'in_transit',
    rating: 4.2,
    phone: '+91-87654-32109'
  },
  {
    id: 'TRK003',
    driverName: 'Mohan Lal',
    vehicleNumber: 'UP-32-EF-9012',
    type: 'Large Truck',
    capacity: '10 tons',
    currentLocation: 'Noida',
    status: 'loading',
    rating: 4.7,
    phone: '+91-76543-21098'
  }
];

const shipments: Shipment[] = [
  {
    id: 'SHP001',
    from: 'Haridwar, Uttarakhand',
    to: 'Delhi Mandi',
    crop: 'Tomatoes',
    quantity: '500 kg',
    vehicleId: 'TRK001',
    driverName: 'Suresh Kumar',
    status: 'in_transit',
    estimatedTime: '2 hours',
    cost: 2500
  },
  {
    id: 'SHP002', 
    from: 'Ahmedabad, Gujarat',
    to: 'Mumbai Market',
    crop: 'Carrots',
    quantity: '1000 kg',
    vehicleId: 'TRK002',
    driverName: 'Rajesh Singh',
    status: 'picked_up',
    estimatedTime: '4 hours',
    cost: 4200
  }
];

export function TransportSection() {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    crop: '',
    quantity: '',
    preferredTime: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'loading': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'picked_up': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'in_transit': return 'In Transit';
      case 'loading': return 'Loading';
      case 'maintenance': return 'Maintenance';
      case 'pending': return 'Pending';
      case 'picked_up': return 'Picked Up';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Transport Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800 text-xl flex items-center space-x-2">
            <Truck className="h-6 w-6" />
            <span>🚛 Transport Section</span>
          </CardTitle>
          <CardDescription>Local transport partnerships and vehicle tracking</CardDescription>
        </CardHeader>
      </Card>

      {/* Transport Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Available Vehicles</p>
                <p className="text-2xl font-semibold">{vehicles.filter(v => v.status === 'available').length}</p>
              </div>
              <Truck className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Active Shipments</p>
                <p className="text-2xl font-semibold">{shipments.filter(s => s.status === 'in_transit').length}</p>
              </div>
              <Navigation className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Today's Deliveries</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <Package2 className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Distance</p>
                <p className="text-2xl font-semibold">2,340 km</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Book Transport */}
      <Card className="bg-white border-purple-200">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Truck className="h-5 w-5" />
            <span>Book Transport</span>
          </CardTitle>
          <CardDescription>Book vehicle for your crop transportation</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  placeholder="Starting location"
                  value={bookingData.from}
                  onChange={(e) => setBookingData({ ...bookingData, from: e.target.value })}
                  className="border-purple-200 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Destination"
                  value={bookingData.to}
                  onChange={(e) => setBookingData({ ...bookingData, to: e.target.value })}
                  className="border-purple-200 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop">Crop</Label>
                <Input
                  id="crop"
                  placeholder="Crop type"
                  value={bookingData.crop}
                  onChange={(e) => setBookingData({ ...bookingData, crop: e.target.value })}
                  className="border-purple-200 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Quantity (kg)"
                  value={bookingData.quantity}
                  onChange={(e) => setBookingData({ ...bookingData, quantity: e.target.value })}
                  className="border-purple-200 focus:ring-purple-500"
                />
              </div>
            </div>
            <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700">
              <Truck className="h-4 w-4 mr-2" />
              Book Transport
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Available Vehicles */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🚛 Available Vehicles</span>
          </CardTitle>
          <CardDescription>Available vehicles from transport partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="border border-gray-200 hover:border-purple-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold">{vehicle.vehicleNumber}</span>
                    </div>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {getStatusText(vehicle.status)}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Driver:</span>
                      <span className="font-medium">{vehicle.driverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{vehicle.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {vehicle.currentLocation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        {vehicle.rating}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={vehicle.status === 'available' ? 'default' : 'secondary'}
                      disabled={vehicle.status !== 'available'}
                    >
                      {vehicle.status === 'available' ? 'Book Now' : 'Not Available'}
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Shipments */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📦 Active Shipments</span>
          </CardTitle>
          <CardDescription>Current shipments and tracking status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Est. Time</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Track</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600">#{shipment.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{shipment.from}</div>
                        <div className="text-xs text-gray-500">↓</div>
                        <div className="text-sm">{shipment.to}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{shipment.crop}</div>
                        <div className="text-sm text-gray-600">{shipment.quantity}</div>
                      </div>
                    </TableCell>
                    <TableCell>{shipment.driverName}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(shipment.status)}>
                        {getStatusText(shipment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {shipment.estimatedTime}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">₹{shipment.cost.toLocaleString('hi-IN')}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Navigation className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transport Partners */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">🤝 Our Transport Partners</CardTitle>
          <CardDescription>Partnerships with local transport companies for reliable and fast service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Delhi Transport Company', vehicles: '50+ Vehicles', rating: '4.8', specialty: 'Express Delivery' },
              { name: 'Punjab Logistics', vehicles: '75+ Vehicles', rating: '4.6', specialty: 'Bulk Transport' },
              { name: 'Gujarat Cargo Service', vehicles: '100+ Vehicles', rating: '4.7', specialty: 'Long Distance' }
            ].map((partner, index) => (
              <Card key={index} className="bg-white border border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">{partner.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>{partner.vehicles}</div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 mr-1" />
                      {partner.rating} Rating
                    </div>
                    <div className="text-blue-600">{partner.specialty}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}