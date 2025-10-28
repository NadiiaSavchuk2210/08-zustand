"use client";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from './page.module.css';
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useToggle } from "@/hooks/useToggle";
import toast, { Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";

interface Props {
    tag?: string;
}

const NotesClient = ({ tag }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const handleChange = useDebouncedCallback(setSearchQuery, 300);

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['notes', searchQuery, currentPage, tag],
        queryFn: () => fetchNotes(searchQuery, currentPage, tag),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
    })

    const totalPages = data?.totalPages ?? 1;
    const { isOpen: isModalOpen, open: openModal, close: closeModal } = useToggle();

    useEffect(() => {
        if (!isSuccess) return;

        if (searchQuery && data?.notes.length === 0) {
            toast.dismiss();
            toast.error('No notes found for your request.', { id: `no-notes-${searchQuery}` });
        }

    }, [isSuccess, data?.notes?.length, searchQuery])

    const handleSearch = (query: string) => {
        setCurrentPage(1);
        handleChange(query);
    }

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSearch={handleSearch} searchQuery={searchQuery} />
                {totalPages > 1 && <Pagination totalPages={totalPages} page={currentPage} handlePageChange={setCurrentPage} />}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>

            {data && data.notes.length > 0 && <NoteList notes={data?.notes} />}
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal}>
                <NoteForm onClose={closeModal} />
            </Modal>}

            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
            <Toaster />
        </div>
    )
}

export default NotesClient;