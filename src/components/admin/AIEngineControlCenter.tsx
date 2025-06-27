import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Database, 
  Server, 
  BarChart3, 
  Settings, 
  RefreshCw, 
  Download, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  X, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Activity, 
  Layers, 
  Sliders, 
  Eye, 
  EyeOff, 
  Save, 
  UploadCloud, 
  DownloadCloud, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  RotateCw, 
  Maximize, 
  Minimize, 
  Code, 
  Terminal, 
  Clipboard, 
  Copy
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ModelVersion {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'training' | 'failed' | 'archived';
  accuracy: number;
  createdAt: string;
  trainedBy: string;
  parameters: {
    [key: string]: any;
  };
  metrics: {
    [key: string]: any;
  };
  datasetId: string;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  records: number;
  lastUpdated: string;
  size: string;
  type: 'training' | 'validation' | 'testing';
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source: string;
  details?: any;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

const AIEngineControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('models');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [logFilter, setLogFilter] = useState('all');
  const [logSearchTerm, setLogSearchTerm] = useState('');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [showLogDetails, setShowLogDetails] = useState<string | null>(null);
  const [expandedMetrics, setExpandedMetrics] = useState<string[]>([]);
  const [showComparisonView, setShowComparisonView] = useState(false);
  const [comparisonModels, setComparisonModels] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock data
  const models: ModelVersion[] = [
    {
      id: '1',
      name: 'Job Matching Engine',
      version: 'v2.1.4',
      status: 'active',
      accuracy: 94.2,
      createdAt: '2024-01-10T09:00:00Z',
      trainedBy: 'AI Team',
      parameters: {
        learningRate: 0.001,
        epochs: 100,
        batchSize: 64,
        optimizer: 'Adam',
        architecture: 'Transformer',
        embeddingDimension: 768,
        dropoutRate: 0.1
      },
      metrics: {
        precision: 0.92,
        recall: 0.89,
        f1Score: 0.91,
        auc: 0.95,
        inferenceTime: 120,
        trainingTime: 14400
      },
      datasetId: '1'
    },
    {
      id: '2',
      name: 'Resume Parser',
      version: 'v1.8.2',
      status: 'active',
      accuracy: 91.5,
      createdAt: '2023-12-15T14:30:00Z',
      trainedBy: 'Data Science Team',
      parameters: {
        learningRate: 0.0005,
        epochs: 80,
        batchSize: 32,
        optimizer: 'RMSprop',
        architecture: 'BERT',
        embeddingDimension: 512,
        dropoutRate: 0.2
      },
      metrics: {
        precision: 0.90,
        recall: 0.87,
        f1Score: 0.88,
        auc: 0.93,
        inferenceTime: 85,
        trainingTime: 10800
      },
      datasetId: '2'
    },
    {
      id: '3',
      name: 'Skill Recommender',
      version: 'v1.5.0',
      status: 'training',
      accuracy: 88.7,
      createdAt: '2024-01-18T11:20:00Z',
      trainedBy: 'ML Engineer',
      parameters: {
        learningRate: 0.0008,
        epochs: 120,
        batchSize: 48,
        optimizer: 'AdamW',
        architecture: 'GPT',
        embeddingDimension: 1024,
        dropoutRate: 0.15
      },
      metrics: {
        precision: 0.87,
        recall: 0.85,
        f1Score: 0.86,
        auc: 0.91,
        inferenceTime: 150,
        trainingTime: 18000
      },
      datasetId: '3'
    },
    {
      id: '4',
      name: 'Interview Question Generator',
      version: 'v1.2.1',
      status: 'archived',
      accuracy: 86.3,
      createdAt: '2023-11-05T10:45:00Z',
      trainedBy: 'Research Team',
      parameters: {
        learningRate: 0.001,
        epochs: 90,
        batchSize: 32,
        optimizer: 'Adam',
        architecture: 'T5',
        embeddingDimension: 512,
        dropoutRate: 0.1
      },
      metrics: {
        precision: 0.85,
        recall: 0.83,
        f1Score: 0.84,
        auc: 0.89,
        inferenceTime: 110,
        trainingTime: 12600
      },
      datasetId: '4'
    },
  ];

  const datasets: Dataset[] = [
    {
      id: '1',
      name: 'Job Matching Dataset',
      description: 'Curated dataset of job postings and candidate profiles with match labels',
      records: 1250000,
      lastUpdated: '2024-01-15T09:30:00Z',
      size: '4.2 GB',
      type: 'training'
    },
    {
      id: '2',
      name: 'Resume Corpus',
      description: 'Collection of anonymized resumes with structured extraction labels',
      records: 850000,
      lastUpdated: '2023-12-10T14:15:00Z',
      size: '3.1 GB',
      type: 'training'
    },
    {
      id: '3',
      name: 'Skills Taxonomy',
      description: 'Hierarchical dataset of skills with relationships and industry mappings',
      records: 450000,
      lastUpdated: '2024-01-05T11:45:00Z',
      size: '1.8 GB',
      type: 'training'
    },
    {
      id: '4',
      name: 'Interview QA Pairs',
      description: 'Question-answer pairs for technical and behavioral interviews',
      records: 320000,
      lastUpdated: '2023-11-01T16:20:00Z',
      size: '1.2 GB',
      type: 'validation'
    },
    {
      id: '5',
      name: 'Job Market Trends',
      description: 'Time-series data of job market trends and skill demands',
      records: 180000,
      lastUpdated: '2024-01-12T13:10:00Z',
      size: '0.9 GB',
      type: 'testing'
    },
  ];

  const logs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-20T09:15:32Z',
      level: 'info',
      message: 'Model job-matching-v2.1.4 successfully loaded',
      source: 'ModelService'
    },
    {
      id: '2',
      timestamp: '2024-01-20T09:14:28Z',
      level: 'warning',
      message: 'High memory usage detected',
      source: 'SystemMonitor',
      details: {
        memoryUsage: '85%',
        threshold: '80%',
        action: 'Monitoring'
      }
    },
    {
      id: '3',
      timestamp: '2024-01-20T09:10:15Z',
      level: 'error',
      message: 'Failed to connect to database',
      source: 'DataService',
      details: {
        error: 'Connection timeout',
        attempts: 3,
        action: 'Retrying'
      }
    },
    {
      id: '4',
      timestamp: '2024-01-20T09:05:42Z',
      level: 'info',
      message: 'Processing batch of 1000 job matches',
      source: 'MatchingEngine'
    },
    {
      id: '5',
      timestamp: '2024-01-20T09:01:18Z',
      level: 'debug',
      message: 'Cache hit ratio: 78.5%',
      source: 'CacheService'
    },
    {
      id: '6',
      timestamp: '2024-01-20T09:00:03Z',
      level: 'info',
      message: 'System startup complete',
      source: 'ApplicationBootstrap'
    },
    {
      id: '7',
      timestamp: '2024-01-20T08:59:45Z',
      level: 'warning',
      message: 'API rate limit approaching threshold',
      source: 'APIGateway',
      details: {
        currentRate: '950 req/min',
        limit: '1000 req/min',
        action: 'Monitoring'
      }
    },
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      id: '1',
      name: 'Response Time',
      value: 145,
      unit: 'ms',
      trend: 'down',
      change: 12
    },
    {
      id: '2',
      name: 'Throughput',
      value: 1250,
      unit: 'req/min',
      trend: 'up',
      change: 8
    },
    {
      id: '3',
      name: 'Error Rate',
      value: 0.02,
      unit: '%',
      trend: 'down',
      change: 15
    },
    {
      id: '4',
      name: 'CPU Usage',
      value: 42,
      unit: '%',
      trend: 'stable',
      change: 2
    },
    {
      id: '5',
      name: 'Memory Usage',
      value: 68,
      unit: '%',
      trend: 'up',
      change: 5
    },
    {
      id: '6',
      name: 'Disk I/O',
      value: 125,
      unit: 'MB/s',
      trend: 'up',
      change: 10
    },
    {
      id: '7',
      name: 'Network Traffic',
      value: 850,
      unit: 'Mbps',
      trend: 'up',
      change: 7
    },
    {
      id: '8',
      name: 'Cache Hit Ratio',
      value: 78.5,
      unit: '%',
      trend: 'up',
      change: 3
    },
  ];

  // Filter models based on search
  const filteredModels = models.filter(model => 
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter logs based on search and level filter
  const filteredLogs = logs.filter(log => {
    const matchesSearch = logSearchTerm === '' || 
      log.message.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(logSearchTerm.toLowerCase());
    
    const matchesLevel = logFilter === 'all' || log.level === logFilter;
    
    return matchesSearch && matchesLevel;
  });

  useEffect(() => {
    // Simulate training progress
    if (isTraining) {
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTraining(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isTraining]);

  useEffect(() => {
    // Set up auto-refresh if enabled
    if (refreshInterval) {
      const interval = setInterval(() => {
        // In a real app, this would fetch fresh data from the API
        setLastRefreshed(new Date());
      }, refreshInterval * 1000);
      
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
  };

  const toggleMetricExpansion = (metricId: string) => {
    if (expandedMetrics.includes(metricId)) {
      setExpandedMetrics(expandedMetrics.filter(id => id !== metricId));
    } else {
      setExpandedMetrics([...expandedMetrics, metricId]);
    }
  };

  const toggleModelComparison = (modelId: string) => {
    if (comparisonModels.includes(modelId)) {
      setComparisonModels(comparisonModels.filter(id => id !== modelId));
    } else {
      setComparisonModels([...comparisonModels, modelId]);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-700';
      case 'warning': return 'bg-warning-100 text-warning-700';
      case 'error': return 'bg-error-100 text-error-700';
      case 'debug': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <X className="w-4 h-4" />;
      case 'debug': return <Code className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4" />;
      case 'down': return <ArrowDown className="w-4 h-4" />;
      case 'stable': return <RotateCw className="w-4 h-4" />;
      default: return <RotateCw className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === 'stable') return 'text-gray-600';
    if ((trend === 'up' && isPositive) || (trend === 'down' && !isPositive)) {
      return 'text-success-600';
    }
    return 'text-error-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const tabs = [
    { id: 'models', label: 'Model Training', icon: Brain },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'logs', label: 'Logs', icon: Terminal },
    { id: 'datasets', label: 'Datasets', icon: Database },
  ];

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 bg-white z-50 p-6 overflow-auto' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Engine Control Center</h3>
            <p className="text-gray-600">
              Monitor and manage AI models, performance, and data
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            Last updated: {lastRefreshed.toLocaleTimeString()}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => setLastRefreshed(new Date())}
          >
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Model Training Panel */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search models by name or version..."
                icon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={refreshInterval?.toString() || '0'}
                onChange={(e) => setRefreshInterval(parseInt(e.target.value) || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="0">Manual Refresh</option>
                <option value="30">Auto (30s)</option>
                <option value="60">Auto (1m)</option>
                <option value="300">Auto (5m)</option>
              </select>
              <Button 
                variant="outline" 
                icon={<Sliders className="w-4 h-4" />}
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              >
                {showAdvancedSettings ? 'Hide Settings' : 'Advanced Settings'}
              </Button>
              <Button 
                icon={showComparisonView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                onClick={() => setShowComparisonView(!showComparisonView)}
              >
                {showComparisonView ? 'Single View' : 'Compare Models'}
              </Button>
            </div>
          </div>

          {showAdvancedSettings && (
            <Card className="p-4 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-4">Advanced Training Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Rate
                  </label>
                  <Input
                    type="number"
                    step="0.0001"
                    min="0.0001"
                    max="0.1"
                    defaultValue="0.001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Epochs
                  </label>
                  <Input
                    type="number"
                    step="1"
                    min="1"
                    max="1000"
                    defaultValue="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch Size
                  </label>
                  <Input
                    type="number"
                    step="1"
                    min="1"
                    max="512"
                    defaultValue="64"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Optimizer
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    defaultValue="adam"
                  >
                    <option value="adam">Adam</option>
                    <option value="sgd">SGD</option>
                    <option value="rmsprop">RMSprop</option>
                    <option value="adagrad">Adagrad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Architecture
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    defaultValue="transformer"
                  >
                    <option value="transformer">Transformer</option>
                    <option value="bert">BERT</option>
                    <option value="gpt">GPT</option>
                    <option value="t5">T5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dropout Rate
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="0.5"
                    defaultValue="0.1"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </Card>
          )}

          {isTraining && (
            <Card className="p-4 bg-blue-50 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Training in Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{trainingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${trainingProgress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${trainingProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Epoch</span>
                      <span className="font-medium">{Math.floor(trainingProgress / 100 * 100)}/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Estimated Time Remaining</span>
                      <span className="font-medium">{Math.ceil((100 - trainingProgress) / 10)} minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Loss</span>
                      <span className="font-medium">0.{Math.floor(100 - trainingProgress)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-300 hover:bg-red-50"
                      onClick={() => setIsTraining(false)}
                    >
                      Cancel Training
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {!showComparisonView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <Card 
                  key={model.id} 
                  hover 
                  className={`${selectedModel === model.id ? 'border-primary-500 ring-1 ring-primary-500' : ''}`}
                  onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        model.status === 'active' ? 'bg-success-100' : 
                        model.status === 'training' ? 'bg-blue-100' : 
                        model.status === 'failed' ? 'bg-error-100' : 'bg-gray-100'
                      }`}>
                        <Brain className={`w-5 h-5 ${
                          model.status === 'active' ? 'text-success-600' : 
                          model.status === 'training' ? 'text-blue-600' : 
                          model.status === 'failed' ? 'text-error-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">{model.version}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      model.status === 'active' ? 'bg-success-100 text-success-700' : 
                      model.status === 'training' ? 'bg-blue-100 text-blue-700' : 
                      model.status === 'failed' ? 'bg-error-100 text-error-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {model.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-medium text-gray-900">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Created</span>
                      <span className="text-gray-900">{new Date(model.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trained By</span>
                      <span className="text-gray-900">{model.trainedBy}</span>
                    </div>
                  </div>
                  
                  {selectedModel === model.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Model Parameters</h5>
                          <div className="bg-gray-50 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                            <pre>{JSON.stringify(model.parameters, null, 2)}</pre>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Performance Metrics</h5>
                          <div className="space-y-2">
                            {Object.entries(model.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                <span className="font-medium text-gray-900">
                                  {typeof value === 'number' ? 
                                    (key.includes('Time') ? `${value} ms` : value.toFixed(2)) : 
                                    value.toString()
                                  }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {model.status === 'active' ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              icon={<Pause className="w-4 h-4" />}
                              className="flex-1"
                            >
                              Pause Model
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              icon={<Play className="w-4 h-4" />}
                              className="flex-1"
                            >
                              Activate Model
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            icon={<Download className="w-4 h-4" />}
                            className="flex-1"
                          >
                            Export
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            icon={<Clipboard className="w-4 h-4" />}
                            onClick={() => toggleModelComparison(model.id)}
                            className={`flex-1 ${comparisonModels.includes(model.id) ? 'bg-primary-50 border-primary-300 text-primary-700' : ''}`}
                          >
                            {comparisonModels.includes(model.id) ? 'Selected' : 'Compare'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-medium text-gray-900">Model Comparison</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={<Eye className="w-4 h-4" />}
                  onClick={() => setShowComparisonView(false)}
                >
                  Exit Comparison
                </Button>
              </div>
              
              {comparisonModels.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Models Selected</h3>
                  <p className="text-gray-600 mb-6">
                    Select models to compare by clicking the "Compare" button on model cards
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Metric</th>
                        {comparisonModels.map(modelId => {
                          const model = models.find(m => m.id === modelId);
                          return model ? (
                            <th key={model.id} className="text-left py-3 px-4 font-medium text-gray-900">
                              {model.name} ({model.version})
                            </th>
                          ) : null;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Accuracy</td>
                        {comparisonModels.map(modelId => {
                          const model = models.find(m => m.id === modelId);
                          return model ? (
                            <td key={model.id} className="py-3 px-4 text-gray-900">
                              {model.accuracy}%
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Status</td>
                        {comparisonModels.map(modelId => {
                          const model = models.find(m => m.id === modelId);
                          return model ? (
                            <td key={model.id} className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                model.status === 'active' ? 'bg-success-100 text-success-700' : 
                                model.status === 'training' ? 'bg-blue-100 text-blue-700' : 
                                model.status === 'failed' ? 'bg-error-100 text-error-700' : 
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {model.status}
                              </span>
                            </td>
                          ) : null;
                        })}
                      </tr>
                      {Object.keys(models[0].metrics).map(metricKey => (
                        <tr key={metricKey} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {metricKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </td>
                          {comparisonModels.map(modelId => {
                            const model = models.find(m => m.id === modelId);
                            return model ? (
                              <td key={model.id} className="py-3 px-4 text-gray-900">
                                {typeof model.metrics[metricKey] === 'number' ? 
                                  (metricKey.includes('Time') ? `${model.metrics[metricKey]} ms` : model.metrics[metricKey].toFixed(2)) : 
                                  model.metrics[metricKey].toString()
                                }
                              </td>
                            ) : null;
                          })}
                        </tr>
                      ))}
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">Created At</td>
                        {comparisonModels.map(modelId => {
                          const model = models.find(m => m.id === modelId);
                          return model ? (
                            <td key={model.id} className="py-3 px-4 text-gray-900">
                              {new Date(model.createdAt).toLocaleDateString()}
                            </td>
                          ) : null;
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              icon={<UploadCloud className="w-4 h-4" />}
            >
              Import Model
            </Button>
            <Button 
              icon={<Zap className="w-4 h-4" />}
              onClick={startTraining}
              disabled={isTraining}
            >
              Train New Model
            </Button>
          </div>
        </div>
      )}

      {/* Monitoring Dashboard */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Activity className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">System Status</h4>
                  <p className="text-sm text-success-600">Healthy</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium text-gray-900">99.98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Services</span>
                  <span className="font-medium text-gray-900">12/12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Models</span>
                  <span className="font-medium text-gray-900">2</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Cpu className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Resource Usage</h4>
                  <p className="text-sm text-gray-600">Current</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">CPU</span>
                    <span className="font-medium text-gray-900">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Memory</span>
                    <span className="font-medium text-gray-900">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Disk</span>
                    <span className="font-medium text-gray-900">51%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '51%' }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-warning-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Alerts</h4>
                  <p className="text-sm text-warning-600">2 Active</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-warning-50 rounded border border-warning-200 text-sm text-warning-700">
                  High memory usage detected (85%)
                </div>
                <div className="p-2 bg-warning-50 rounded border border-warning-200 text-sm text-warning-700">
                  API rate limit approaching threshold
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-success-100 rounded-lg">
                  <Zap className="w-5 h-5 text-success-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Performance</h4>
                  <p className="text-sm text-gray-600">Last 24 hours</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-1">145ms</span>
                    <span className="text-success-600 text-xs">-12%</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Error Rate</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-1">0.02%</span>
                    <span className="text-success-600 text-xs">-15%</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Throughput</span>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 mr-1">1250 req/min</span>
                    <span className="text-success-600 text-xs">+8%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-medium text-gray-900">Performance Metrics</h4>
              <Button 
                variant="outline" 
                size="sm" 
                icon={<Download className="w-4 h-4" />}
              >
                Export Data
              </Button>
            </div>
            
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div 
                  key={metric.id} 
                  className={`border rounded-lg overflow-hidden ${
                    expandedMetrics.includes(metric.id) ? 'border-primary-300' : 'border-gray-200'
                  }`}
                >
                  <div 
                    className={`p-4 cursor-pointer ${
                      expandedMetrics.includes(metric.id) ? 'bg-primary-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleMetricExpansion(metric.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          metric.trend === 'up' ? 'bg-success-100' : 
                          metric.trend === 'down' ? 'bg-error-100' : 
                          'bg-gray-100'
                        }`}>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{metric.name}</h5>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-700">{metric.value} {metric.unit}</span>
                            <span className={getTrendColor(metric.trend, 
                              (metric.name === 'Error Rate' && metric.trend === 'down') || 
                              (metric.name !== 'Error Rate' && metric.trend === 'up')
                            )}>
                              {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : '±'}{metric.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedMetrics.includes(metric.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {expandedMetrics.includes(metric.id) && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="h-48 flex items-center justify-center">
                        <BarChart3 className="w-16 h-16 text-gray-300" />
                        <p className="text-gray-500 ml-4">Chart visualization would appear here</p>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="font-medium text-gray-900 mb-1">24 Hour Average</div>
                          <div className="text-gray-700">{metric.value} {metric.unit}</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="font-medium text-gray-900 mb-1">7 Day Average</div>
                          <div className="text-gray-700">{(metric.value * (1 + Math.random() * 0.1 - 0.05)).toFixed(2)} {metric.unit}</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <div className="font-medium text-gray-900 mb-1">30 Day Average</div>
                          <div className="text-gray-700">{(metric.value * (1 + Math.random() * 0.2 - 0.1)).toFixed(2)} {metric.unit}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h4 className="font-medium text-gray-900 mb-4">System Health</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Server className="w-5 h-5 text-success-600" />
                    <span className="font-medium text-gray-900">API Service</span>
                  </div>
                  <span className="text-success-600 font-medium">Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-success-600" />
                    <span className="font-medium text-gray-900">Database</span>
                  </div>
                  <span className="text-success-600 font-medium">Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-success-600" />
                    <span className="font-medium text-gray-900">AI Engine</span>
                  </div>
                  <span className="text-success-600 font-medium">Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-warning-600" />
                    <span className="font-medium text-gray-900">Email Service</span>
                  </div>
                  <span className="text-warning-600 font-medium">Degraded</span>
                </div>
              </div>
            </Card>

            <Card>
              <h4 className="font-medium text-gray-900 mb-4">Resource Utilization</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">CPU Usage</span>
                    <span className="font-medium text-gray-900">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Memory Usage</span>
                    <span className="font-medium text-gray-900">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-warning-500 h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Disk Usage</span>
                    <span className="font-medium text-gray-900">51%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '51%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Network Bandwidth</span>
                    <span className="font-medium text-gray-900">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-success-500 h-2 rounded-full" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Log Management */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search logs by message or source..."
                icon={<Search className="w-4 h-4" />}
                value={logSearchTerm}
                onChange={(e) => setLogSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="debug">Debug</option>
              </select>
              <Button 
                variant="outline" 
                icon={<Download className="w-4 h-4" />}
              >
                Export Logs
              </Button>
            </div>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Level</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Message</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                          {getLevelIcon(log.level)}
                          <span>{log.level}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{log.source}</td>
                      <td className="py-3 px-4 text-gray-700">{log.message}</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => setShowLogDetails(log.id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <Terminal className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={() => {
                  setLogSearchTerm('');
                  setLogFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h4 className="font-medium text-gray-900 mb-4">Log Retention Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Info Logs Retention
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="30"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warning Logs Retention
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="90"
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Error Logs Retention
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  defaultValue="365"
                >
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                  <option value="730">730 days</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </Card>

          {/* Log Details Modal */}
          {showLogDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Log Details</h2>
                    <button
                      onClick={() => setShowLogDetails(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {(() => {
                    const log = logs.find(l => l.id === showLogDetails);
                    if (!log) return <div>Log entry not found</div>;

                    return (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Timestamp</h4>
                            <p className="text-gray-900">{formatDate(log.timestamp)}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Level</h4>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                              {getLevelIcon(log.level)}
                              <span>{log.level}</span>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Source</h4>
                            <p className="text-gray-900">{log.source}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Log ID</h4>
                            <p className="text-gray-900">{log.id}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Message</h4>
                          <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{log.message}</p>
                        </div>

                        {log.details && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Details</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}

                        <div className="flex space-x-3 pt-4">
                          <Button 
                            variant="outline" 
                            icon={<Copy className="w-4 h-4" />}
                            onClick={() => {
                              navigator.clipboard.writeText(JSON.stringify(log, null, 2));
                              alert('Log details copied to clipboard');
                            }}
                          >
                            Copy to Clipboard
                          </Button>
                          <Button 
                            variant="outline" 
                            icon={<Download className="w-4 h-4" />}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {/* Datasets Management */}
      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search datasets..."
                icon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                icon={<UploadCloud className="w-4 h-4" />}
              >
                Upload Dataset
              </Button>
              <Button 
                icon={<Plus className="w-4 h-4" />}
              >
                Create Dataset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Card 
                key={dataset.id} 
                hover 
                className={`${selectedDataset === dataset.id ? 'border-primary-500 ring-1 ring-primary-500' : ''}`}
                onClick={() => setSelectedDataset(selectedDataset === dataset.id ? null : dataset.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{dataset.name}</h4>
                      <p className="text-sm text-gray-600">{dataset.records.toLocaleString()} records</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dataset.type === 'training' ? 'bg-primary-100 text-primary-700' : 
                    dataset.type === 'validation' ? 'bg-secondary-100 text-secondary-700' : 
                    'bg-accent-100 text-accent-700'
                  }`}>
                    {dataset.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">{dataset.description}</p>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Size: {dataset.size}</span>
                  <span>Updated: {new Date(dataset.lastUpdated).toLocaleDateString()}</span>
                </div>
                
                {selectedDataset === dataset.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          icon={<Eye className="w-4 h-4" />}
                          className="flex-1"
                        >
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          icon={<Download className="w-4 h-4" />}
                          className="flex-1"
                        >
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          icon={<Trash2 className="w-4 h-4" />}
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          icon={<Zap className="w-4 h-4" />}
                          className="flex-1"
                          onClick={() => {
                            setSelectedDataset(null);
                            startTraining();
                          }}
                        >
                          Train Model
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>

          <Card>
            <h4 className="font-medium text-gray-900 mb-4">Dataset Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600">Total Datasets</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">3.05M</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">11.2 GB</div>
                <div className="text-sm text-gray-600">Total Size</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">Jan 15</div>
                <div className="text-sm text-gray-600">Last Updated</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// Helper component for Info icon
const Info = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default AIEngineControlCenter;