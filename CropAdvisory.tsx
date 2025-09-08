import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Leaf,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

interface WeatherData {
  today: {
    temp: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
    description: string;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy';
    rainfall: number;
  }>;
}

interface CropAdvice {
  crop: string;
  stage: string;
  daysToHarvest: number;
  bestHarvestTime: string;
  currentAdvice: string[];
  warnings: string[];
  opportunities: string[];
}

interface DiseaseAlert {
  id: string;
  crop: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string;
  treatment: string;
  prevention: string[];
}

const weatherData: WeatherData = {
  today: {
    temp: 28,
    humidity: 65,
    rainfall: 0,
    windSpeed: 12,
    condition: 'sunny',
    description: 'Sunny with good wind conditions'
  },
  forecast: [
    { day: 'Tomorrow', temp: 26, condition: 'cloudy', rainfall: 5 },
    { day: 'Day After', temp: 24, condition: 'rainy', rainfall: 15 },
    { day: '3 Days', temp: 23, condition: 'rainy', rainfall: 25 },
    { day: '4 Days', temp: 27, condition: 'cloudy', rainfall: 2 },
    { day: '5 Days', temp: 29, condition: 'sunny', rainfall: 0 }
  ]
};

const cropAdviceData: CropAdvice[] = [
  {
    crop: 'Tomatoes',
    stage: 'Fruit Development',
    daysToHarvest: 25,
    bestHarvestTime: 'Early morning 6-8 AM or evening 4-6 PM',
    currentAdvice: [
      'Water regularly but avoid wetting the leaves',
      'Apply phosphorus and potash spray',
      'Remove weak branches'
    ],
    warnings: [
      'Risk of late blight due to upcoming rain',
      'Fruit cracking risk due to excess moisture'
    ],
    opportunities: [
      'Good weather for pesticide application',
      'Start preparing for next crop cycle'
    ]
  },
  {
    crop: 'Wheat',
    stage: 'Grain Filling',
    daysToHarvest: 35,
    bestHarvestTime: 'Afternoon 12-3 PM (for low moisture)',
    currentAdvice: [
      'Light irrigation, avoid waterlogging',
      'Apply potash spray for grain filling',
      'Protect from birds'
    ],
    warnings: [
      'Risk of lodging due to strong winds',
      'Water stress may reduce grain size'
    ],
    opportunities: [
      'Good weather for field cleaning',
      'Start harvesting preparations'
    ]
  }
];

const diseaseAlerts: DiseaseAlert[] = [
  {
    id: 'ALT001',
    crop: 'Tomatoes',
    disease: 'Late Blight',
    severity: 'high',
    symptoms: 'Brown spots on leaves, white fungus',
    treatment: 'Spray Metalaxyl + Mancozeb',
    prevention: ['Good drainage', 'Remove infected leaves', 'Regular monitoring']
  },
  {
    id: 'ALT002', 
    crop: 'Wheat',
    disease: 'Yellow Rust',
    severity: 'medium',
    symptoms: 'Yellow stripes on leaves',
    treatment: 'Spray Propiconazole',
    prevention: ['Use resistant varieties', 'Balanced fertilizer', 'Timely sowing']
  }
];

