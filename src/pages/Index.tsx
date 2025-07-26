import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { CalendarView } from "@/components/CalendarView";
import { MarkAttendanceScreen } from "@/components/MarkAttendanceScreen";
import { AttendanceSummaryScreen } from "@/components/AttendanceSummaryScreen";
import { AlertsScreen } from "@/components/AlertsScreen";
import { GoalTrackerScreen } from "@/components/GoalTrackerScreen";
import { ProfileScreen } from "@/components/ProfileScreen";
import { BottomNavigation } from "@/components/BottomNavigation";

type Screen = 'welcome' | 'login' | 'dashboard' | 'calendar' | 'mark-attendance' | 'attendance-summary' | 'streaks' | 'alerts' | 'profile';
type Role = 'student' | 'teacher' | null;

interface UserData {
  name: string;
  rollNumber: string;
  classCode: string;
  role: Role;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState<Role>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleRoleSelect = (role: Role) => {
    setUserRole(role);
    setCurrentScreen('login');
  };

  const handleLogin = (data: { name: string; rollNumber: string; classCode: string }) => {
    setUserData({
      ...data,
      role: userRole
    });
    setCurrentScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setUserRole(null);
    setUserData(null);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Map tabs to screens
    const tabScreenMap: Record<string, Screen> = {
      'home': 'dashboard',
      'calendar': 'calendar',
      'alerts': 'alerts',
      'profile': 'profile'
    };

    const targetScreen = tabScreenMap[tab];
    if (targetScreen) {
      setCurrentScreen(targetScreen);
    }
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
    setUserRole(null);
    setUserData(null);
    setActiveTab('home');
  };

  const showBottomNav = currentScreen !== 'welcome' && currentScreen !== 'login';

  return (
    <div className="min-h-screen gradient-background">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onRoleSelect={handleRoleSelect} />
      )}
      
      {currentScreen === 'login' && userRole && (
        <LoginScreen 
          role={userRole} 
          onBack={handleBackToWelcome}
          onLogin={handleLogin}
        />
      )}
      
      {currentScreen === 'dashboard' && userData && (
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            {userData.role === 'student' ? (
              <StudentDashboard 
                userName={userData.name} 
                onNavigate={handleNavigate}
              />
            ) : (
              <TeacherDashboard 
                userName={userData.name} 
                onNavigate={handleNavigate}
              />
            )}
          </div>
        </div>
      )}
      
      {/* Calendar View */}
      {currentScreen === 'calendar' && userData && (
        <CalendarView
          userRole={userData.role as 'student' | 'teacher'}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* Mark Attendance Screen (Teacher Only) */}
      {currentScreen === 'mark-attendance' && userData && userData.role === 'teacher' && (
        <MarkAttendanceScreen
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* Attendance Summary Screen (Student Only) */}
      {currentScreen === 'attendance-summary' && userData && userData.role === 'student' && (
        <AttendanceSummaryScreen
          userName={userData.name}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* Goal Tracker & Streaks Screen */}
      {currentScreen === 'streaks' && userData && (
        <GoalTrackerScreen
          userName={userData.name}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* Alerts Screen */}
      {currentScreen === 'alerts' && userData && (
        <AlertsScreen
          userRole={userData.role as 'student' | 'teacher'}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {/* Profile Screen */}
      {currentScreen === 'profile' && userData && (
        <ProfileScreen
          userName={userData.name}
          userRole={userData.role as 'student' | 'teacher'}
          rollNumber={userData.rollNumber}
          classCode={userData.classCode}
          onBack={() => setCurrentScreen('dashboard')}
          onLogout={handleLogout}
        />
      )}
      
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Index;
