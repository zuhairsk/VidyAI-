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
];

// Courses
export const coursesData: Course[] = [
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
  }
];

// Lessons
export const lessonsData: Lesson[] = [
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
