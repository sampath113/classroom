import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  X,
  Bell,
  CheckCircle,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  actionable: boolean;
  dismissed: boolean;
}

interface AlertsScreenProps {
  userRole: 'student' | 'teacher';
  onBack: () => void;
  className?: string;
}

export const AlertsScreen = ({ userRole, onBack, className }: AlertsScreenProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Attendance Below Target',
      message: 'Your attendance has dropped to 87%. You need 90% to meet your goal.',
      timestamp: '2 hours ago',
      actionable: true,
      dismissed: false
    },
    {
      id: '2',
      type: 'error',
      title: '3 Days Missed This Week',
      message: 'You\'ve missed 3 classes this week. Consider catching up with classmates.',
      timestamp: '1 day ago',
      actionable: true,
      dismissed: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Class Average Update',
      message: 'Your class average attendance is 89% this month. You\'re slightly below average.',
      timestamp: '2 days ago',
      actionable: false,
      dismissed: false
    },
    {
      id: '4',
      type: 'success',
      title: 'Streak Achievement!',
      message: 'Congratulations! You\'ve maintained a 7-day attendance streak.',
      timestamp: '3 days ago',
      actionable: false,
      dismissed: false
    },
    {
      id: '5',
      type: 'warning',
      title: 'Upcoming Deadline',
      message: 'Remember: 75% attendance is required for exam eligibility.',
      timestamp: '1 week ago',
      actionable: false,
      dismissed: false
    }
  ]);

  // Teacher-specific alerts
  const teacherAlerts: Alert[] = [
    {
      id: 't1',
      type: 'warning',
      title: 'Low Class Attendance',
      message: 'Today\'s attendance was only 73%. Consider following up with absent students.',
      timestamp: '1 hour ago',
      actionable: true,
      dismissed: false
    },
    {
      id: 't2',
      type: 'info',
      title: 'Weekly Summary',
      message: 'This week\'s average attendance: 85%. 5 students have perfect attendance.',
      timestamp: '2 days ago',
      actionable: false,
      dismissed: false
    },
    {
      id: 't3',
      type: 'error',
      title: 'Students at Risk',
      message: '3 students have attendance below 75%. Intervention may be needed.',
      timestamp: '3 days ago',
      actionable: true,
      dismissed: false
    }
  ];

  const currentAlerts = userRole === 'teacher' ? teacherAlerts : alerts;
  const activeAlerts = currentAlerts.filter(alert => !alert.dismissed);

  const dismissAlert = (alertId: string) => {
    if (userRole === 'teacher') {
      // For teacher alerts, we'd need a separate state management
      toast.success('Alert dismissed');
    } else {
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, dismissed: true }
            : alert
        )
      );
      toast.success('Alert dismissed');
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBorderColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      case 'success':
        return 'border-l-green-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const handleTakeAction = (alert: Alert) => {
    switch (alert.id) {
      case '1':
        toast.info('Redirecting to attendance summary...');
        break;
      case '2':
        toast.info('Opening study group recommendations...');
        break;
      case 't1':
        toast.info('Opening student contact list...');
        break;
      case 't3':
        toast.info('Opening at-risk students report...');
        break;
      default:
        toast.info('Action not available');
    }
  };

  return (
    <div className={`min-h-screen gradient-background flex flex-col ${className}`}>
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Header */}
      <div className="flex-shrink-0 bg-card/50 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onBack}
              className="bg-card/50 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Alerts</h1>
              <p className="text-base text-muted-foreground">
                {userRole === 'teacher' ? 'Class insights & notifications' : 'Your attendance insights'}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-base px-3 py-1 rounded-full">
            {activeAlerts.length} active
          </Badge>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-6">
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-3">All caught up!</h3>
            <p className="text-muted-foreground text-lg">No new alerts or notifications.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`p-6 border-l-4 ${getAlertBorderColor(alert.type)} shadow-[var(--shadow-card)] bg-card/95 backdrop-blur-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-foreground">{alert.title}</h3>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="text-base text-muted-foreground mb-4">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {alert.timestamp}
                        </span>
                        {alert.actionable && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTakeAction(alert)}
                            className="text-sm font-medium"
                          >
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Insights */}
        {userRole === 'student' && (
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Quick Insights</h2>

            <div className="grid grid-cols-1 gap-6">
              <Card className="p-6 bg-card/95 backdrop-blur-md">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Improvement Tip</h3>
                    <p className="text-base text-muted-foreground">
                      Attend 3 more classes to reach your 90% goal
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/95 backdrop-blur-md">
                <div className="flex items-center space-x-4">
                  <Users className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Class Ranking</h3>
                    <p className="text-base text-muted-foreground">
                      You're ranked 12th out of 30 students
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {userRole === 'teacher' && (
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Class Overview</h2>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center bg-card/95 backdrop-blur-md">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <p className="text-base text-muted-foreground">Weekly Average</p>
              </Card>
              <Card className="p-6 text-center bg-card/95 backdrop-blur-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <p className="text-base text-muted-foreground">Perfect Attendance</p>
              </Card>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
