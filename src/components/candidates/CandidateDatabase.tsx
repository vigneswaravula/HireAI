import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  User, 
  MapPin, 
  Briefcase, 
  Star, 
  MessageSquare,
  Bookmark,
  Eye,
  Download,
  Calendar,
  Award,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  Edit,
  Trash2,
  Plus,
  X
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User as UserType } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CandidateNote {
  id: string;
  candidateId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
}

interface SavedCandidate {
  id: string;
  candidateId: string;
  category: string;
  notes: string;
  savedAt: string;
  followUpDate?: string;
}

interface CandidateDatabaseProps {
  onMessageCandidate: (candidateId: string) => void;
}

const CandidateDatabase: React.FC<CandidateDatabaseProps> = ({ onMessageCandidate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<UserType | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [savedCandidates, setSavedCandidates] = useState<SavedCandidate[]>([]);
  const [candidateNotes, setCandidateNotes] = useState<CandidateNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');

  const { users } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.auth);

  // Filter candidates (only job seekers)
  const candidates = users.filter(u => u.role === 'candidate');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === '' || 
      `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = skillFilter === '' ||
      candidate.skills?.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));
    
    const matchesLocation = locationFilter === '' ||
      candidate.workExperience?.some(exp => exp.company.toLowerCase().includes(locationFilter.toLowerCase()));
    
    const matchesExperience = experienceFilter === '' ||
      candidate.experience?.toLowerCase().includes(experienceFilter.toLowerCase());
    
    return matchesSearch && matchesSkill && matchesLocation && matchesExperience;
  });

  const displayedCandidates = activeTab === 'saved' 
    ? filteredCandidates.filter(c => savedCandidates.some(s => s.candidateId === c.id))
    : filteredCandidates;

  const saveCandidate = (candidateId: string, category: string = 'General', notes: string = '') => {
    const newSaved: SavedCandidate = {
      id: Date.now().toString(),
      candidateId,
      category,
      notes,
      savedAt: new Date().toISOString(),
    };
    setSavedCandidates(prev => [...prev, newSaved]);
    alert('Candidate saved successfully!');
  };

  const unsaveCandidate = (candidateId: string) => {
    setSavedCandidates(prev => prev.filter(s => s.candidateId !== candidateId));
    alert('Candidate removed from saved list!');
  };

  const addNote = (candidateId: string) => {
    if (!newNote.trim()) return;

    const note: CandidateNote = {
      id: Date.now().toString(),
      candidateId,
      content: newNote,
      createdAt: new Date().toISOString(),
      createdBy: user?.id || '',
      isPrivate: true,
    };

    setCandidateNotes(prev => [...prev, note]);
    setNewNote('');
    setShowNoteForm(false);
    alert('Note added successfully!');
  };

  const getCandidateNotes = (candidateId: string) => {
    return candidateNotes.filter(note => note.candidateId === candidateId);
  };

  const isCandidateSaved = (candidateId: string) => {
    return savedCandidates.some(s => s.candidateId === candidateId);
  };

  const handleViewProfile = (candidate: UserType) => {
    setSelectedCandidate(candidate);
    setShowProfile(true);
  };

  const handleMessageCandidate = (candidateId: string) => {
    onMessageCandidate(candidateId);
    alert('Opening message center...');
  };

  const handleDownloadResume = (candidate: UserType) => {
    if (candidate.resumeFileName) {
      alert(`Downloading ${candidate.resumeFileName}...`);
      // In a real app, this would trigger a file download
    } else {
      alert('No resume available for this candidate.');
    }
  };

  const handleSendEmail = (candidate: UserType) => {
    const emailSubject = encodeURIComponent('Job Opportunity');
    const emailBody = encodeURIComponent(`Dear ${candidate.firstName},\n\nI hope this email finds you well. I came across your profile and would like to discuss a potential job opportunity that might interest you.\n\nBest regards`);
    window.open(`mailto:${candidate.email}?subject=${emailSubject}&body=${emailBody}`);
  };

  const getExperienceYears = (experience: string) => {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const getSkillsMatchScore = (candidateSkills: string[], jobSkills: string[] = ['React', 'TypeScript', 'JavaScript']) => {
    if (!candidateSkills || candidateSkills.length === 0) return 0;
    const matches = candidateSkills.filter(skill => 
      jobSkills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    return Math.round((matches.length / jobSkills.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Candidate Database</h3>
          <p className="text-gray-600">{displayedCandidates.length} candidates found</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Candidates
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                activeTab === 'saved'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Saved ({savedCandidates.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search candidates..."
            icon={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Filter by skills..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
          />
          <Input
            placeholder="Filter by location..."
            icon={<MapPin className="w-4 h-4" />}
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Experience Levels</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior Level</option>
            <option value="Lead">Lead/Principal</option>
          </select>
        </div>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedCandidates.map((candidate, index) => {
          const matchScore = getSkillsMatchScore(candidate.skills || []);
          const experienceYears = getExperienceYears(candidate.experience || '');
          const notes = getCandidateNotes(candidate.id);
          const isSaved = isCandidateSaved(candidate.id);
          
          return (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover className="p-4 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {candidate.firstName} {candidate.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{candidate.email}</p>
                      {candidate.phone && (
                        <p className="text-sm text-gray-600">{candidate.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        if (isSaved) {
                          unsaveCandidate(candidate.id);
                        } else {
                          saveCandidate(candidate.id);
                        }
                      }}
                      className={`p-1 rounded transition-colors ${
                        isSaved 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      matchScore >= 80 ? 'bg-success-100 text-success-700' :
                      matchScore >= 60 ? 'bg-warning-100 text-warning-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {matchScore}% Match
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {candidate.bio && (
                    <p className="text-sm text-gray-700 line-clamp-2">{candidate.bio}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{candidate.experience || 'Not specified'}</span>
                    </div>
                    {experienceYears > 0 && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{experienceYears}+ years</span>
                      </div>
                    )}
                  </div>

                  {candidate.skills && candidate.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{candidate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {candidate.workExperience && candidate.workExperience.length > 0 && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {candidate.workExperience[0].position}
                      </p>
                      <p className="text-gray-600">{candidate.workExperience[0].company}</p>
                    </div>
                  )}

                  {notes.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                      <div className="flex items-center space-x-1 text-xs text-yellow-700">
                        <FileText className="w-3 h-3" />
                        <span>{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleViewProfile(candidate)}
                    icon={<Eye className="w-4 h-4" />}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessageCandidate(candidate.id)}
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Message
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {displayedCandidates.length === 0 && (
        <Card className="text-center py-12">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters
          </p>
        </Card>
      )}

      {/* Candidate Profile Modal */}
      {showProfile && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedCandidate.firstName} {selectedCandidate.lastName}
                      </h3>
                      <p className="text-gray-600">{selectedCandidate.email}</p>
                      {selectedCandidate.phone && (
                        <p className="text-gray-600">{selectedCandidate.phone}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm">
                          {selectedCandidate.experience || 'Experience not specified'}
                        </span>
                        <div className={`text-sm font-medium px-2 py-1 rounded ${
                          getSkillsMatchScore(selectedCandidate.skills || []) >= 80 ? 'bg-success-100 text-success-700' :
                          getSkillsMatchScore(selectedCandidate.skills || []) >= 60 ? 'bg-warning-100 text-warning-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {getSkillsMatchScore(selectedCandidate.skills || [])}% Match
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedCandidate.bio && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                      <p className="text-gray-700">{selectedCandidate.bio}</p>
                    </div>
                  )}

                  {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCandidate.workExperience && selectedCandidate.workExperience.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Work Experience</h4>
                      <div className="space-y-4">
                        {selectedCandidate.workExperience.map((exp, index) => (
                          <div key={index} className="border-l-4 border-primary-200 pl-4">
                            <h5 className="font-medium text-gray-900">{exp.position}</h5>
                            <p className="text-primary-600">{exp.company}</p>
                            <p className="text-sm text-gray-600">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </p>
                            {exp.description && (
                              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCandidate.education && selectedCandidate.education.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
                      <div className="space-y-3">
                        {selectedCandidate.education.map((edu, index) => (
                          <div key={index}>
                            <h5 className="font-medium text-gray-900">{edu.degree}</h5>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-sm text-gray-600">
                              {edu.fieldOfStudy} • {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Actions */}
                  <Card className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                    <div className="space-y-2">
                      <Button
                        fullWidth
                        onClick={() => handleMessageCandidate(selectedCandidate.id)}
                        icon={<MessageSquare className="w-4 h-4" />}
                      >
                        Send Message
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => handleSendEmail(selectedCandidate)}
                        icon={<Mail className="w-4 h-4" />}
                      >
                        Send Email
                      </Button>
                      {selectedCandidate.resumeFileName && (
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() => handleDownloadResume(selectedCandidate)}
                          icon={<Download className="w-4 h-4" />}
                        >
                          Download Resume
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => {
                          if (isCandidateSaved(selectedCandidate.id)) {
                            unsaveCandidate(selectedCandidate.id);
                          } else {
                            saveCandidate(selectedCandidate.id);
                          }
                        }}
                        icon={<Bookmark className="w-4 h-4" />}
                      >
                        {isCandidateSaved(selectedCandidate.id) ? 'Unsave' : 'Save'} Candidate
                      </Button>
                    </div>
                  </Card>

                  {/* Notes */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Notes</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNoteForm(!showNoteForm)}
                        icon={<Plus className="w-4 h-4" />}
                      >
                        Add
                      </Button>
                    </div>

                    {showNoteForm && (
                      <div className="mb-4">
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add a private note..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                        <div className="flex space-x-2 mt-2">
                          <Button
                            size="sm"
                            onClick={() => addNote(selectedCandidate.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowNoteForm(false);
                              setNewNote('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {getCandidateNotes(selectedCandidate.id).map((note) => (
                        <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{note.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                      {getCandidateNotes(selectedCandidate.id).length === 0 && (
                        <p className="text-sm text-gray-500">No notes yet</p>
                      )}
                    </div>
                  </Card>

                  {/* Resume Info */}
                  {selectedCandidate.resumeFileName && (
                    <Card className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Resume</h4>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selectedCandidate.resumeFileName}
                          </p>
                          <p className="text-xs text-gray-500">PDF Document</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDownloadResume(selectedCandidate)}
                          icon={<Download className="w-4 h-4" />} 
                        />
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CandidateDatabase;