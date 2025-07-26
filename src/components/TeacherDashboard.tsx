import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar, Users, CheckCircle, BarChart3, Plus } from "lucide-react";

interface TeacherDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export const TeacherDashboard = ({ userName, onNavigate }: TeacherDashboardProps) => {
  // Mock data
  const todayPresent = 26;
  const totalStudents = 30;
  const attendancePercentage = Math.round((todayPresent / totalStudents) * 100);
  const className = "Computer Science 3A";

  return (
    <div className="mobile-page gradient-background">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Content Container */}
      <div className="mobile-content pt-4">
        {/* Greeting */}
        <div className="text-center mb-6 safe-area-padding">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Hi, {userName} 👨‍💼
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">{className}</p>
        </div>

        {/* Mark Attendance CTA */}
        <Card className="mobile-card-spacing shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h3 className="font-medium text-base sm:text-lg text-foreground mb-2">Today's Attendance</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Mark attendance for your class
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => onNavigate('mark-attendance')}
              className="touch-target px-3 sm:px-4"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">Mark</span>
            </Button>
          </div>
        </Card>

        {/* Today's Summary */}
        <Card className="mobile-card-spacing shadow-[var(--shadow-card)]">
          <h3 className="font-medium text-base sm:text-lg text-foreground mb-4">Today's Summary</h3>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-lg sm:text-xl font-semibold text-success mb-1">
                {todayPresent}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Present</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-semibold text-destructive mb-1">
                {totalStudents - todayPresent}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Absent</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-semibold text-primary mb-1">
                {attendancePercentage}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Rate</div>
            </div>
          </div>

          {/* Visual indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2">
              <span>Class attendance</span>
              <span>{todayPresent}/{totalStudents}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${attendancePercentage}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Class Insights */}
        <Card className="mobile-card-spacing shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-base sm:text-lg text-foreground">Class Insights</h3>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Average this week</span>
              <span className="font-medium text-foreground">89%</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">At risk (&lt; 75%)</span>
              <span className="font-medium text-warning">3 students</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Perfect streak</span>
              <span className="font-medium text-success">12 students</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => onNavigate('calendar')}
            className="mobile-button flex-col space-y-1"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Calendar</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => onNavigate('analytics')}
            className="mobile-button flex-col space-y-1"
          >
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Analytics</span>
          </Button>
        </div>
      </div>
    </div>
  );
};