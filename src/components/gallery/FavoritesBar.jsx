import { Link } from 'react-router-dom'
import { useFavorites } from '../../hooks/useFavorites'
import styles from './FavoritesBar.module.css'

function FavoritesBar({ showLink = true }) {
    const { favorites } = useFavorites()
    const count = favorites.length

    return (
        <div className={styles.bar}>
            <div>
                <p className={styles.label}>Улюблені</p>
                <p className={styles.count}>{count} товар(и)</p>
            </div>
            {showLink ? (
                <Link className={styles.link} to="/favorites">
                    Перейти до улюблених
                </Link>
            ) : null}
        </div>
    )
}

export default FavoritesBar
