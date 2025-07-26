import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  Target, 
  Flame, 
  Award, 
  TrendingUp, 
  Calendar,
  Star,
  Trophy,
  Zap,
  Settings
} from "lucide-react";
import { toast } from "sonner";

interface GoalTrackerScreenProps {
  userName: string;
  onBack: () => void;
  className?: string;
}

export const GoalTrackerScreen = ({ userName, onBack, className }: GoalTrackerScreenProps) => {
  const [currentGoal, setCurrentGoal] = useState(90);
  const [newGoal, setNewGoal] = useState([90]);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  // Mock data
  const stats = {
    currentAttendance: 87,
    currentStreak: 7,
    longestStreak: 15,
    totalClasses: 45,
    attendedClasses: 39,
    streakStartDate: '2024-01-15',
    achievements: [
      { id: 1, name: 'First Week', description: '7 days streak', unlocked: true, icon: '🔥' },
      { id: 2, name: 'Consistent', description: '14 days streak', unlocked: false, icon: '⚡' },
      { id: 3, name: 'Dedicated', description: '30 days streak', unlocked: false, icon: '🏆' },
      { id: 4, name: 'Perfect Month', description: '100% for a month', unlocked: false, icon: '⭐' },
    ]
  };

  const handleUpdateGoal = () => {
    setCurrentGoal(newGoal[0]);
    setIsGoalDialogOpen(false);
    toast.success(`Goal updated to ${newGoal[0]}%!`);
  };

  const progressToGoal = Math.min((stats.currentAttendance / currentGoal) * 100, 100);
  const classesNeeded = Math.max(0, Math.ceil((currentGoal * stats.totalClasses / 100) - stats.attendedClasses));

  const getStreakMessage = () => {
    if (stats.currentStreak === 0) return "Start your streak today! 💪";
    if (stats.currentStreak < 7) return "Keep going! You're building momentum 🚀";
    if (stats.currentStreak < 14) return "Great streak! You're on fire 🔥";
    if (stats.currentStreak < 30) return "Amazing consistency! 🌟";
    return "Legendary streak! You're unstoppable! 👑";
  };

  const getMotivationalMessage = () => {
    if (stats.currentAttendance >= currentGoal) {
      return "🎉 Goal achieved! You're doing amazing!";
    }
    if (stats.currentAttendance >= currentGoal - 5) {
      return "🎯 So close! Just a little more to reach your goal!";
    }
    return `📈 ${classesNeeded} more classes to reach your ${currentGoal}% goal!`;
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
              <h1 className="text-lg font-semibold text-foreground">Goal Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your progress & streaks</p>
            </div>
          </div>
          <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Set Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Your Attendance Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{newGoal[0]}%</div>
                    <p className="text-sm text-muted-foreground">Target Attendance</p>
                  </div>
                  <Slider
                    value={newGoal}
                    onValueChange={setNewGoal}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsGoalDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateGoal} className="flex-1">
                    Update Goal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Current Goal Progress */}
        <Card className="p-6">
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progressToGoal * 3.14} 314`}
                  className="text-primary transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.currentAttendance}%</div>
                  <div className="text-xs text-muted-foreground">of {currentGoal}%</div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Current Progress</h3>
            <p className="text-sm text-muted-foreground">{getMotivationalMessage()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-foreground">{stats.attendedClasses}</div>
              <div className="text-xs text-muted-foreground">Classes Attended</div>
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">{classesNeeded}</div>
              <div className="text-xs text-muted-foreground">Classes Needed</div>
            </div>
          </div>
        </Card>

        {/* Streak Section */}
        <Card className="p-6">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-3">
              <Flame className="h-8 w-8 text-orange-500 mr-2" />
              <span className="text-3xl font-bold text-foreground">{stats.currentStreak}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Current Streak</h3>
            <p className="text-sm text-muted-foreground mb-4">{getStreakMessage()}</p>
            
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-foreground">{stats.longestStreak}</div>
                <div className="text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-foreground">{stats.streakStartDate}</div>
                <div className="text-muted-foreground">Started</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border text-center transition-all ${
                  achievement.unlocked
                    ? 'bg-primary/10 border-primary/20 text-foreground'
                    : 'bg-muted/50 border-muted text-muted-foreground'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="font-medium text-sm">{achievement.name}</div>
                <div className="text-xs">{achievement.description}</div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Unlocked!
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">87%</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </Card>
          <Card className="p-4 text-center">
            <Calendar className="h-5 w-5 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </Card>
          <Card className="p-4 text-center">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">12th</div>
            <div className="text-xs text-muted-foreground">Class Rank</div>
          </Card>
        </div>

        {/* Motivational Section */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Keep Going, {userName}!</h3>
            <p className="text-sm text-muted-foreground">
              Every class you attend brings you closer to your goal. 
              Consistency is the key to success! 🌟
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
