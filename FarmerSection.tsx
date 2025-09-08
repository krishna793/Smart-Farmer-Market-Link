import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Plus, Leaf, Edit, Trash2, Eye } from 'lucide-react';

interface Listing {
  id: string;
  farmerName: string;
  crop: string;
  quantity: number;
  price: number;
  status: 'active' | 'sold' | 'expired';
  listedDate: string;
  location: string;
}

const cropOptions = [
  'Tomatoes', 'Carrots', 'Lettuce', 'Onions', 'Peppers', 'Potatoes', 
  'Broccoli', 'Cauliflower', 'Spinach', 'Cucumbers'
];

const initialListings: Listing[] = [
  {
    id: '1',
    farmerName: 'Saroj Kumar',
    crop: 'Tomatoes',
    quantity: 50,
    price: 48.0,
    status: 'active',
    listedDate: '2024-01-15',
    location: 'Valley Farm, Haryana'
  },
  {
    id: '2',
    farmerName: 'Meera Devi',
    crop: 'Carrots',
    quantity: 100,
    price: 29.0,
    status: 'active',
    listedDate: '2024-01-14',
    location: 'Green Fields, Punjab'
  },
  {
    id: '3',
    farmerName: 'Rajesh Sharma',
    crop: 'Lettuce',
    quantity: 75,
    price: 36.5,
    status: 'sold',
    listedDate: '2024-01-13',
    location: 'Sunrise Farm, UP'
  },
  {
    id: '4',
    farmerName: 'Sunita Patel',
    crop: 'Onions',
    quantity: 200,
    price: 22.5,
    status: 'active',
    listedDate: '2024-01-12',
    location: 'Mountain View, Rajasthan'
  },
  {
    id: '5',
    farmerName: 'Vikas Singh',
    crop: 'Peppers',
    quantity: 30,
    price: 55.0,
    status: 'expired',
    listedDate: '2024-01-10',
    location: 'Organic Gardens, Gujarat'
  }
];

export function FarmerSection() {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [formData, setFormData] = useState({
    farmerName: '',
    crop: '',
    quantity: '',
    price: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.farmerName || !formData.crop || !formData.quantity || !formData.price) {
      return;
    }

    const newListing: Listing = {
      id: Date.now().toString(),
      farmerName: formData.farmerName,
      crop: formData.crop,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      status: 'active',
      listedDate: new Date().toISOString().split('T')[0],
      location: 'Your Farm Location'
    };

    setListings([newListing, ...listings]);
    setFormData({ farmerName: '', crop: '', quantity: '', price: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Add New Listing Form */}
      <Card className="bg-white border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Plus className="h-5 w-5" />
            <span>List Your Produce</span>
          </CardTitle>
          <CardDescription>Add a new listing to connect with local buyers</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmerName">Farmer Name</Label>
                <Input
                  id="farmerName"
                  placeholder="Enter your name"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  className="border-green-200 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop">Crop Type</Label>
                <Select value={formData.crop} onValueChange={(value) => setFormData({ ...formData, crop: value })}>
                  <SelectTrigger className="border-green-200 focus:ring-green-500">
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="border-green-200 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per kg ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="border-green-200 focus:ring-green-500"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle>Your Produce Listings</CardTitle>
          <CardDescription>Manage and track your active listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Farmer</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price/kg</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Listed Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{listing.farmerName}</p>
                        <p className="text-sm text-gray-600">{listing.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Leaf className="h-4 w-4 text-green-600" />
                        <span>{listing.crop}</span>
                      </div>
                    </TableCell>
                    <TableCell>{listing.quantity} kg</TableCell>
                    <TableCell className="font-medium">${listing.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(listing.status)}>
                        {listing.status === 'active' ? 'Active' : listing.status === 'sold' ? 'Sold' : 'Expired'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(listing.listedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteListing(listing.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Listings</p>
                <p className="text-2xl font-semibold">{listings.filter(l => l.status === 'active').length}</p>
              </div>
              <Leaf className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Items Sold</p>
                <p className="text-2xl font-semibold">{listings.filter(l => l.status === 'sold').length}</p>
              </div>
              <Plus className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Revenue</p>
                <p className="text-2xl font-semibold">
                  ${listings
                    .filter(l => l.status === 'sold')
                    .reduce((sum, l) => sum + (l.quantity * l.price), 0)
                    .toFixed(0)}
                </p>
              </div>
              <span className="text-2xl text-orange-200">$</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}