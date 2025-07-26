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
    <div className="flex-1 px-6 pb-24 pt-8 space-y-8">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Hi, {userName} 👨‍🏫
        </h1>
        <p className="text-muted-foreground text-lg">{className}</p>
      </div>

      {/* Mark Attendance CTA */}
      <Card className="p-8 shadow-[var(--shadow-medium)] bg-gradient-to-r from-primary/10 to-primary-light/10 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Today's Attendance</h3>
            <p className="text-muted-foreground text-base">
              Quick and easy attendance marking
            </p>
          </div>
          <Button
            variant="default"
            onClick={() => onNavigate('mark-attendance')}
            className="flex-col h-20 px-8 space-y-1"
          >
            <Plus className="w-6 h-6" />
            <span className="text-base font-medium">Mark</span>
          </Button>
        </div>
      </Card>

      {/* Today's Summary */}
      <Card className="p-8 shadow-[var(--shadow-medium)] bg-card/95 backdrop-blur-md">
        <h3 className="font-semibold text-lg text-foreground mb-6">Today's Summary</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-success mb-2">
              {todayPresent}
            </div>
            <div className="text-sm text-muted-foreground">Present</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive mb-2">
              {totalStudents - todayPresent}
            </div>
            <div className="text-sm text-muted-foreground">Absent</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-2">
              {attendancePercentage}%
            </div>
            <div className="text-sm text-muted-foreground">Rate</div>
          </div>
        </div>

        {/* Visual indicator */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-base text-muted-foreground mb-3">
            <span>Class attendance</span>
            <span>{todayPresent}/{totalStudents}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Class Insights */}
      <Card className="p-8 shadow-[var(--shadow-medium)] bg-card/95 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg text-foreground">Class Insights</h3>
          <CheckCircle className="w-6 h-6 text-success" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Average attendance this week</span>
            <span className="font-semibold text-foreground">89%</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Students at risk (&lt; 75%)</span>
            <span className="font-semibold text-warning">3 students</span>
          </div>
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Perfect attendance streak</span>
            <span className="font-semibold text-success">12 students</span>
          </div>
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
          onClick={() => onNavigate('analytics')}
          className="h-20 flex-col space-y-2"
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-base font-medium">Analytics</span>
        </Button>
      </div>
    </div>
  );
};