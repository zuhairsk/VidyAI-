import {
  users, type User, type InsertUser,
  subjects, type Subject, type InsertSubject,
  courses, type Course, type InsertCourse,
  lessons, type Lesson, type InsertLesson,
  userProgress, type UserProgress, type InsertUserProgress,
  quizzes, type Quiz, type InsertQuiz,
  quizQuestions, type QuizQuestion, type InsertQuizQuestion,
  quizResults, type QuizResult, type InsertQuizResult,
  achievements, type Achievement, type InsertAchievement,
  userAchievements, type UserAchievement, type InsertUserAchievement
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subjects
  getSubject(id: number): Promise<Subject | undefined>;
  getAllSubjects(): Promise<Subject[]>;
  
  // Courses
  getCourse(id: number): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  getCoursesBySubject(subjectId: number): Promise<Course[]>;
  getCoursesByGrade(gradeLevel: number): Promise<Course[]>;
  getCoursesBySubjectAndGrade(subjectId: number, gradeLevel: number): Promise<Course[]>;
  getFeaturedCourses(): Promise<Course[]>;
  
  // Lessons
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  
  // User Progress
  getUserProgress(id: number): Promise<UserProgress | undefined>;
  getUserProgressByCourse(userId: number, courseId: number): Promise<UserProgress | undefined>;
  getUserProgressByUser(userId: number): Promise<UserProgress[]>;
  createOrUpdateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Quizzes
  getQuiz(id: number): Promise<Quiz | undefined>;
  getAllQuizzes(): Promise<Quiz[]>;
  getQuizzesBySubject(subjectId: number): Promise<Quiz[]>;
  getQuizzesByGrade(gradeLevel: number): Promise<Quiz[]>;
  getQuizzesBySubjectAndGrade(subjectId: number, gradeLevel: number): Promise<Quiz[]>;
  
  // Quiz Questions
  getQuizQuestion(id: number): Promise<QuizQuestion | undefined>;
  getQuizQuestions(quizId: number): Promise<QuizQuestion[]>;
  
  // Quiz Results
  getQuizResult(id: number): Promise<QuizResult | undefined>;
  getQuizResultsByUser(userId: number): Promise<QuizResult[]>;
  getQuizResultsByQuiz(quizId: number): Promise<QuizResult[]>;
  getUserQuizResults(userId: number): Promise<QuizResult[]>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  
  // Achievements
  getAchievement(id: number): Promise<Achievement | undefined>;
  getAllAchievements(): Promise<Achievement[]>;
  
  // User Achievements
  getUserAchievement(id: number): Promise<UserAchievement | undefined>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
}

export class MemStorage implements IStorage {
  private userMap: Map<number, User>;
  private subjectMap: Map<number, Subject>;
  private courseMap: Map<number, Course>;
  private lessonMap: Map<number, Lesson>;
  private userProgressMap: Map<number, UserProgress>;
  private quizMap: Map<number, Quiz>;
  private quizQuestionMap: Map<number, QuizQuestion>;
  private quizResultMap: Map<number, QuizResult>;
  private achievementMap: Map<number, Achievement>;
  private userAchievementMap: Map<number, UserAchievement>;
  
  private currentIds: {
    user: number;
    subject: number;
    course: number;
    lesson: number;
    userProgress: number;
    quiz: number;
    quizQuestion: number;
    quizResult: number;
    achievement: number;
    userAchievement: number;
  };

