import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
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
import ClientRegistration from "./pages/ClientRegistration";
import ClientLogin from "./pages/ClientLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import BecomePartner from "./pages/BecomePartner";
import DesignerApplication from "./pages/DesignerApplication";
import TextileCompanyApplication from "./pages/TextileCompanyApplication";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import OrderConfirmation from "./pages/OrderConfirmation";
import ResetPassword from "./pages/ResetPassword";

// Designer Space
import DesignerLayout from "./components/designer/DesignerLayout";
import DesignerDashboard from "./pages/designer/DesignerDashboard";
import DesignerDesigns from "./pages/designer/DesignerDesigns";
import NewDesign from "./pages/designer/NewDesign";
import DesignerConventions from "./pages/designer/DesignerConventions";
import DesignerOrders from "./pages/designer/DesignerOrders";
import DesignerRevenue from "./pages/designer/DesignerRevenue";
import DesignerProfilePage from "./pages/designer/DesignerProfilePage";
import DesignerNotifications from "./pages/designer/DesignerNotifications";
import DesignerSettings from "./pages/designer/DesignerSettings";

// Client Space
import ClientLayout from "./components/client/ClientLayout";
import ClientProfile from "./pages/client/ClientProfile";
import ClientOrders from "./pages/client/ClientOrders";
import ClientOrderDetail from "./pages/client/ClientOrderDetail";
import ClientAddresses from "./pages/client/ClientAddresses";
import ClientPayments from "./pages/client/ClientPayments";
import ClientFavorites from "./pages/client/ClientFavorites";
import ClientNotifications from "./pages/client/ClientNotifications";
import ClientSettings from "./pages/client/ClientSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
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
            <Route path="/inscription-client" element={<ClientRegistration />} />
            <Route path="/connexion-client" element={<ClientLogin />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
            <Route path="/reinitialiser-mot-de-passe" element={<ResetPassword />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/commande/confirmation" element={<OrderConfirmation />} />
            <Route path="/devenir-partenaire" element={<BecomePartner />} />
            <Route path="/devenir-partenaire/designer" element={<DesignerApplication />} />
            <Route path="/devenir-partenaire/societe-textile" element={<TextileCompanyApplication />} />
            <Route path="/a-propos" element={<About />} />

            {/* Designer Space */}
            <Route path="/designer" element={<DesignerLayout />}>
              <Route path="dashboard" element={<DesignerDashboard />} />
              <Route path="designs" element={<DesignerDesigns />} />
              <Route path="designs/nouveau" element={<NewDesign />} />
              <Route path="conventions" element={<DesignerConventions />} />
              <Route path="commandes" element={<DesignerOrders />} />
              <Route path="revenus" element={<DesignerRevenue />} />
              <Route path="profil" element={<DesignerProfilePage />} />
              <Route path="notifications" element={<DesignerNotifications />} />
              <Route path="parametres" element={<DesignerSettings />} />
            </Route>

            {/* Client Space */}
            <Route path="/mon-compte" element={<ClientLayout />}>
              <Route path="profil" element={<ClientProfile />} />
              <Route path="commandes" element={<ClientOrders />} />
              <Route path="commandes/:id" element={<ClientOrderDetail />} />
              <Route path="adresses" element={<ClientAddresses />} />
              <Route path="paiements" element={<ClientPayments />} />
              <Route path="favoris" element={<ClientFavorites />} />
              <Route path="notifications" element={<ClientNotifications />} />
              <Route path="parametres" element={<ClientSettings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
