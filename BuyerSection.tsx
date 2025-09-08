import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { ShoppingCart, HandCoins, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Bid {
  id: string;
  buyerName: string;
  crop: string;
  quantity: number;
  bidPrice: number;
  listingPrice: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  bidDate: string;
  farmerName: string;
}

const availableListings = [
  { crop: 'Tomatoes', farmer: 'Saroj Kumar', quantity: 50, price: 48.0 },
  { crop: 'Carrots', farmer: 'Meera Devi', quantity: 100, price: 29.0 },
  { crop: 'Onions', farmer: 'Sunita Patel', quantity: 200, price: 22.5 },
  { crop: 'Peppers', farmer: 'Vikas Singh', quantity: 30, price: 55.0 },
  { crop: 'Potatoes', farmer: 'Deepak Singh', quantity: 150, price: 18.0 },
];

const initialBids: Bid[] = [
  {
    id: '1',
    buyerName: 'Green Valley Market',
    crop: 'Carrots',
    quantity: 100,
    bidPrice: 27.5,
    listingPrice: 29.0,
    status: 'pending',
    bidDate: '2024-01-15',
    farmerName: 'Meera Devi'
  },
  {
    id: '2',
    buyerName: 'Urban Grocers',
    crop: 'Lettuce',
    quantity: 75,
    bidPrice: 36.5,
    listingPrice: 36.5,
    status: 'accepted',
    bidDate: '2024-01-14',
    farmerName: 'Rajesh Sharma'
  },
  {
    id: '3',
    buyerName: 'Fresh Market Co',
    crop: 'Tomatoes',
    quantity: 25,
    bidPrice: 45.0,
    listingPrice: 48.0,
    status: 'rejected',
    bidDate: '2024-01-13',
    farmerName: 'Saroj Kumar'
  },
  {
    id: '4',
    buyerName: 'Local Food Hub',
    crop: 'Onions',
    quantity: 150,
    bidPrice: 21.0,
    listingPrice: 22.5,
    status: 'pending',
    bidDate: '2024-01-12',
    farmerName: 'Sunita Patel'
  }
];

export function BuyerSection() {
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const [formData, setFormData] = useState({
    buyerName: '',
    crop: '',
    quantity: '',
    bidPrice: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.crop || !formData.quantity || !formData.bidPrice) {
      return;
    }

    const selectedListing = availableListings.find(listing => listing.crop === formData.crop);
    if (!selectedListing) return;

    const newBid: Bid = {
      id: Date.now().toString(),
      buyerName: formData.buyerName,
      crop: formData.crop,
      quantity: parseInt(formData.quantity),
      bidPrice: parseFloat(formData.bidPrice),
      listingPrice: selectedListing.price,
      status: 'pending',
      bidDate: new Date().toISOString().split('T')[0],
      farmerName: selectedListing.farmer
    };

    setBids([newBid, ...bids]);
    setFormData({ buyerName: '', crop: '', quantity: '', bidPrice: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';  
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const selectedListing = availableListings.find(listing => listing.crop === formData.crop);

  return (
    <div className="space-y-6">
      {/* Available Listings */}
      <Card className="bg-white border-blue-200">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Eye className="h-5 w-5" />
            <span>Available Produce</span>
          </CardTitle>
          <CardDescription>Browse fresh produce from local farmers</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableListings.map((listing, index) => (
              <Card key={index} className="border border-gray-200 hover:border-blue-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{listing.crop}</h4>
                    <span className="text-lg font-bold text-blue-600">₹{listing.price}/kg</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Farmer: {listing.farmer}</p>
                    <p>Available: {listing.quantity} kg</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setFormData({ ...formData, crop: listing.crop })}
                  >
                    Place Bid
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Place Bid Form */}
      <Card className="bg-white border-orange-200">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <HandCoins className="h-5 w-5" />
            <span>Place a Bid</span>
          </CardTitle>
          <CardDescription>Submit your bid for fresh produce</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buyerName">Buyer Name</Label>
                <Input
                  id="buyerName"
                  placeholder="Enter your business name"
                  value={formData.buyerName}
                  onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  className="border-orange-200 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop">Select Crop</Label>
                <Select value={formData.crop} onValueChange={(value) => setFormData({ ...formData, crop: value })}>
                  <SelectTrigger className="border-orange-200 focus:ring-orange-500">
                    <SelectValue placeholder="Choose from available crops" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableListings.map((listing) => (
                      <SelectItem key={listing.crop} value={listing.crop}>
                        {listing.crop} - ${listing.price}/kg ({listing.quantity}kg available)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Needed (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="border-orange-200 focus:ring-orange-500"
                  max={selectedListing?.quantity || undefined}
                />
                {selectedListing && (
                  <p className="text-sm text-gray-600">Max available: {selectedListing.quantity} kg</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bidPrice">Your Bid Price per kg ($)</Label>
                <Input
                  id="bidPrice"
                  type="number"
                  step="0.01"
                  placeholder="Enter your bid"
                  value={formData.bidPrice}
                  onChange={(e) => setFormData({ ...formData, bidPrice: e.target.value })}
                  className="border-orange-200 focus:ring-orange-500"
                />
                {selectedListing && (
                  <p className="text-sm text-gray-600">Listed price: ${selectedListing.price}/kg</p>
                )}
              </div>
            </div>
            
            {selectedListing && formData.quantity && formData.bidPrice && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Bid Summary</h4>
                <div className="space-y-1 text-sm">
                  <p>Crop: {selectedListing.crop}</p>
                  <p>Farmer: {selectedListing.farmer}</p>
                  <p>Quantity: {formData.quantity} kg</p>
                  <p>Your bid: ${formData.bidPrice}/kg</p>
                  <p className="font-semibold">Total: ${(parseFloat(formData.bidPrice) * parseInt(formData.quantity)).toFixed(2)}</p>
                </div>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Submit Bid
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Bids Table */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle>Your Bids</CardTitle>
          <CardDescription>Track your submitted bids and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Buyer</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Bid Price</TableHead>
                  <TableHead>List Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids.map((bid) => (
                  <TableRow key={bid.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{bid.buyerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4 text-orange-600" />
                        <span>{bid.crop}</span>
                      </div>
                    </TableCell>
                    <TableCell>{bid.farmerName}</TableCell>
                    <TableCell>{bid.quantity} kg</TableCell>
                    <TableCell className="font-medium">${bid.bidPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-600">${bid.listingPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(bid.status)} flex items-center space-x-1`}>
                        {getStatusIcon(bid.status)}
                        <span>{bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(bid.bidDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Pending Bids</p>
                <p className="text-2xl font-semibold">{bids.filter(b => b.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Accepted</p>
                <p className="text-2xl font-semibold">{bids.filter(b => b.status === 'accepted').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Rejected</p>
                <p className="text-2xl font-semibold">{bids.filter(b => b.status === 'rejected').length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Spent</p>
                <p className="text-2xl font-semibold">
                  ${bids
                    .filter(b => b.status === 'accepted')
                    .reduce((sum, b) => sum + (b.quantity * b.bidPrice), 0)
                    .toFixed(0)}
                </p>
              </div>
              <span className="text-2xl text-purple-200">$</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}