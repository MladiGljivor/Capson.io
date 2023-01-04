import { useEffect, useState } from "react";
import { Navigate ,useNavigate} from "react-router-dom";
import socketIO from 'socket.io-client';
import "../start.css"
import socket from "../components/Socket";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const GameStart = () => {
    const navigate = useNavigate()
    const [ready,setReady] = useState(false);
    const[oppReady,setOppReady] = useState(false)
    const[sockett,setSocket] = useState({})
    const [counter,setCounter]=useState(6)
    const[myname,setMyname]=useState("")
    const[enemyname,setEnemyname] = useState("")
    useEffect(()=>{
       
        socket.emit("join",localStorage.getItem("activeRoom"))
        setSocket(socket)
        setMyname(sessionStorage.getItem("username"))
        setEnemyname(localStorage.getItem("protivnikUsername"))

        

        socket.on("ready",()=> {

                setOppReady(true);

            
        })


    },[])

    useEffect(()=>{
        if(oppReady && ready)
            start()
    },[ready,oppReady])

    function start() {
           setCounter((c)=>c-1)
                            
            setTimeout(()=>{setCounter((c)=>c-1)
                            },1000)
                            setTimeout(()=>{setCounter((c)=>c-1)
                            },2000)
            setTimeout(()=>{setCounter((c)=>c-1)
                            },3000)
                            setTimeout(()=>{setCounter((c)=>c-1)
                            },4000)
            setTimeout(()=>{setCounter((c)=>c-1)
                            startGame()
                                },5000)
    }

     function startGame() {
        console.log("game started")
        navigate("/game")
    }

    function readyFunc() {
        
        setReady(true)
        sockett.emit("ready",localStorage.getItem("activeRoom"))
        

    }

  
    return <div className="all">

        
        
       
        
        <div className="buttonDiv"><button className="readyButton" onClick={readyFunc}>I'm Ready</button></div>
        <div className="imena"><div className="imeznak"><div>{myname}</div> <div>{ready? <CheckIcon fontSize="500px" /> : <CloseIcon fontSize="500px" /> }</div></div> <div className="imeznak"><div>{enemyname}</div> <div>{oppReady? <CheckIcon fontSize="500px"/> : <CloseIcon fontSize="300px"/> } </div></div>  </div>
       <div className="buttonDiv"> <div className="counter">{counter>5? "" : counter}</div> </div>
       
       
         
  
  </div>
  };
  export default GameStart;