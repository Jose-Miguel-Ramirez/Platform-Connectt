import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function ResponsiveTable<T>({ 
  data, 
  columns, 
  keyExtractor, 
  emptyMessage = "No hay datos disponibles",
  isLoading = false 
}: ResponsiveTableProps<T>) {

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 w-full bg-muted/20 animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md border-dashed border-border/60 bg-muted/5">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col, idx) => (
                <TableHead key={idx} className={col.className}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={keyExtractor(item)} className="hover:bg-muted/30">
                {columns.map((col, idx) => (
                  <TableCell key={idx} className={col.className}>
                    {col.cell ? col.cell(item) : (item[col.accessorKey as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View (Cards) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((item) => (
          <Card key={keyExtractor(item)} className="shadow-sm border border-border">
            <CardContent className="p-4 space-y-3">
              {columns.map((col, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-border/30 last:border-0 pb-2 last:pb-0">
                  <span className="text-xs font-medium text-muted-foreground uppercase">{col.header}</span>
                  <div className="text-sm font-medium text-right">
                    {col.cell ? col.cell(item) : (item[col.accessorKey as keyof T] as React.ReactNode)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
