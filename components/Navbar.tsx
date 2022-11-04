import Link from 'next/link';
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';
import { TrackerContext } from '../context/traker/trackerContext';
import styles from './navbar.module.css';

const Navbar = () => {
  const {
    state: { token },
    authReset,
  } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <div className={styles.link}>
        <Link href={'/'}>
          <p>Ptracker</p>
        </Link>
      </div>

      <ul className={styles.ul}>
        {!token ? (
          <>
            <li>
              <Link href={'/login'}>
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link href={'/register'}>
                <span>Register</span>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <div
              onClick={(e) => {
                authReset();
              }}
            >
              <span>Logout</span>
            </div>
          </li>
        )}
        <li>
          <Link href={'/about'}>
            <span>How To Use</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
