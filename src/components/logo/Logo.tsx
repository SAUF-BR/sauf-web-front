import styles from './Logo.module.scss'

type LogoProps = {
    variant?: 'padrao' | 'clara'
}

export function Logo({ variant = 'padrao' }: LogoProps){
    return(
        <>
            <div className={`${styles.wrapper} ${variant === 'clara' ? styles.clara : ''}`}>
                <span className={styles.logo}>SAUF</span>
                <span className={styles.dot}>.</span>
                <span className={styles.logo}>BR</span>
            </div>
        </>
    )
}
