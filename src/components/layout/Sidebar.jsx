import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Tag,
  MapPin,
  User,
  Bell,
  Settings,
  CreditCard,
  FileText,
  BadgeCheck,
  Ticket,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const MENU_LABELS = {
  dashboard: "Dashboard",
  discounts: "Endirimler",
  branches: "Filiallar",
  profile: "Profil",
  notifications: "Bildirişlər",
  settings: "Ayarlar",
  payment: "Ödəniş/Billing",
  auditLog: "Audit Log",
  verification: "Doğrulama",
  promoCodes: "Promo Kodlar",
  comingSoon: "Coming Soon",
  collapse: "Collapse",
};

const menuItems = [
  { path: "/", label: MENU_LABELS.dashboard, icon: LayoutDashboard },
  { path: "/discounts", label: MENU_LABELS.discounts, icon: Tag },
  { path: "/branches", label: MENU_LABELS.branches, icon: MapPin },
  { path: "/profile", label: MENU_LABELS.profile, icon: User },
  { path: "/notifications", label: MENU_LABELS.notifications, icon: Bell },
  { path: "/settings", label: MENU_LABELS.settings, icon: Settings },
];

const comingSoonItems = [
  { label: MENU_LABELS.payment, icon: CreditCard },
  { label: MENU_LABELS.auditLog, icon: FileText },
  { label: MENU_LABELS.verification, icon: BadgeCheck },
  { label: MENU_LABELS.promoCodes, icon: Ticket },
];

export function Sidebar({ isOpen, isCollapsed, onToggleCollapse, onClose }) {
  const location = useLocation();

  const NavItem = ({ path, label, icon: Icon, disabled = false }) => {
    const isActive = path ? location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path)) : false;
    
    const content = (
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
          isActive && !disabled
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : disabled
            ? 'text-sidebar-muted cursor-not-allowed opacity-50'
            : 'text-sidebar-foreground hover:bg-sidebar-accent'
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && <span className="font-medium">{label}</span>}
      </div>
    );

    if (disabled) {
      if (isCollapsed) {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{content}</div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{`${label} - ${MENU_LABELS.comingSoon}`}</p>
            </TooltipContent>
          </Tooltip>
        );
      }
      return content;
    }

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={path}>{content}</Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return <Link to={path}>{content}</Link>;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-sidebar z-50 transition-all duration-300 flex flex-col',
          'lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-[70px]' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-sidebar-foreground font-semibold text-lg">Fürsat</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-sidebar-primary-foreground font-bold text-lg">F</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {menuItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}

          {/* Separator */}
          <div className="my-4 border-t border-sidebar-border" />

          {/* Coming Soon */}
          {!isCollapsed && (
            <p className="px-3 text-xs font-medium text-sidebar-muted uppercase tracking-wider mb-2">
              {MENU_LABELS.comingSoon}
            </p>
          )}
          {comingSoonItems.map((item) => (
            <NavItem key={item.label} {...item} disabled />
          ))}
        </nav>

        {/* Collapse Button (Desktop only) */}
        <div className="hidden lg:flex p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sidebar-foreground hover:bg-sidebar-accent justify-center"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>{MENU_LABELS.collapse}</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}

