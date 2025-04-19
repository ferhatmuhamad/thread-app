import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from '../states/isPreload/action';
import Loading from '../components/Loading';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();
  const isPreload = useSelector((states) => states.isPreload.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <div className="page">
        <h1 className="leaderboard-title">Klasemen Pengguna Aktif</h1>

        <ul className="leaderboard-list">
          {leaderboards.map((item, index) => (
            <li key={item.user.id} className="leaderboard-item">
              <div className="leaderboard-user">
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="leaderboard-avatar"
                />
                <span className="leaderboard-name">
                  {index + 1}. {item.user.name}
                </span>
              </div>
              <span className="leaderboard-score">{item.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LeaderboardPage;
