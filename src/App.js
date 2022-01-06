import './App.css';

import CommentSection from './components/CommentSection'

function App() {
  return (
    <div className="App">
      <main>
        <div className='flex flex-col gap-2'>
          <CommentSection />
        </div>
      </main>
    </div>
  );
}

export default App;
