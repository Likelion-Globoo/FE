// src/App.tsx
import TestComponent from './components/TestComponent';
// import './App.css'; // 기본 CSS 파일은 필요에 따라 삭제하거나 유지할 수 있습니다.

function App() {
  return (
    <div className="App">
      <TestComponent />
      {/* 기타 컴포넌트 */}
    </div>
  );
}

export default App;