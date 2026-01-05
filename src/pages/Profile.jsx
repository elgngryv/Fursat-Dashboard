import { useState } from 'react';
import { Upload, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockMerchantProfile, categories } from '@/data/mockData';

const PROFILE_LABELS = {
  pageTitle: "Profil",
  pageSubtitle: "Brend məlumatlarınızı idarə edin",
  brandInfo: "Brend Məlumatları",
  brandName: "Brend Adı",
  description: "Təsvir",
  category: "Kateqoriya",
  categoryPlaceholder: "Kateqoriya seç",
  contactInfo: "Əlaqə Məlumatları",
  email: "E-poçt",
  phone: "Telefon",
  website: "Veb-sayt",
  socialNetworks: "Sosial Şəbəkələr",
  logo: "Logo",
  logoInfo: "PNG, JPG (max 2MB)",
  saveChanges: "Dəyişiklikləri Saxla",
  toastTitle: "Profil yeniləndi",
  toastDescription: "Brend məlumatlarınız uğurla saxlanıldı.",
};

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    brandName: mockMerchantProfile.brandName,
    description: mockMerchantProfile.description,
    category: mockMerchantProfile.category,
    email: mockMerchantProfile.email,
    phone: mockMerchantProfile.phone,
    website: mockMerchantProfile.website,
    facebook: mockMerchantProfile.socialLinks.facebook || "",
    instagram: mockMerchantProfile.socialLinks.instagram || "",
    twitter: mockMerchantProfile.socialLinks.twitter || "",
  });
  const [logoPreview, setLogoPreview] = useState(mockMerchantProfile.logo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: PROFILE_LABELS.toastTitle,
      description: PROFILE_LABELS.toastDescription,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{PROFILE_LABELS.pageTitle}</h1>
        <p className="text-muted-foreground mt-1">{PROFILE_LABELS.pageSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{PROFILE_LABELS.brandInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandName">{`${PROFILE_LABELS.brandName} *`}</Label>
                <Input
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{PROFILE_LABELS.description}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>{PROFILE_LABELS.category}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={PROFILE_LABELS.categoryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{PROFILE_LABELS.contactInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{`${PROFILE_LABELS.email} *`}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{`${PROFILE_LABELS.phone} *`}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{PROFILE_LABELS.website}</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{PROFILE_LABELS.socialNetworks}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle>{PROFILE_LABELS.logo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={logoPreview}
                    alt="Logo"
                    className="w-full h-full rounded-full object-cover border-4 border-border"
                  />
                  <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                    <Upload className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {PROFILE_LABELS.logoInfo}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Card>
            <CardContent className="p-4">
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {PROFILE_LABELS.saveChanges}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Profile;

