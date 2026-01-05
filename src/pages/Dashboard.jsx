import { Tag, Clock, AlertTriangle, Eye, Heart, MapPin } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ViewsChart } from '@/components/dashboard/ViewsChart';
import { BranchPerformanceChart } from '@/components/dashboard/BranchPerformanceChart';
import { RecentDiscounts } from '@/components/dashboard/RecentDiscounts';
import { mockDashboardStats } from '@/data/mockData';

const DASHBOARD_LABELS = {
  title: "Dashboard",
  subtitle: "Ümumi statistika və hesabatlar",
  activeDiscounts: "Aktiv Endirimler",
  upcomingDiscounts: "Gələcək Endirimler",
  expiringSoon: "Bitmək Üzrə",
  totalViews: "Ümumi Görüntülənmə",
  favorites: "Favorilər",
  nearbyClicks: "Yaxınlıq Klikləri",
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{DASHBOARD_LABELS.title}</h1>
        <p className="text-muted-foreground mt-1">{DASHBOARD_LABELS.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title={DASHBOARD_LABELS.activeDiscounts}
          value={mockDashboardStats.activeDiscounts}
          icon={<Tag className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={DASHBOARD_LABELS.upcomingDiscounts}
          value={mockDashboardStats.upcomingDiscounts}
          icon={<Clock className="h-6 w-6" />}
        />
        <StatsCard
          title={DASHBOARD_LABELS.expiringSoon}
          value={mockDashboardStats.expiringDiscounts}
          icon={<AlertTriangle className="h-6 w-6" />}
        />
        <StatsCard
          title={DASHBOARD_LABELS.totalViews}
          value={mockDashboardStats.totalViews.toLocaleString()}
          icon={<Eye className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={DASHBOARD_LABELS.favorites}
          value={mockDashboardStats.totalFavorites}
          icon={<Heart className="h-6 w-6" />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title={DASHBOARD_LABELS.nearbyClicks}
          value={mockDashboardStats.totalNearbyClicks}
          icon={<MapPin className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ViewsChart />
        <BranchPerformanceChart />
      </div>

      {/* Recent Discounts */}
      <RecentDiscounts />
    </div>
  );
};

export default Dashboard;

