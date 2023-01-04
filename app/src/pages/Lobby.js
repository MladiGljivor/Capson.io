import React, { useState ,useEffect } from 'react'
import Header from '../components/Header';
import socketIO from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
import socket from "../components/Socket"





 const roomovi = [{"host":"ivor","rating":"100","sifra":"2564"},
 {"host":"ivor2","rating":"1200","sifra":""},
 {"host":"ivorpivor","rating":"100","sifra":""}, 
 {"host":"ivorniger","rating":"1600","sifra":"1364"},  ]

const Lobby = () => {
    const navigate = useNavigate()
    const [rooms , setRooms] = useState([])
    const[socketid,setSocketid] = useState("")
    const[username,setUsername] = useState("")
    const [izazovi,setIzazovi] = useState([])
    
    const[sockett,setSocket] = useState()
    
    

   
    useEffect(() => {
       
        setSocket(socket)
       
      
       //socket.on("connect", () => {
      
        setSocketid(socket.id)
        setUsername(sessionStorage.getItem("username"))
        socket.emit("gameLobby",{"id":socket.id,
        "name":sessionStorage.getItem("username"),
        "JWT":sessionStorage.getItem("JWT")}) 
     // });
        
      
        
       
        socket.on("lobbyInf",(msg)=>{setRooms(msg.filter(obj=>obj.username!=sessionStorage.getItem("username")))
        })

        socket.on("noviIzazov",(inf)=>{
         
          setIzazovi(izazovi=>Array.from(new Set([...izazovi,inf])))
          
          
        })

        socket.on("welcomeToRoom",(inf)=>{
         
          
          localStorage.setItem("activeRoom",inf.roomid)
          localStorage.setItem("protivnikUsername",inf.protivnikUsername)
          socket.emit("gameLobbyLeave")
          navigate("/gameStart")
          //navigiraj u /gameStart , napravi nove sockete i joinaj ih u room pod room id-em ,uz zahtjeve za roomom posalji i jwt da nemoze bilo tko joinat 
          
          
        })

        
        
        
      }, [])


     

      function handleClick(protivnikUsername) {
        
        sockett.emit("noviIzazov",{"player1":username,"player2":
        protivnikUsername})
        
        
      }
      function prihvatiIzazov(username2) {

        sockett.emit("noviRoom",{username,username2})
      }

  
    return <div className="all sve">
        <Header name={username}/>
        <div className='activeP'>Active Players</div>
        <div className='lobby'>
        
        
               
        {rooms.map(useri=> <div className='lobbyitem' key={useri.id}><li >{useri.username} 
         </li>
         <button className="button-32" onClick={() =>handleClick(useri.username)}>Challenge</button>
        </div>
        
        
        )
        }
      
      </div>
      <div className='activeP'>Challenges</div>
      <div className='lobby'>
      {izazovi.map(izazov=> <div className='lobbyitem' key={izazov}> <li >{izazov} 
         </li>
         <button className="button-32" onClick={() =>prihvatiIzazov(izazov)}>Accept Challenge</button>
        </div>
        
        
        
        
        )
        }
        </div>
      
        
            
           </div>
  };
  
  export default Lobby;