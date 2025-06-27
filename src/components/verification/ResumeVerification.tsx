import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, X, Eye, Download } from 'lucide-react';
import { User } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ResumeVerificationProps {
  user: User;
  onVerificationComplete: (trustScore: number) => void;
}

interface VerificationResult {
  trustScore: number;
  checks: {
    name: string;
    status: 'passed' | 'failed' | 'warning';
    message: string;
  }[];
  suggestions: string[];
}

const ResumeVerification: React.FC<ResumeVerificationProps> = ({ user, onVerificationComplete }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const runVerification = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock verification results
    const checks = [
      {
        name: 'Contact Information Consistency',
        status: 'passed' as const,
        message: 'Email and phone number match profile data',
      },
      {
        name: 'Employment History Verification',
        status: 'passed' as const,
        message: 'Work experience timeline is consistent',
      },
      {
        name: 'Skills Validation',
        status: 'warning' as const,
        message: 'Some skills could not be verified through public profiles',
      },
      {
        name: 'Education Background',
        status: 'passed' as const,
        message: 'Educational credentials appear legitimate',
      },
      {
        name: 'Document Authenticity',
        status: 'passed' as const,
        message: 'Resume format and metadata indicate authentic document',
      },
    ];

    const passedChecks = checks.filter(check => check.status === 'passed').length;
    const trustScore = Math.round((passedChecks / checks.length) * 100);

    const suggestions = [
      'Consider adding LinkedIn profile link for additional verification',
      'Include GitHub profile to showcase technical projects',
      'Add professional references for enhanced credibility',
    ];

    const result: VerificationResult = {
      trustScore,
      checks,
      suggestions,
    };

    setVerificationResult(result);
    setIsVerifying(false);
    onVerificationComplete(trustScore);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'failed':
        return <X className="w-4 h-4 text-error-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-success-700 bg-success-50 border-success-200';
      case 'warning':
        return 'text-warning-700 bg-warning-50 border-warning-200';
      case 'failed':
        return 'text-error-700 bg-error-50 border-error-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-error-600';
  };

  const getTrustScoreBadge = (score: number) => {
    if (score >= 80) return 'Highly Trusted';
    if (score >= 60) return 'Verified';
    return 'Needs Review';
  };

  return (
    <Card>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resume Trust Score</h3>
          <p className="text-sm text-gray-600">Verify resume authenticity and build employer trust</p>
        </div>
      </div>

      {!verificationResult && !isVerifying && (
        <div className="text-center py-8">
          <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Verify Your Resume
          </h4>
          <p className="text-gray-600 mb-6">
            Get a trust score to increase employer confidence in your application.
            Our AI will verify your resume against public data sources.
          </p>
          <Button onClick={runVerification} icon={<Shield className="w-4 h-4" />}>
            Start Verification
          </Button>
        </div>
      )}

      {isVerifying && (
        <div className="text-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-6 h-6 text-blue-600" />
          </motion.div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Verifying Resume...
          </h4>
          <p className="text-gray-600">
            Checking contact information, employment history, and document authenticity
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span>Analyzing document metadata</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Cross-referencing employment data</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Validating contact information</span>
            </div>
          </div>
        </div>
      )}

      {verificationResult && (
        <div className="space-y-6">
          {/* Trust Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className={`text-4xl font-bold mb-2 ${getTrustScoreColor(verificationResult.trustScore)}`}>
              {verificationResult.trustScore}%
            </div>
            <div className="text-lg font-medium text-gray-900 mb-2">Trust Score</div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              verificationResult.trustScore >= 80 ? 'bg-success-100 text-success-700' :
              verificationResult.trustScore >= 60 ? 'bg-warning-100 text-warning-700' :
              'bg-error-100 text-error-700'
            }`}>
              <Shield className="w-4 h-4 mr-1" />
              {getTrustScoreBadge(verificationResult.trustScore)}
            </div>
          </div>

          {/* Verification Checks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Verification Checks</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                icon={showDetails ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>

            <div className="space-y-3">
              {verificationResult.checks.map((check, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 border rounded-lg ${getStatusColor(check.status)}`}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{check.name}</div>
                      {showDetails && (
                        <div className="text-xs mt-1 opacity-75">{check.message}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          {verificationResult.suggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Improvement Suggestions</h4>
              <div className="space-y-2">
                {verificationResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={runVerification}
              icon={<Shield className="w-4 h-4" />}
            >
              Re-verify
            </Button>
            <Button
              variant="ghost"
              icon={<Download className="w-4 h-4" />}
            >
              Download Report
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResumeVerification;