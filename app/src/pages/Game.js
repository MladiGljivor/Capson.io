import socket from "../components/Socket"

import React, { useRef, useEffect, useState } from 'react'
import "../start.css"
import slika from "../imgs/slova.png"
import wordDeath from "../imgs/wordDeath.png"
import Winner from "../components/Winner"
import { useNavigate } from 'react-router-dom'
import crvena from"../imgs/crvenaSlova.jpg"
import plava from"../imgs/plavaSlova.jpg"
import zelena from"../imgs/zelenaSlova.jpg"

//TODO popravi da se moze reversat i fast rijec u 1 2 i 3 sektoru i dodaj sendall , nakon toga prvi deploy idgaf

const FPS = 120;
const serverFPS = 5;





const crvenaSlova = new Image()
crvenaSlova.src=crvena
const zelenaSlova = new Image()
zelenaSlova.src=zelena
const plavaSlova=new Image()
plavaSlova.src=plava
const slova = new Image()
slova.src=slika
const wrdDeath=new Image()
wrdDeath.src=wordDeath;

const Game = () => {
  const navigate = useNavigate()

  const [crtaj,setCrtaj] = useState(0)

  

  const [gameInfo,setGameInfo]= useState({})
  const [myStateInfo,setMyStateInfo] = useState({})
  const [enemyStateInfo,setEnemyStateInfo] = useState({})
  const [myLife,setMyLife] = useState(100)
  const [enemyLife,setEnemyLife] = useState(100)
  const [myBodovi,setMyBodovi]= useState(0)
  const [enemyBodovi,setEnemyBodovi] = useState(0)
  const[rijeci,setRijeci] = useState([])
  const[winner,setWinner] = useState("")
  const[counter,setCounter]=useState(0)
  const[counter1,setCounter1]=useState(0)
  const[counter2,setCounter2]=useState(0)
  const[counter3,setCounter3]=useState(0)


  const[counterEnemy,setCounterEnemy]=useState(0)
  const[counterEnemy1,setCounterEnemy1]=useState(0)
  const[counterEnemy2,setCounterEnemy2]=useState(0)
  const[counterEnemy3,setCounterEnemy3]=useState(0)

  

    const [fontSize,setFontSize]=useState(40);
    

    const [starimypos0,setStariMyPos0] = useState(0)
    const [starimypos1,setStariMyPos1] = useState(0)
    const [starimypos2,setStariMyPos2] = useState(0)
    const [starimypos3,setStariMyPos3] = useState(0)

    const [starienemypos0,setStariEnemyPos0] = useState(0)
    const [starienemypos1,setStariEnemyPos1] = useState(0)
    const [starienemypos2,setStariEnemyPos2] = useState(0)
    const [starienemypos3,setStariEnemyPos3] = useState(0)

    const [sounter,setSounter] = useState(0)
    const [sounter1,setSounter1] = useState(0)
    const [sounter2,setSounter2] = useState(0)
    const [sounter3,setSounter3] = useState(0)
    

    const [mypos0,setMyPos0]=useState(0)
    const [mypos1,setMyPos1]=useState(0)
    const [mypos2,setMyPos2]=useState(0)
    const [mypos3,setMyPos3]=useState(0)
    const [enemypos0,setEnemyPos0]=useState(0)
    const [enemypos1,setEnemyPos1]=useState(0)
    const [enemypos2,setEnemyPos2]=useState(0)
    const [enemypos3,setEnemyPos3]=useState(0)
    const [currentSektor,setCurrentSektor] = useState(0)
    const [sektor,setSektor] = useState(0)
    const [rijec,setRijec] = useState("")
    const [sektor0_rijec,setSektor0Rijec] = useState("")
    const [sektor1_rijec,setSektor1Rijec] = useState("")
    const [sektor2_rijec,setSektor2Rijec] = useState("")
    const [sektor3_rijec,setSektor3Rijec] = useState("")
    const [sektor0_rijec_enemy,setSektor0RijecEnemy]=useState("")
    const [sektor1_rijec_enemy,setSektor1RijecEnemy]=useState("")
    const [sektor2_rijec_enemy,setSektor2RijecEnemy]=useState("")
    const [sektor3_rijec_enemy,setSektor3RijecEnemy]=useState("")
    const [sektor0_aktivan,setSektor0Aktivan]=useState(false)
    const [sektor1_aktivan,setSektor1Aktivan]=useState(false)
    const [sektor2_aktivan,setSektor2Aktivan]=useState(false)
    const [sektor3_aktivan,setSektor3Aktivan]=useState(false)
    const [enter,setEnter]=useState(false)
    
    const[ArrowUp,setAU] = useState(false)
    const[ArrowDown,setAD] = useState(false)

    const[smrt,setSmrt]=useState(false)
    const[smrtnaPos,setSmrtnaPos] = useState(0)
    const[smrtnaWord,setSmrtnaWord] = useState("")
    const[brSmrti,setBrSmrti] = useState(0)
    
    const[smrtnaWord1,setSmrtnaWord1] = useState("")
    const[brSmrti1,setBrSmrti1] = useState(0)
    const[smrt1,setSmrt1]=useState(false)
    const[smrtnaPos1,setSmrtnaPos1] = useState(0)
    
    const[smrtnaWord2,setSmrtnaWord2] = useState("")
    const[brSmrti2,setBrSmrti2] = useState(0)
    const[smrt2,setSmrt2]=useState(false)
    const[smrtnaPos2,setSmrtnaPos2] = useState(0)
    
    const[smrtnaWord3,setSmrtnaWord3] = useState("")
    const[brSmrti3,setBrSmrti3] = useState(0)
    const[smrt3,setSmrt3]=useState(false)
    const[smrtnaPos3,setSmrtnaPos3] = useState(0)

    const[smrtEnemy,setSmrtEnemy] = useState(false)
    const[smrtnaWordEnemy,setSmrtnaWordEnemy] = useState("")
    const[brSmrtiEnemy,setBrSmrtiEnemy] = useState(0)
    const[smrtnaPosEnemy,setSmrtnaPosEnemy] = useState(0)

    const[smrtEnemy1,setSmrtEnemy1] = useState(false)
    const[smrtnaWordEnemy1,setSmrtnaWordEnemy1] = useState("")
    const[brSmrtiEnemy1,setBrSmrtiEnemy1] = useState(0)
    const[smrtnaPosEnemy1,setSmrtnaPosEnemy1] = useState(0)

    const[smrtEnemy2,setSmrtEnemy2] = useState(false)
    const[smrtnaWordEnemy2,setSmrtnaWordEnemy2] = useState("")
    const[brSmrtiEnemy2,setBrSmrtiEnemy2] = useState(0)
    const[smrtnaPosEnemy2,setSmrtnaPosEnemy2] = useState(0)

    const[smrtEnemy3,setSmrtEnemy3] = useState(false)
    const[smrtnaWordEnemy3,setSmrtnaWordEnemy3] = useState("")
    const[brSmrtiEnemy3,setBrSmrtiEnemy3] = useState(0)
    const[smrtnaPosEnemy3,setSmrtnaPosEnemy3] = useState(0)

    const[resizePromjena,setResizePromjena] = useState(false)
    const[openModal,setOpenModal] = useState(false)

    const [drawState,setDraw]= useState(false);

    function closeModal() {
      setOpenModal(false)
    }

    function gg() {
      socket.emit("gg",{"room":localStorage.getItem("activeRoom")})
      navigate("/lobby")
    }

    function lerp(staripos,novipos,counter) {
      if(Math.abs(staripos-novipos)>0.05*document.getElementById("myCanvas").width)
        return novipos

      return staripos+((novipos-staripos)*counter)



    }

    useEffect(()=> {

      const interval = setInterval(()=> {
        setCrtaj(crtaj+1)
        draw()
      },1000/FPS)

      return()=> clearInterval(interval)
    },[crtaj])

    useEffect(()=>{
      
      if(gameInfo.player1){
      updateGame()
      //draw()
      if(enter) {
        handleEnter(rijec,sektor)
      }
      if(ArrowUp) {
        obradaAU()
        setAU(false)
      }

      if(ArrowDown ) {
        obradaAD()
        setAD(false)
      }

      if(resizePromjena) {
        resizeCanvas()
        setResizePromjena(false)
      }
      }
      
      

    
      

    },[gameInfo])

    function dogodioseresize() {
      setResizePromjena(true)
    }

    function obradaAU() {

      if(sektor===0)
      setSektor(3)
      if(sektor===1)
      setSektor(0)
      if(sektor===2)
      setSektor(1)
      if(sektor===3)
      setSektor(2)

    }

    function obradaAD() {
      if(sektor===0)
      setSektor(1)
      if(sektor===1)
      setSektor(2)
      if(sektor===2)
      setSektor(3)
      if(sektor===3)
      setSektor(0)

    }

    
    useEffect(() => {
        socket.on("gameInfo",(game)=>{
          setGameInfo(game)
          
          if(game.player1.id==socket.id){
            
          setMyStateInfo(game.player1.state)
          setEnemyStateInfo(game.player2.state)
          setMyBodovi(game.player1.bodovi)
          setEnemyBodovi(game.player2.bodovi)
          setMyLife(game.player1.life)
          setEnemyLife(game.player2.life)  
          setRijeci(game.player1.rijeci)
          
        
        
        }

        


          if(game.player2.id==socket.id){
            setMyStateInfo(game.player2.state)
            setEnemyStateInfo(game.player1.state)
            setMyBodovi(game.player2.bodovi)
            setEnemyBodovi(game.player1.bodovi)
            setMyLife(game.player2.life)
            setEnemyLife(game.player1.life)  
            setRijeci(game.player2.rijeci)

          }

          setWinner(game.winner)
          
          })
        //socket.emit("check")

        socket.on("smrtRijeci",(data)=>{

          if(data.sektor===0) {
          setSmrtEnemy(true)
          setSmrtnaWordEnemy(data.word)
          setSmrtnaPosEnemy(data.pos)
        }

        if(data.sektor===1) {
          setSmrtEnemy1(true)
          setSmrtnaWordEnemy1(data.word)
          setSmrtnaPosEnemy1(data.pos)
        }

        if(data.sektor===2) {
          setSmrtEnemy2(true)
          setSmrtnaWordEnemy2(data.word)
          setSmrtnaPosEnemy2(data.pos)
        }

        if(data.sektor===3) {
          setSmrtEnemy3(true)
          setSmrtnaWordEnemy3(data.word)
          setSmrtnaPosEnemy3(data.pos)
        }
          

        })

        
        
        
        var c = document.getElementById("myCanvas");
        
        
        var Canvasctx = c.getContext("2d");
        
        

        // Draw canvas border for the first time.
        pocetniresize()
        window.addEventListener('resize', dogodioseresize, false); 
        window.addEventListener("keydown",function(e) {
          if(e.key==="ArrowUp") {
            setAU(true)
      
              setRijec("")}
      
          if(e.key==="ArrowDown") {
            setAD(true)

              setRijec("")
          
                  }     
         
          
          
        
          
                  if((e.key.match(/[a-z]/i) && e.key.length===1 && e.key.toUpperCase()!=e.key) || e.key===" ")
                      setRijec(r=>r+e.key)

                  if(e.key=="Enter") {
                    
                    
                      
                    setEnter(true)
                      
                  }
          
        })
          
       
          
        
      

        
        
        
      }, []);

     
      
      
      
        
  

      function pobjeda() {
        setOpenModal(true);

      }

      function updateGame() {
        if(winner!=""){
          
          pobjeda()
        }
        
        setFontSize(document.getElementById("myCanvas").height/16)
        
       var sirina=document.getElementById("myCanvas").width
        //pos od servera je postotak a pos od clienta je x kordinata rijeci u sektoru
        
        setStariMyPos0(mypos0)
      

        setStariMyPos1(mypos1)
        setStariMyPos2(mypos2)
        setStariMyPos3(mypos3)

        
        setStariEnemyPos0(enemypos0)

        setStariEnemyPos1(enemypos1)
        setStariEnemyPos2(enemypos2)
        setStariEnemyPos3(enemypos3)

        

        setSounter(s=>0)
        setSounter1(s=>0)
        setSounter2(s=>0)
        setSounter3(s=>0)





       setMyPos0(myStateInfo[0].sektor.posto/100 * sirina)
       setMyPos1(myStateInfo[1].sektor.posto/100 * sirina)
       setMyPos2(myStateInfo[2].sektor.posto/100 * sirina)
       setMyPos3(myStateInfo[3].sektor.posto/100 * sirina)
        setEnemyPos0(sirina-(enemyStateInfo[0].sektor.posto/100)*sirina)
        setEnemyPos1(sirina-(enemyStateInfo[1].sektor.posto/100)*sirina)
        setEnemyPos2(sirina-(enemyStateInfo[2].sektor.posto/100)*sirina)
        setEnemyPos3(sirina-(enemyStateInfo[3].sektor.posto/100)*sirina)

        
        
          

        setSektor0Rijec(myStateInfo[0].sektor.rijec)
        setSektor1Rijec(myStateInfo[1].sektor.rijec)
        setSektor2Rijec(myStateInfo[2].sektor.rijec)
        setSektor3Rijec(myStateInfo[3].sektor.rijec)
        
        
       
        
        
        setSektor0RijecEnemy(enemyStateInfo[0].sektor.rijec)
        setSektor1RijecEnemy(enemyStateInfo[1].sektor.rijec)
        setSektor2RijecEnemy(enemyStateInfo[2].sektor.rijec)
        setSektor3RijecEnemy(enemyStateInfo[3].sektor.rijec)

       

      
        
        
        if(sektor0_rijec==="" && sektor0_rijec_enemy ==="")
          setSektor0Aktivan(false)
        
        else
          setSektor0Aktivan(true)

        if(sektor1_rijec!="" || sektor1_rijec_enemy !="")
        setSektor1Aktivan(true)

        else 
        setSektor1Aktivan(false)
          
        if(sektor2_rijec!="" || sektor2_rijec_enemy !="")
        setSektor2Aktivan(true)
        
        else
        setSektor2Aktivan(false)

        if(sektor3_rijec!="" || sektor3_rijec_enemy !="")
        setSektor3Aktivan(true)
        
        else
        setSektor3Aktivan(false)

          

        
        


      }

      function handleEnter(word) {

        if(sektor===0 && sektor0_rijec_enemy!="" && ((word===sektor0_rijec_enemy && sektor0_rijec_enemy.slice(-1)!="F") || (word===sektor0_rijec_enemy.substring(0,sektor0_rijec_enemy.length-1) && sektor0_rijec_enemy.slice(-1)==="F"))) {
          
          socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),sektor,word,"pos":enemypos0})
          setSmrt(true)
          
          setSmrtnaPos(enemypos0)
          setSmrtnaWord(word)
        }
        if(sektor===1 && sektor1_rijec_enemy!=""  && ((word===sektor1_rijec_enemy && sektor1_rijec_enemy.slice(-1)!="F") || (word===sektor1_rijec_enemy.substring(0,sektor1_rijec_enemy.length-1) && sektor1_rijec_enemy.slice(-1)==="F"))) {
          socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),sektor,word,"pos":enemypos1})
          setSmrt1(true)
          
          setSmrtnaPos1(enemypos1)
          setSmrtnaWord1(word)
        }
        if(sektor===2 && sektor2_rijec_enemy!="" && ((word===sektor2_rijec_enemy && sektor2_rijec_enemy.slice(-1)!="F") || (word===sektor2_rijec_enemy.substring(0,sektor2_rijec_enemy.length-1) && sektor2_rijec_enemy.slice(-1)==="F"))) {
          socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),sektor,word,"pos":enemypos2})
          setSmrt2(true)
          
          setSmrtnaPos2(enemypos2)
          setSmrtnaWord2(word)
        }

        if(sektor===3 && sektor3_rijec_enemy!="" && ((word===sektor3_rijec_enemy && sektor3_rijec_enemy.slice(-1)!="F") || (word===sektor3_rijec_enemy.substring(0,sektor3_rijec_enemy.length-1) && sektor3_rijec_enemy.slice(-1)==="F"))) {
          socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),sektor,word,"pos":enemypos3})
          setSmrt3(true)
          
          setSmrtnaPos3(enemypos3)
          setSmrtnaWord3(word)
        }
        
        if(sektor==0 && !sektor0_aktivan && word!="" && rijeci.includes(word)) {
       
        socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":0}))}
        if(sektor==1 && !sektor1_aktivan && word!="" && rijeci.includes(word)) {
       
        socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":1}))}
        if(sektor==2 && !sektor2_aktivan && word!="" && rijeci.includes(word)) {
        
      socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":2}))}

        if(sektor==3 && !sektor3_aktivan && word!="" && rijeci.includes(word)) {
        
        socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":3}))}



        if(sektor==0 && !sektor0_aktivan && word!="" && rijeci.includes(word.split(" ")[0]) && word.split(" ")[1] ==="f" && myBodovi>=10) {
          socket.emit("smanjiBodove",{"room":localStorage.getItem("activeRoom"),"kolko":10})
          socket.emit("posloBrzuRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[0],"sektorbr":0}))}

          if(sektor==1 && !sektor1_aktivan && word!="" && rijeci.includes(word.split(" ")[0]) && word.split(" ")[1] ==="f" && myBodovi>=10) {
            socket.emit("smanjiBodove",{"room":localStorage.getItem("activeRoom"),"kolko":10})
          socket.emit("posloBrzuRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[0],"sektorbr":1}))}

          if(sektor==2 && !sektor2_aktivan && word!="" && rijeci.includes(word.split(" ")[0]) && word.split(" ")[1] ==="f" && myBodovi>=10) {
            socket.emit("smanjiBodove",{"room":localStorage.getItem("activeRoom"),"kolko":10})
          
        socket.emit("posloBrzuRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[0],"sektorbr":2}))}
  
          if(sektor==3 && !sektor3_aktivan && word!="" && rijeci.includes(word.split(" ")[0]) && word.split(" ")[1] ==="f" && myBodovi>=10) {
            
            socket.emit("smanjiBodove",{"room":localStorage.getItem("activeRoom"),"kolko":10})
          socket.emit("posloBrzuRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[0],"sektorbr":3}))}





        if(sektor==0 && sektor0_aktivan && ((word.split(" ")[0]===sektor0_rijec_enemy && sektor0_rijec_enemy.slice(-1)!="F") ||(word.split(" ")[0]===sektor0_rijec_enemy.substring(0,sektor0_rijec_enemy.length-1) && sektor0_rijec_enemy.slice(-1)==="F"))  && word.split(" ")[1]==="r" && sektor0_rijec_enemy!="" && myBodovi>=10) {
          
          socket.emit("reversoRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":0,"pos":100*(enemypos0-word.split(" ")[0].length*fontSize)/document.getElementById("myCanvas").width}))}

          if(sektor==1 && sektor1_aktivan &&  word.split(" ")[1]==="r" && sektor1_rijec_enemy!="" && myBodovi>=10 && ((word.split(" ")[0]===sektor1_rijec_enemy && sektor1_rijec_enemy.slice(-1)!="F") ||(word.split(" ")[0]===sektor1_rijec_enemy.substring(0,sektor1_rijec_enemy.length-1) && sektor1_rijec_enemy.slice(-1)==="F")) ) {
         
          socket.emit("reversoRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":1,"pos":100*(enemypos1-word.split(" ")[0].length*fontSize)/document.getElementById("myCanvas").width}))}
          if(sektor==2 && sektor2_aktivan &&  word.split(" ")[1]==="r" && sektor2_rijec_enemy!="" && myBodovi>=10 && ((word.split(" ")[0]===sektor2_rijec_enemy && sektor2_rijec_enemy.slice(-1)!="F") ||(word.split(" ")[0]===sektor2_rijec_enemy.substring(0,sektor2_rijec_enemy.length-1) && sektor2_rijec_enemy.slice(-1)==="F")) ) {
          
        socket.emit("reversoRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":2,"pos":100*(enemypos2-word.split(" ")[0].length*fontSize)/document.getElementById("myCanvas").width}))}
  
          if(sektor==3 && sektor3_aktivan  && word.split(" ")[1]==="r" && sektor3_rijec_enemy!="" && myBodovi>=10 && ((word.split(" ")[0]===sektor3_rijec_enemy && sektor3_rijec_enemy.slice(-1)!="F") ||(word.split(" ")[0]===sektor3_rijec_enemy.substring(0,sektor3_rijec_enemy.length-1) && sektor3_rijec_enemy.slice(-1)==="F")) ) {
          
          socket.emit("reversoRijec",({"room":localStorage.getItem("activeRoom"),"word":word,"sektorbr":3,"pos":100*(enemypos3-word.split(" ")[0].length*fontSize)/document.getElementById("myCanvas").width}))}

        if(word==="destroyall" && myBodovi>=50) {
          if(sektor0_rijec_enemy!="") {
            socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),"sektor":0,"word":sektor0_rijec_enemy,"pos":enemypos0})
            setSmrt(true)
          
            setSmrtnaPos(enemypos0)
            setSmrtnaWord(sektor0_rijec_enemy)
          }
          if(sektor1_rijec_enemy!="") {
            socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),"sektor":1,"word":sektor1_rijec_enemy,"pos":enemypos1})
            setSmrt1(true)
          
            setSmrtnaPos1(enemypos1)
            setSmrtnaWord1(sektor1_rijec_enemy)
          }
          if(sektor2_rijec_enemy!="") {
            socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),"sektor":2,"word":sektor2_rijec_enemy,"pos":enemypos2})
            setSmrt2(true)
          
            setSmrtnaPos2(enemypos2)
            setSmrtnaWord2(sektor2_rijec_enemy)
          }
          if(sektor3_rijec_enemy!="") {
            socket.emit("ubioRijec",{"room":localStorage.getItem("activeRoom"),"sektor":3,"word":sektor3_rijec_enemy,"pos":enemypos3})
            setSmrt3(true)
          
            setSmrtnaPos3(enemypos3)
            setSmrtnaWord3(sektor3_rijec_enemy)
          }
          
          socket.emit("smanjiBodove",{"room":localStorage.getItem("activeRoom"),"kolko":50})

        }

        if(word.split(" ")[0]==="sendall" && myBodovi>=50 && rijeci.includes(word.split(" ")[1]) ) {
          if(!sektor0_aktivan) {
            socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[1],"sektorbr":0}))}
            
          
                      
          if(!sektor1_aktivan) {
            socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[1],"sektorbr":1}))}
           
          
          if(!sektor2_aktivan) {
            socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[1],"sektorbr":2}))}
           
          
          if(!sektor3_aktivan) {
            socket.emit("posloRijec",({"room":localStorage.getItem("activeRoom"),"word":word.split(" ")[1],"sektorbr":3}))}
           
          
          
          socket.emit("smanjiBodove",{"room":localStorage.getItem("activeRoom"),"kolko":50})

        }

      setEnter(false)
      setRijec(r=>"")
        

      }

      function drawSlovo(slovo,x,y,boja) {
        

        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");

        var   ascii = slovo.charCodeAt(0)-97
        var stupac= ascii%7
        var red=Math.ceil((ascii/7)+0.001)-1
       
          if(boja==="white")
          ctx.drawImage(slova,(slova.width/7)*stupac,(slova.height/4)*red-1,slova.width/7,slova.height/4,x,y,fontSize,fontSize)
          
          if(boja==="red") {
            ctx.drawImage(crvenaSlova,(crvenaSlova.width/7)*stupac,(crvenaSlova.height/4)*red-1,crvenaSlova.width/7,crvenaSlova.height/4,x,y,fontSize,fontSize)

          }
          
          ctx.beginPath();
          ctx.rect(x,y,fontSize, fontSize);
          ctx.stroke();
          

      }

      function pocetniresize() {

         var c = document.getElementById("myCanvas");
        
        
        var ctx1 = c.getContext("2d");
        
        
        document.getElementById("myCanvas").width = window.innerWidth;
        document.getElementById("myCanvas").height = window.innerHeight-150;
        setFontSize(document.getElementById("myCanvas").height/10)
        
        
        
        
  
    }

      function resizeCanvas() {
         
        
        
        var c = document.getElementById("myCanvas");
       
        
        var ctx = c.getContext("2d");
          
          document.getElementById("myCanvas").width = window.innerWidth;
          document.getElementById("myCanvas").height = window.innerHeight-150;
          
          setFontSize(document.getElementById("myCanvas").height/10)
          
         
          

         
    
      }
      
      function drawSektor(br) {

        var tko=""
        var offset=0;
        var word=""
        var pos=0;
        var countersek=0
       
      
        if(br==0) {
          if(sektor0_rijec!=""){
        
          word=sektor0_rijec
          pos=lerp(starimypos0,mypos0,sounter) 
          tko="ja"
         
        }
        else {
          word=sektor0_rijec_enemy
          pos=lerp(starienemypos0,enemypos0,sounter) 
          tko="enemy"
        }
       

        }
        if(br==1) {
          if(sektor1_rijec!=""){
        
            word=sektor1_rijec
            pos=lerp(starimypos1,mypos1,sounter1) 
            tko="ja"
          }
          else {
            word=sektor1_rijec_enemy
            pos=lerp(starienemypos1,enemypos1,sounter1) 
            tko="enemy"
          }
        
        }


        if(br==2) {
          if(sektor2_rijec!=""){
        
            word=sektor2_rijec
            pos=lerp(starimypos2,mypos2,sounter2) 
            tko="ja"
          }
          else {
            word=sektor2_rijec_enemy
            pos=lerp(starienemypos2,enemypos2,sounter2) 
            tko="enemy"
          }
          
        }
        if(br==3){ 
          if(sektor3_rijec!=""){
        
            word=sektor3_rijec
            pos=lerp(starimypos3,mypos3,sounter3) 
            tko="ja"
          }
          else {
            word=sektor3_rijec_enemy
            pos=lerp(starienemypos3,enemypos3,sounter3) 
            tko="enemy"
          }
         
        }

          if(word==="")
            return

            
          if(tko==="ja"){
            if(word.slice(-1)==="F"){

              for(let i = 0;i<word.length-1;i++) {
           
                drawSlovo(word.charAt(i),offset+pos,(br)*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,"red")  
                offset+=fontSize
              }

            }
            else{
            
          for(let i = 0;i<word.length;i++) {
           
            drawSlovo(word.charAt(i),offset+pos,(br)*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,"white")  
            offset+=fontSize
          }
        }
        }
          if(tko=="enemy") {

            if(word.slice(-1)==="F") {
              for(let i =word.length-2;i>=0;i--) {
           
                drawSlovo(word.charAt(i),pos-fontSize-offset,(br)*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,"red")  
                offset+=fontSize
              } 
            }
            else{

            for(let i =word.length-1;i>=0;i--) {
           
              drawSlovo(word.charAt(i),pos-fontSize-offset,(br)*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,"white")  
              offset+=fontSize
            } }

          }

          

      }
      function animirajSmrt() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
        

      

        if(brSmrti===6){
        setSmrt(false)
        setBrSmrti(0)
        setCounter(0)
        
      }

        else{
              if((counter%6)===3)
              {
                setCounter(0)
              setBrSmrti((brSmrti)=>brSmrti+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWord.length;i++) {
                if(brSmrti===5)
                ctx.drawImage(wrdDeath,brSmrti*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,smrtnaPos-offset-fontSize,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti==4)
                ctx.drawImage(wrdDeath,brSmrti*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos-offset-fontSize,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti==2)
                ctx.drawImage(wrdDeath,brSmrti*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos-offset-fontSize,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrti*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos-offset-fontSize,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }

      function animirajSmrt1() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
        

      

        if(brSmrti1===6){
        setSmrt1(false)
        setBrSmrti1(0)
        setCounter1(0)
        
      }

        else{
              if((counter1%6)===3)
              {
                setCounter1(0)
              setBrSmrti1((brSmrti1)=>brSmrti1+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWord1.length;i++) {
                if(brSmrti1===5)
                ctx.drawImage(wrdDeath,brSmrti1*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,smrtnaPos1/-offset-fontSize,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti1==4)
                ctx.drawImage(wrdDeath,brSmrti1*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos1-offset-fontSize,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti1==2)
                ctx.drawImage(wrdDeath,brSmrti1*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos1-offset-fontSize,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrti1*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos1-offset-fontSize,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }

      function animirajSmrt2() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
        


      

        if(brSmrti2===6){
        setSmrt2(false)
        setBrSmrti2(0)
        setCounter2(0)
        
      }

        else{
              if((counter2%6)===3)
              {
                setCounter2(0)
              setBrSmrti2((brSmrti2)=>brSmrti2+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWord2.length;i++) {
                if(brSmrti2===5)
                ctx.drawImage(wrdDeath,brSmrti2*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,smrtnaPos2-offset-fontSize,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti2==4)
                ctx.drawImage(wrdDeath,brSmrti2*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos2-offset-fontSize,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti2==2)
                ctx.drawImage(wrdDeath,brSmrti2*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos2-offset-fontSize,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrti2*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos2-offset-fontSize,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }

      function animirajSmrt3() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
       

      

        if(brSmrti3===6){
        setSmrt3(false)
        setBrSmrti3(0)
        setCounter3(0)
        
      }

        else{
              if((counter3%6)===3)
              {
                setCounter3(0)
              setBrSmrti3((brSmrti3)=>brSmrti3+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWord3.length;i++) {
                if(brSmrti3===5)
                ctx.drawImage(wrdDeath,brSmrti3*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,smrtnaPos3-offset-fontSize,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti3==4)
                ctx.drawImage(wrdDeath,brSmrti3*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos3-offset-fontSize,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti3==2)
                ctx.drawImage(wrdDeath,brSmrti3*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos3-offset-fontSize,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrti3*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,smrtnaPos3-offset-fontSize,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }


      }

      function animirajSmrtEnemy() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
        

      

        if(brSmrtiEnemy===6){
        setSmrtEnemy(false)
        setBrSmrtiEnemy(0)
        setCounterEnemy(0)
        
      }

        else{
              if((counterEnemy%6)===3)
              {
                setCounterEnemy(0)
              setBrSmrtiEnemy((brSmrtiEnemy)=>brSmrtiEnemy+1)
            }

              var offset=0
              
              
              for(let i=0;i<smrtnaWordEnemy.length;i++) {
                if(brSmrtiEnemy===5)
                ctx.drawImage(wrdDeath,brSmrtiEnemy*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti==4)
                ctx.drawImage(wrdDeath,brSmrtiEnemy*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrti==2)
                ctx.drawImage(wrdDeath,brSmrtiEnemy*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrtiEnemy*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,0*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }

      function animirajSmrtEnemy1() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
        

      

        if(brSmrtiEnemy1===6){
        setSmrtEnemy1(false)
        setBrSmrtiEnemy1(0)
        setCounterEnemy1(0)
        
      }

        else{
              if((counterEnemy1%6)===3)
              {
                setCounterEnemy1(0)
              setBrSmrtiEnemy1((brSmrtiEnemy1)=>brSmrtiEnemy1+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWordEnemy1.length;i++) {
                if(brSmrtiEnemy1===5)
                ctx.drawImage(wrdDeath,brSmrtiEnemy1*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy1/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrtiEnemy1==4)
                ctx.drawImage(wrdDeath,brSmrtiEnemy1*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy1/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrtiEnemy1==2)
                ctx.drawImage(wrdDeath,brSmrtiEnemy1*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy1/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrtiEnemy1*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy1/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,1*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }

      function animirajSmrtEnemy2() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
        


      

        if(brSmrtiEnemy2===6){
        setSmrtEnemy2(false)
        setBrSmrtiEnemy2(0)
        setCounterEnemy2(0)
        
      }

        else{
              if((counterEnemy2%6)===3)
              {
                setCounterEnemy2(0)
              setBrSmrtiEnemy2((brSmrtiEnemy2)=>brSmrtiEnemy2+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWordEnemy2.length;i++) {
                if(brSmrtiEnemy2===5)
                ctx.drawImage(wrdDeath,brSmrtiEnemy2*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy2/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrtiEnemy2==4)
                ctx.drawImage(wrdDeath,brSmrtiEnemy2*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy2/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrtiEnemy2==2)
                ctx.drawImage(wrdDeath,brSmrtiEnemy2*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy2/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrtiEnemy2*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy2/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,2*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }

      function animirajSmrtEnemy3() {
        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
       

      

        if(brSmrtiEnemy3===6){
        setSmrtEnemy3(false)
        setBrSmrtiEnemy3(0)
        setCounterEnemy3(0)
        
      }

        else{
              if((counterEnemy3%6)===3)
              {
                setCounterEnemy3(0)
              setBrSmrtiEnemy3((brSmrtiEnemy3)=>brSmrtiEnemy3+1)
            }

              var offset=0
              for(let i=0;i<smrtnaWordEnemy3.length;i++) {
                if(brSmrtiEnemy3===5)
                ctx.drawImage(wrdDeath,brSmrtiEnemy3*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/6,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy3/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrtiEnemy3==4)
                ctx.drawImage(wrdDeath,brSmrtiEnemy3*wrdDeath.width/6+10,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy3/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else if(brSmrtiEnemy3==2)
                ctx.drawImage(wrdDeath,brSmrtiEnemy3*wrdDeath.width/6-17,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy3/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                else
                ctx.drawImage(wrdDeath,brSmrtiEnemy3*wrdDeath.width/6,(1/4)*wrdDeath.height,wrdDeath.width/7,(2/4)*wrdDeath.height,(1-(smrtnaPosEnemy3/document.getElementById("myCanvas").width))*document.getElementById("myCanvas").width+offset,3*document.getElementById("myCanvas").height/4+1.5*document.getElementById("myCanvas").height/16,fontSize,fontSize)
                offset+=fontSize
              }
        }

      }
      
      


      function draw() {
       
        //TODO SERVER SALJE PREDEN POSTOTAK POJEDINE RIJECI U SEKTORU I OBAVIJESTI SMRT I OBAVIJESTI BODOVE
        
       

        var c = document.getElementById("myCanvas");
        
        
        var ctx = c.getContext("2d");
        
       
        //ctx.drawImage(slova,0,0,slova.width/7,slova.height/4,200,50,50,50)
        ctx.clearRect(0,0, document.getElementById("myCanvas").width ,document.getElementById("myCanvas").height)
        
        ctx.beginPath();
        ctx.moveTo(0,document.getElementById("myCanvas").height/2 );
        ctx.lineTo( document.getElementById("myCanvas").width ,document.getElementById("myCanvas").height/2 );
        ctx.stroke();

        ctx.moveTo(0,document.getElementById("myCanvas").height/4 );
        ctx.lineTo( document.getElementById("myCanvas").width ,document.getElementById("myCanvas").height/4 );
        ctx.stroke();

        ctx.moveTo(0,3*document.getElementById("myCanvas").height/4 );
        ctx.lineTo( document.getElementById("myCanvas").width ,3*document.getElementById("myCanvas").height/4 );
        ctx.stroke();
        ctx.fillStyle="yellow"
        ctx.fillRect(0,(sektor)*document.getElementById("myCanvas").height/4,document.getElementById("myCanvas").width ,document.getElementById("myCanvas").height/4 )
            //TODO SMRT I OSTALE VARIJABLE MORAJU BIT POSEBNE ZA SVAKI SEKTOR I ZA ENEMYA I ZA SVAKI NJEGOV SEKTOR i counter za svakog i dodaj rijeci koje smije pisat DANAS!!!
            if(smrt) {
              setCounter((c)=>c+1)
              
              animirajSmrt()
              setSounter(0)
            }

            if(smrt1) {
              setCounter1((c)=>c+1)
              
              animirajSmrt1()
              setSounter1(0)
            }

            if(smrt2) {
              setCounter2((c)=>c+1)
            
              animirajSmrt2()
              setSounter2(0)
            }
            if(smrt3) {
              setCounter3((c)=>c+1)
              
              animirajSmrt3()
              setSounter3(0)
            }

            if(smrtEnemy) {
              setCounterEnemy((c)=>c+1)
              
              animirajSmrtEnemy()
              setSounter(0)
            }

            if(smrtEnemy1) {
              setCounterEnemy1((c)=>c+1)
              
              animirajSmrtEnemy1()
              setSounter1(0)
            }

            if(smrtEnemy2) {
              setCounterEnemy2((c)=>c+1)
            
              animirajSmrtEnemy2()
              setSounter2(0)
            }
            if(smrtEnemy3) {
              
              setCounterEnemy3((c)=>c+1)
              
              animirajSmrtEnemy3()
              setSounter3(0)
            }
            
            
            
            

            if(sounter>0.98){
            setSounter(s=>0)
          }

          
            drawSektor(0)
          
            if(sounter1>0.98)
            setSounter1(s=>0)

            drawSektor(1)
          
    
            if(sounter2>0.98)
            setSounter2(s=>0)
            drawSektor(2)
          
            if(sounter3>0.98)
            setSounter3(s=>0)
            drawSektor(3)


            if(sektor0_aktivan){
        
              
              setSounter(sounter=>sounter + serverFPS/FPS)
              
              }
  
              if(sektor1_aktivan){
          
                setSounter1(sounter1=>sounter1 + serverFPS/FPS)
                
                }
                if(sektor2_aktivan){
          
                  setSounter2(sounter2=>sounter2 + serverFPS/FPS)
                  
                  }
              
                  if(sektor3_aktivan){
          
                    setSounter3(sounter3=>sounter3 + serverFPS/FPS)
                    
                    }

            
          }
    
      return (
        <div>
          <Winner winner={winner} open={openModal} handleClose={closeModal} win={gg}/>
          <div className="life"><div className="t1"> CapCoins: {myBodovi}</div>   <div className="t1">{myLife} </div>                                 <div className="t2">{enemyLife} </div>                   <div className="t2"> CapCoins: {enemyBodovi}</div></div>
          <div className="life"> {rijeci.map((rijec)=><div className="t1" id={rijec}> {rijec} </div>)}</div>
          <canvas
            id="myCanvas"
           
            style={{ border: "1px solid black" }}
          >
            Your browser does not support the HTML canvas tag.
          </canvas>
          
          
        </div>
      );
    }
    
  export default Game;