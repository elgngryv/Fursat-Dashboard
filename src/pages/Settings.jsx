import { Link } from 'react-router-dom';
import { Moon, Sun, Globe, User, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

const SETTINGS_LABELS = {
  pageTitle: "Ayarlar",
  pageSubtitle: "Hesab və tətbiq ayarları",
  appearance: "Görünüş",
  darkMode: "Qaranlıq Rejim",
  darkModeActive: "Aktivdir",
  darkModeInactive: "Deaktivdir",
  language: "Dil",
  appLanguage: "Tətbiq Dili",
  account: "Hesab",
  brandInfo: "Brend Məlumatları",
  changePassword: "Şifrəni Dəyiş",
  changeEmail: "E-poçtu Dəyiş",
  logout: "Çıxış",
  logoutButton: "Hesabdan Çıxış",
  langAz: "Azərbaycan dili",
  langEn: "English",
  langRu: "Русский",
};

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("az");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{SETTINGS_LABELS.pageTitle}</h1>
        <p className="text-muted-foreground mt-1">{SETTINGS_LABELS.pageSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {SETTINGS_LABELS.appearance}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <Label>{SETTINGS_LABELS.darkMode}</Label>
                <p className="text-sm text-muted-foreground">
                  {theme === "dark" ? SETTINGS_LABELS.darkModeActive : SETTINGS_LABELS.darkModeInactive}
                </p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {SETTINGS_LABELS.language}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>{SETTINGS_LABELS.appLanguage}</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">{SETTINGS_LABELS.langAz}</SelectItem>
                  <SelectItem value="en">{SETTINGS_LABELS.langEn}</SelectItem>
                  <SelectItem value="ru">{SETTINGS_LABELS.langRu}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {SETTINGS_LABELS.account}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              to="/profile"
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">{SETTINGS_LABELS.brandInfo}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            <button
              className="flex items-center justify-between w-full p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">{SETTINGS_LABELS.changePassword}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
            <button
              className="flex items-center justify-between w-full p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="font-medium text-foreground">{SETTINGS_LABELS.changeEmail}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              {SETTINGS_LABELS.logout}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              {SETTINGS_LABELS.logoutButton}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

