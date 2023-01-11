gameStates=[]
lobbyPlayers=[]
onlinePlayers=[]
rooms=[]

const serverFPS= 30;

const saltRounds=5;
var bcrypt = require('bcrypt');
const db = require("./db")
const dotenv=require("dotenv")
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var cors = require("cors")
var bodyParser =require("body-parser")
const http = require('http');
const cookieParser = require("cookie-parser");
const { SocketAddress } = require('net');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
var randomstring=require("randomstring");
var randomWords = require('random-words');
const { rword } = require('rword')



dotenv.config();
function saljiGameState(socket) {
  setInterval(()=>socket.emit("gameState","gameState"),1000)
  
}
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());

let key = process.env.JWT_SECRET_KEY;
            let serverdata = {
                "username":"server",
              
            }
          
            const serverToken = jwt.sign(serverdata, key);
serverJWT=serverToken

async function login(username,pass) {
  text="Select passwordHash from users  where username=$1";
  const values = [username]
   
  upit=await db.query(text,values)

   if(upit.rows[0]===undefined)
   return false


   const hash=upit.rows[0].passwordhash
   
   
   const match =  bcrypt.compareSync(pass, hash);
   
   return match;
  


}
async function kurcina() {
  text="Select * from users  where username=$1";
  const values = ["abc"]
   const upit=await db.query(text,values)
   return upit.rows[0];

}

app.get("/",(req,res)=>{

  res.send("kurcina")
  
})
app.post('/login', (req, res) => {
  console.log("login",req.body.username,req.body.pass)
  res.setHeader('Content-Type', 'application/json');
        login(req.body.username,req.body.pass).then(match=>{
          if(match===true) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                "username":req.body.username,
              
            }
          
            const token = jwt.sign(data, jwtSecretKey);
            res.status(200).json({
              "authToken": token,
              
          });
          
        }
          else
          res.status(400).json({"error":"Wrong Credentials!"})


        }
          
          ) 
         
       
        
  
});


async function check(username) {
  console.log("u cheku sam");
  text="Select * from users  where username=$1";
  const values = [username]
   const upit=await db.query(text,values)
   console.log(upit)
   console.log("izaso iz checka");
   if (upit.rows.length>0)
   return true

   else
   return false
   

}

async  function registriraj(body) {
  const text = 'INSERT INTO users(username,passwordHash) VALUES($1, $2) RETURNING *'
  var salt = bcrypt.genSaltSync(saltRounds)
  const values = [ body.username , bcrypt.hashSync(body.pass,salt) ]
  await db.query(text,values)

}

app.post('/register', (req, res) => {

  check(req.body.username).then(value=> {if(value){
    res.status(400).json({
      "error": 'User already exists!'
   });
   res.end()
   return

  }
  else  {
    console.log("register",req.body) 
  if(req.body.username.length <2) {
     res.status(400).json({
      "error": 'Username needs to have atleast 2 characters!'
   });
  
   
   
   res.end()
   return;
  }
  
  registriraj(req.body) 
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      "username":req.body.username,
    
  }

  const token = jwt.sign(data, jwtSecretKey);
  res.status(200).json({
    "authToken": token,
    
});


  }
 })
  

});

app.get("/kurac",(req,res)=> {
  res.json({"kurac":"Motherfucker"})
})

