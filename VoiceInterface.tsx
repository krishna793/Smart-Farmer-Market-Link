import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Languages, Smartphone, MessageSquare, PlayCircle, PauseCircle } from 'lucide-react';

interface VoiceCommand {
  id: string;
  hindi: string;
  english: string;
  action: string;
  response: string;
}

const voiceCommands: VoiceCommand[] = [
  {
    id: 'list_crops',
    hindi: 'मेरी फसल दिखाओ',
    english: 'Show my crops',
    action: 'LIST_CROPS',
    response: 'Showing your current crop listings'
  },
  {
    id: 'add_listing',
    hindi: 'नई फसल बेचना है',
    english: 'Want to sell new crop',
    action: 'ADD_LISTING',
    response: 'Please tell me the crop name and quantity'
  },
  {
    id: 'check_prices',
    hindi: 'आज का भाव बताओ',
    english: 'Tell today\'s prices',
    action: 'CHECK_PRICES',
    response: 'Today Tomatoes ₹45/kg, Carrots ₹30/kg'
  },
  {
    id: 'weather',
    hindi: 'मौसम कैसा है',
    english: 'How is the weather',
    action: 'WEATHER',
    response: 'Today 28°C, clear weather. Rain expected tomorrow'
  },
  {
    id: 'transport',
    hindi: 'गाड़ी बुक करो',
    english: 'Book vehicle',
    action: 'BOOK_TRANSPORT',
    response: 'Starting transport booking. Where do you want to transport?'
  }
];

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'हिंदी', nativeName: 'Hindi' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', nativeName: 'Punjabi' },
  { code: 'bn', name: 'বাংলা', nativeName: 'Bengali' },
  { code: 'ta', name: 'தமிழ்', nativeName: 'Tamil' },
  { code: 'te', name: 'తెలుగు', nativeName: 'Telugu' },
  { code: 'mr', name: 'मराठी', nativeName: 'Marathi' },
  { code: 'gu', name: 'ગુજરાતી', nativeName: 'Gujarati' }
];

export function VoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [lastCommand, setLastCommand] = useState('');
  const [response, setResponse] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, [selectedLanguage]);

  const handleVoiceCommand = (transcript: string) => {
    setLastCommand(transcript);
    
    // Simple command matching (in real app, this would use NLP)
    const matchedCommand = voiceCommands.find(cmd => 
      transcript.toLowerCase().includes(cmd.hindi.toLowerCase()) ||
      transcript.toLowerCase().includes(cmd.english.toLowerCase())
    );

    if (matchedCommand) {
      setResponse(matchedCommand.response);
      if (isVoiceEnabled) {
        speak(matchedCommand.response);
      }
    } else {
      const fallbackResponse = selectedLanguage === 'hi' 
        ? 'मुझे समझ नहीं आया। कृपया दोबारा कहें।'
        : 'I did not understand. Please try again.';
      setResponse(fallbackResponse);
      if (isVoiceEnabled) {
        speak(fallbackResponse);
      }
    }
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setLastCommand('');
      setResponse('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader className="bg-indigo-50 border-b border-indigo-100">
        <CardTitle className="flex items-center justify-between text-indigo-800">
          <div className="flex items-center space-x-2">
            <Mic className="h-6 w-6" />
            <span>🎤 Voice Assistant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVoice}
              className={isVoiceEnabled ? 'text-green-600' : 'text-gray-400'}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
        <CardDescription>
          Use Growfinity with voice commands in your local language
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Voice Control */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={isListening ? stopListening : startListening}
                className={`w-24 h-24 rounded-full ${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                disabled={isSpeaking}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              {isListening && (
                <Badge className="bg-red-100 text-red-800 animate-pulse">
                  🎙️ Listening...
                </Badge>
              )}
              {isSpeaking && (
                <Badge className="bg-blue-100 text-blue-800 animate-pulse">
                  🔊 Speaking...
                </Badge>
              )}
              {!isListening && !isSpeaking && (
                <Badge className="bg-green-100 text-green-800">
                  ✅ Ready
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600">
              {selectedLanguage === 'hi' 
                ? 'माइक बटन दबाकर बोलना शुरू करें'
                : 'Press the mic button to start speaking'
              }
            </p>
          </div>

          {/* Last Command & Response */}
          {(lastCommand || response) && (
            <div className="space-y-4">
              {lastCommand && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">You said:</span>
                  </div>
                  <p className="text-blue-700">{lastCommand}</p>
                </div>
              )}
              
              {response && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Growfinity's response:</span>
                    </div>
                    {isVoiceEnabled && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => speak(response)}
                        disabled={isSpeaking}
                      >
                        {isSpeaking ? (
                          <PauseCircle className="h-4 w-4" />
                        ) : (
                          <PlayCircle className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  <p className="text-green-700">{response}</p>
                </div>
              )}
            </div>
          )}

          {/* Common Commands */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Common Commands:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {voiceCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  className="bg-white p-3 rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer transition-colors"
                  onClick={() => {
                    setLastCommand(selectedLanguage === 'hi' ? cmd.hindi : cmd.english);
                    setResponse(cmd.response);
                    if (isVoiceEnabled) speak(cmd.response);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {selectedLanguage === 'hi' ? cmd.hindi : cmd.english}
                    </span>
                    <PlayCircle className="h-4 w-4 text-indigo-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Tips:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Speak clearly and slowly</li>
              <li>• Use in a quiet environment</li>
              <li>• Keep phone close to your mouth</li>
              <li>• Internet connection required</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}