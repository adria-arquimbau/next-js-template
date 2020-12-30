import Button from "../../../components/button";
import AppLayout from "../../../components/AppLayout";
import useUser from "../../../hooks/useUser";
import {useState} from "react";
import {addDevit, retrieveDevits} from '../../../firebase/client'

export default function ComposeTweet() {
    const user = useUser()
    const [message, setmessage] = useState("")

    const handleChange = (event)=> {
        const {value} = event.target
        setmessage(value)
    }

    const handleSubmit = (event)=> {
        event.preventDefault()
        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            username: user.username
        })
    }

    return (
        <>
            <AppLayout>
                <form onSubmit={handleSubmit}>
                    <textarea onChange={handleChange} placeholder="¿    Qué esta pasando?"></textarea>
                    <div>
                        <Button disabled={message.length === 0}>Devitear</Button>
                    </div>
                </form>
            </AppLayout>
            <style jsx>{`  
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
        </>
    )
}