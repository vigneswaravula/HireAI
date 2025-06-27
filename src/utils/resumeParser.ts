import { ParsedResumeData, WorkExperience, Education } from '../types';

// Mock resume parsing function - in production, you'd use a real parser
export const parseResumeFile = async (file: File): Promise<ParsedResumeData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock parsed data based on file name for demo
      const fileName = file.name.toLowerCase();
      
      let mockData: ParsedResumeData = {
        skills: [],
        experience: [],
        education: [],
      };

      if (fileName.includes('john') || fileName.includes('developer')) {
        mockData = {
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          summary: 'Experienced frontend developer with 6+ years of experience building modern web applications.',
          skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'GraphQL', 'CSS', 'HTML', 'Git'],
          experience: [
            {
              id: '1',
              company: 'TechCorp Inc.',
              position: 'Senior Frontend Developer',
              startDate: '2021-01',
              endDate: '',
              current: true,
              description: 'Lead frontend development for multiple React applications, mentored junior developers, and implemented modern development practices.',
            },
            {
              id: '2',
              company: 'StartupXYZ',
              position: 'Frontend Developer',
              startDate: '2019-03',
              endDate: '2020-12',
              current: false,
              description: 'Developed responsive web applications using React and TypeScript, collaborated with design team to implement pixel-perfect UIs.',
            },
          ],
          education: [
            {
              id: '1',
              institution: 'University of California, Berkeley',
              degree: 'Bachelor of Science',
              fieldOfStudy: 'Computer Science',
              startYear: '2015',
              endYear: '2019',
              current: false,
            },
          ],
        };
      } else if (fileName.includes('sarah') || fileName.includes('designer')) {
        mockData = {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 987-6543',
          summary: 'Creative UX/UI designer with 5+ years of experience designing user-centered digital experiences.',
          skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing', 'HTML', 'CSS'],
          experience: [
            {
              id: '1',
              company: 'DesignStudio',
              position: 'Senior UX Designer',
              startDate: '2020-06',
              endDate: '',
              current: true,
              description: 'Lead UX design for mobile and web applications, conducted user research, and created design systems.',
            },
          ],
          education: [
            {
              id: '1',
              institution: 'Art Institute of California',
              degree: 'Bachelor of Fine Arts',
              fieldOfStudy: 'Graphic Design',
              startYear: '2016',
              endYear: '2020',
              current: false,
            },
          ],
        };
      } else {
        // Generic mock data
        mockData = {
          name: 'Professional Candidate',
          email: 'candidate@email.com',
          phone: '+1 (555) 000-0000',
          summary: 'Experienced professional with strong technical skills and proven track record.',
          skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'Agile'],
          experience: [
            {
              id: '1',
              company: 'Tech Company',
              position: 'Software Developer',
              startDate: '2020-01',
              endDate: '',
              current: true,
              description: 'Developed and maintained web applications using modern technologies.',
            },
          ],
          education: [
            {
              id: '1',
              institution: 'State University',
              degree: 'Bachelor of Science',
              fieldOfStudy: 'Computer Science',
              startYear: '2016',
              endYear: '2020',
              current: false,
            },
          ],
        };
      }

      resolve(mockData);
    }, 2000); // Simulate processing time
  });
};

// Extract skills from text (basic implementation)
export const extractSkillsFromText = (text: string): string[] => {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java',
    'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'HTML', 'CSS', 'SASS',
    'LESS', 'Bootstrap', 'Tailwind', 'jQuery', 'Express', 'Django', 'Flask', 'Spring',
    'Laravel', 'Rails', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST',
    'API', 'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Jenkins',
    'Figma', 'Sketch', 'Adobe', 'Photoshop', 'Illustrator', 'InDesign', 'Prototyping',
    'Wireframing', 'User Research', 'UX', 'UI', 'Design Systems', 'Agile', 'Scrum',
    'Project Management', 'Leadership', 'Communication', 'Problem Solving'
  ];

  const foundSkills: string[] = [];
  const textLower = text.toLowerCase();

  commonSkills.forEach(skill => {
    if (textLower.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  return [...new Set(foundSkills)]; // Remove duplicates
};