import React , {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
const Messages = ({match}) => {

    //Fetch Data
    const [profile, setProfile] = useState([]);
    const [messages , setMessages] = useState([]);
    const [media , setMedia] = useState([]);
    const [loading , setLoading] = useState(true)

    const fetchData = async () => {
        const result= await Promise.all([
            fetch('/profile'),
            fetch('/messages'),
            fetch('/media')
        ])
        .then((responses) => {
            return Promise.all(responses.map((response) => {
                return response.json();
        }));})
        setProfile(result[0]);
        setMessages(result[1]);
        setMedia(result[2])
        setLoading(false)
    }
    useEffect( ()=>{
        fetchData();
    },[]);

    //Important Variables
    const {params: { id } } = match;

    if(!loading){
        //The Other Chat Participant
        var username = profile.username; //Account Owner
        var wout;
        if(messages[id].participants[1] === username){
        wout = 0;  
        }else{
        wout = 1;
        }
        var name2 = messages[id].participants[wout];
        if(name2 === undefined){
            name2= "Instagrammer"
        }
        //Conversation Array
        var mesArr = messages.map((conversation)=>{
        return conversation.conversation
        });
    }else{}

//Main Body Render Start//
    if(loading){
        return (
            <>
                <div className="coverScreen">
                    <img src="https://img.icons8.com/nolan/50/instagram-new.png" alt="" className="lazyLoader"/>
                </div>
            </>
        )
    }else{
        return(
                <>
                    {/* Title Bar */}
                    <div className="titleBarInbox">
                        <div className='backNav'>
                            <Link to='/direct'>
                                <i className="fas fa-2x fa-chevron-left white"></i>
                            </Link>
                        </div>
                        <div className="profilecircle">
                            <div className="profileinitials">
                                {name2[0].toLocaleUpperCase()} 
                            </div>    
                        </div> 
                        <div className="username">
                            {name2}
                        </div>
                    </div>
                    {/* Map The Text Of Sender and Receiver */}
                    {/*eslint-disable-next-line */}
                    {mesArr[id].reverse().map((chat,i)=>{
                        if(chat.sender===username){
                            if(chat.media !==undefined){
                                for(var j=0 ; j<media.direct.length ; j++){
                                    if(media.direct[j].taken_at===chat.created_at){
                                        return (
                                            <div className='convoAreaS' key={i}>
                                                <div className="tooltipS">
                                                    <div className="tooltiptextS">
                                                        {new Date(chat.created_at).toDateString()}<br/>
                                                        {new Date(chat.created_at).toLocaleTimeString()}
                                                    </div>
                                                    <div>
                                                        {<img src={media.direct[j].path} alt="" className="imageSent"/>}
                                                    </div>  
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            }else if(chat.heart !==undefined){
                                return (
                                    <div className='convoAreaS' key={i}>
                                        <div className="tooltip">
                                            <div className="messageHeartS">
                                                {chat.heart}
                                            </div>  
                                        </div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div className='convoAreaS' key={i}>
                                        <div className="tooltipS">
                                            <div className="tooltiptextS">
                                                {new Date(chat.created_at).toDateString()}<br/>
                                                {new Date(chat.created_at).toLocaleTimeString()}
                                            </div>
                                            <div className="messageSent">
                                                {chat.text}
                                            </div>  
                                        </div>
                                    </div>
                                )
                            }
                        }else{
                            if(chat.media !==undefined || chat.media_owner !==undefined){
                                        return (
                                            <div className='convoAreaR' key={i}>
                                                <div className='senderInitHolder'>
                                                    <div className = 'senderInitial'>
                                                        {chat.sender===null? "I":chat.sender[0]}
                                                    </div>
                                                </div>
                                                <div className="tooltip">
                                                    <div className="tooltiptext">
                                                        {chat.sender}<br/>
                                                        {new Date(chat.created_at).toDateString()}<br/>
                                                        {new Date(chat.created_at).toLocaleTimeString()}
                                                    </div>
                                                    <div className="messageReceived">
                                                        <div className="imageReceived">
                                                            <div className="statusCode">
                                                                <i class="fa fa-eye-slash fa-2x" aria-hidden="true">
                                                                </i><br/>
                                                                403<br/> 
                                                                Forbidden
                                                            </div>
                                                            <a href={chat.media}  >
                                                                This Media Is Not Accessible In Backup Version Of Your Account 
                                                            </a>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                        )
                            }else if(chat.heart !==undefined){
                                return (
                                    <div className='convoAreaR' key={i}>
                                        <div className='senderInitHolder'>
                                            <div className = 'senderInitial'>
                                            {chat.sender===null? "I":chat.sender[0]}
                                            </div>
                                        </div>
                                        <div className="tooltip">
                                            <div className="tooltiptext">
                                                {chat.sender}<br/>
                                                {new Date(chat.created_at).toDateString()}<br/>
                                                {new Date(chat.created_at).toLocaleTimeString()}
                                            </div>
                                            <div className="messageHeartR">
                                                {chat.heart}
                                            </div>  
                                        </div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div className='convoAreaR' key={i}>
                                        <div className='senderInitHolder'>
                                            <div className = 'senderInitial'>
                                                {chat.sender===null?  "I" :chat.sender[0]}
                                            </div>
                                        </div>
                                        <div className="tooltip">
                                            <div className="tooltiptext">
                                                {chat.sender}<br/>
                                                {new Date(chat.created_at).toDateString()}<br/>
                                                {new Date(chat.created_at).toLocaleTimeString()}
                                            </div>
                                            <div className="messageReceived">
                                                {chat.text}
                                            </div>  
                                        </div>
                                    </div>
                                )
                            }        
                        }        
                    })}       

                        {/*Footer Starts Here  */}
                        <div className='footNav footText'>
                            <Link to="/timeline">
                                <div className='footBut'>
                                    <i className="fas fa-2x fa-clock"></i>
                                        <div className="footText">
                                            Timeline
                                        </div>
                                </div>
                            </Link>
                            <Link to="/direct">
                                <div className='footBut'>
                                    <i className="fas fa-2x fa-paper-plane icon-selected"></i>
                                    <div className="footText">
                                        Direct
                                    </div>
                                </div>
                            </Link>
                            <Link to="/profile">
                                <div className='footBut'>
                                    <i className="fas fa-2x fa-user"></i>
                                    <div className="footText">
                                        Profile
                                    </div>
                                </div>
                            </Link>
                            <Link to="/media">
                                <div className='footBut'>
                                    <i className="fas fa-2x fa-photo-video"></i>
                                    <div className="footText">
                                        Stories
                                    </div>
                                </div>
                            </Link>
                        </div>
                </>
        )
    }
}

export default Messages;