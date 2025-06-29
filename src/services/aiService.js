// Mock AI service for generating course outlines
// In a real implementation, this would call an actual LLM API like OpenAI, Claude, or Gemini

const sampleModules = {
  'web development': [
    {
      title: 'HTML & CSS Fundamentals',
      description: 'Master the building blocks of web development with semantic HTML and modern CSS techniques.',
      lessons: [
        {
          title: 'HTML Structure and Semantics',
          description: 'Learn proper HTML document structure and semantic elements for accessibility and SEO.',
          keyConcepts: ['HTML5 semantic elements', 'Document structure', 'Accessibility best practices', 'SEO fundamentals'],
          activities: ['Build a personal portfolio page', 'HTML validation exercise', 'Accessibility audit checklist']
        },
        {
          title: 'CSS Styling and Layout',
          description: 'Master CSS fundamentals including selectors, properties, and layout techniques.',
          keyConcepts: ['CSS selectors and specificity', 'Box model', 'Flexbox and Grid', 'Responsive design'],
          activities: ['Style the portfolio page', 'Create responsive layouts', 'CSS Grid challenge']
        }
      ]
    },
    {
      title: 'JavaScript Programming',
      description: 'Develop interactive web applications with modern JavaScript programming concepts.',
      lessons: [
        {
          title: 'JavaScript Fundamentals',
          description: 'Learn core JavaScript concepts including variables, functions, and control structures.',
          keyConcepts: ['Variables and data types', 'Functions and scope', 'Control structures', 'DOM manipulation'],
          activities: ['Interactive calculator project', 'DOM manipulation exercises', 'Event handling practice']
        },
        {
          title: 'Asynchronous JavaScript',
          description: 'Master promises, async/await, and API integration for modern web development.',
          keyConcepts: ['Promises and async/await', 'Fetch API', 'Error handling', 'JSON data manipulation'],
          activities: ['Weather app with API integration', 'Async programming challenges', 'Error handling scenarios']
        }
      ]
    }
  ],
  'marketing': [
    {
      title: 'Digital Marketing Strategy',
      description: 'Develop comprehensive digital marketing strategies that drive results and ROI.',
      lessons: [
        {
          title: 'Market Research and Analysis',
          description: 'Learn to identify target audiences and analyze market opportunities.',
          keyConcepts: ['Customer personas', 'Market segmentation', 'Competitive analysis', 'SWOT analysis'],
          activities: ['Create detailed customer personas', 'Competitive analysis worksheet', 'Market opportunity assessment']
        },
        {
          title: 'Content Marketing Fundamentals',
          description: 'Master the art of creating engaging content that converts prospects into customers.',
          keyConcepts: ['Content strategy', 'Storytelling techniques', 'Content calendar planning', 'Performance metrics'],
          activities: ['Develop content strategy document', 'Create 30-day content calendar', 'Write compelling blog posts']
        }
      ]
    }
  ],
  'data science': [
    {
      title: 'Python for Data Analysis',
      description: 'Master Python programming fundamentals specifically for data science applications.',
      lessons: [
        {
          title: 'Python Basics and Data Structures',
          description: 'Learn Python syntax and data structures essential for data manipulation.',
          keyConcepts: ['Python syntax', 'Lists and dictionaries', 'Control flow', 'Functions and modules'],
          activities: ['Python coding exercises', 'Data structure manipulation tasks', 'Function writing practice']
        },
        {
          title: 'Data Manipulation with Pandas',
          description: 'Use Pandas library for efficient data cleaning and transformation.',
          keyConcepts: ['DataFrames and Series', 'Data cleaning techniques', 'Grouping and aggregation', 'Merging datasets'],
          activities: ['Clean messy dataset', 'Exploratory data analysis project', 'Data transformation challenges']
        }
      ]
    }
  ]
};

const generateRelevantModules = (title, targetAudience, learningObjectives) => {
  const titleLower = title.toLowerCase();
  
  // Determine course category based on title keywords
  let category = 'general';
  if (titleLower.includes('web') || titleLower.includes('html') || titleLower.includes('css') || titleLower.includes('javascript')) {
    category = 'web development';
  } else if (titleLower.includes('marketing') || titleLower.includes('seo') || titleLower.includes('social media')) {
    category = 'marketing';
  } else if (titleLower.includes('data') || titleLower.includes('python') || titleLower.includes('analytics')) {
    category = 'data science';
  }

  // Get base modules for the category
  let modules = [...(sampleModules[category] || sampleModules['web development'])];
  
  // Customize modules based on learning objectives
  modules = modules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      // Add objective-specific concepts
      keyConcepts: [
        ...lesson.keyConcepts,
        ...learningObjectives.slice(0, 2).map(obj => `Applied: ${obj.substring(0, 50)}...`)
      ].slice(0, 6),
      // Add audience-specific activities
      activities: [
        ...lesson.activities,
        `${targetAudience.split(' ')[0]} project: Apply concepts in real scenario`
      ].slice(0, 4)
    }))
  }));

  // Add a capstone module based on objectives
  const capstoneModule = {
    title: 'Capstone Project & Portfolio',
    description: 'Apply all learned concepts in a comprehensive project that demonstrates mastery.',
    lessons: [
      {
        title: 'Project Planning and Design',
        description: 'Plan and design a comprehensive project that showcases your new skills.',
        keyConcepts: ['Project planning', 'Requirements gathering', 'Design thinking', 'Success metrics'],
        activities: ['Create project proposal', 'Design project architecture', 'Set project milestones']
      },
      {
        title: 'Implementation and Presentation',
        description: 'Build your project and prepare a professional presentation of your work.',
        keyConcepts: ['Implementation best practices', 'Testing and debugging', 'Documentation', 'Presentation skills'],
        activities: ['Complete capstone project', 'Create project documentation', 'Present to peers/instructors']
      }
    ]
  };

  modules.push(capstoneModule);
  
  return modules;
};

export const generateCourseOutline = async (courseData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  const { title, targetAudience, learningObjectives } = courseData;
  
  // Generate modules based on course content
  const modules = generateRelevantModules(title, targetAudience, learningObjectives);
  
  return {
    title,
    targetAudience,
    learningObjectives,
    modules
  };
};