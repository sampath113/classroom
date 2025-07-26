import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ArrowLeft, TrendingUp, Target, Calendar, Flame, Award } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface AttendanceSummaryScreenProps {
  userName: string;
  onBack: () => void;
  className?: string;
}

export const AttendanceSummaryScreen = ({ userName, onBack, className }: AttendanceSummaryScreenProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const attendanceData = [
    { name: 'Present', value: 87, color: '#22c55e' },
    { name: 'Absent', value: 13, color: '#ef4444' }
  ];

  const weeklyData = [
    { day: 'Mon', present: 1, absent: 0 },
    { day: 'Tue', present: 1, absent: 0 },
    { day: 'Wed', present: 0, absent: 1 },
    { day: 'Thu', present: 1, absent: 0 },
    { day: 'Fri', present: 1, absent: 0 },
    { day: 'Sat', present: 1, absent: 0 },
    { day: 'Sun', present: 0, absent: 1 }
  ];

  const last7Days = [
    { date: '2024-01-22', status: 'present', subject: 'Data Structures' },
    { date: '2024-01-21', status: 'present', subject: 'Algorithms' },
    { date: '2024-01-20', status: 'absent', subject: 'Database Systems' },
    { date: '2024-01-19', status: 'present', subject: 'Web Development' },
    { date: '2024-01-18', status: 'present', subject: 'Data Structures' },
    { date: '2024-01-17', status: 'present', subject: 'Algorithms' },
    { date: '2024-01-16', status: 'present', subject: 'Database Systems' }
  ];

  const stats = {
    totalClasses: 45,
    attendedClasses: 39,
    attendancePercentage: 87,
    currentStreak: 7,
    longestStreak: 12,
    goal: 90
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
              <h1 className="text-lg font-semibold text-foreground">My Attendance</h1>
              <p className="text-sm text-muted-foreground">Detailed statistics & trends</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            {stats.attendancePercentage}%
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-2xl font-bold text-foreground">{stats.currentStreak}</span>
            </div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold text-foreground">{stats.longestStreak}</span>
            </div>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </Card>
        </div>

        {/* Goal Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-foreground">Goal Progress</span>
            </div>
            <span className="text-sm text-muted-foreground">{stats.attendancePercentage}% / {stats.goal}%</span>
          </div>
          <Progress value={stats.attendancePercentage} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {stats.attendancePercentage >= stats.goal 
              ? "🎉 Goal achieved! Keep it up!" 
              : `${stats.goal - stats.attendancePercentage}% more to reach your goal`
            }
          </p>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Pie Chart */}
            <Card className="p-4">
              <h3 className="font-medium text-foreground mb-4 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Attendance Distribution
              </h3>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Present ({attendanceData[0].value}%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Absent ({attendanceData[1].value}%)</span>
                </div>
              </div>
            </Card>

            {/* Summary Stats */}
            <Card className="p-4">
              <h3 className="font-medium text-foreground mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Classes</span>
                  <span className="font-medium text-foreground">{stats.totalClasses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classes Attended</span>
                  <span className="font-medium text-foreground">{stats.attendedClasses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classes Missed</span>
                  <span className="font-medium text-foreground">{stats.totalClasses - stats.attendedClasses}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Attendance Rate</span>
                  <span className="font-bold text-foreground">{stats.attendancePercentage}%</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            {/* Weekly Trend */}
            <Card className="p-4">
              <h3 className="font-medium text-foreground mb-4 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                This Week's Trend
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="present" fill="#22c55e" />
                    <Bar dataKey="absent" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {/* Last 7 Days */}
            <Card className="p-4">
              <h3 className="font-medium text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {last7Days.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{day.subject}</p>
                      <p className="text-sm text-muted-foreground">{day.date}</p>
                    </div>
                    <Badge 
                      variant={day.status === 'present' ? 'default' : 'destructive'}
                      className={day.status === 'present' ? 'bg-green-500' : ''}
                    >
                      {day.status === 'present' ? 'Present' : 'Absent'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
