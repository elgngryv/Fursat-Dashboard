import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';
import { ArrowLeft, Pencil, Eye, Heart, MapPin, Calendar, Percent, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDiscounts, mockBranches } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusColors = {
  active: 'bg-success text-success-foreground',
  upcoming: 'bg-primary text-primary-foreground',
  expired: 'bg-muted text-muted-foreground',
  draft: 'bg-warning text-warning-foreground',
};

const statusLabels = {
  active: 'Aktiv',
  upcoming: 'Gələcək',
  expired: 'Bitmiş',
  draft: 'Qaralama',
};

const DiscountDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const discount = mockDiscounts.find((d) => d.id === id);

  if (!discount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-lg text-muted-foreground">Endirim tapılmadı</p>
        <Button variant="link" onClick={() => navigate('/discounts')}>
          Geri qayıt
        </Button>
      </div>
    );
  }

  const discountBranches = mockBranches.filter((b) =>
    discount.branches.includes(b.id)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {discount.title}
            </h1>
            <Badge className={cn('mt-2', statusColors[discount.status])}>
              {statusLabels[discount.status]}
            </Badge>
          </div>
        </div>
        <Button asChild>
          <Link to={`/discounts/${discount.id}/edit`}>
            <Pencil className="h-4 w-4 mr-2" />
            Redaktə Et
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <Card>
            <CardContent className="p-0">
              <img
                src={discount.image}
                alt={discount.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Təsvir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{discount.description}</p>
            </CardContent>
          </Card>

          {/* Branches */}
          <Card>
            <CardHeader>
              <CardTitle>Filiallar ({discountBranches.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {discountBranches.map((branch) => (
                  <div
                    key={branch.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{branch.name}</p>
                      <p className="text-sm text-muted-foreground">{branch.address}</p>
                    </div>
                  </div>
                ))}
                {discountBranches.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    Heç bir filial seçilməyib
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistika</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Görüntülənmə</span>
                </div>
                <span className="font-semibold text-foreground">{discount.views}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  <span className="text-muted-foreground">Favorilər</span>
                </div>
                <span className="font-semibold text-foreground">{discount.favorites}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-success" />
                  <span className="text-muted-foreground">Yaxınlıq Klikləri</span>
                </div>
                <span className="font-semibold text-foreground">{discount.nearbyClicks}</span>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detallar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Percent className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Endirim Faizi</p>
                  <p className="font-semibold text-foreground">{discount.discountPercent}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Kateqoriya</p>
                  <p className="font-semibold text-foreground">{discount.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Tarixlər</p>
                  <p className="font-semibold text-foreground">
                    {format(new Date(discount.startDate), 'd MMMM yyyy', { locale: az })} -{' '}
                    {format(new Date(discount.endDate), 'd MMMM yyyy', { locale: az })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscountDetails;

