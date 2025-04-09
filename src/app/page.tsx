import Hero from './components/Hero';
import Hero2 from './components/Hero2';
import Problem from './components/Problem';
import Flow from './components/Flow';
import Solution from './components/Solution';
import QnA from './components/QnA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Hero2 />
      <Problem />
      <Flow />
      <Solution />
      <QnA />
    </main>
  );
}
