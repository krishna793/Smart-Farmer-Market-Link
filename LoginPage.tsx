import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Leaf, User, Smartphone, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (loggedIn: boolean) => void;
  setUser: (user: { name: string; type: string }) => void;
}

export function LoginPage({ onLogin, setUser }: LoginPageProps) {
  const [loginData, setLoginData] = useState({
    phone: '',
    password: '',
    name: '',
    userType: '',
    language: 'english'
  });

  const handleLogin = (e: React.FormEvent, type: 'login' | 'register') => {
    e.preventDefault();
    if (type === 'login' && loginData.phone && loginData.password) {
      setUser({ name: 'Rajesh Kumar', type: 'Farmer' });
      onLogin(true);
    } else if (type === 'register' && loginData.phone && loginData.password && loginData.name && loginData.userType) {
      setUser({ name: loginData.name, type: loginData.userType });
      onLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-2xl">
              <Leaf className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🌱 Growfinity</h1>
          <p className="text-gray-600">Farm to Market Connection</p>
          <p className="text-sm text-gray-500 mt-2">India's Largest Agricultural Platform</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>Login to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={(e) => handleLogin(e, 'login')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={loginData.phone}
                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Login
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Forgot password? <a href="#" className="text-blue-600 hover:underline">Reset it</a>
                  </p>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={(e) => handleLogin(e, 'register')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={loginData.name}
                        onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userType">Who are you?</Label>
                    <Select value={loginData.userType} onValueChange={(value) => setLoginData({ ...loginData, userType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Farmer">Farmer</SelectItem>
                        <SelectItem value="Buyer">Buyer</SelectItem>
                        <SelectItem value="Transporter">Transporter</SelectItem>
                        <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPhone">Mobile Number</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={loginData.phone}
                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Create password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={loginData.language} onValueChange={(value) => setLoginData({ ...loginData, language: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                        <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                        <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                        <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                        <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                        <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center text-sm">
          <div className="bg-white/60 p-4 rounded-lg">
            <div className="text-green-600 font-semibold">2.5L+ Farmers</div>
            <div className="text-gray-600">Trusted Platform</div>
          </div>
          <div className="bg-white/60 p-4 rounded-lg">
            <div className="text-blue-600 font-semibold">₹500 Crores+</div>
            <div className="text-gray-600">Total Trading Volume</div>
          </div>
        </div>
      </div>
    </div>
  );
}