  constructor() {
    this.userMap = new Map();
    this.subjectMap = new Map();
    this.courseMap = new Map();
    this.lessonMap = new Map();
    this.userProgressMap = new Map();
    this.quizMap = new Map();
    this.quizQuestionMap = new Map();
    this.quizResultMap = new Map();
    this.achievementMap = new Map();
    this.userAchievementMap = new Map();
    
    this.currentIds = {
      user: 1,
      subject: 1,
      course: 1,
      lesson: 1,
      userProgress: 1,
      quiz: 1,
      quizQuestion: 1,
      quizResult: 1,
      achievement: 1,
      userAchievement: 1
    };
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Initialize sample data
  private initSampleData() {
    // Add subjects
    const mathSubject = this.createSubjectInternal({
      name: "Mathematics",
      code: "math",
      iconName: "calculate",
      colorClass: "blue"
    });
    
    const scienceSubject = this.createSubjectInternal({
      name: "Science",
      code: "science",
      iconName: "science",
      colorClass: "green"
    });
    
    const hindiSubject = this.createSubjectInternal({
      name: "Hindi",
      code: "hindi",
      iconName: "translate",
      colorClass: "red"
    });
    
    const socialSubject = this.createSubjectInternal({
      name: "Social Studies",
      code: "social",
      iconName: "public",
      colorClass: "yellow"
    });
    
    const englishSubject = this.createSubjectInternal({
      name: "English",
      code: "english",
      iconName: "auto_stories",
      colorClass: "purple"
    });
    
    const historySubject = this.createSubjectInternal({
      name: "History",
      code: "history",
      iconName: "history_edu",
      colorClass: "yellow"
    });
    
    const geographySubject = this.createSubjectInternal({
      name: "Geography",
      code: "geography",
      iconName: "terrain",
      colorClass: "emerald"
    });
    
    const civicsSubject = this.createSubjectInternal({
      name: "Civics",
      code: "civics",
      iconName: "account_balance",
      colorClass: "teal"
    });
    
    const economicsSubject = this.createSubjectInternal({
      name: "Economics",
      code: "economics",
      iconName: "attach_money",
      colorClass: "amber"
    });
    
    // Add courses
    const mathCourse = this.createCourseInternal({
      title: "Introduction to Fractions",
      description: "Learn the basics of fractions and how to work with them.",
      subjectId: mathSubject.id,
      gradeLevel: 5,
      imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80",
      totalLessons: 8,
      durationMinutes: 240,
      featured: false
    });
    
    const scienceCourse = this.createCourseInternal({
      title: "Our Solar System",
      description: "Explore the planets, moons, and other objects in our solar system.",
      subjectId: scienceSubject.id,
      gradeLevel: 5,
      imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80",
      totalLessons: 10,
      durationMinutes: 300,
      featured: false
    });
    
    const hindiCourse = this.createCourseInternal({
      title: "Hindi Grammar Essentials",
      description: "Master the fundamentals of Hindi grammar rules and usage.",
      subjectId: hindiSubject.id,
      gradeLevel: 5,
      imageUrl: "https://images.unsplash.com/photo-1582921221088-a57ced19c708?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=220&q=80",
      totalLessons: 12,
      durationMinutes: 360,
      featured: false
    });
    
    // Featured courses for recommendations
    this.createCourseInternal({
      title: "Algebra Fundamentals",
      description: "Master the basics of algebra with interactive lessons and practice problems.",
      subjectId: mathSubject.id,
      gradeLevel: 5,
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80",
      totalLessons: 10,
      durationMinutes: 300,
      featured: true
    });
    
    this.createCourseInternal({
      title: "Human Body Systems",
      description: "Explore the amazing systems of the human body through interactive 3D models.",
      subjectId: scienceSubject.id,
      gradeLevel: 6,
      imageUrl: "https://images.unsplash.com/photo-1536094908688-b3d7ea7d064e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=350&q=80",
      totalLessons: 8,
      durationMinutes: 240,
      featured: true
    });
    
    this.createCourseInternal({
      title: "Ancient Indian Civilizations",
      description: "Journey through the rich history of ancient Indian civilizations with virtual tours.",
      subjectId: historySubject.id,
      gradeLevel: 7,
      imageUrl: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
      totalLessons: 12,
      durationMinutes: 360,
      featured: true
    });
    
    this.createCourseInternal({
      title: "Creative Hindi Writing",
      description: "Enhance your Hindi writing skills through creative storytelling and poetry.",
      subjectId: hindiSubject.id,
      gradeLevel: 4,
      imageUrl: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
      totalLessons: 6,
      durationMinutes: 180,
      featured: true
    });
    
    // Add lessons for math course
    this.createLessonInternal({
      title: "What are Fractions?",
      description: "An introduction to the concept of fractions.",
      courseId: mathCourse.id,
      videoUrl: "https://www.youtube.com/watch?v=kn-lpXCwUS8",
      pdfUrl: "https://www.math.com/school/pdf/fractions.pdf",
      order: 1,
      durationMinutes: 30
    });
    
    this.createLessonInternal({
      title: "Equivalent Fractions",
      description: "Learn about fractions that represent the same amount.",
      courseId: mathCourse.id,
      videoUrl: "https://www.youtube.com/watch?v=qcHHhd6HizI",
      pdfUrl: "https://www.math.com/school/pdf/equivalent_fractions.pdf",
      order: 2,
      durationMinutes: 30
    });
    
    // Add lessons for science course
    this.createLessonInternal({
      title: "Introduction to Our Solar System",
      description: "An overview of our solar system and its components.",
      courseId: scienceCourse.id,
      videoUrl: "https://www.youtube.com/watch?v=libKVRa01L8",
      pdfUrl: "https://www.nasa.gov/pdf/solar_system_for_kids.pdf",
      order: 1,
      durationMinutes: 30
    });
    
    this.createLessonInternal({
      title: "The Sun: Our Star",
      description: "Learn about the Sun, the center of our solar system.",
      courseId: scienceCourse.id,
      videoUrl: "https://www.youtube.com/watch?v=6FB0pDpUxyM",
      pdfUrl: "https://www.nasa.gov/pdf/the_sun.pdf",
      order: 2,
      durationMinutes: 30
    });
    
    // Add quizzes
    const mathQuiz = this.createQuizInternal({
      title: "Algebra Basics Quiz",
      description: "Test your knowledge of basic algebra concepts.",
      subjectId: mathSubject.id,
      gradeLevel: 6,
      durationMinutes: 20,
      questionCount: 15
    });
    
    this.createQuizInternal({
      title: "Human Body Systems Quiz",
      description: "Test your knowledge of human body systems.",
      subjectId: scienceSubject.id,
      gradeLevel: 6,
      durationMinutes: 15,
      questionCount: 12
    });
    
    this.createQuizInternal({
      title: "Ancient Indian Civilizations Quiz",
      description: "Test your knowledge of ancient Indian civilizations.",
      subjectId: historySubject.id,
      gradeLevel: 7,
      durationMinutes: 15,
      questionCount: 10
    });
    
    this.createQuizInternal({
      title: "Hindi Grammar Quiz",
      description: "Test your knowledge of Hindi grammar.",
      subjectId: hindiSubject.id,
      gradeLevel: 5,
      durationMinutes: 25,
      questionCount: 15
    });
    
    this.createQuizInternal({
      title: "English Comprehension Quiz",
      description: "Test your English reading comprehension skills.",
      subjectId: englishSubject.id,
      gradeLevel: 5,
      durationMinutes: 20,
      questionCount: 8
    });
    
    // Math quiz fraction questions
    this.createQuizQuestionInternal({
      quizId: mathQuiz.id,
      questionText: "What is the result of adding 1/4 and 2/4?",
      options: JSON.stringify([
        { id: 'a', text: '1/2' },
        { id: 'b', text: '3/4' },
        { id: 'c', text: '3/8' },
        { id: 'd', text: '2/8' }
      ]),
      correctOptionIndex: "b",
      explanation: "When adding fractions with the same denominator, you simply add the numerators and keep the denominator the same. So 1/4 + 2/4 = (1+2)/4 = 3/4.",
      order: 1
    });
    
    this.createQuizQuestionInternal({
      quizId: mathQuiz.id,
      questionText: "Which fraction is equivalent to 0.5?",
      options: JSON.stringify([
        { id: 'a', text: '1/5' },
        { id: 'b', text: '5/10' },
        { id: 'c', text: '1/2' },
        { id: 'd', text: '2/5' }
      ]),
      correctOptionIndex: "c",
      explanation: "0.5 is equal to 5/10, which simplifies to 1/2.",
      order: 2
    });
    
    // Add achievements
    this.createAchievementInternal({
      title: "First Quiz",
      description: "Completed your first quiz",
      iconName: "emoji_events",
      colorClass: "yellow",
      criteria: JSON.stringify({
        type: "quiz_completion",
        count: 1
      })
    });
    
    this.createAchievementInternal({
      title: "Knowledge Seeker",
      description: "Completed 5 courses",
      iconName: "school",
      colorClass: "green",
      criteria: JSON.stringify({
        type: "course_completion",
        count: 5
      })
    });
    
    this.createAchievementInternal({
      title: "Perfect Score",
      description: "Got 100% on a quiz",
      iconName: "stars",
      colorClass: "blue",
      criteria: JSON.stringify({
        type: "quiz_score",
        score: 100
      })
    });
    
    this.createAchievementInternal({
      title: "Week Warrior",
      description: "Studied for 7 days in a row",
      iconName: "local_fire_department",
      colorClass: "red",
      criteria: JSON.stringify({
        type: "streak",
        days: 7
      })
    });
    
    // Add a test user
    this.createUserInternal({
      username: "testuser",
      password: "password123",
      email: "test@example.com",
      fullName: "Test User",
      gradeLevel: 5,
      preferredLanguage: "en"
    });
    
    // Add user progress
    this.createUserProgressInternal({
      userId: 1,
      courseId: mathCourse.id,
      lessonsCompleted: 2,
      lastLessonId: 2,
      completed: false,
      percentComplete: 25
    });
    
    this.createUserProgressInternal({
      userId: 1,
      courseId: scienceCourse.id,
      lessonsCompleted: 6,
      lastLessonId: 6,
      completed: false,
      percentComplete: 60
    });
  }

  // Internal helper methods
  private createUserInternal(userData: InsertUser): User {
    const id = this.currentIds.user++;
    const user: User = { ...userData, id, createdAt: new Date() };
    this.userMap.set(id, user);
    return user;
  }
  
  private createSubjectInternal(subjectData: InsertSubject): Subject {
    const id = this.currentIds.subject++;
    const subject: Subject = { ...subjectData, id };
    this.subjectMap.set(id, subject);
    return subject;
  }
  
  private createCourseInternal(courseData: InsertCourse): Course {
    const id = this.currentIds.course++;
    const course: Course = { ...courseData, id, createdAt: new Date() };
    this.courseMap.set(id, course);
    return course;
  }
  
  private createLessonInternal(lessonData: InsertLesson): Lesson {
    const id = this.currentIds.lesson++;
    const lesson: Lesson = { ...lessonData, id };
    this.lessonMap.set(id, lesson);
    return lesson;
  }
  
  private createUserProgressInternal(progressData: InsertUserProgress): UserProgress {
    const id = this.currentIds.userProgress++;
    const progress: UserProgress = { ...progressData, id, lastAccessed: new Date() };
    this.userProgressMap.set(id, progress);
    return progress;
  }
  
  private createQuizInternal(quizData: InsertQuiz): Quiz {
    const id = this.currentIds.quiz++;
    const quiz: Quiz = { ...quizData, id, createdAt: new Date() };
    this.quizMap.set(id, quiz);
    return quiz;
  }
  
  private createQuizQuestionInternal(questionData: InsertQuizQuestion): QuizQuestion {
    const id = this.currentIds.quizQuestion++;
    const question: QuizQuestion = { ...questionData, id };
    this.quizQuestionMap.set(id, question);
    return question;
  }
  
  private createQuizResultInternal(resultData: InsertQuizResult): QuizResult {
    const id = this.currentIds.quizResult++;
    const result: QuizResult = { ...resultData, id, completedAt: new Date() };
    this.quizResultMap.set(id, result);
    return result;
  }
  
  private createAchievementInternal(achievementData: InsertAchievement): Achievement {
    const id = this.currentIds.achievement++;
    const achievement: Achievement = { ...achievementData, id };
    this.achievementMap.set(id, achievement);
    return achievement;
  }
  
  private createUserAchievementInternal(userAchievementData: InsertUserAchievement): UserAchievement {
    const id = this.currentIds.userAchievement++;
    const userAchievement: UserAchievement = { ...userAchievementData, id, earnedAt: new Date() };
    this.userAchievementMap.set(id, userAchievement);
    return userAchievement;
  }

  // Public methods for IStorage interface
  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.userMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.userMap.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return this.createUserInternal(insertUser);
  }
  
