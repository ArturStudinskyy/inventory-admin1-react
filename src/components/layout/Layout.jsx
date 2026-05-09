import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
    return (
        <div className={styles.shell}>
            <header className={styles.header}>
                <div className={styles.brand}>Inventory Hub</div>
                <nav className={styles.nav}>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                        to="/"
                        end
                    >
                        Галерея
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                        to="/favorites"
                    >
                        Улюблені
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                        to="/admin"
                    >
                        Адмінка
                    </NavLink>
                </nav>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
