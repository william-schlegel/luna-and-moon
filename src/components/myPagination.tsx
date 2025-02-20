import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}>;

export function MyPagination({
  currentPage,
  totalPages,
  baseUrl
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${baseUrl}page=${Math.max(currentPage - 1, 1)}`}
            >
              <ChevronLeft />
              {'Précédent'}
            </PaginationPrevious>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={`${baseUrl}page=${currentPage}`} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {totalPages > 1 && (
          <PaginationItem>
            <PaginationNext
              href={`${baseUrl}page=${Math.min(currentPage + 1, totalPages)}`}
            >
              {'Suivant'}
              <ChevronRight />
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
