import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Heart, MapPin } from 'lucide-react';
import { mockDiscounts } from '@/data/mockData';
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

export function RecentDiscounts() {
  const recentDiscounts = mockDiscounts.slice(0, 4);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Son Endirimler</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/discounts" className="flex items-center gap-1">
            Hamısı <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDiscounts.map((discount) => (
            <div
              key={discount.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <img
                src={discount.image}
                alt={discount.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground truncate">
                      {discount.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(discount.startDate), 'd MMM', { locale: az })} - {format(new Date(discount.endDate), 'd MMM yyyy', { locale: az })}
                    </p>
                  </div>
                  <Badge className={cn('flex-shrink-0', statusColors[discount.status])}>
                    {statusLabels[discount.status]}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {discount.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" /> {discount.favorites}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {discount.nearbyClicks}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

