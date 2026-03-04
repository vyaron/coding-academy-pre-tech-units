import { Routes, Route, Navigate } from 'react-router-dom';
import { ExamProvider, useExam } from './context/ExamContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import HomeScreen from './components/HomeScreen/HomeScreen';
import QuizIntroScreen from './components/QuizIntroScreen/QuizIntroScreen';
import ExamScreen from './components/ExamScreen/ExamScreen';
import ResultsScreen from './components/ResultsScreen/ResultsScreen';
import './components/ExamScreen/questions/CodeQuestion.css';

function ExamTestRoute() {
  const { state } = useExam();
  if (!state.exam) return <Navigate to="/" replace />;
  if (state.screen === 'results') return <ResultsScreen />;
  return <ExamScreen />;
}

function AppInner() {
  return (
    <div style={{ minHeight: '100%', position: 'relative' }}>
      <BackgroundCanvas />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quiz/:quizId" element={<QuizIntroScreen />} />
        <Route path="/quiz/:quizId/test" element={<ExamTestRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ExamProvider>
      <AppInner />
    </ExamProvider>
  );
}
