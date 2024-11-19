import { Link } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const handleSignout = () => {
    setUser({});
    localStorage.removeItem("authToken");
  };
  return (
    <nav>
      <div className="navBar">
        <div className="navItem">
          {/*
            This home will not actually be home but our site logo/image since that's what more folks have it as most of the time.
            Although I might have two separate link anyway.
            One for that clickable image while the other being what I have here below.
          */}
          <Link to="/">Home</Link>
        </div>

        <div className="navItem">
          <Link to="/products">Products</Link>
        </div>

        <div className="navItem">
          {/*
            "User" here will not actually be user but the user's username. 
            Hopefully that makes sense.
          */}

          <Link to="/user">User</Link>
        </div>
        {!user?._id ? (
          <div className="navItem">
            {/*  
            Will plan for sign in to be a ternary operator so if the user is already logged in.
            They will no longer see this on their Nav Bar.
          */}
            <Link to="/sign-in">Sign In/Up</Link>
          </div>
        ) : (
          <div className="navItem">
            <span onClick={handleSignout}>Sign Out</span>
          </div>
        )}

        {/* <div className='navItem'> */}
        {/*
            Same as the sign in.
            It'll contain the ternary operator, but also might keep it.
            Unsure since sometimes some sites have this on the navbar when someone is signed in.
            Though sometimes some sites hides this option until they are on their own account profile.
          */}
        {/* <Link to="/sign-out">Sign Out</Link> */}
        {/* </div> */}

        <div className="navItem">
          {/*
            This is POST MVP so might be able get to it.
            Might not, but hopefully I can get to it.
            100% want to challenge myself in creating more than 1 page for sure!
          */}
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
