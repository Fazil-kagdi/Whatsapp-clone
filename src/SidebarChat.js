import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import {Avatar}  from '@material-ui/core'
import db from './firebase';
import {Link}  from 'react-router-dom'

function SidebarChat({id,name, addnewChat}) {
    const[seed,setSeed] = useState('');
    const[message,setMessages] = useState('');

    useEffect(() =>{
        setSeed(Math.floor(Math.random()*5000))
    } ,[]);

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => doc.data()))
        )
        }
    },[id])

    const createChat= () =>{
        const roomName = prompt('please enter the name of the chat')

        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addnewChat ? (
        <Link to ={`/rooms/${id}`}>
            <div className='SidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className = 'Sidebar_chat_info'>
                <h2>{name}</h2>
                <p>{message[0]?.message}</p>
            </div>
        </div>
        </Link>
         
    ) : (
        <div onClick={createChat} className = 'SidebarChat'>
            <h2>
                Add new chat
            </h2>
        </div>
    )
}

export default SidebarChat