export function CropAdvisory() {
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const [selectedCrop, setSelectedCrop] = useState('Tomatoes');

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-5 w-5 text-blue-500" />;
      default: return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentCropAdvice = cropAdviceData.find(crop => crop.crop === selectedCrop);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800 text-xl flex items-center space-x-2">
            <Cloud className="h-6 w-6" />
            <span>🌤️ Crop Advisory</span>
          </CardTitle>
          <CardDescription>Weather information and crop care advice</CardDescription>
        </CardHeader>
      </Card>

      {/* Location & Crop Selection */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Select Crop</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <Leaf className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="Cotton">Cotton</SelectItem>
                  <SelectItem value="Soybeans">Soybeans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="weather" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="advisory">Advisory</TabsTrigger>
          <TabsTrigger value="harvest">Harvest</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="weather" className="space-y-6">
          {/* Current Weather */}
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    {getWeatherIcon(weatherData.today.condition)}
                    <h3 className="text-xl font-semibold">Today's Weather - {selectedLocation}</h3>
                  </div>
                  <p className="text-blue-100 mb-4">{weatherData.today.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-5 w-5" />
                      <div>
                        <div className="text-2xl font-bold">{weatherData.today.temp}°C</div>
                        <div className="text-sm text-blue-100">Temperature</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-5 w-5" />
                      <div>
                        <div className="text-2xl font-bold">{weatherData.today.humidity}%</div>
                        <div className="text-sm text-blue-100">Humidity</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CloudRain className="h-5 w-5" />
                      <div>
                        <div className="text-2xl font-bold">{weatherData.today.rainfall}mm</div>
                        <div className="text-sm text-blue-100">Rainfall</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-5 w-5" />
                      <div>
                        <div className="text-2xl font-bold">{weatherData.today.windSpeed}km/h</div>
                        <div className="text-sm text-blue-100">Wind Speed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5-Day Forecast */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle>5-Day Weather Forecast</CardTitle>
              <CardDescription>Upcoming weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <Card key={index} className="bg-gray-50 border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="font-medium text-gray-900 mb-2">{day.day}</div>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(day.condition)}
                      </div>
                      <div className="text-lg font-semibold">{day.temp}°C</div>
                      <div className="text-sm text-blue-600">{day.rainfall}mm</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advisory" className="space-y-6">
          {currentCropAdvice && (
            <>
              {/* Crop Status */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center space-x-2">
                    <Leaf className="h-5 w-5" />
                    <span>{currentCropAdvice.crop} Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{currentCropAdvice.stage}</div>
                      <div className="text-sm text-gray-600">Current Stage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentCropAdvice.daysToHarvest} days</div>
                      <div className="text-sm text-gray-600">Until Harvest</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{currentCropAdvice.bestHarvestTime}</div>
                      <div className="text-sm text-gray-600">Best Harvest Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Advice */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>What to do today</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentCropAdvice.currentAdvice.map((advice, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{advice}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Warnings & Opportunities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Warnings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentCropAdvice.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-red-700">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Opportunities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentCropAdvice.opportunities.map((opportunity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-700">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="harvest" className="space-y-6">
          {/* Harvest Timing */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Harvest Time</span>
              </CardTitle>
              <CardDescription>Best harvest timing and methods</CardDescription>
            </CardHeader>
            <CardContent>
              {currentCropAdvice && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Expected Harvest Date</span>
                    </h4>
                    <p className="text-lg font-bold text-orange-600">
                      {new Date(Date.now() + currentCropAdvice.daysToHarvest * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-600">({currentCropAdvice.daysToHarvest} days remaining)</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold mb-2">Best Harvest Time</h4>
                    <p className="text-orange-700">{currentCropAdvice.bestHarvestTime}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Harvest Tips */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle>Harvest Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Right Time', tip: 'Harvest early morning or evening when temperatures are low' },
                  { title: 'Weather', tip: 'Avoid harvesting on rainy days to prevent crop damage' },
                  { title: 'Tools', tip: 'Use clean and sharp tools for harvesting' },
                  { title: 'Storage', tip: 'Store in cool places immediately after harvest' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {/* Disease Alerts */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Disease Alerts</span>
              </CardTitle>
              <CardDescription>Crop disease information in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseaseAlerts.map((alert) => (
                  <Card key={alert.id} className="bg-white border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{alert.disease}</h4>
                          <p className="text-sm text-gray-600">Crop: {alert.crop}</p>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity === 'high' ? 'High' : 
                           alert.severity === 'medium' ? 'Medium' : 'Low'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Symptoms:</h5>
                          <p className="text-sm text-gray-600">{alert.symptoms}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Treatment:</h5>
                          <p className="text-sm text-gray-600">{alert.treatment}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Prevention:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {alert.prevention.map((prev, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Info className="h-3 w-3 text-blue-500 flex-shrink-0" />
                                <span>{prev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Alerts */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800 flex items-center space-x-2">
                <Cloud className="h-5 w-5" />
                <span>Weather Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CloudRain className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Heavy Rain Expected</span>
                  </div>
                  <p className="text-sm text-gray-600">20-30mm rainfall expected in next 2-3 days. Prepare crop protection measures.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wind className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold">Strong Wind Warning</span>
                  </div>
                  <p className="text-sm text-gray-600">Wind speeds of 25-30 km/h expected tomorrow. Provide support to crops.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}