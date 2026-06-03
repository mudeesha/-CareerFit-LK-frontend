import {
  Company,
  Job,
  Category,
  Candidate,
  Application,
  MatchResult } from
'./types';

export const mockCompanies: Company[] = [
{
  id: 'c1',
  name: 'WSO2',
  logoText: 'WSO2',
  logoType: 'text',
  logoColor: '#F97316',
  industry: 'Software',
  location: 'Colombo',
  openJobs: 18,
  size: '500-1000',
  website: 'wso2.com',
  description: 'WSO2 is a global enterprise software company.'
},
{
  id: 'c2',
  name: 'Kandy Digital Labs',
  logoText: 'KD',
  logoType: 'initials',
  logoColor: '#7C3AED',
  industry: 'Software',
  location: 'Kandy',
  openJobs: 5,
  size: '50-100'
},
{
  id: 'c3',
  name: 'Colombo Tech Solutions',
  logoText: 'CT',
  logoType: 'initials',
  logoColor: '#2563EB',
  industry: 'Software',
  location: 'Colombo',
  openJobs: 6,
  size: '100-200'
},
{
  id: 'c4',
  name: 'LankaPay Digital Labs',
  logoText: 'LP',
  logoType: 'text',
  logoColor: '#1E40AF',
  industry: 'FinTech',
  location: 'Colombo',
  openJobs: 9,
  size: '200-500'
},
{
  id: 'c5',
  name: 'Dialog Innovation Hub',
  logoText: 'Dialog',
  logoType: 'text',
  logoColor: '#EF4444',
  industry: 'Telecommunications',
  location: 'Colombo',
  openJobs: 12,
  size: '1000+'
},
{
  id: 'c6',
  name: 'Commercial Bank',
  logoText: 'CB',
  logoType: 'initials',
  logoColor: '#0F766E',
  industry: 'Banking',
  location: 'Colombo',
  openJobs: 11,
  size: '1000+'
},
{
  id: 'c7',
  name: 'NDB Bank',
  logoText: 'NDB',
  logoType: 'text',
  logoColor: '#DC2626',
  industry: 'Banking',
  location: 'Colombo',
  openJobs: 9,
  size: '1000+'
},
{
  id: 'c8',
  name: 'Virtusa Sri Lanka',
  logoText: 'Virtusa',
  logoType: 'text',
  logoColor: '#0284C7',
  industry: 'IT Services',
  location: 'Colombo',
  openJobs: 24,
  size: '1000+'
},
{
  id: 'c9',
  name: 'MAS Digital',
  logoText: 'MAS',
  logoType: 'text',
  logoColor: '#4F46E5',
  industry: 'Apparel Technology',
  location: 'Colombo',
  openJobs: 14,
  size: '1000+'
},
{
  id: 'c10',
  name: 'Hemas HealthTech',
  logoText: 'HH',
  logoType: 'initials',
  logoColor: '#059669',
  industry: 'Healthcare',
  location: 'Colombo',
  openJobs: 8,
  size: '500-1000'
},
{
  id: 'c11',
  name: 'Galle FinTech Labs',
  logoText: 'GF',
  logoType: 'initials',
  logoColor: '#D97706',
  industry: 'Software',
  location: 'Galle',
  openJobs: 5,
  size: '10-50'
},
{
  id: 'c12',
  name: 'IFS',
  logoText: 'IFS',
  logoType: 'text',
  logoColor: '#6D28D9',
  industry: 'Software',
  location: 'Colombo',
  openJobs: 15,
  size: '1000+'
}];


