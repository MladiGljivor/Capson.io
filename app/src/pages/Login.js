import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';





const Login = () => {

  const navigate=useNavigate()

  const [cookies, setCookie] = useCookies(['user']);
    const [username,setUsername] = useState("")
    const [pass,setPass] = useState("")
    const [error,setError] = useState("")
    const[promjena,setPromjena] = useState(false)

    useEffect(()=>{


      document.getElementById("username").focus()
      window.addEventListener("keydown",function(e) {
        if(e.key==="Enter") {
          setPromjena(true)
        }

        if(e.key==="ArrowDown") {
          document.getElementById("password").focus()
        }
        if(e.key==="ArrowUp") {
          document.getElementById("username").focus()
        }


      })
    


    },[])

    useEffect(()=>{
      if(promjena===true){
      Submit()
      setPromjena(false)}

    },[promjena])


    function onChangeUsername(e) {
      var input = e.target.value
      setUsername(input)

    }

    function onChangePass(e) {
      var input = e.target.value
      setPass(input)


    }

    async function test() {
      var data = {username,pass} 
      fetch("http://3.124.193.139:4000/login", {
        method: 'POST',
        
        credentials:"same-origin",
        headers: {
            "Accept":"application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
    })
      .then(function(response) {
       

          
          
        return response.json();
      }).then(function(data) {

        // `data` is the parsed version of the JSON returned from the above endpoint.
        if(data.authToken) {
             sessionStorage.setItem("JWT",data.authToken)
            sessionStorage.setItem("username",username)
          navigate("/lobby") }    // { "userId": 1, "id": 1, "title": "...", "body": "..." }

          else {
            setError(data.error)
          }
      });

      
    }


    async function sendCreds() {
      var data = {username,pass} 

      
      fetch("http://localhost:4000/login", {
        method: 'POST',
        
        credentials:"same-origin",
        headers: {
            "Accept":"application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
    }).then(res=>{if (res.status===200){

      
      navigate("/lobby")
    }
        
      })
  }

    function Submit() {

     // sendCreds()
     // console.log(Cookies.get("Name"))
      test()
    }
  
    return <div className="loginpage"><div className="login">
      <div className='signmein'>{error}</div>
        
            <h1> Username</h1> 
            <input className='input' id='username' name="username" onChange={onChangeUsername} />
            <h1> Password</h1>
            <input className="input" id='password' type="password" onChange={onChangePass}/>
               <br></br>
               <br></br>
               <div className="button" id="button-2">
    
    <div className="signmein" onClick={Submit}> Sign me in!</div>

    
  </div>
  
           </div>
           </div>
  };
  
  export default Login;