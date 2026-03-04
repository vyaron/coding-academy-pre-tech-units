import { ExamProvider, useExam } from './context/ExamContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import HomeScreen from './components/HomeScreen/HomeScreen';
import ExamScreen from './components/ExamScreen/ExamScreen';
import ResultsScreen from './components/ResultsScreen/ResultsScreen';
import './components/ExamScreen/questions/CodeQuestion.css';

function AppInner() {
  const { state } = useExam();
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BackgroundCanvas />
      {state.screen === 'home'    && <HomeScreen />}
      {state.screen === 'exam'    && <ExamScreen />}
      {state.screen === 'results' && <ResultsScreen />}
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
