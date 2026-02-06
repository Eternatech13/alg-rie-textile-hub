import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TextileCompanies from "./pages/TextileCompanies";
import TextileCompanyProfile from "./pages/TextileCompanyProfile";
import Catalogue from "./pages/Catalogue";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Designers from "./pages/Designers";
import DesignerProfile from "./pages/DesignerProfile";
import DesignDetail from "./pages/DesignDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/societes-textiles" element={<TextileCompanies />} />
          <Route path="/societe-textile/:id" element={<TextileCompanyProfile />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/categorie/:slug" element={<CategoryPage />} />
          <Route path="/categorie/:slug/:subcategory" element={<SubcategoryPage />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/designer/:id" element={<DesignerProfile />} />
          <Route path="/design/:id" element={<DesignDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
