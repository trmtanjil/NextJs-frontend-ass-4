"use client";
 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface DataTableProps<T> {
  columns: Array<{
    accessorKey: string;
    header: string;
    cell?: (row: T) => React.ReactNode;
  }>;
  data: T[];
  title?: string;
  pagination?: boolean;
  paginationMeta?: Meta;
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSearch?: (value: string) => void;
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  title,
  pagination,
  paginationMeta,
  onPaginationChange,
  onSearch,
}: DataTableProps<T>) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handlePreviousPage = () => {
    if (paginationMeta && paginationMeta.page > 1 && onPaginationChange) {
      onPaginationChange({
        pageIndex: paginationMeta.page - 2,
        pageSize: paginationMeta.limit,
      });
    }
  };

  const handleNextPage = () => {
    if (
      paginationMeta &&
      paginationMeta.page < paginationMeta.totalPages &&
      onPaginationChange
    ) {
      onPaginationChange({
        pageIndex: paginationMeta.page,
        pageSize: paginationMeta.limit,
      });
    }
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}

      {onSearch && (
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row, idx) => (
                <TableRow key={`${row.id || idx}`}>
                  {columns.map((column) => (
                    <TableCell key={column.accessorKey}>
                      {column.cell
                        ? column.cell(row)
                        : (row as Record<string, any>)[column.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-500">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && paginationMeta && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {paginationMeta.page} of {paginationMeta.totalPages} ({paginationMeta.total} total)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={paginationMeta.page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={paginationMeta.page >= paginationMeta.totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
