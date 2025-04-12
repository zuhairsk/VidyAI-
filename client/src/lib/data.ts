// This file contains sample data for the frontend to use until backend integration is complete
// In a production environment, this data would come from API calls

import { Course, Lesson, Quiz, QuizQuestion, UserProgress, Achievement, UserAchievement } from "@shared/schema";

// Subjects 
export const subjectsData = [
  { id: 1, name: "Mathematics", code: "math", iconName: "calculate", colorClass: "blue" },
  { id: 2, name: "Science", code: "science", iconName: "science", colorClass: "green" },
  { id: 3, name: "Social Studies", code: "social", iconName: "public", colorClass: "yellow" },
  { id: 4, name: "Hindi", code: "hindi", iconName: "translate", colorClass: "red" },
  { id: 5, name: "English", code: "english", iconName: "auto_stories", colorClass: "purple" },
  { id: 6, name: "History", code: "history", iconName: "history_edu", colorClass: "yellow" },
  { id: 7, name: "Geography", code: "geography", iconName: "terrain", colorClass: "emerald" },
  { id: 8, name: "Civics", code: "civics", iconName: "account_balance", colorClass: "teal" },
  { id: 9, name: "Economics", code: "economics", iconName: "attach_money", colorClass: "amber" },
  { id: 10, name: "Computer Science", code: "computer", iconName: "computer", colorClass: "blue" },
  { id: 11, name: "Art & Craft", code: "art", iconName: "palette", colorClass: "pink" },
  { id: 12, name: "Physical Education", code: "pe", iconName: "fitness_center", colorClass: "green" },
];

