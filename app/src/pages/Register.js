import Cookies from 'js-cookie';
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'



const Register = () => {
    const [username,setUsername] = useState("")
    const [pass,setPass] = useState("")
    const[error,setError] = useState("")
    const[promjena,setPromjena] = useState(false)
    const navigate=useNavigate()

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



    async function sendCreds() {
      var data = {username,pass} 
      fetch("http://3.124.193.139:4000/register", {
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
            navigate("/lobby")
          
          }
          
          else {
            setError(data.error)
          }// { "userId": 1, "id": 1, "title": "...", "body": "..." }
      });
  }

    function Submit() {

      sendCreds()
      //console.log(Cookies.get("Name"))
    }
  
    return <div className="loginpage">
      <div className='signmein'>{error}</div>
      <div className="login">
       
        
            <h1> Username</h1> 
            <input className='input' name="username" id='username' onChange={onChangeUsername} />
            <h1> Password</h1>
            <input className="input" type="password" id='password' onChange={onChangePass}/>
               <br></br>
               <br></br>
               <div className="button" id="button-2">
    
    <div className="signmein" onClick={Submit}> Sign up!</div>
  </div>
           </div>
           </div>
  };
  
  export default Register;