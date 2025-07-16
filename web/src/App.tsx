import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import DairyContent from './components/DiaryContent';
import ToggleTheme from './components/theme/ToggleTheme';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ToggleTheme />
      <Toaster />
      <main className='flex flex-col gap-y-10 min-h-screen justify-center items-center py-20'>
        <DairyContent />
      </main>
    </ThemeProvider>
  );
}

export default App;
