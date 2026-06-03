import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
export function CandidateCV() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const handleUpload = () => {
    toast.success('CV uploaded and analyzed successfully!');
    setIsUploaded(true);
  };
  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">CV Analysis</h1>
        <p className="text-gray-600">
          Upload your CV and get AI-powered career insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-8 text-center">
            {!isUploaded ?
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                  <UploadCloud className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Upload your CV
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  PDF or DOCX up to 5MB
                </p>
                <button
                onClick={handleUpload}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors">
                
                  Browse Files
                </button>
              </div> :

            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  nimal-perera-cv.pdf
                </h3>
                <p className="text-sm text-green-600 font-medium mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Uploaded successfully
                </p>
                <button
                onClick={() => setIsUploaded(false)}
                className="bg-white border border-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                
                  Upload New CV
                </button>
              </div>
            }
          </div>

          {isUploaded &&
          <div>
              <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
                {['Skills', 'Experience', 'Suggestions'].map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.toLowerCase() ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                
                    {tab}
                  </button>
              )}
              </div>

              <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6">
                {activeTab === 'skills' &&
              <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">
                        Extracted Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                    'React',
                    'Node.js',
                    'TypeScript',
                    'MongoDB',
                    'Express',
                    'Git'].
                    map((skill) =>
                    <span
                      key={skill}
                      className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      
                            {skill}
                          </span>
                    )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">
                        Missing High-Demand Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['AWS', 'Docker', 'GraphQL'].map((skill) =>
                    <span
                      key={skill}
                      className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      
                            {skill}
                          </span>
                    )}
                      </div>
                    </div>
                  </div>
              }

                {activeTab === 'experience' &&
              <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <div className="font-bold text-gray-900">
                        Software Engineer
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        Tech Solutions (Pvt) Ltd • 2020 - Present
                      </div>
                      <p className="text-sm text-gray-700">
                        Detected strong backend experience, but missing
                        measurable achievements.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                      <div className="font-bold text-gray-900">
                        Junior Developer
                      </div>
                      <div className="text-sm text-gray-500 mb-2">
                        Creative Labs • 2018 - 2020
                      </div>
                      <p className="text-sm text-gray-700">
                        Good progression shown. Consider adding specific project
                        impacts.
                      </p>
                    </div>
                  </div>
              }

                {activeTab === 'suggestions' &&
              <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Add measurable achievements
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Instead of "Worked on backend APIs", try using numbers
                        to show impact.
                      </p>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-sm">
                        <span className="font-medium text-purple-900">
                          Suggested rewrite:
                        </span>
                        <br />
                        "Developed REST APIs using Node.js, reducing response
                        time by 40% and supporting 10k+ daily active users."
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Add GitHub/Portfolio links
                      </h4>
                      <p className="text-sm text-gray-600">
                        Employers in Sri Lanka highly value visible code
                        samples. Add your GitHub profile to the header.
                      </p>
                    </div>
                  </div>
              }
              </div>
            </div>
          }
        </div>

        {/* Right Column: Score */}
        <div className="space-y-6">
          <div className="bg-[#F3F4F6] border border-gray-200 rounded-[20px] p-6 text-center">
            <h3 className="font-bold text-gray-900 mb-6">CV Strength Score</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36">
                
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3" />
                
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isUploaded ? '#16A34A' : '#9CA3AF'}
                  strokeWidth="3"
                  strokeDasharray={isUploaded ? '72, 100' : '0, 100'} />
                
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {isUploaded ? '72%' : '--'}
                </span>
              </div>
            </div>
            {isUploaded &&
            <div className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                Good
              </div>
            }
            <p className="text-sm text-gray-500">
              {isUploaded ?
              'Your CV is strong, but has room for improvement to reach top tier.' :
              'Upload your CV to see your score.'}
            </p>
          </div>

          {isUploaded &&
          <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Download Analysis Report
            </button>
          }
        </div>
      </div>
    </div>);

}