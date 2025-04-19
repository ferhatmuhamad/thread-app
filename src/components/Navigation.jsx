import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdHome,
  MdAdd,
  MdLogin,
  MdLogout,
  MdLeaderboard,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function Navigation() {
  const location = useLocation();
  const isCreatePage = location.pathname === '/create';
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const signOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (!authUser) {
    return (
      <>
        <nav className="bottom-nav">
          <Link to="/" className="nav-item">
            <MdHome size={24} />
            <span>Home</span>
          </Link>
          <Link to="/leaderboard" className="nav-item">
            <MdLeaderboard size={24} />
            <span>Leaderboard</span>
          </Link>
          <Link to="/login" className="nav-item">
            <MdLogin size={24} />
            <span>Login</span>
          </Link>
        </nav>
      </>
    );
  }

  return (
    <>
      {/* Floating Create Button */}
      {!isCreatePage && (
        <Link to="/create" className="floating-create-btn">
          <MdAdd size={28} />
        </Link>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <MdHome size={24} />
          <span>Home</span>
        </Link>
        <Link to="/leaderboard" className="nav-item">
          <MdLeaderboard size={24} />
          <span>Leaderboard</span>
        </Link>
        <Link className="nav-item" onClick={signOut}>
          <MdLogout size={24} />
          <span>Logout</span>
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
