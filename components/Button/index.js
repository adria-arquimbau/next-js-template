import {colors} from "../../styles/theme"

export  default function Button({ children, onClick }) {
    return(
        <>
            <button onClick={onClick}>
                {children}
            </button>
            <style jsx>{`
                    button {
                    background: ${colors.primary};
                    }
              `}</style>
            </>
    )
}