export const mockJobs: Job[] = [
{
  id: 'j1',
  title: 'Senior Software Engineer',
  companyId: 'c1',
  location: 'Colombo',
  workMode: 'Hybrid',
  jobType: 'Full-time',
  salaryMin: 350000,
  salaryMax: 450000,
  skills: ['Java', 'Spring Boot', 'AWS'],
  preferredSkills: ['Docker', 'Kubernetes'],
  category: 'Software Engineering',
  experienceLevel: '5+ Years',
  postedDate: '2 days ago',
  matchScore: 92,
  status: 'ACTIVE',
  applicantCount: 45,
  description:
  'We are looking for an experienced Senior Software Engineer to join our core platform team.',
  responsibilities: [
  'Design and implement scalable APIs',
  'Mentor junior developers',
  'Participate in architecture reviews'],

  benefits: ['Health insurance', 'Flexible working hours', 'Training budget']
},
{
  id: 'j2',
  title: 'Frontend Developer Intern',
  companyId: 'c2',
  location: 'Kandy',
  workMode: 'On-site',
  jobType: 'Internship',
  salaryMin: 35000,
  salaryMax: 50000,
  skills: ['React', 'JavaScript', 'CSS'],
  category: 'Internships',
  experienceLevel: 'Entry Level',
  postedDate: '3 days ago',
  matchScore: 86,
  status: 'ACTIVE',
  applicantCount: 120
},
{
  id: 'j3',
  title: 'Junior Full Stack Developer',
  companyId: 'c3',
  location: 'Colombo',
  workMode: 'Hybrid',
  jobType: 'Full-time',
  salaryMin: 120000,
  salaryMax: 180000,
  skills: ['React', 'TypeScript', 'Node.js', 'REST API'],
  category: 'Software Engineering',
  experienceLevel: '1–2 Years',
  postedDate: '1 week ago',
  matchScore: 78,
  status: 'ACTIVE',
  applicantCount: 85
},
{
  id: 'j4',
  title: 'Finance Executive',
  companyId: 'c4',
  location: 'Colombo',
  workMode: 'On-site',
  jobType: 'Full-time',
  salaryMin: 90000,
  salaryMax: 140000,
  skills: ['Accounting', 'Excel', 'Reporting'],
  category: 'Accounting & Finance',
  experienceLevel: '1–2 Years',
  postedDate: '5 days ago',
  matchScore: 72,
  status: 'ACTIVE',
  applicantCount: 34
},
{
  id: 'j5',
  title: 'Customer Support Associate',
  companyId: 'c5',
  location: 'Colombo',
  workMode: 'Hybrid',
  jobType: 'Full-time',
  salaryMin: 65000,
  salaryMax: 95000,
  skills: ['English', 'Sinhala', 'CRM'],
  category: 'Customer Service',
  experienceLevel: 'Entry Level',
  postedDate: '1 day ago',
  matchScore: 81,
  status: 'ACTIVE',
  applicantCount: 210
},
{
  id: 'j6',
  title: 'Product Analyst',
  companyId: 'c5',
  location: 'Colombo',
  workMode: 'On-site',
  jobType: 'Full-time',
  salaryMin: 150000,
  salaryMax: 200000,
  skills: ['Product', 'Analytics', 'Excel'],
  category: 'Sales & Marketing',
  experienceLevel: '3–5 Years',
  postedDate: '2 weeks ago',
  matchScore: 88,
  status: 'ACTIVE',
  applicantCount: 42
},
{
  id: 'j7',
  title: 'UX Designer',
  companyId: 'c1',
  location: 'Colombo',
  workMode: 'Hybrid',
  jobType: 'Full-time',
  salaryMin: 160000,
  salaryMax: 220000,
  skills: ['Figma', 'UX Research', 'Prototyping'],
  category: 'Software Engineering',
  experienceLevel: '3–5 Years',
  postedDate: '4 days ago',
  matchScore: 85,
  status: 'ACTIVE',
  applicantCount: 67
},
{
  id: 'j8',
  title: 'Data Engineer',
  companyId: 'c5',
  location: 'Colombo',
  workMode: 'Hybrid',
  jobType: 'Full-time',
  salaryMin: 300000,
  salaryMax: 420000,
  skills: ['Python', 'SQL', 'BigQuery'],
  category: 'Software Engineering',
  experienceLevel: '5+ Years',
  postedDate: '1 week ago',
  matchScore: 85,
  status: 'ACTIVE',
  applicantCount: 28
},
{
  id: 'j9',
  title: 'Banking Operations Assistant',
  companyId: 'c6',
  location: 'Colombo',
  workMode: 'On-site',
  jobType: 'Full-time',
  salaryMin: 80000,
  salaryMax: 120000,
  skills: ['Banking', 'Excel', 'Reconciliation'],
  category: 'Banking',
  experienceLevel: '1–2 Years',
  postedDate: '3 days ago',
  matchScore: 74,
  status: 'ACTIVE',
  applicantCount: 156
},
{
  id: 'j10',
  title: 'Healthcare Support Coordinator',
  companyId: 'c10',
  location: 'Colombo',
  workMode: 'Hybrid',
  jobType: 'Full-time',
  salaryMin: 70000,
  salaryMax: 110000,
  skills: ['Healthcare', 'Customer Support', 'Sinhala'],
  category: 'Healthcare',
  experienceLevel: '1–2 Years',
  postedDate: '2 days ago',
  matchScore: 76,
  status: 'ACTIVE',
  applicantCount: 89
}].
map((j) => ({
  ...j,
  company: mockCompanies.find((c) => c.id === j.companyId)
}));

