import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Sidebar.css';
import { ListIcon } from '~/icons/ListIcon';
import { PlusIcon } from '~/icons/PlusIcon';
import { useLogout } from '~/hooks/useLogout';
import { fetchLists } from '~/store/list/index';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const lists = useSelector(state => state.list.lists);
  const activeId = useSelector(state => state.list.current);
  const isLoggedIn = useSelector(state => state.auth.token !== null);
  const userName = useSelector(state => state.auth.user?.name);

  const shouldHighlight = !pathname.startsWith('/list/new');
  const { logout } = useLogout();
  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`drawer__icon ${isOpen ? 'is-open' : ''}`}
        onClick={toggleDrawer}
        aria-label="メニューを開閉する"
      >
        <span className="drawer__icon--bar"></span>
        <span className="drawer__icon--bar"></span>
        <span className="drawer__icon--bar"></span>
      </button>

      {isOpen && <div className="overlay" onClick={toggleDrawer}></div>}

      <div className={`drawer ${isOpen ? 'is-open' : ''}`}>
        <div className="drawer__body">
          <Link to="/" className="drawer__title_link">
            <h1 className="drawer__title">Todos</h1>
          </Link>

          {isLoggedIn ? (
            <>
              {lists && (
                <div className="drawer__lists">
                  <h2 className="drawer__lists_title">Lists</h2>
                  <ul className="drawer__lists_items">
                    {lists.map(listItem => (
                      <li key={listItem.id}>
                        <Link
                          data-active={shouldHighlight && listItem.id === activeId}
                          to={`/lists/${listItem.id}`}
                          className="drawer__lists_item"
                        >
                          <ListIcon aria-hidden className="drawer__lists_icon" />
                          {listItem.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/list/new" className="drawer__lists_button">
                        <PlusIcon className="drawer__lists_plus_icon" />
                        New List...
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <div className="drawer__spacer" />
              <div className="drawer__account">
                <p className="drawer__account_name">{userName}</p>
                <button type="button" className="drawer__account_logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="drawer__login_wrapper">
              <Link to="/signin" className="drawer__login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
