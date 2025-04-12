import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  gradeLevel: integer("grade_level"),
  preferredLanguage: text("preferred_language").default("en"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  avatarUrl: true,
  gradeLevel: true,
  preferredLanguage: true,
});

// Subjects schema
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  iconName: text("icon_name"),
  colorClass: text("color_class"),
});

export const insertSubjectSchema = createInsertSchema(subjects).pick({
  name: true,
  code: true,
  iconName: true,
  colorClass: true,
});

// Courses schema
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  subjectId: integer("subject_id").notNull(),
  gradeLevel: integer("grade_level").notNull(),
  imageUrl: text("image_url"),
  totalLessons: integer("total_lessons").default(0),
  durationMinutes: integer("duration_minutes"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  subjectId: true,
  gradeLevel: true,
  imageUrl: true,
  totalLessons: true,
  durationMinutes: true,
  featured: true,
});

// Lessons schema
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  courseId: integer("course_id").notNull(),
  videoUrl: text("video_url"),
  pdfUrl: text("pdf_url"),
  order: integer("order").notNull(),
  durationMinutes: integer("duration_minutes"),
});

export const insertLessonSchema = createInsertSchema(lessons).pick({
  title: true,
  description: true,
  courseId: true,
  videoUrl: true,
  pdfUrl: true,
  order: true,
  durationMinutes: true,
});

// Progress schema
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  lessonsCompleted: integer("lessons_completed").default(0),
  lastLessonId: integer("last_lesson_id"),
  completed: boolean("completed").default(false),
  percentComplete: integer("percent_complete").default(0),
  lastAccessed: timestamp("last_accessed").defaultNow(),
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  courseId: true,
  lessonsCompleted: true,
  lastLessonId: true,
  completed: true,
  percentComplete: true,
});

// Quizzes schema
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  subjectId: integer("subject_id").notNull(),
  gradeLevel: integer("grade_level").notNull(),
  durationMinutes: integer("duration_minutes").default(15),
  questionCount: integer("question_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  title: true,
  description: true,
  subjectId: true,
  gradeLevel: true,
  durationMinutes: true,
  questionCount: true,
});

// Quiz Questions schema
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull(),
  questionText: text("question_text").notNull(),
  options: jsonb("options").notNull(), // Array of options
  correctOptionIndex: text("correct_option_index").notNull(), // Changed from integer to text to support option IDs like 'a', 'b', etc.
  explanation: text("explanation"),
  order: integer("order").notNull(),
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).pick({
  quizId: true,
  questionText: true,
  options: true,
  correctOptionIndex: true,
  explanation: true,
  order: true,
});

// Quiz Results schema
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  quizId: integer("quiz_id").notNull(),
  score: integer("score").notNull(),
  incorrectQuestions: jsonb("incorrect_questions"), // Array of question IDs
  timeTakenSeconds: integer("time_taken_seconds"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  userId: true,
  quizId: true,
  score: true,
  incorrectQuestions: true,
  timeTakenSeconds: true,
});

// Achievements schema
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  colorClass: text("color_class"),
  criteria: jsonb("criteria").notNull(), // JSON with achievement criteria
});

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  title: true,
  description: true,
  iconName: true,
  colorClass: true,
  criteria: true,
});

// User Achievements schema
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).pick({
  userId: true,
  achievementId: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
