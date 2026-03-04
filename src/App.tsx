import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import SupportWidget from "./components/support/SupportWidget";
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
import SearchPage from "./pages/Search";

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

// Admin Space
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDesigners from "./pages/admin/AdminDesigners";
import AdminTextileCompanies from "./pages/admin/AdminTextileCompanies";
import AdminPartnerCompanies from "./pages/admin/AdminPartnerCompanies";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminPromotions from "./pages/admin/AdminPromotions";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

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

// Textile Company Space
import TextileCompanyLayout from "./components/textile/TextileCompanyLayout";
import TextileCompanyDashboard from "./pages/textile/TextileCompanyDashboard";
import TextileCompanyStructure from "./pages/textile/TextileCompanyStructure";
import TextileCompanyProducts from "./pages/textile/TextileCompanyProducts";
import TextileCompanyOrders from "./pages/textile/TextileCompanyOrders";
import TextileCompanyConventions from "./pages/textile/TextileCompanyConventions";
import TextileCompanyRevenue from "./pages/textile/TextileCompanyRevenue";
import TextileCompanyProfilePage from "./pages/textile/TextileCompanyProfilePage";
import TextileCompanyNotifications from "./pages/textile/TextileCompanyNotifications";
import TextileCompanySettings from "./pages/textile/TextileCompanySettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FavoritesProvider>
        <RecentlyViewedProvider>
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
                <Route path="/recherche" element={<SearchPage />} />

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

                {/* Admin Space */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="utilisateurs" element={<AdminUsers />} />
                  <Route path="designers" element={<AdminDesigners />} />
                  <Route path="societes-textiles" element={<AdminTextileCompanies />} />
                  <Route path="societes-partenaires" element={<AdminPartnerCompanies />} />
                  <Route path="produits" element={<AdminProducts />} />
                  <Route path="commandes" element={<AdminOrders />} />
                  <Route path="paiements" element={<AdminPayments />} />
                  <Route path="promotions" element={<AdminPromotions />} />
                  <Route path="avis" element={<AdminReviews />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                  <Route path="parametres" element={<AdminSettings />} />
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

                {/* Textile Company Space */}
                <Route path="/societe-textile" element={<TextileCompanyLayout />}>
                  <Route path="dashboard" element={<TextileCompanyDashboard />} />
                  <Route path="structure" element={<TextileCompanyStructure />} />
                  <Route path="produits" element={<TextileCompanyProducts />} />
                  <Route path="commandes" element={<TextileCompanyOrders />} />
                  <Route path="conventions" element={<TextileCompanyConventions />} />
                  <Route path="revenus" element={<TextileCompanyRevenue />} />
                  <Route path="profil" element={<TextileCompanyProfilePage />} />
                  <Route path="notifications" element={<TextileCompanyNotifications />} />
                  <Route path="parametres" element={<TextileCompanySettings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
              <SupportWidget />
            </BrowserRouter>
          </CartProvider>
        </RecentlyViewedProvider>
      </FavoritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
