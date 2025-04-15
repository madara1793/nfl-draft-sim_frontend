import AnalysisPage from '@/app/analysis/page';
import { generateStaticParams } from '../page';

export { generateStaticParams };

export default function TeamAnalysisPage({ params }: { params: { teamSlug: string } }) {
  return <AnalysisPage />;
}