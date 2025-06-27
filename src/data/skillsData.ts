import { SkillOption } from '../types';

export const skillsOptions: SkillOption[] = [
  // Programming Languages
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C++', label: 'C++' },
  { value: 'C#', label: 'C#' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Swift', label: 'Swift' },
  { value: 'Kotlin', label: 'Kotlin' },

  // Frontend Technologies
  { value: 'React', label: 'React' },
  { value: 'Vue.js', label: 'Vue.js' },
  { value: 'Angular', label: 'Angular' },
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'SASS', label: 'SASS' },
  { value: 'LESS', label: 'LESS' },
  { value: 'Bootstrap', label: 'Bootstrap' },
  { value: 'Tailwind CSS', label: 'Tailwind CSS' },
  { value: 'jQuery', label: 'jQuery' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Nuxt.js', label: 'Nuxt.js' },

  // Backend Technologies
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Express.js', label: 'Express.js' },
  { value: 'Django', label: 'Django' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'Laravel', label: 'Laravel' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'ASP.NET', label: 'ASP.NET' },

  // Databases
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'SQLite', label: 'SQLite' },
  { value: 'Redis', label: 'Redis' },
  { value: 'Elasticsearch', label: 'Elasticsearch' },

  // Cloud & DevOps
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'Google Cloud', label: 'Google Cloud' },
  { value: 'Docker', label: 'Docker' },
  { value: 'Kubernetes', label: 'Kubernetes' },
  { value: 'Jenkins', label: 'Jenkins' },
  { value: 'CI/CD', label: 'CI/CD' },
  { value: 'Terraform', label: 'Terraform' },

  // Design & UX
  { value: 'Figma', label: 'Figma' },
  { value: 'Sketch', label: 'Sketch' },
  { value: 'Adobe Creative Suite', label: 'Adobe Creative Suite' },
  { value: 'Photoshop', label: 'Photoshop' },
  { value: 'Illustrator', label: 'Illustrator' },
  { value: 'InDesign', label: 'InDesign' },
  { value: 'Prototyping', label: 'Prototyping' },
  { value: 'Wireframing', label: 'Wireframing' },
  { value: 'User Research', label: 'User Research' },
  { value: 'UX Design', label: 'UX Design' },
  { value: 'UI Design', label: 'UI Design' },

  // Other Technologies
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'REST API', label: 'REST API' },
  { value: 'Git', label: 'Git' },
  { value: 'GitHub', label: 'GitHub' },
  { value: 'GitLab', label: 'GitLab' },
  { value: 'Jira', label: 'Jira' },
  { value: 'Confluence', label: 'Confluence' },

  // Soft Skills
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Project Management', label: 'Project Management' },
  { value: 'Agile', label: 'Agile' },
  { value: 'Scrum', label: 'Scrum' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Problem Solving', label: 'Problem Solving' },
  { value: 'Team Collaboration', label: 'Team Collaboration' },
  { value: 'Critical Thinking', label: 'Critical Thinking' },
];

export const getSkillsByCategory = () => {
  return {
    'Programming Languages': skillsOptions.filter(skill => 
      ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin'].includes(skill.value)
    ),
    'Frontend': skillsOptions.filter(skill => 
      ['React', 'Vue.js', 'Angular', 'HTML', 'CSS', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS', 'jQuery', 'Next.js', 'Nuxt.js'].includes(skill.value)
    ),
    'Backend': skillsOptions.filter(skill => 
      ['Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET'].includes(skill.value)
    ),
    'Databases': skillsOptions.filter(skill => 
      ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Elasticsearch'].includes(skill.value)
    ),
    'Cloud & DevOps': skillsOptions.filter(skill => 
      ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform'].includes(skill.value)
    ),
    'Design & UX': skillsOptions.filter(skill => 
      ['Figma', 'Sketch', 'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'Prototyping', 'Wireframing', 'User Research', 'UX Design', 'UI Design'].includes(skill.value)
    ),
  };
};