import styles from '../../styles/styles.module.css'

export default function Avatar ({alt,src, text}){
    return (
        <div>
            <img className={styles.avatar} alt={alt} src={src} title={alt}/>
            {text && <strong>{text || alt}</strong>}
        </div>
    )
}