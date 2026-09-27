import styles from './Logo.module.scss'

export function Logo(){
    return(
        <>
            <div className={styles.wrapper}>
                <span className={styles.logo}>SAUF</span>
                <span className={styles.dot}>.</span>
                <span className={styles.logo}>BR</span>
            </div>
        </>
    )
}