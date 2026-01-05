import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainLayout } from "@/components/layout/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import DiscountList from "./pages/discounts/DiscountList";
import CreateDiscount from "./pages/discounts/CreateDiscount";
import DiscountDetails from "./pages/discounts/DiscountDetails";
import EditDiscount from "./pages/discounts/EditDiscount";
import BranchList from "./pages/branches/BranchList";
import CreateBranch from "./pages/branches/CreateBranch";
import EditBranch from "./pages/branches/EditBranch";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/discounts" element={<DiscountList />} />
              <Route path="/discounts/create" element={<CreateDiscount />} />
              <Route path="/discounts/:id" element={<DiscountDetails />} />
              <Route path="/discounts/:id/edit" element={<EditDiscount />} />
              <Route path="/branches" element={<BranchList />} />
              <Route path="/branches/create" element={<CreateBranch />} />
              <Route path="/branches/:id/edit" element={<EditBranch />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;

