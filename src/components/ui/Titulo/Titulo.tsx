import styles from './Titulo.module.scss'

type TituloProps = {
    titulo: string;
    subtitulo: string;
    size?: 'Pequeno' | 'Medio'| 'Grande';
}

export function Titulo({titulo,subtitulo,size = 'Pequeno'}: TituloProps){
    return(
        <div className={styles[size]}>
            <div className={styles.titulo}>{titulo}</div>
            <div className={styles.subtitulo}>{subtitulo}</div>
        </div>
    )
}