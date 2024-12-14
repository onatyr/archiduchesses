import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersService } from "@plantApp/src/services/users.service";
import ReactIcon from "@plantApp/src/components/ReactIcon";

const Sidebar: React.FC = () => {
  const [userName, setUserName] = useState('stranger');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID is missing in localStorage');
          setIsLoading(false);
          return;
        }
        const fetchedUserName = await new UsersService().getUserName(userId);

        if (fetchedUserName) {
          setUserName(fetchedUserName);
        } else {
          setUserName('stranger');
        }
      } catch (err) {
        console.error('Error fetching user name:', err);
        setUserName('stranger'); // Fallback to 'stranger' in case of error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const linkClassName =
    'hover:bg-primaryVariant dark:hover:bg-dark-primaryVariant p-2 rounded flex gap-2 items-center';

  return (
    <div className="min-h-screen w-64 bg-primary dark:bg-dark-primary text-onPrimary dark:text-dark-onPrimary flex flex-col justify-between">
      <div className="p-4 text-xl font-semibold">
        <ReactIcon type="plant" size="2em" />
        <h1>Turbo Plant</h1>
        {isLoading ? (
          <p className="text-sm">Loading...</p>
        ) : (
          <p className="text-sm">Hello, {userName}!</p>
        )}

        <nav className="flex flex-col gap-4 p-4">
          <Link to="/tasks" className={linkClassName}>
            <ReactIcon type="tasks" />
            Tasks
          </Link>
          <Link to="/plants" className={linkClassName}>
            <ReactIcon type="plants" />
            Plants
          </Link>
          <Link to="/rooms" className={linkClassName}>
            <ReactIcon type="rooms" />
            Rooms
          </Link>
        </nav>
      </div>

      <div className="flex justify-between items-center">
        <div className="p-4">
          <Link
            to="/settings"
            className="overflow-hidden inline-block transition-transform transform hover:scale-105"
          >
            <ReactIcon type="settings" size="2em" />
          </Link>
        </div>
        <div className="p-4">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
