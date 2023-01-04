import "../start.css"
const Header = (props) => {
    


  
    return <div className="header">
        <div className="name"> {props.name}</div>
          <div className="item">  Options</div>
         <div className="item"> Logout</div>
         
  
  </div>
  };
  export default Header;