import DiaryContent from '@/components/DiaryContent';

export default function Home() {
  return (
    <main className='flex flex-col gap-y-10 min-h-screen justify-center items-center py-20'>
      <DiaryContent />
    </main>
  );
}