io.on('connection', (socket) => {
  console.log('a user connected '+ socket.id);
  //saljiGameState(socket)
  socket.on("gameLobby",(info)=> {
    onlinePlayers.push({"id":info.id,"username":info.name})
    lobbyPlayers.push({"id":info.id,"username":info.name})
    console.log(lobbyPlayers)
    
  })

  socket.on("gameLobbyLeave",()=> {

    
    lobbyPlayers=lobbyPlayers.filter(obj=>obj.id!=socket.id)
    console.log(socket.id + " left game lobby")
    
    
    
  })
  socket.on("noviIzazov",(info)=> {

    console.log("noviIzazov")
    protivnikId=lobbyPlayers.filter((obj)=>obj.username===info.player2)[0].id;
    console.log(protivnikId)
    io.to(protivnikId).emit("noviIzazov",info.player1)
    
    
  })

  socket.on("noviRoom",(info)=> {
    console.log(info.username , info.username2)
    roomid=randomstring.generate(32);
    id1=lobbyPlayers.filter((obj)=>obj.username===info.username)[0].id;
    id2=lobbyPlayers.filter((obj)=>obj.username===info.username2)[0].id;
    rooms.push({roomid,players:{"player1":{"username":info.username,"id":id1},"player2":{"username":info.username2,"id":id2}}})
    gameStates.push( {

    roomid,"game":{ "player1":{

      "id":id1,

    

    
      "state":[{"sektor":{"rijec":"","posto":0}},{"sektor":{"rijec":"","posto":0}},{"sektor":{"rijec":"","posto":0}},{"sektor":{"rijec":"","posto":0}}],"bodovi":0,"life":100,"rijeci":rword.generate(5,{length:"4-10"})
              
                              }
        
            ,"player2":{
              "id":id2,

              "state":[{"sektor":{"rijec":"","posto":0}},{"sektor":{"rijec":"","posto":0}},{"sektor":{"rijec":"","posto":0}},{"sektor":{"rijec":"","posto":0}}],"bodovi":0,"life":100,"rijeci":rword.generate(5,{length:"4-10"})

                        } ,
         
         
                        "winner":""
    



    }})
      
            
   
   
   
   
   
   
    io.to(id1).emit("welcomeToRoom",{"protivnikUsername":info.username2,roomid})
    io.to(id2).emit("welcomeToRoom",{"protivnikUsername":info.username,roomid})
    console.log(rooms[0]);
  })

  socket.on("disconnect",()=> {
    
    lobbyPlayers=lobbyPlayers.filter(obj=>obj.id!=socket.id)
    onlinePlayers=onlinePlayers.filter(obj=>obj.id!=socket.id)
    console.log(socket.id +" disconnected")

    
    
  })

  socket.on("start",(roomNumber)=>{
    socket.to(roomNumber).emit("start")
    console.log(socket.id , "start")
   



  })

  socket.on("join",(roomNumber)=> {
    
    socket.join(roomNumber)
    
    
    
    
  })

  socket.on("ready",(roomNumber)=> {
    socket.to(roomNumber).emit("ready")
    
    
    
    
    
  })

  socket.on("posloRijec",(data)=> {
    
    
    

    for(let i=0;i<gameStates.length;i++)
    if(gameStates[i].roomid===data.room) {
    if(gameStates[i].game.player1.id===socket.id) {
      gameStates[i].game.player1.state[data.sektorbr].sektor.rijec=data.word
      index=gameStates[i].game.player1.rijeci.indexOf(data.word)
      
      gameStates[i].game.player1.rijeci.splice(index,1)
      gameStates[i].game.player1.rijeci.push(rword.generate(1,{length:"4-10"}))
    }

    if(gameStates[i].game.player2.id===socket.id) {

      gameStates[i].game.player2.state[data.sektorbr].sektor.rijec=data.word
      index=gameStates[i].game.player2.rijeci.indexOf(data.word)
      gameStates[i].game.player2.rijeci.splice(index,1)
      
      gameStates[i].game.player2.rijeci.push(rword.generate(1,{length:"4-10"}))

    
    }



  }

    
     })

     socket.on("posloBrzuRijec",(data)=> {
    
    
    

      for(let i=0;i<gameStates.length;i++)
      if(gameStates[i].roomid===data.room) {
      if(gameStates[i].game.player1.id===socket.id) {
        gameStates[i].game.player1.state[data.sektorbr].sektor.rijec=data.word+"F"
        index=gameStates[i].game.player1.rijeci.indexOf(data.word)
        
        gameStates[i].game.player1.rijeci.splice(index,1)
        gameStates[i].game.player1.rijeci.push(rword.generate(1,{length:"4-10"}))
      }
  
      if(gameStates[i].game.player2.id===socket.id) {
  
        gameStates[i].game.player2.state[data.sektorbr].sektor.rijec=data.word+"F"
        index=gameStates[i].game.player2.rijeci.indexOf(data.word)
        gameStates[i].game.player2.rijeci.splice(index,1)
        
        gameStates[i].game.player2.rijeci.push(rword.generate(1,{length:"4-10"}))
  
      
      }
  
  
  
    }
  
      
       })

     socket.on("reversoRijec",(data)=>{
      console.log(data.pos)
      for(let i=0;i<gameStates.length;i++)
      if(gameStates[i].roomid===data.room) {
      if(gameStates[i].game.player1.id===socket.id) {
        
        gameStates[i].game.player1.state[data.sektorbr].sektor.rijec=data.word.split(" ")[0]
        gameStates[i].game.player1.state[data.sektorbr].sektor.posto=data.pos
        gameStates[i].game.player2.state[data.sektorbr].sektor.rijec=""
        gameStates[i].game.player1.bodovi-=10

        
        
        
        
      }
  
      if(gameStates[i].game.player2.id===socket.id) {
  
        gameStates[i].game.player2.state[data.sektorbr].sektor.rijec=data.word.split(" ")[0]
        gameStates[i].game.player2.state[data.sektorbr].sektor.posto=data.pos
        gameStates[i].game.player1.state[data.sektorbr].sektor.rijec=""
        gameStates[i].game.player2.bodovi-=10
  
      
      }
  
  
  
    }



     })

  socket.on("smanjiBodove",(data)=>{

    for(let i=0;i<gameStates.length;i++)
      if(gameStates[i].roomid===data.room) {
      if(gameStates[i].game.player1.id===socket.id) {
        
        gameStates[i].game.player1.bodovi-=data.kolko

        
        
        
        
      }
  
      if(gameStates[i].game.player2.id===socket.id) {
  
        
        gameStates[i].game.player2.bodovi-=data.kolko
  
      
      }
  
  
  
    }


    


  })

  
  



  socket.on("gg",(data)=> {
    var izbaci;
    for(let i=0;i<gameStates.length;i++)
    if(gameStates[i].roomid===data.room) {
      izbaci=i
   
  }

  gameStates.splice(izbaci,1)

  for(let i=0;i<rooms.length;i++)
  if(rooms[i].roomid===data.room) {
    izbaci=i
 
}
rooms.splice(izbaci,1)
    
    
    
    
    
  })

  socket.on("ubioRijec",(data)=> {
    
    for(let i=0;i<gameStates.length;i++)
    if(gameStates[i].roomid===data.room) {
    if(gameStates[i].game.player1.id===socket.id) {
      gameStates[i].game.player2.state[data.sektor].sektor.rijec=""
      gameStates[i].game.player1.bodovi+=data.word.length
    }

    if(gameStates[i].game.player2.id===socket.id) {

      gameStates[i].game.player1.state[data.sektor].sektor.rijec=""
      gameStates[i].game.player2.bodovi+=data.word.length
    
    }
    socket.to(data.room).emit("smrtRijeci",data)


  }
    
    
    
    
    
  })

  socket.on("check",()=> {
    console.log(socket.id)
    for(let i = 0;i<rooms.length;i++) {
      
      if(socket.id===rooms[i].players.player1.id ||
        socket.id===rooms[i].players.player2.id )
        console.log("true",rooms[i].roomid)
      
    
    }
  })

});


