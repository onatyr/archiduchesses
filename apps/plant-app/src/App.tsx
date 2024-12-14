// App.tsx
import * as React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Plants from '@plantApp/src/pages/Plants';
import Tasks from '@plantApp/src/pages/Tasks';
import Rooms from '@plantApp/src/pages/Rooms';
import WelcomeScreen from '@plantApp/src/pages/WelcomeScreen';
import Settings from '@plantApp/src/pages/Settings';
import { UserProvider } from '@plantApp/src/context/UserContext';
import Sidebar from "@plantApp/src/components/SideBar"; // Import the UserProvider

const App: React.FC = () => {
  const location = useLocation(); // Get current route

  // Check if the current route is the root ("/")
  const isWelcomeScreen = location.pathname === '/';

  return (
    // Wrap the entire app with the UserProvider
    <UserProvider>
      <div className="min-h-screen flex bg-background dark:bg-dark-background">
        {!isWelcomeScreen && <Sidebar />}

        <div className="flex-1 p-4 bg-background dark:bg-dark-background text-onBackground dark:text-dark-onBackground overflow-y-auto">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />{' '}
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
};

export default App;
