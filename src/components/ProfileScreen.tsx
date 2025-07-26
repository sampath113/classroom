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
    <div className={`min-h-screen bg-background flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex-shrink-0 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account & preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{userName}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="capitalize">
                  {userRole}
                </Badge>
                {rollNumber && (
                  <Badge variant="outline">
                    {rollNumber}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Class: {classCode}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleEditProfile}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Account
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Switch Class</p>
                  <p className="text-sm text-muted-foreground">Join a different class</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSwitchClass}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Privacy Settings</p>
                  <p className="text-sm text-muted-foreground">Manage your data & privacy</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive app notifications</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Attendance Reminders</p>
                <p className="text-sm text-muted-foreground">Daily class reminders</p>
              </div>
              <Switch
                checked={attendanceReminders}
                onCheckedChange={setAttendanceReminders}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Get weekly attendance summaries</p>
              </div>
              <Switch
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
              />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Support
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-foreground">Help Center</p>
                <p className="text-sm text-muted-foreground">Get help and support</p>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-foreground">Contact Us</p>
                <p className="text-sm text-muted-foreground">Send feedback or report issues</p>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-foreground">About</p>
                <p className="text-sm text-muted-foreground">App version & information</p>
              </div>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Card className="p-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You'll need to login again to access your attendance data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pb-4">
          <p>AttendanceTracker v1.0.0</p>
          <p>Made with ❤️ for better education</p>
        </div>
      </div>
    </div>
  );
};
