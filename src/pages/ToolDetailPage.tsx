
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import useToolDetail from '@/hooks/use-tool-detail';
import ToolDetailContent from '@/components/tool/ToolDetailContent';
import ToolDetailSkeleton from '@/components/tool/ToolDetailSkeleton';
import ToolDetailError from '@/components/tool/ToolDetailError';

const ToolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { tool, isLoading, error } = useToolDetail(id);

  if (isLoading) {
    return <ToolDetailSkeleton />;
  }

  if (error || !tool) {
    return <ToolDetailError onBack={() => navigate('/')} />;
  }

  return (
    <div className={cn(
      "min-h-screen flex",
      isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div className="container-tight p-4 md:p-6 pt-10" {...pageTransition}>
          <Button 
            variant="default"
            size="sm" 
            className={cn(
              "mb-6",
              isDarkMode ? "bg-[#333333] hover:bg-[#444444]" : "bg-[#555555] hover:bg-[#666666] text-white"
            )}
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            back to database
          </Button>
          
          <ToolDetailContent tool={tool} />
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default ToolDetailPage;
