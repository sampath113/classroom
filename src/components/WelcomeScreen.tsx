import { useState } from "react";
import { RoleCard } from "./RoleCard";
import { Button } from "./ui/button";
import { GraduationCap, Users } from "lucide-react";

interface WelcomeScreenProps {
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

export const WelcomeScreen = ({ onRoleSelect }: WelcomeScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen gradient-background flex flex-col">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Header */}
      <div className="flex-shrink-0 pt-8 pb-8 px-6 text-center">
        <div className="w-20 h-20 bg-card rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-card)]">
          <GraduationCap className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">AttendanceTracker</h1>
        <p className="text-muted-foreground text-lg">Smart attendance management for everyone</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <div className="mobile-container">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Who are you?</h2>

          <div className="space-y-6 mb-12">
            <RoleCard
              icon="🎓"
              title="Student"
              description="Track your attendance and view insights"
              selected={selectedRole === 'student'}
              onClick={() => setSelectedRole('student')}
            />

            <RoleCard
              icon="👨‍🏫"
              title="Teacher"
              description="Manage class attendance and analytics"
              selected={selectedRole === 'teacher'}
              onClick={() => setSelectedRole('teacher')}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-6 pb-8">
        <div className="mobile-container">
          <Button
            variant="default"
            size="lg"
            className="w-full h-14 text-lg font-semibold"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue
          </Button>

          <p className="text-sm text-muted-foreground text-center mt-6 opacity-80">
            You can change your role later in settings
          </p>
        </div>
      </div>
    </div>
  );
};