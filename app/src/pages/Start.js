import "../start.css"
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Start = () => {
    const navigate =useNavigate()

  useEffect(() => {
    

    setTimeout(() => {
      navigate('/home')
    }, 2300)
  }, [])
    return <div className="all"> 
                <div className="CapsonRect">
                    <h1 className="prvi caps">Capson</h1>
                </div>
                <div className="CapsonRect">
                    <h1 className="drugi caps">Capson</h1>
                </div>
                <div className="CapsonRect">
                    <h1 className="treci caps">Capson</h1>
                </div>
           </div>;
  };
  
  export default Start;
  