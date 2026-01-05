import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, Phone, MoreHorizontal, Pencil, Trash2, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { mockBranches } from '@/data/mockData';
import { cn } from '@/lib/utils';

const BRANCH_LABELS = {
  pageTitle: "Filiallar",
  pageSubtitle: "Bütün filiallarınızı idarə edin",
  newBranch: "Yeni Filial",
  searchPlaceholder: "Filial axtar...",
  tableName: "Ad",
  tableAddress: "Ünvan",
  tablePhone: "Telefon",
  tableStatus: "Status",
  statusActive: "Aktiv",
  statusInactive: "Deaktiv",
  actionEdit: "Redaktə",
  actionActivate: "Aktiv Et",
  actionDeactivate: "Deaktiv Et",
  actionDelete: "Sil",
};

const BranchList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBranches = mockBranches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{BRANCH_LABELS.pageTitle}</h1>
          <p className="text-muted-foreground mt-1">{BRANCH_LABELS.pageSubtitle}</p>
        </div>
        <Button asChild>
          <Link to="/branches/create">
            <Plus className="h-4 w-4 mr-2" />
            {BRANCH_LABELS.newBranch}
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={BRANCH_LABELS.searchPlaceholder}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                  <TableHead className="min-w-[200px]">{BRANCH_LABELS.tableName}</TableHead>
                  <TableHead className="min-w-[250px]">{BRANCH_LABELS.tableAddress}</TableHead>
                  <TableHead>{BRANCH_LABELS.tablePhone}</TableHead>
                  <TableHead>{BRANCH_LABELS.tableStatus}</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{branch.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {branch.address}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {branch.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          branch.status === "active"
                            ? "bg-success text-success-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {branch.status === "active" ? BRANCH_LABELS.statusActive : BRANCH_LABELS.statusInactive}
                      </Badge>
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
                            <Link to={`/branches/${branch.id}/edit`}>
                              <Pencil className="h-4 w-4 mr-2" />
                              {BRANCH_LABELS.actionEdit}
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Power className="h-4 w-4 mr-2" />
                            {branch.status === "active" ? BRANCH_LABELS.actionDeactivate : BRANCH_LABELS.actionActivate}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {BRANCH_LABELS.actionDelete}
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

export default BranchList;

