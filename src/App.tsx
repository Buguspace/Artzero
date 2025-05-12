import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Publish from "./pages/Publish"; 
import SettingsPage from './pages/settings/SettingsPage';
import AvatarSettings from './pages/settings/profile/AvatarSettings';
import BioSettings from './pages/settings/profile/BioSettings';
import GenderSettings from './pages/settings/profile/GenderSettings';
import BirthdaySettings from './pages/settings/profile/BirthdaySettings';
import SchoolSettings from './pages/settings/profile/SchoolSettings';
import ShippingAddressSettings from './pages/settings/address/ShippingAddressSettings';
import ReturnAddressSettings from './pages/settings/address/ReturnAddressSettings';
import PasswordSettings from '@/pages/settings/account/PasswordSettings';
import SecurityCenter from '@/pages/settings/account/SecurityCenter';
import EmailSettings from '@/pages/settings/account/EmailSettings';
import DeleteAccount from '@/pages/settings/account/DeleteAccount';
import Recharge from '@/pages/settings/coffee/Recharge';
import Records from '@/pages/settings/coffee/Records';
import PrivacySettings from '@/pages/settings/privacy/PrivacySettings';
import NotificationSettings from '@/pages/settings/notifications/NotificationSettings';
import CacheSettings from '@/pages/settings/cache/CacheSettings';
import About from '@/pages/settings/about/About';
import HelpCenter from '@/pages/settings/help/HelpCenter';
import DeviceManagement from '@/pages/settings/account/DeviceManagement';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:tab" element={<Categories />} />
              <Route path="/categories/:tab/:category" element={<Categories />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/profile/avatar" element={<AvatarSettings />} />
              <Route path="/settings/profile/bio" element={<BioSettings />} />
              <Route path="/settings/profile/gender" element={<GenderSettings />} />
              <Route path="/settings/profile/birthday" element={<BirthdaySettings />} />
              <Route path="/settings/profile/school" element={<SchoolSettings />} />
              <Route path="/settings/address/shipping" element={<ShippingAddressSettings />} />
              <Route path="/settings/address/return" element={<ReturnAddressSettings />} />
              <Route path="/settings/account/password" element={<PasswordSettings />} />
              <Route path="/settings/account/security" element={<SecurityCenter />} />
              <Route path="/settings/account/email" element={<EmailSettings />} />
              <Route path="/settings/account/device" element={<DeviceManagement />} />
              <Route path="/settings/account/delete" element={<DeleteAccount />} />
              <Route path="/settings/coffee/recharge" element={<Recharge />} />
              <Route path="/settings/coffee/records" element={<Records />} />
              <Route path="/settings/privacy" element={<PrivacySettings />} />
              <Route path="/settings/notifications" element={<NotificationSettings />} />
              <Route path="/settings/cache" element={<CacheSettings />} />
              <Route path="/settings/about" element={<About />} />
              <Route path="/settings/help" element={<HelpCenter />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
