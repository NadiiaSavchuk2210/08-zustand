import css from './Loader.module.css'

interface LoaderProps {
    isCreating?: boolean;
}

export default function Loader({ isCreating = false }: LoaderProps) {

    return (
        <div className={css.loaderContainer}>
            <span className={isCreating ? `${css.loaderProgress}` : `${css.loader}`}></span>
        </div>
    )
}