  // Subjects
  async getSubject(id: number): Promise<Subject | undefined> {
    return this.subjectMap.get(id);
  }
  
  async getAllSubjects(): Promise<Subject[]> {
    return Array.from(this.subjectMap.values());
  }
  
  // Courses
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courseMap.get(id);
  }
  
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courseMap.values());
  }
  
  async getCoursesBySubject(subjectId: number): Promise<Course[]> {
    return Array.from(this.courseMap.values()).filter(course => course.subjectId === subjectId);
  }
  
  async getCoursesByGrade(gradeLevel: number): Promise<Course[]> {
    return Array.from(this.courseMap.values()).filter(course => course.gradeLevel === gradeLevel);
  }
  
  async getCoursesBySubjectAndGrade(subjectId: number, gradeLevel: number): Promise<Course[]> {
    return Array.from(this.courseMap.values()).filter(
      course => course.subjectId === subjectId && course.gradeLevel === gradeLevel
    );
  }
  
  async getFeaturedCourses(): Promise<Course[]> {
    return Array.from(this.courseMap.values()).filter(course => course.featured);
  }
  
  // Lessons
  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessonMap.get(id);
  }
  
  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessonMap.values())
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }
  
  // User Progress
  async getUserProgress(id: number): Promise<UserProgress | undefined> {
    return this.userProgressMap.get(id);
  }
  
  async getUserProgressByCourse(userId: number, courseId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgressMap.values()).find(
      progress => progress.userId === userId && progress.courseId === courseId
    );
  }
  
  async getUserProgressByUser(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgressMap.values()).filter(progress => progress.userId === userId);
  }
  
  async createOrUpdateUserProgress(progressData: InsertUserProgress): Promise<UserProgress> {
    // Check if progress already exists for this user and course
    const existingProgress = await this.getUserProgressByCourse(progressData.userId, progressData.courseId);
    
    if (existingProgress) {
      // Update existing progress
      const updatedProgress = {
        ...existingProgress,
        ...progressData,
        lastAccessed: new Date()
      };
      this.userProgressMap.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    }
    
    // Create new progress
    return this.createUserProgressInternal(progressData);
  }
  
  // Quizzes
  async getQuiz(id: number): Promise<Quiz | undefined> {
    return this.quizMap.get(id);
  }
  
  async getAllQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizMap.values());
  }
  
  async getQuizzesBySubject(subjectId: number): Promise<Quiz[]> {
    return Array.from(this.quizMap.values()).filter(quiz => quiz.subjectId === subjectId);
  }
  
  async getQuizzesByGrade(gradeLevel: number): Promise<Quiz[]> {
    return Array.from(this.quizMap.values()).filter(quiz => quiz.gradeLevel === gradeLevel);
  }
  
  async getQuizzesBySubjectAndGrade(subjectId: number, gradeLevel: number): Promise<Quiz[]> {
    return Array.from(this.quizMap.values()).filter(
      quiz => quiz.subjectId === subjectId && quiz.gradeLevel === gradeLevel
    );
  }
  
  // Quiz Questions
  async getQuizQuestion(id: number): Promise<QuizQuestion | undefined> {
    return this.quizQuestionMap.get(id);
  }
  
  async getQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestionMap.values())
      .filter(question => question.quizId === quizId)
      .sort((a, b) => a.order - b.order);
  }
  
  // Quiz Results
  async getQuizResult(id: number): Promise<QuizResult | undefined> {
    return this.quizResultMap.get(id);
  }
  
  async getQuizResultsByUser(userId: number): Promise<QuizResult[]> {
    return Array.from(this.quizResultMap.values()).filter(result => result.userId === userId);
  }
  
  async getQuizResultsByQuiz(quizId: number): Promise<QuizResult[]> {
    return Array.from(this.quizResultMap.values()).filter(result => result.quizId === quizId);
  }
  
  async getUserQuizResults(userId: number): Promise<QuizResult[]> {
    return Array.from(this.quizResultMap.values()).filter(result => result.userId === userId);
  }
  
  async createQuizResult(resultData: InsertQuizResult): Promise<QuizResult> {
    return this.createQuizResultInternal(resultData);
  }
  
  // Achievements
  async getAchievement(id: number): Promise<Achievement | undefined> {
    return this.achievementMap.get(id);
  }
  
  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievementMap.values());
  }
  
  // User Achievements
  async getUserAchievement(id: number): Promise<UserAchievement | undefined> {
    return this.userAchievementMap.get(id);
  }
  
  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return Array.from(this.userAchievementMap.values()).filter(achievement => achievement.userId === userId);
  }
  
  async createUserAchievement(userAchievementData: InsertUserAchievement): Promise<UserAchievement> {
    return this.createUserAchievementInternal(userAchievementData);
  }
}

export const storage = new MemStorage();
