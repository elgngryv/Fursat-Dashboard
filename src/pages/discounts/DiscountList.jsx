import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { az } from 'date-fns/locale';
import { Plus, Search, Filter, Eye, Heart, MapPin, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockDiscounts } from '@/data/mockData';
import { cn } from '@/lib/utils';

const STATUS_COLORS = {
  active: "bg-success text-success-foreground",
  upcoming: "bg-primary text-primary-foreground",
  expired: "bg-muted text-muted-foreground",
  draft: "bg-warning text-warning-foreground",
};

const STATUS_LABELS = {
  active: "Aktiv",
  upcoming: "Gələcək",
  expired: "Bitmiş",
  draft: "Qaralama",
};

const DISCOUNT_LABELS = {
  pageTitle: "Endirimler",
  pageSubtitle: "Bütün endirimləri idarə edin",
  newDiscount: "Yeni Endirim",
  searchPlaceholder: "Endirim axtar...",
  filterAll: "Hamısı",
  filterActive: "Aktiv",
  filterUpcoming: "Gələcək",
  filterExpired: "Bitmiş",
  filterDraft: "Qaralama",
  tableDiscount: "Endirim",
  tableCategory: "Kateqoriya",
  tablePercent: "Faiz",
  tableDates: "Tarixlər",
  tableStatus: "Status",
  tableStats: "Statistika",
  actionView: "Bax",
  actionEdit: "Redaktə",
  actionDelete: "Sil",
};

const DiscountList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDiscounts = mockDiscounts.filter((discount) => {
    const matchesSearch = discount.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || discount.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{DISCOUNT_LABELS.pageTitle}</h1>
          <p className="text-muted-foreground mt-1">{DISCOUNT_LABELS.pageSubtitle}</p>
        </div>
        <Button asChild>
          <Link to="/discounts/create">
            <Plus className="h-4 w-4 mr-2" />
            {DISCOUNT_LABELS.newDiscount}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={DISCOUNT_LABELS.searchPlaceholder}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{DISCOUNT_LABELS.filterAll}</SelectItem>
                <SelectItem value="active">{DISCOUNT_LABELS.filterActive}</SelectItem>
                <SelectItem value="upcoming">{DISCOUNT_LABELS.filterUpcoming}</SelectItem>
                <SelectItem value="expired">{DISCOUNT_LABELS.filterExpired}</SelectItem>
                <SelectItem value="draft">{DISCOUNT_LABELS.filterDraft}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[300px]">{DISCOUNT_LABELS.tableDiscount}</TableHead>
                  <TableHead>{DISCOUNT_LABELS.tableCategory}</TableHead>
                  <TableHead>{DISCOUNT_LABELS.tablePercent}</TableHead>
                  <TableHead>{DISCOUNT_LABELS.tableDates}</TableHead>
                  <TableHead>{DISCOUNT_LABELS.tableStatus}</TableHead>
                  <TableHead>{DISCOUNT_LABELS.tableStats}</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={discount.image}
                          alt={discount.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <Link
                            to={`/discounts/${discount.id}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {discount.title}
                          </Link>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {discount.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{discount.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">
                        {discount.discountPercent}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{format(new Date(discount.startDate), 'd MMM', { locale: az })}</p>
                        <p className="text-muted-foreground">
                          {format(new Date(discount.endDate), 'd MMM yyyy', { locale: az })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(STATUS_COLORS[discount.status])}>
                        {STATUS_LABELS[discount.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/discounts/${discount.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              {DISCOUNT_LABELS.actionView}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/discounts/${discount.id}/edit`}>
                              <Pencil className="h-4 w-4 mr-2" />
                              {DISCOUNT_LABELS.actionEdit}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {DISCOUNT_LABELS.actionDelete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountList;

