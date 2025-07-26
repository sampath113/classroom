import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar, TrendingUp, Target, CheckCircle, XCircle } from "lucide-react";

interface StudentDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export const StudentDashboard = ({ userName, onNavigate }: StudentDashboardProps) => {
  // Mock data
  const todayStatus = "present"; // present, absent, upcoming
  const attendancePercentage = 87;
  const currentStreak = 7;
  const totalClasses = 45;
  const attendedClasses = 39;

  return (
    <div className="flex-1 px-6 pb-24 pt-8 space-y-8">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Hi, {userName} 👋
        </h1>
        <p className="text-muted-foreground text-lg">Let's check your attendance progress</p>
      </div>

      {/* Today's Status Card */}
      <Card className="p-8 shadow-[var(--shadow-medium)] bg-card/95 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Today's Status</h3>
            <div className="flex items-center space-x-3">
              {todayStatus === "present" ? (
                <>
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="text-success font-semibold text-lg">Present 🎉</span>
                </>
              ) : todayStatus === "absent" ? (
                <>
                  <XCircle className="w-6 h-6 text-destructive" />
                  <span className="text-destructive font-semibold text-lg">Absent</span>
                </>
              ) : (
                <span className="text-muted-foreground text-lg">No class today</span>
              )}
            </div>
          </div>
          <div className="text-5xl">
            {todayStatus === "present" ? "✅" : todayStatus === "absent" ? "❌" : "📅"}
          </div>
        </div>
      </Card>

      {/* Attendance Overview */}
      <Card className="p-8 shadow-[var(--shadow-medium)] bg-card/95 backdrop-blur-md">
        <h3 className="font-semibold text-lg text-foreground mb-6">Attendance Overview</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {attendancePercentage}%
            </div>
            <div className="text-base text-muted-foreground">Overall</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {attendedClasses}/{totalClasses}
            </div>
            <div className="text-base text-muted-foreground">Classes</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Current Streak */}
      <Card className="p-8 shadow-[var(--shadow-medium)] bg-gradient-to-r from-primary/10 to-primary-light/10 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Current Streak</h3>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🔥</span>
              <span className="text-2xl font-bold text-primary">{currentStreak} days</span>
            </div>
          </div>
          <Button
            variant="professional"
            onClick={() => onNavigate('streaks')}
            className="h-12 px-6"
          >
            <Target className="w-5 h-5 mr-2" />
            Goals
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-6">
        <Button
          variant="professional"
          size="lg"
          onClick={() => onNavigate('calendar')}
          className="h-20 flex-col space-y-2"
        >
          <Calendar className="w-6 h-6" />
          <span className="text-base font-medium">Calendar</span>
        </Button>

        <Button
          variant="professional"
          size="lg"
          onClick={() => onNavigate('attendance-summary')}
          className="h-20 flex-col space-y-2"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-base font-medium">Summary</span>
        </Button>
      </div>
    </div>
  );
};