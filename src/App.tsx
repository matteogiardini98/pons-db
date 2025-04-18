
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DatabasePage from "./pages/DatabasePage";
import ToolDetailPage from "./pages/ToolDetailPage";
import AddToolPage from "./pages/AddToolPage";
import ManifestoPage from "./pages/ManifestoPage";
import StartFromZeroPage from "./pages/StartFromZeroPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartFromZeroPage />} />
              <Route path="/database" element={<DatabasePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-tool" element={<AddToolPage />} />
              <Route path="/tool/:id" element={<ToolDetailPage />} />
              <Route path="/manifesto" element={<ManifestoPage />} />
              <Route path="/start-from-zero" element={<StartFromZeroPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
