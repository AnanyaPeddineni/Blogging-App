import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <div className="logo-box">
        <Link to="/" className="logo">BlogSphere</Link>
      </div>
      <nav>
        {username && (
          <>
            <div className="nav-box">
              <Link to="/create" className="nav-link">Create new post</Link>
            </div>
            <div className="nav-box">
              <a onClick={logout} className="nav-link">Logout ({username})</a>
            </div>
          </>
        )}
        {!username && (
          <>
            <div className="auth-box">
              <Link to="/login" className="login-link">Login</Link>
            </div>
            <div className="auth-box">
              <Link to="/register" className="register-link">Register</Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
