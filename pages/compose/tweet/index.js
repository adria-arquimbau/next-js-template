import Button from "../../../components/button";
import AppLayout from "../../../components/AppLayout";
import useUser from "../../../hooks/useUser";
import {useState, useEffect} from "react";
import {addDevit, uploadImage} from '../../../firebase/client'
import {useRouter} from "next/router";
import Avatar from "../../../components/avatar";
import Head from "next/head";
import Footer from "../../../components/Footer/footer";

const COMPOSE_STATES = {
    USER_NOT_KNOW: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1,
}

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}

export default function ComposeTweet() {

    const [message, setMessage] = useState("")
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [task, setTask] = useState(null)
    const [imgURL, setImgURL] = useState(null)

    const router = useRouter()
    const user = useUser()

    useEffect(() => {
        if(task) {
            let onProgress = () => {}
            let onError = () => {}
            let onComplete = () => {
                console.log('onComplete')
                task.snapshot.ref.getDownloadURL().then(setImgURL)
            }

            task.on('state_changed',
                onProgress,
                onError,
                onComplete
            )
        }
    }, [task])

    const handleChange = (event)=> {
        const {value} = event.target
        setMessage(value)
    }

    const handleSubmit = (event)=> {
        event.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.userName,
            img: imgURL
        }).then(() => {
            router.push("/home")
        }).catch((err) => {
            console.log(err)
            setStatus(COMPOSE_STATES.ERROR)
        })
    }

    const handleDragEnter = (event) =>{
        event.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }
    const handleDragLeave = (event) =>{
        event.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }
    const handleDrop = (event) =>{
        event.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)

        const file = event.dataTransfer.files[0]
        const task = uploadImage(file)

        setTask(task)
    }

    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

    return (<>
            <AppLayout>
                <Head>
                    <title>Crear un tweet 🔥</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <section className="form-container">
                    {user && (
                        <section className="avatar-container">
                            <Avatar src={user.avatar} />
                        </section>
                    )}
                <form onSubmit={handleSubmit}>
                    <textarea
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onChange={handleChange}
                        placeholder="¿Qué esta pasando?"/>
                    {imgURL && <section className="remove-img">
                        <button onClick={() => setImgURL(null)}>x</button>
                        <img src={imgURL} />
                    </section> }
                    <div>
                        <Button disabled={isButtonDisabled}>Devitear</Button>
                    </div>
                </form>
                </section>
                <Footer>

                </Footer>
            </AppLayout>
        <style jsx>{`
          div {
            padding: 15px;
          } 
          .avatar-container {
            padding-top: 20px;
            padding-left: 10px;
          }
          button {
            background: rgba(0, 0, 0, 0.3);
            border: 0;
            border-radius: 999px;
            color: #fff;
            font-size: 24px;
            width: 32px;
            height: 32px;
            top: 15px;
            position: absolute;
            right: 15px;
          }
          .form-container {
            align-items: flex-start;
            display: flex;
          }
          .remove-img {
            position: relative;
          }
          form {
            padding: 10px;
          }
          img {
            border-radius: 10px;
            height: auto;
            width: 100%;
          }
          textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
                    ? "3px dashed #09f"
                    : "3px solid transparent"};
            border-radius: 10px;
            font-size: 21px;
            min-height: 200px;
            padding: 15px;
            outline: 0;
            resize: none;
            width: 100%;
          }
        `}</style>
        </>)
}