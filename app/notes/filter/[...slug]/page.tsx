import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface Props {
    params: Promise<{ slug: string[] }>
}

const FilterNotes = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];

    const queryClient = new QueryClient();
    const searchQuery = '';
    const currentPage = 1;

    await queryClient.prefetchQuery({
        queryKey: ['notes', searchQuery, currentPage, tag],
        queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    )
}

export default FilterNotes;