import React from 'react'
import './Chat.css'
import {Avatar,IconButton} from "@material-ui/core"
import { useState, useEffect } from 'react'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVert from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from "@material-ui/icons/Mic"
import { useParams } from 'react-router-dom'
import db from './firebase'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'



function Chat() {
    const[input,setInput] = useState("")

    const[seed,setSeed] = useState('');

    const {roomId} = useParams()

    const [roomName, setRoomName] = useState("");

    const [messages, setMessages] = useState([])

    const[{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) =>
            doc.data()
            ))
            )
                
        }
    },[roomId]);

    useEffect(() =>{
        setSeed(Math.floor(Math.random()*5000))
    } ,[]);


    const sendMessage =(e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    return (
        <div className= 'chat'>
            <div className = 'Chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='Chat_headerinfo'>
                    <h3>{roomName}</h3>
                        <p>
                            last seen{" "} {
                                new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                            }
                        
                        </p>
                </div>
                <div className='Chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>  

            <div className='Chat_body'>
                {messages.map(message => (
                    <p className= {`Chat_message ${message.name===user.displayName && 'Chat_reciever'}`}>
                    <span className='ChatName'>
                        {message.name}
                    </span>{message.message}
                    <span className='time'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
             
             
            </div> 

            <div className='Chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value = {input} onChange={e => setInput(e.target.value)} type = "text"  placeholder ="Type a message"/>
                    <button type= "submit" onClick = {sendMessage}>Send a message</button>
                </form>
                <MicIcon />
                 
            </div>
        </div>   
    )
}

export default Chat
