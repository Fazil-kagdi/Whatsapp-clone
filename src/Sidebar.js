import React, { useState,useEffect } from 'react';
import './Sidebar.css';
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVerticon from'@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import './SidebarChat.css'
import SidebarChat from './SidebarChat'
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms,setRooms] = useState([]);
    const[{user},dispatch] = useStateValue();
    useEffect(()=>{
        const unsbscribe =db.collection('rooms').onSnapshot(snapshot=>(setRooms(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data(),
        })))))
        return() => {unsbscribe();}
    },[])
    
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src = {user?.photoURL} />
                <div className = 'sidebar_headeright'>
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVerticon />
                    </IconButton>
                    
                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder= 'Search or start a new chat' type= 'Text' />
                </div>
            </div>
            <div className = 'sidebar_chats'>
                    <SidebarChat addnewChat/>
                    {rooms.map(room=>(
                        <SidebarChat key = {room.id} id = {room.id}
                        name = {room.data.name} />
                    ))}
                    
            </div>
        </div>
    )
}

export default Sidebar
