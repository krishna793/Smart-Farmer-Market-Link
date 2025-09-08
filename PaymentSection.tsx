import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CreditCard, Wallet, DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Smartphone, Building, User } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: 'upi' | 'bank' | 'cash' | 'card';
}

interface WalletData {
  balance: number;
  totalEarnings: number;
  totalSpent: number;
  pendingPayments: number;
}

const transactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'credit',
    amount: 25000,
    description: 'Tomato Sale - Urban Grocers',
    date: '2024-01-15',
    status: 'completed',
    method: 'upi'
  },
  {
    id: 'TXN002',
    type: 'debit',
    amount: 2500,
    description: 'Transport Fee - Delhi Transport',
    date: '2024-01-15',
    status: 'completed',
    method: 'bank'
  },
  {
    id: 'TXN003',
    type: 'credit',
    amount: 18500,
    description: 'Carrot Sale - Fresh Market',
    date: '2024-01-14',
    status: 'pending',
    method: 'bank'
  },
  {
    id: 'TXN004',
    type: 'debit',
    amount: 500,
    description: 'Platform Fee - Growfinity',
    date: '2024-01-14',
    status: 'completed',
    method: 'upi'
  }
];

const walletData: WalletData = {
  balance: 47250,
  totalEarnings: 125000,
  totalSpent: 15500,
  pendingPayments: 8750
};

export function PaymentSection() {
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return status;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'upi': return <Smartphone className="h-4 w-4" />;
      case 'bank': return <Building className="h-4 w-4" />;
      case 'card': return <CreditCard className="h-4 w-4" />;
      default: return <Wallet className="h-4 w-4" />;
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'upi': return 'UPI';
      case 'bank': return 'Bank Transfer';
      case 'card': return 'Card';
      case 'cash': return 'Cash';
      default: return 'Wallet';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Header */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800 text-xl flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span>💰 Payment Section</span>
          </CardTitle>
          <CardDescription>Integrated farmer wallet with cash and credit system</CardDescription>
        </CardHeader>
      </Card>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Wallet Balance</p>
                <p className="text-2xl font-semibold">₹{walletData.balance.toLocaleString('hi-IN')}</p>
              </div>
              <Wallet className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Earnings</p>
                <p className="text-2xl font-semibold">₹{walletData.totalEarnings.toLocaleString('hi-IN')}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Spent</p>
                <p className="text-2xl font-semibold">₹{walletData.totalSpent.toLocaleString('hi-IN')}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Pending Payments</p>
                <p className="text-2xl font-semibold">₹{walletData.pendingPayments.toLocaleString('hi-IN')}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="wallet" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="space-y-6">
          {/* Wallet Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Money */}
            <Card className="bg-white border-green-200">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <ArrowDownLeft className="h-5 w-5" />
                  <span>Add Money</span>
                </CardTitle>
                <CardDescription>Add money to your wallet</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addAmount">Amount (₹)</Label>
                    <Input
                      id="addAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={addMoneyAmount}
                      onChange={(e) => setAddMoneyAmount(e.target.value)}
                      className="border-green-200 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                      <SelectTrigger className="border-green-200 focus:ring-green-500">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI (PhonePe/Paytm/GPay)</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="card">Debit/Credit Card</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Withdraw Money */}
            <Card className="bg-white border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <ArrowUpRight className="h-5 w-5" />
                  <span>Withdraw Money</span>
                </CardTitle>
                <CardDescription>Transfer money to your bank account</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Amount (₹)</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="border-blue-200 focus:ring-blue-500"
                      max={walletData.balance}
                    />
                    <p className="text-sm text-gray-600">
                      Available: ₹{walletData.balance.toLocaleString('hi-IN')}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Bank Account:</strong> SBI ***1234<br />
                      <strong>IFSC:</strong> SBIN0001234
                    </p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Withdraw Money
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common payment actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Smartphone className="h-6 w-6" />
                  <span className="text-sm">UPI Payment</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Building className="h-6 w-6" />
                  <span className="text-sm">Bank Transfer</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">Bill Payment</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <User className="h-6 w-6" />
                  <span className="text-sm">P2P Transfer</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Transaction History */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📊 Transaction History</span>
              </CardTitle>
              <CardDescription>All your payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((txn) => (
                      <TableRow key={txn.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-blue-600">#{txn.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {txn.type === 'credit' ? 
                              <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
                              <ArrowUpRight className="h-4 w-4 text-red-600" />
                            }
                            <span className={txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                              {txn.type === 'credit' ? 'Credit' : 'Debit'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className={`font-medium ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString('hi-IN')}
                        </TableCell>
                        <TableCell>{txn.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {getMethodIcon(txn.method)}
                            <span className="text-sm">{getMethodText(txn.method)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(txn.status)}>
                            {getStatusText(txn.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(txn.date).toLocaleDateString('en-IN')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit" className="space-y-6">
          {/* Credit System */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800 flex items-center space-x-2">
                <CreditCard className="h-6 w-6" />
                <span>🏦 Credit System</span>
              </CardTitle>
              <CardDescription>Farmer Credit Card and loan facility</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Credit Score */}
            <Card className="bg-white border-indigo-200">
              <CardHeader>
                <CardTitle className="text-indigo-800">Your Credit Score</CardTitle>
                <CardDescription>Your credit rating and limit</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-indigo-600">750</div>
                  <div className="text-gray-600">Good Credit Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">₹2,00,000</div>
                      <div className="text-sm text-gray-600">Available Limit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">₹50,000</div>
                      <div className="text-sm text-gray-600">In Use</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Options */}
            <Card className="bg-white border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Loan Options</CardTitle>
                <CardDescription>Special loan schemes for farmers</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Crop Loan', amount: '₹50,000', rate: '7% p.a.', status: 'Available' },
                    { name: 'Equipment Loan', amount: '₹1,00,000', rate: '8.5% p.a.', status: 'Available' },
                    { name: 'Emergency Loan', amount: '₹25,000', rate: '6% p.a.', status: 'Instant Approval' }
                  ].map((loan, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{loan.name}</h4>
                          <p className="text-sm text-gray-600">Up to {loan.amount}, {loan.rate}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">{loan.status}</Badge>
                          <Button size="sm" className="mt-2 w-full">Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Plans */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle>Payment Plans</CardTitle>
              <CardDescription>Easy EMI and payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { duration: '3 Months', emi: '₹8,500', total: '₹25,500', interest: '5%' },
                  { duration: '6 Months', emi: '₹4,400', total: '₹26,400', interest: '6%' },
                  { duration: '12 Months', emi: '₹2,300', total: '₹27,600', interest: '8%' }
                ].map((plan, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <h4 className="font-semibold text-lg">{plan.duration}</h4>
                        <div className="text-2xl font-bold text-indigo-600">{plan.emi}</div>
                        <div className="text-sm text-gray-600">Monthly EMI</div>
                        <div className="text-sm">Total: {plan.total}</div>
                        <div className="text-xs text-gray-500">Interest: {plan.interest}</div>
                        <Button size="sm" className="w-full">Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}