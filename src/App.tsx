import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ExamProvider, useExam } from './context/ExamContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import LandingPage from './components/LandingPage/LandingPage';
import HomeScreen from './components/HomeScreen/HomeScreen';
import QuizIntroScreen from './components/QuizIntroScreen/QuizIntroScreen';
import ExamScreen from './components/ExamScreen/ExamScreen';
import ResultsScreen from './components/ResultsScreen/ResultsScreen';
import './components/ExamScreen/questions/CodeQuestion.css';

function ExamTestRoute() {
  const { state } = useExam();
  if (!state.exam) return <Navigate to="/quiz" replace />;
  if (state.screen === 'results') return <ResultsScreen />;
  return <ExamScreen />;
}

function AppInner() {
  const { pathname } = useLocation();
  const showCanvas = pathname !== '/';

  return (
    <div style={{ minHeight: '100%', position: 'relative' }}>
      {showCanvas && <BackgroundCanvas />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<HomeScreen />} />
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
