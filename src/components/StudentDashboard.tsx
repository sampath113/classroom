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
    <div className="flex-1 px-6 pb-24 pt-8 space-y-6">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Hi, {userName} 👋
        </h1>
        <p className="text-muted-foreground text-base">Check your attendance</p>
      </div>

      {/* Today's Status Card */}
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-base text-foreground mb-2">Today's Status</h3>
            <div className="flex items-center space-x-2">
              {todayStatus === "present" ? (
                <>
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-success font-medium">Present</span>
                </>
              ) : todayStatus === "absent" ? (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-destructive font-medium">Absent</span>
                </>
              ) : (
                <span className="text-muted-foreground">No class today</span>
              )}
            </div>
          </div>
          <div className="text-3xl">
            {todayStatus === "present" ? "✓" : todayStatus === "absent" ? "✗" : "📅"}
          </div>
        </div>
      </Card>

      {/* Attendance Overview */}
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <h3 className="font-medium text-base text-foreground mb-4">Attendance Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary mb-1">
              {attendancePercentage}%
            </div>
            <div className="text-sm text-muted-foreground">Overall</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary mb-1">
              {attendedClasses}/{totalClasses}
            </div>
            <div className="text-sm text-muted-foreground">Classes</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Current Streak */}
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-base text-foreground mb-2">Current Streak</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-semibold text-primary">{currentStreak} days</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => onNavigate('streaks')}
            className="h-10 px-4"
          >
            <Target className="w-4 h-4 mr-2" />
            Goals
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => onNavigate('calendar')}
          className="h-12 flex-col space-y-1"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Calendar</span>
        </Button>

        <Button
          variant="outline"
          onClick={() => onNavigate('attendance-summary')}
          className="h-12 flex-col space-y-1"
        >
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Summary</span>
        </Button>
      </div>
    </div>
  );
};