import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css'
import { PAGINATION_CONFIG } from '../../constants';

interface PaginationProps {
    totalPages: number;
    page: number;
    handlePageChange: (page: number) => void
}

export default function Pagination({ totalPages, page, handlePageChange }: PaginationProps) {
    return (
        <ReactPaginate
            {...PAGINATION_CONFIG}
            pageCount={totalPages}
            forcePage={page - 1}
            onPageChange={({ selected }) => handlePageChange(selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
        />
    );
}