import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  LogOut, 
  Edit, 
  BookOpen,
  Shield,
  HelpCircle,
  ChevronRight,
  Settings,
  Smartphone
} from "lucide-react";
import { toast } from "sonner";

interface ProfileScreenProps {
  userName: string;
  userRole: 'student' | 'teacher';
  rollNumber?: string;
  classCode: string;
  onBack: () => void;
  onLogout: () => void;
  className?: string;
}

export const ProfileScreen = ({ 
  userName, 
  userRole, 
  rollNumber, 
  classCode, 
  onBack, 
  onLogout, 
  className 
}: ProfileScreenProps) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [attendanceReminders, setAttendanceReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      onLogout();
    }, 1000);
  };

  const handleEditProfile = () => {
    toast.info("Profile editing coming soon!");
  };

  const handleSwitchClass = () => {
    toast.info("Class switching coming soon!");
  };

  const handleThemeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    toast.success(`Switched to ${enabled ? 'dark' : 'light'} mode`);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`mobile-page gradient-background ${className}`}>
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onBack}
            className="touch-target"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your account</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mobile-content pt-4">
        {/* Profile Card */}
        <Card className="mobile-card-spacing bg-card/95 backdrop-blur-md">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="text-lg sm:text-xl font-bold bg-primary text-primary-foreground">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{userName}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mt-2">
                <Badge variant="secondary" className="capitalize text-sm sm:text-base px-3 py-1 w-fit">
                  {userRole}
                </Badge>
                {rollNumber && (
                  <Badge variant="outline" className="text-sm sm:text-base px-3 py-1 w-fit">
                    {rollNumber}
                  </Badge>
                )}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">Class: {classCode}</p>
            </div>
            <Button variant="outline" size="default" onClick={handleEditProfile} className="mobile-button px-4 sm:px-6">
              <Edit className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="mobile-card-spacing bg-card/95 backdrop-blur-md">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center">
            <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
            Account
          </h3>
          <div className="mobile-form-spacing">
            <div className="flex items-center justify-between py-3 sm:py-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-foreground">Switch Class</p>
                  <p className="text-sm sm:text-base text-muted-foreground">Join a different class</p>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={handleSwitchClass} className="touch-target">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-3 sm:py-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-foreground">Privacy Settings</p>
                  <p className="text-sm sm:text-base text-muted-foreground">Manage your data & privacy</p>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" className="touch-target">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="mobile-card-spacing bg-card/95 backdrop-blur-md">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
            Notifications
          </h3>
          <div className="mobile-form-spacing">
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-base sm:text-lg text-foreground">Push Notifications</p>
                <p className="text-sm sm:text-base text-muted-foreground">Receive app notifications</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="touch-target"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-base sm:text-lg text-foreground">Attendance Reminders</p>
                <p className="text-sm sm:text-base text-muted-foreground">Daily class reminders</p>
              </div>
              <Switch
                checked={attendanceReminders}
                onCheckedChange={setAttendanceReminders}
                className="touch-target"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-base sm:text-lg text-foreground">Weekly Reports</p>
                <p className="text-sm sm:text-base text-muted-foreground">Get weekly attendance summaries</p>
              </div>
              <Switch
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
                className="touch-target"
              />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="mobile-card-spacing bg-card/95 backdrop-blur-md">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center">
            <Settings className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
            Appearance
          </h3>
          <div className="mobile-form-spacing">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 pr-4">
                {darkMode ? (
                  <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                )}
                <div>
                  <p className="font-semibold text-base sm:text-lg text-foreground">Dark Mode</p>
                  <p className="text-sm sm:text-base text-muted-foreground">Switch to dark theme</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={handleThemeToggle}
                className="touch-target"
              />
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="mobile-card-spacing bg-card/95 backdrop-blur-md">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 flex items-center">
            <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
            Support
          </h3>
          <div className="mobile-form-spacing">
            <div className="flex items-center justify-between py-3 sm:py-4">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-base sm:text-lg text-foreground">Help Center</p>
                <p className="text-sm sm:text-base text-muted-foreground">Get help and support</p>
              </div>
              <Button variant="ghost" size="icon-sm" className="touch-target">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-3 sm:py-4">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-base sm:text-lg text-foreground">Contact Us</p>
                <p className="text-sm sm:text-base text-muted-foreground">Send feedback or report issues</p>
              </div>
              <Button variant="ghost" size="icon-sm" className="touch-target">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-3 sm:py-4">
              <div className="flex-1 pr-4">
                <p className="font-semibold text-base sm:text-lg text-foreground">About</p>
                <p className="text-sm sm:text-base text-muted-foreground">App version & information</p>
              </div>
              <Button variant="ghost" size="icon-sm" className="touch-target">
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Card className="mobile-card-spacing bg-card/95 backdrop-blur-md">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mobile-button w-full font-semibold">
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card/95 backdrop-blur-md mx-4 sm:mx-auto">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg sm:text-xl">Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm sm:text-base">
                  You'll need to login again to access your attendance data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <AlertDialogCancel className="mobile-button px-4 sm:px-6">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className="mobile-button bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 sm:px-6">
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm sm:text-base text-muted-foreground pb-8 opacity-80">
          <p>AttendanceTracker v1.0.0</p>
          <p>Made with ❤️ for better education</p>
        </div>
      </div>
    </div>
  );
};
