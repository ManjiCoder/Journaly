import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Button } from '@/components/ui/button';
import ToggleTheme from './components/theme/ToggleTheme';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ToggleTheme />
      <div className='flex min-h-svh flex-col items-center justify-center'>
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
