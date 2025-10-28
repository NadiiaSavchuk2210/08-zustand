"use client";
import css from './Footer.module.css'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {currentYear} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Nadiia</p>
                    <p>
                        Contact us:
                        <a href="mailto:student@notehub.app">student@notehub.app</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;