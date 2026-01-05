import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { mockBranches } from '@/data/mockData';

const EditBranch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef(null);
  const branch = mockBranches.find((b) => b.id === id);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showMap, setShowMap] = useState(false);

  const [formData, setFormData] = useState({
    name: branch?.name || '',
    address: branch?.address || '',
    phone: branch?.phone || '',
    lat: branch?.lat || 40.4093,
    lng: branch?.lng || 49.8671,
    isActive: branch?.status === 'active',
  });

  if (!branch) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">Filial tapılmadı</p>
        <Button variant="link" onClick={() => navigate('/branches')}>
          Geri qayıt
        </Button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoadMap = async () => {
    if (!mapboxToken || !mapContainer.current) return;

    try {
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');

      mapboxgl.default.accessToken = mapboxToken;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [formData.lng, formData.lat],
        zoom: 14,
      });

      const marker = new mapboxgl.default.Marker({ draggable: true })
        .setLngLat([formData.lng, formData.lat])
        .addTo(map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setFormData((prev) => ({
          ...prev,
          lat: lngLat.lat,
          lng: lngLat.lng,
        }));
      });

      map.on('click', (e) => {
        marker.setLngLat(e.lngLat);
        setFormData((prev) => ({
          ...prev,
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        }));
      });

      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
      setShowMap(true);
    } catch (error) {
      toast({
        title: 'Xəta',
        description: 'Xəritə yüklənmədi. Token-i yoxlayın.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Filial yeniləndi',
      description: 'Dəyişikliklər uğurla saxlanıldı.',
    });
    navigate('/branches');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Filialı Redaktə Et
          </h1>
          <p className="text-muted-foreground mt-1">{branch.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Filial Məlumatları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Filial Adı *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Məsələn: Nizami Filialı"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Ünvan *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Tam ünvan"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+994 50 123 45 67"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Enlik (Lat)</Label>
                <Input
                  id="lat"
                  name="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Uzunluq (Lng)</Label>
                <Input
                  id="lng"
                  name="lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <Label>Filial Statusu</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? 'Filial aktivdir' : 'Filial deaktivdir'}
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button type="submit" className="w-full">
                Dəyişiklikləri Saxla
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                Ləğv Et
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Xəritədən Seç
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showMap && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Xəritəni istifadə etmək üçün Mapbox public token-i daxil edin.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="mapboxToken">Mapbox Token</Label>
                  <Input
                    id="mapboxToken"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="pk.eyJ1..."
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleLoadMap}
                  disabled={!mapboxToken}
                >
                  Xəritəni Yüklə
                </Button>
              </div>
            )}
            <div
              ref={mapContainer}
              className={`w-full aspect-video rounded-lg bg-muted ${
                showMap ? '' : 'hidden'
              }`}
            />
            {showMap && (
              <p className="text-sm text-muted-foreground text-center">
                Xəritədə klikləyin və ya marker-i sürüşdürün
              </p>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default EditBranch;

