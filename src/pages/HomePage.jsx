import React, { useEffect, useState } from 'react';
import ThreadList from '../components/ThreadList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncPreloadProcess } from '../states/isPreload/action';
import Loading from '../components/Loading';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const isPreload = useSelector((states) => states.isPreload.isPreload);
  const authUser = useSelector((states) => states.authUser);
  const [selectCategory, setSelectCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  const handleCategory = (category) => {
    if (category === selectCategory) {
      setSelectCategory(null);
    } else {
      setSelectCategory(category);
    }
  };

  const threadList = threads
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId) || null,
      authUser: authUser,
    }))
    .filter(
      (thread) => thread.category === selectCategory || selectCategory === null,
    );

  const categories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <>
      <Loading />
      <div className="homepage">
        <section className="category-section">
          <h2>Kategori Populer</h2>
          <div className="category-tags">
            {categories.map((category) => (
              <div
                key={category}
                className={`category-tag ${selectCategory === category ? 'active' : ''}`}
                onClick={() => handleCategory(category)}
                style={{ cursor: 'pointer' }}
              >
                #{category}
              </div>
            ))}
          </div>
        </section>

        <section className="discussion-section">
          <h2>Diskusi</h2>
          <ThreadList threads={threadList} />
        </section>
      </div>
    </>
  );
}

export default HomePage;