function updateLobby () {
  setInterval(()=> {
    for(let i = 0;i<lobbyPlayers.length;i++) {
      io.to(lobbyPlayers[i].id).emit("lobbyInf",lobbyPlayers);
      
    
    }
   
   

  },1000)

}

function updateGameStates() {
  setInterval(()=> {
    for(let i = 0;i<gameStates.length;i++) { 
       // ako je nekom health 0 proglasi pobjednika
       if(gameStates[i].game.player1.life<=0)
       gameStates[i].game.winner=onlinePlayers.filter((p)=> p.id===gameStates[i].game.player2.id)[0].username
     if(gameStates[i].game.player2.life<=0)
       gameStates[i].game.winner=onlinePlayers.filter((p)=> p.id===gameStates[i].game.player1.id)[0].username
      
      
      
      
      
      
      
      for(let j = 0;j<4;j++) {

        // ako postoji rijec u sektoru updejtaj joj poziciju a ako nema rijeci postavi preden postotak na 0
        if(gameStates[i].game.player1.state[j].sektor.rijec=="")
        gameStates[i].game.player1.state[j].sektor.posto=0
        else if (gameStates[i].game.player1.state[j].sektor.rijec.slice(-1)=="F")
        gameStates[i].game.player1.state[j].sektor.posto+=0.3
        else 
        gameStates[i].game.player1.state[j].sektor.posto+=0.2


         if(gameStates[i].game.player2.state[j].sektor.rijec=="")
        gameStates[i].game.player2.state[j].sektor.posto=0
        else if (gameStates[i].game.player2.state[j].sektor.rijec.slice(-1)=="F")
        gameStates[i].game.player2.state[j].sektor.posto+=0.3
        else
        gameStates[i].game.player2.state[j].sektor.posto+=0.2


      //ako je rijec dosla do 100 posto sirine unisti ju i smanji protivniku health za broj rijeci u njoj
      
      if(gameStates[i].game.player1.state[j].sektor.posto>=100){
      
      gameStates[i].game.player2.life-=gameStates[i].game.player1.state[j].sektor.rijec.length
      gameStates[i].game.player1.state[j].sektor.rijec=""

      if(gameStates[i].game.player2.life<=0)
      gameStates[i].game.player2.life=0  
       }

       if(gameStates[i].game.player2.state[j].sektor.posto>=100){
        gameStates[i].game.player1.life-=gameStates[i].game.player2.state[j].sektor.rijec.length
        gameStates[i].game.player2.state[j].sektor.rijec=""

        if(gameStates[i].game.player1.life<=0)
        gameStates[i].game.player1.life=0  
         }
     

      
      
      } 

    
    
  
        


        

        
      
      
    
    }},1000/serverFPS)




}

function updateGame () {
  setInterval(()=> {
    for(let i = 0;i<rooms.length;i++) {
      gameInfo=gameStates.filter((game)=>game.roomid===rooms[i].roomid)
      io.in(rooms[i].roomid).emit("gameInfo",gameInfo[0].game);
      
    
    }
   
   

  },1000/serverFPS)

}


server.listen(process.env.PORT, () => {
  console.log('lyistening on :4000');
  updateLobby()
  updateGameStates()
  updateGame()
});


