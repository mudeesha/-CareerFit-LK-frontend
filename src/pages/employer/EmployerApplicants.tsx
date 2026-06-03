import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Search,
  FileText,
  BrainCircuit,
  CheckCircle,
  XCircle,
  Calendar } from
'lucide-react';
import { toast } from 'sonner';
import { mockJobs, mockCandidate, mockMatchResult } from '../../lib/mockData';
import { CandidateCVModal } from '../../components/CandidateCVModal';
import { MatchDetailsModal } from '../../components/MatchDetailsModal';
import { ScheduleInterviewModal } from '../../components/ScheduleInterviewModal';
export function EmployerApplicants() {
  const { jobId } = useParams();
  const job = mockJobs.find((j) => j.id === jobId) || mockJobs[0];
  const [applicants, setApplicants] = useState([
  {
    id: '1',
    candidate: mockCandidate,
    status: 'APPLIED',
    appliedDate: '2 days ago',
    matchScore: 92
  },
  {
    id: '2',
    candidate: {
      ...mockCandidate,
      name: 'Kasun Silva',
      expectedSalary: 120000
    },
    status: 'SHORTLISTED',
    appliedDate: '5 days ago',
    matchScore: 85
  },
  {
    id: '3',
    candidate: {
      ...mockCandidate,
      name: 'Amali Fernando',
      expectedSalary: 180000
    },
    status: 'APPLIED',
    appliedDate: '1 week ago',
    matchScore: 78
  }]
  );
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [modalState, setModalState] = useState<
    'none' | 'cv' | 'match' | 'schedule'>(
    'none');
  const handleShortlist = (id: string) => {
    setApplicants((apps) =>
    apps.map((app) =>
    app.id === id ?
    {
      ...app,
      status: 'SHORTLISTED'
    } :
    app
    )
    );
    toast.success('Candidate shortlisted.', {
      action: {
        label: 'Undo',
        onClick: () =>
        setApplicants((apps) =>
        apps.map((app) =>
        app.id === id ?
        {
          ...app,
          status: 'APPLIED'
        } :
        app
        )
        )
      }
    });
  };
  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this candidate?')) {
      setApplicants((apps) =>
      apps.map((app) =>
      app.id === id ?
      {
        ...app,
        status: 'REJECTED'
      } :
      app
      )
      );
      toast.success('Candidate rejected.', {
        action: {
          label: 'Undo',
          onClick: () =>
          setApplicants((apps) =>
          apps.map((app) =>
          app.id === id ?
          {
            ...app,
            status: 'APPLIED'
          } :
          app
          )
          )
        }
      });
    }
  };
  const handleScheduleSubmit = () => {
    if (selectedCandidate) {
      setApplicants((apps) =>
      apps.map((app) =>
      app.id === selectedCandidate.id ?
      {
        ...app,
        status: 'INTERVIEW_SCHEDULED'
      } :
      app
      )
      );
      toast.success('Interview scheduled successfully.');
      setModalState('none');
    }
  };
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Applicants for {job.title}
        </h1>
        <p className="text-gray-600">{applicants.length} applicants found</p>
      </div>

      <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-white/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none" />
            
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
              <option>Sort by Match Score</option>
              <option>Sort by Newest</option>
            </select>
            <select className="w-full sm:w-auto bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 outline-none">
              <option>All Statuses</option>
              <option>Applied</option>
              <option>Shortlisted</option>
              <option>Interviewing</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {applicants.map((app, index) =>
          <div
            key={app.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col lg:flex-row gap-6">
            
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden shrink-0">
                  <img
                  src={`https://i.pravatar.cc/150?img=${index + 11}`}
                  alt={app.candidate.name}
                  className="w-full h-full object-cover" />
                
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {app.candidate.name}
                    </h3>
                    <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${app.status === 'SHORTLISTED' ? 'bg-green-100 text-green-700' : app.status === 'INTERVIEW_SCHEDULED' ? 'bg-blue-100 text-blue-700' : app.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                    
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {app.candidate.location} • {app.candidate.experienceYears}+
                    years exp • LKR{' '}
                    {app.candidate.expectedSalary.toLocaleString()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {app.candidate.skills.slice(0, 4).map((skill) =>
                  <span
                    key={skill}
                    className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded">
                    
                        {skill}
                      </span>
                  )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center px-6 border-y lg:border-y-0 lg:border-x border-gray-100 py-4 lg:py-0 shrink-0">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {app.matchScore}%
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match Score
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 lg:w-48">
                <div className="flex gap-2">
                  <button
                  onClick={() => {
                    setSelectedCandidate(app);
                    setModalState('cv');
                  }}
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  
                    <FileText className="w-4 h-4" /> CV
                  </button>
                  <button
                  onClick={() => {
                    setSelectedCandidate(app);
                    setModalState('match');
                  }}
                  className="flex-1 bg-purple-50 border border-purple-100 text-purple-700 hover:bg-purple-100 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  
                    <BrainCircuit className="w-4 h-4" /> Match
                  </button>
                </div>

                {app.status === 'APPLIED' &&
              <div className="flex gap-2">
                    <button
                  onClick={() => handleShortlist(app.id)}
                  className="flex-1 bg-white border border-green-200 text-green-600 hover:bg-green-50 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  
                      <CheckCircle className="w-4 h-4" /> Shortlist
                    </button>
                    <button
                  onClick={() => handleReject(app.id)}
                  className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                  
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
              }

                {(app.status === 'SHORTLISTED' ||
              app.status === 'INTERVIEW_SCHEDULED') &&
              <button
                onClick={() => {
                  setSelectedCandidate(app);
                  setModalState('schedule');
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                
                    <Calendar className="w-4 h-4" />
                    {app.status === 'INTERVIEW_SCHEDULED' ?
                'Reschedule' :
                'Schedule Interview'}
                  </button>
              }
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCandidate &&
      <>
          <CandidateCVModal
          candidate={selectedCandidate.candidate}
          isOpen={modalState === 'cv'}
          onClose={() => setModalState('none')} />
        
          <MatchDetailsModal
          candidateName={selectedCandidate.candidate.name}
          jobTitle={job.title}
          matchResult={{
            ...mockMatchResult,
            overallScore: selectedCandidate.matchScore
          }}
          isOpen={modalState === 'match'}
          onClose={() => setModalState('none')} />
        
          <ScheduleInterviewModal
          candidateName={selectedCandidate.candidate.name}
          jobTitle={job.title}
          isOpen={modalState === 'schedule'}
          onClose={() => setModalState('none')}
          onSubmit={handleScheduleSubmit} />
        
        </>
      }
    </div>);

}