import { generateCourseRecommendations } from './src/services/courseRecommendationEngine.js';

(async () => {
  const studentData = { meanGrade: 'B', grades: { Mathematics: 'B', English: 'B', Physics: 'B' } };
  const result = await generateCourseRecommendations(studentData, ['Engineering'], false);
  console.log('engine result:', result);
})();