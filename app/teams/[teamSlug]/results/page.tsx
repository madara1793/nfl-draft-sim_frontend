import { generateStaticParams } from '../page';
import ResultsPage from '@/app/results/page';

export { generateStaticParams };

export default function TeamResultsPage({ params }: { params: { teamSlug: string } }) {
  return <ResultsPage />;
}