export const mockCategories: Category[] = [
{
  id: 'cat1',
  name: 'Software Engineering',
  jobCount: 420,
  iconName: 'Code',
  topSkills: ['React', 'Java', 'Python']
},
{
  id: 'cat2',
  name: 'Accounting & Finance',
  jobCount: 230,
  iconName: 'Calculator',
  topSkills: ['Excel', 'QuickBooks', 'Tax']
},
{
  id: 'cat3',
  name: 'Banking',
  jobCount: 180,
  iconName: 'Building2',
  topSkills: ['Operations', 'Credit Analysis', 'Customer Service']
},
{
  id: 'cat4',
  name: 'Customer Service',
  jobCount: 310,
  iconName: 'Headphones',
  topSkills: ['Communication', 'CRM', 'Problem Solving']
},
{
  id: 'cat5',
  name: 'Sales & Marketing',
  jobCount: 275,
  iconName: 'Megaphone',
  topSkills: ['Digital Marketing', 'B2B Sales', 'SEO']
},
{
  id: 'cat6',
  name: 'HR',
  jobCount: 95,
  iconName: 'Users',
  topSkills: ['Recruitment', 'Payroll', 'Employee Relations']
},
{
  id: 'cat7',
  name: 'Data Entry',
  jobCount: 140,
  iconName: 'Keyboard',
  topSkills: ['Typing', 'Accuracy', 'MS Office']
},
{
  id: 'cat8',
  name: 'Internships',
  jobCount: 360,
  iconName: 'GraduationCap',
  topSkills: ['Eagerness to learn', 'Basic IT skills']
},
{
  id: 'cat9',
  name: 'Hotel & Tourism',
  jobCount: 120,
  iconName: 'Briefcase',
  topSkills: ['Hospitality', 'Languages', 'Front Desk']
},
{
  id: 'cat10',
  name: 'Healthcare',
  jobCount: 155,
  iconName: 'HeartPulse',
  topSkills: ['Nursing', 'Patient Care', 'Pharmacy']
}];


export const mockCandidate: Candidate = {
  id: 'cand1',
  name: 'Nimal Perera',
  email: 'nimal.perera@example.com',
  phone: '+94 77 123 4567',
  location: 'Colombo',
  currentRole: 'Software Engineer',
  experienceYears: 5,
  expectedSalary: 150000,
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
  profileCompletion: 78
};

export const mockApplications: Application[] = [
{
  id: 'app1',
  jobId: 'j3',
  job: mockJobs.find((j) => j.id === 'j3'),
  candidateId: 'cand1',
  status: 'SHORTLISTED',
  appliedDate: '2 days ago',
  matchScore: 91,
  lastUpdated: '1 day ago'
},
{
  id: 'app2',
  jobId: 'j4',
  job: mockJobs.find((j) => j.id === 'j4'),
  candidateId: 'cand1',
  status: 'VIEWED',
  appliedDate: '3 days ago',
  matchScore: 88,
  lastUpdated: '2 days ago'
},
{
  id: 'app3',
  jobId: 'j5',
  job: mockJobs.find((j) => j.id === 'j5'),
  candidateId: 'cand1',
  status: 'SHORTLISTED',
  appliedDate: '1 week ago',
  matchScore: 90,
  lastUpdated: '3 days ago'
},
{
  id: 'app4',
  jobId: 'j6',
  job: mockJobs.find((j) => j.id === 'j6'),
  candidateId: 'cand1',
  status: 'INTERVIEW_SCHEDULED',
  appliedDate: '1 week ago',
  matchScore: 92,
  lastUpdated: '1 day ago'
},
{
  id: 'app5',
  jobId: 'j9',
  job: mockJobs.find((j) => j.id === 'j9'),
  candidateId: 'cand1',
  status: 'APPLIED',
  appliedDate: '2 weeks ago',
  matchScore: 84,
  lastUpdated: '2 weeks ago'
}];


export const mockMatchResult: MatchResult = {
  overallScore: 78,
  label: 'Good Match',
  readiness: 'Improve CV First',
  breakdown: {
    skills: 80,
    experience: 70,
    location: 80,
    salary: 75
  },
  matchedSkills: ['React', 'Node.js', 'REST API'],
  missingSkills: ['TypeScript', 'AWS Lambda', 'DynamoDB'],
  suggestions: [
  'Add a TypeScript project to your CV.',
  'Mention REST API integrations clearly.',
  'Build a small AWS Lambda + DynamoDB project.',
  'Add measurable achievements to your project descriptions.'],

  learningPath: [
  'TypeScript Basics',
  'AWS Lambda Fundamentals',
  'DynamoDB CRUD API',
  'Serverless Deployment']

};