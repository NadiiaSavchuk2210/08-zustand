import Link from 'next/link';
import css from './page.module.css';
import { NOTE_TAGS } from '../../../../constants';

const SidebarNotes = async () => {
    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink}>All notes</Link>
            </li>
            {NOTE_TAGS.map(noteTag => (
                <li className={css.menuItem} key={noteTag}>
                    <Link href={`/notes/filter/${noteTag}`} className={css.menuLink}>{noteTag}</Link>
                </li>
            ))}
        </ul>
    )
}

export default SidebarNotes;