// Courses - Expanded with courses from grades 1-12
export const coursesData: Course[] = [
  // Grade 1 Courses
  {
    id: 101,
    title: "Numbers & Counting",
    description: "Learn to count from 1 to 100 with interactive exercises and fun games.",
    subjectId: 1, // Mathematics
    gradeLevel: 1,
    imageUrl: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 8,
    durationMinutes: 160,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 102,
    title: "Basic Hindi Alphabet",
    description: "Introduction to Hindi alphabets with pronunciation guides and writing practice.",
    subjectId: 4, // Hindi
    gradeLevel: 1,
    imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 10,
    durationMinutes: 200,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 2 Courses
  {
    id: 201,
    title: "Addition & Subtraction",
    description: "Learn basic addition and subtraction with numbers up to 100.",
    subjectId: 1, // Mathematics
    gradeLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 10,
    durationMinutes: 200,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 202,
    title: "Plants & Animals",
    description: "Discover the world of plants and animals around us.",
    subjectId: 2, // Science
    gradeLevel: 2,
    imageUrl: "https://images.unsplash.com/photo-1504198266287-1659872e6590?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 8,
    durationMinutes: 160,
    featured: true,
    createdAt: new Date()
  },
  
  // Grade 3 Courses
  {
    id: 301,
    title: "Multiplication Basics",
    description: "Learn multiplication tables and basic multiplication concepts.",
    subjectId: 1, // Mathematics
    gradeLevel: 3,
    imageUrl: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 12,
    durationMinutes: 240,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 302,
    title: "My Community",
    description: "Learn about different community helpers and their roles.",
    subjectId: 3, // Social Studies
    gradeLevel: 3,
    imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 6,
    durationMinutes: 120,
    featured: true,
    createdAt: new Date()
  },
  
  // Grade 4 Courses (including existing course)
  {
    id: 7,
    title: "Creative Hindi Writing",
    description: "Enhance your Hindi writing skills through creative storytelling and poetry.",
    subjectId: 4, // Hindi
    gradeLevel: 4,
    imageUrl: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 6,
    durationMinutes: 180,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 401,
    title: "Fractions & Decimals",
    description: "Introduction to fractions and decimals with real-world applications.",
    subjectId: 1, // Mathematics
    gradeLevel: 4,
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 10,
    durationMinutes: 200,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 5 Courses (including existing courses)
  {
    id: 1,
    title: "Introduction to Fractions",
    description: "Learn the basics of fractions and how to work with them.",
    subjectId: 1, // Mathematics
    gradeLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80",
    totalLessons: 8,
    durationMinutes: 240,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Our Solar System",
    description: "Explore the planets, moons, and other objects in our solar system.",
    subjectId: 2, // Science
    gradeLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80",
    totalLessons: 10,
    durationMinutes: 300,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Hindi Grammar Essentials",
    description: "Master the fundamentals of Hindi grammar rules and usage.",
    subjectId: 4, // Hindi
    gradeLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1582921221088-a57ced19c708?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80",
    totalLessons: 12,
    durationMinutes: 360,
    featured: false,
    createdAt: new Date()
  },
  {
    id: 4,
    title: "Algebra Fundamentals",
    description: "Master the basics of algebra with interactive lessons and practice problems.",
    subjectId: 1, // Mathematics
    gradeLevel: 5,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 10,
    durationMinutes: 300,
    featured: true,
    createdAt: new Date()
  },
  
  // Grade 6 Courses (including existing courses)
  {
    id: 5,
    title: "Human Body Systems",
    description: "Explore the amazing systems of the human body through interactive 3D models.",
    subjectId: 2, // Science
    gradeLevel: 6,
    imageUrl: "https://images.unsplash.com/photo-1536094908688-b3d7ea7d064e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 8,
    durationMinutes: 240,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 601,
    title: "Introduction to Geometry",
    description: "Learn about basic geometric shapes, angles, and their properties.",
    subjectId: 1, // Mathematics
    gradeLevel: 6,
    imageUrl: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 12,
    durationMinutes: 300,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 7 Courses (including existing course)
  {
    id: 6,
    title: "Ancient Indian Civilizations",
    description: "Journey through the rich history of ancient Indian civilizations with virtual tours.",
    subjectId: 6, // History
    gradeLevel: 7,
    imageUrl: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 12,
    durationMinutes: 360,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 701,
    title: "Climate & Weather Patterns",
    description: "Understand weather patterns, climate zones, and environmental impacts.",
    subjectId: 2, // Science
    gradeLevel: 7,
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 10,
    durationMinutes: 300,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 8 Courses
  {
    id: 801,
    title: "Algebra & Linear Equations",
    description: "Solve linear equations and understand algebraic concepts in depth.",
    subjectId: 1, // Mathematics
    gradeLevel: 8,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80", 
    totalLessons: 15,
    durationMinutes: 450,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 802,
    title: "Cell Biology",
    description: "Explore the structure and function of cells, the building blocks of life.",
    subjectId: 2, // Science
    gradeLevel: 8,
    imageUrl: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 12,
    durationMinutes: 360,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 9 Courses
  {
    id: 901,
    title: "Quadratic Equations",
    description: "Master quadratic equations and their applications in real-world scenarios.",
    subjectId: 1, // Mathematics
    gradeLevel: 9,
    imageUrl: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 14,
    durationMinutes: 420,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 902,
    title: "Economics Basics",
    description: "Learn fundamental economic concepts and their impact on society.",
    subjectId: 9, // Economics
    gradeLevel: 9,
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 10,
    durationMinutes: 300,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 10 Courses
  {
    id: 1001,
    title: "Trigonometry",
    description: "Understand trigonometric functions and solve complex problems.",
    subjectId: 1, // Mathematics
    gradeLevel: 10,
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 16,
    durationMinutes: 480,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 1002,
    title: "Chemical Reactions",
    description: "Explore different types of chemical reactions and their real-world applications.",
    subjectId: 2, // Science
    gradeLevel: 10,
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 14,
    durationMinutes: 420,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 11 Courses 
  {
    id: 1101,
    title: "Calculus Fundamentals",
    description: "Introduction to differential and integral calculus with practical applications.",
    subjectId: 1, // Mathematics
    gradeLevel: 11,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 20,
    durationMinutes: 600,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 1102,
    title: "Physics: Motion & Energy",
    description: "Understand the laws of motion, energy conservation, and mechanical systems.",
    subjectId: 2, // Science
    gradeLevel: 11,
    imageUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 18,
    durationMinutes: 540,
    featured: false,
    createdAt: new Date()
  },
  
  // Grade 12 Courses
  {
    id: 1201,
    title: "Advanced Calculus",
    description: "Higher-level calculus concepts for college preparation and competitive exams.",
    subjectId: 1, // Mathematics
    gradeLevel: 12,
    imageUrl: "https://images.unsplash.com/photo-1580894732930-0babd100d356?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 22,
    durationMinutes: 660,
    featured: true,
    createdAt: new Date()
  },
  {
    id: 1202,
    title: "Computer Programming",
    description: "Learn the basics of programming with practical coding projects.",
    subjectId: 10, // Computer Science
    gradeLevel: 12,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
    totalLessons: 16,
    durationMinutes: 480,
    featured: true,
    createdAt: new Date()
  }
];

// Lessons with videos and PDFs (expanded)
export const lessonsData: Lesson[] = [
  // Grade 1 - Numbers & Counting Course (id: 101)
  {
    id: 1001,
    title: "Counting from 1 to 10",
    description: "Learn to count objects from 1 to 10 with fun visuals.",
    courseId: 101,
    videoUrl: "https://www.youtube.com/watch?v=DR-cfDsHCGA",
    pdfUrl: "https://www.education.com/download/worksheet/174412/counting-1-10.pdf",
    order: 1,
    durationMinutes: 20
  },
  {
    id: 1002,
    title: "Counting from 10 to 20",
    description: "Continue your counting journey from 10 to 20.",
    courseId: 101,
    videoUrl: "https://www.youtube.com/watch?v=xNw1SSz18Gg",
    pdfUrl: "https://www.education.com/download/worksheet/174418/counting-10-20.pdf",
    order: 2,
    durationMinutes: 20
  },
  
  // Grade 2 - Addition & Subtraction Course (id: 201)
  {
    id: 2001,
    title: "Basic Addition",
    description: "Learn to add single-digit numbers using visual aids.",
    courseId: 201,
    videoUrl: "https://www.youtube.com/watch?v=AaxrqDuw1Xk",
    pdfUrl: "https://www.math-drills.com/addition/addition_single_digit_0109_001.pdf",
    order: 1,
    durationMinutes: 20
  },
  {
    id: 2002,
    title: "Basic Subtraction",
    description: "Learn to subtract single-digit numbers with examples.",
    courseId: 201,
    videoUrl: "https://www.youtube.com/watch?v=BkSO95jlMjs",
    pdfUrl: "https://www.math-drills.com/subtraction/subtraction_single_digit_0109_001.pdf",
    order: 2,
    durationMinutes: 20
  },
  
  // Existing Grade 5 Lessons - Introduction to Fractions (id: 1)
  {
    id: 1,
    title: "What are Fractions?",
    description: "An introduction to the concept of fractions.",
    courseId: 1,
    videoUrl: "https://www.youtube.com/watch?v=kn-lpXCwUS8",
    pdfUrl: "https://www.math.com/school/pdf/fractions.pdf",
    order: 1,
    durationMinutes: 30
  },
  {
    id: 2,
    title: "Equivalent Fractions",
    description: "Learn about fractions that represent the same amount.",
    courseId: 1,
    videoUrl: "https://www.youtube.com/watch?v=qcHHhd6HizI",
    pdfUrl: "https://www.math.com/school/pdf/equivalent_fractions.pdf",
    order: 2,
    durationMinutes: 30
  },
  {
    id: 3,
    title: "Adding Fractions",
    description: "Learn how to add fractions with the same and different denominators.",
    courseId: 1,
    videoUrl: "https://www.youtube.com/watch?v=5juto2ze8Lg",
    pdfUrl: "https://www.math.com/school/pdf/adding_fractions.pdf",
    order: 3,
    durationMinutes: 30
  },
  
  // Existing Grade 5 - Our Solar System (id: 2)
  {
    id: 4,
    title: "Introduction to Our Solar System",
    description: "An overview of our solar system and its components.",
    courseId: 2,
    videoUrl: "https://www.youtube.com/watch?v=libKVRa01L8",
    pdfUrl: "https://www.nasa.gov/pdf/solar_system_for_kids.pdf",
    order: 1,
    durationMinutes: 30
  },
  {
    id: 5,
    title: "The Sun: Our Star",
    description: "Learn about the Sun, the center of our solar system.",
    courseId: 2,
    videoUrl: "https://www.youtube.com/watch?v=6FB0pDpUxyM",
    pdfUrl: "https://www.nasa.gov/pdf/the_sun.pdf",
    order: 2,
    durationMinutes: 30
  },
  
  // Grade 9 - Quadratic Equations (id: 901)
  {
    id: 9001,
    title: "Introduction to Quadratic Equations",
    description: "Learn what quadratic equations are and their standard form.",
    courseId: 901,
    videoUrl: "https://www.youtube.com/watch?v=qeByhTF8sEU",
    pdfUrl: "https://www.mathworksheets4kids.com/quadratic-equation/standard-form/writing-1.pdf",
    order: 1,
    durationMinutes: 30
  },
  {
    id: 9002,
    title: "Solving by Factoring",
    description: "Learn to solve quadratic equations using factoring techniques.",
    courseId: 901,
    videoUrl: "https://www.youtube.com/watch?v=S-SnepCnc4Y",
    pdfUrl: "https://www.mathworksheets4kids.com/quadratic-equation/factoring/solving-1.pdf",
    order: 2,
    durationMinutes: 30
  },
  
  // Grade 12 - Computer Programming (id: 1202)
  {
    id: 12001,
    title: "Introduction to Programming Concepts",
    description: "Learn basic programming concepts like variables, functions, and loops.",
    courseId: 1202,
    videoUrl: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
    pdfUrl: "https://launchschool.com/books/programming/read/introduction",
    order: 1,
    durationMinutes: 30
  },
  {
    id: 12002,
    title: "Your First Program",
    description: "Write your first program and understand how it works.",
    courseId: 1202,
    videoUrl: "https://www.youtube.com/watch?v=DWWQEmyVplU",
    pdfUrl: "https://launchschool.com/books/javascript/read/preparations",
    order: 2,
    durationMinutes: 30
  },
  
  // Grade 11 - Calculus Fundamentals (id: 1101)
  {
    id: 11001,
    title: "Introduction to Limits",
    description: "Understanding the concept of limits in calculus.",
    courseId: 1101,
    videoUrl: "https://www.youtube.com/watch?v=riXcZT2ICjA",
    pdfUrl: "https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_Limits.pdf",
    order: 1,
    durationMinutes: 30
  },
  {
    id: 11002,
    title: "Derivatives: The Basics",
    description: "Learn what derivatives are and how to find them.",
    courseId: 1101,
    videoUrl: "https://www.youtube.com/watch?v=O8xoEKvQmcg",
    pdfUrl: "https://tutorial.math.lamar.edu/pdf/Calculus_Cheat_Sheet_Derivatives.pdf",
    order: 2,
    durationMinutes: 30
  }
];

// Quizzes
export const quizzesData: Quiz[] = [
  {
    id: 1,
    title: "Algebra Basics Quiz",
    description: "Test your knowledge of basic algebra concepts.",
    subjectId: 1, // Mathematics
    gradeLevel: 6,
    durationMinutes: 20,
    questionCount: 15,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Human Body Systems Quiz",
    description: "Test your knowledge of human body systems.",
    subjectId: 2, // Science
    gradeLevel: 6,
    durationMinutes: 15,
    questionCount: 12,
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Ancient Indian Civilizations Quiz",
    description: "Test your knowledge of ancient Indian civilizations.",
    subjectId: 6, // History
    gradeLevel: 7,
    durationMinutes: 15,
    questionCount: 10,
    createdAt: new Date()
  },
  {
    id: 4,
    title: "Hindi Grammar Quiz",
    description: "Test your knowledge of Hindi grammar.",
    subjectId: 4, // Hindi
    gradeLevel: 5,
    durationMinutes: 25,
    questionCount: 15,
    createdAt: new Date()
  },
  {
    id: 5,
    title: "English Comprehension Quiz",
    description: "Test your English reading comprehension skills.",
    subjectId: 5, // English
    gradeLevel: 5,
    durationMinutes: 20,
    questionCount: 8,
    createdAt: new Date()
  }
];

// Quiz Questions
export const mathQuizData: { questions: QuizQuestion[] } = {
  questions: [
    {
      id: 1,
      quizId: 1,
      questionText: "What is the result of adding 1/4 and 2/4?",
      options: [
        { id: 'a', text: '1/2' },
        { id: 'b', text: '3/4' },
        { id: 'c', text: '3/8' },
        { id: 'd', text: '2/8' }
      ],
      correctOptionIndex: "b",
      explanation: "When adding fractions with the same denominator, you simply add the numerators and keep the denominator the same. So 1/4 + 2/4 = (1+2)/4 = 3/4.",
      order: 1
    },
    {
      id: 2,
      quizId: 1,
      questionText: "Which fraction is equivalent to 0.5?",
      options: [
        { id: 'a', text: '1/5' },
        { id: 'b', text: '5/10' },
        { id: 'c', text: '1/2' },
        { id: 'd', text: '2/5' }
      ],
      correctOptionIndex: "c",
      explanation: "0.5 is equal to 5/10, which simplifies to 1/2.",
      order: 2
    },
    {
      id: 3,
      quizId: 1,
      questionText: "What is 2/3 of 18?",
      options: [
        { id: 'a', text: '6' },
        { id: 'b', text: '9' },
        { id: 'c', text: '12' },
        { id: 'd', text: '13' }
      ],
      correctOptionIndex: "c",
      explanation: "To find 2/3 of 18, multiply 18 by 2/3. 18 × 2/3 = 12.",
      order: 3
    },
    {
      id: 4,
      quizId: 1,
      questionText: "Which fraction is greater than 3/4?",
      options: [
        { id: 'a', text: '5/8' },
        { id: 'b', text: '7/10' },
        { id: 'c', text: '4/5' },
        { id: 'd', text: '2/3' }
      ],
      correctOptionIndex: "c",
      explanation: "Converting to a common denominator of 20: 3/4 = 15/20, 5/8 = 12.5/20, 7/10 = 14/20, 4/5 = 16/20, 2/3 = 13.33/20. Therefore 4/5 is the greatest.",
      order: 4
    },
    {
      id: 5,
      quizId: 1,
      questionText: "What is the result of (1/2) ÷ (1/4)?",
      options: [
        { id: 'a', text: '1/8' },
        { id: 'b', text: '1/2' },
        { id: 'c', text: '2' },
        { id: 'd', text: '4' }
      ],
      correctOptionIndex: "c",
      explanation: "When dividing fractions, multiply by the reciprocal. So (1/2) ÷ (1/4) = (1/2) × (4/1) = 4/2 = 2.",
      order: 5
    }
  ]
};

// User Progress
export const userProgressData: UserProgress[] = [
  {
    id: 1,
    userId: 1,
    courseId: 1,
    lessonsCompleted: 2,
    lastLessonId: 2,
    completed: false,
    percentComplete: 25,
    lastAccessed: new Date()
  },
  {
    id: 2,
    userId: 1,
    courseId: 2,
    lessonsCompleted: 6,
    lastLessonId: 6,
    completed: false,
    percentComplete: 60,
    lastAccessed: new Date()
  }
];

// Achievements
export const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "First Quiz",
    description: "Completed your first quiz",
    iconName: "emoji_events",
    colorClass: "yellow",
    criteria: {
      type: "quiz_completion",
      count: 1
    }
  },
  {
    id: 2,
    title: "Knowledge Seeker",
    description: "Completed 5 courses",
    iconName: "school",
    colorClass: "green",
    criteria: {
      type: "course_completion",
      count: 5
    }
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Got 100% on a quiz",
    iconName: "stars",
    colorClass: "blue",
    criteria: {
      type: "quiz_score",
      score: 100
    }
  },
  {
    id: 4,
    title: "Week Warrior",
    description: "Studied for 7 days in a row",
    iconName: "local_fire_department",
    colorClass: "red",
    criteria: {
      type: "streak",
      days: 7
    }
  }
];

// User Achievements
export const userAchievementsData: UserAchievement[] = [
  {
    id: 1,
    userId: 1,
    achievementId: 1,
    earnedAt: new Date('2023-10-15')
  },
  {
    id: 2,
    userId: 1,
    achievementId: 2,
    earnedAt: new Date('2023-11-02')
  },
  {
    id: 3,
    userId: 1,
    achievementId: 3,
    earnedAt: new Date('2023-11-10')
  },
  {
    id: 4,
    userId: 1,
    achievementId: 4,
    earnedAt: new Date('2023-11-20')
  }
];

// User Stats
export const userStatsData = {
  quizzesCompleted: 12,
  coursesCompleted: 5,
  coursesInProgress: 3,
  totalLessonTime: 1240, // in minutes
  longestStreak: 14, // days
  currentStreak: 7, // days
};

// Get courses by subject
export function getCoursesBySubject(subjectId: number): Course[] {
  return coursesData.filter(course => course.subjectId === subjectId);
}

// Get courses by grade
export function getCoursesByGrade(gradeLevel: number): Course[] {
  return coursesData.filter(course => course.gradeLevel === gradeLevel);
}

// Get featured courses
export function getFeaturedCourses(): Course[] {
  return coursesData.filter(course => course.featured);
}

// Get lessons by course
export function getLessonsByCourse(courseId: number): Lesson[] {
  return lessonsData.filter(lesson => lesson.courseId === courseId)
    .sort((a, b) => a.order - b.order);
}
