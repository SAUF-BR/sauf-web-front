import styles from './Titulo.module.scss'

type TituloProps = {
    titulo: string;
    subtitulo: string;
}

export function Titulo({titulo,subtitulo}: TituloProps){
    return(
        <>  
            <div className={styles.titulo}>{titulo}</div>
            <div className={styles.subtitulo}>{subtitulo}</div>
        </>
    )
}