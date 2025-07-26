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
    <div className="mobile-page gradient-background">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Header */}
      <div className="flex-shrink-0 pt-12 pb-8 safe-area-padding text-center">
        <div className="w-16 h-16 bg-card rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[var(--shadow-card)]">
          <span className="text-2xl">📋</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">AttendanceTracker</h1>
        <p className="text-muted-foreground text-base">Simple attendance management</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 safe-area-padding">
        <div className="mobile-container">
          <h2 className="text-xl font-medium text-foreground mb-6 text-center">Choose your role</h2>

          <div className="mobile-form-spacing mb-8">
            <RoleCard
              icon="👤"
              title="Student"
              description="Track attendance"
              selected={selectedRole === 'student'}
              onClick={() => setSelectedRole('student')}
            />

            <RoleCard
              icon="👨‍💼"
              title="Teacher"
              description="Manage attendance"
              selected={selectedRole === 'teacher'}
              onClick={() => setSelectedRole('teacher')}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 safe-area-padding pb-8">
        <div className="mobile-container">
          <Button
            variant="default"
            size="lg"
            className="mobile-button w-full"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue
          </Button>

          <p className="text-sm text-muted-foreground text-center mt-4">
            You can change this later
          </p>
        </div>
      </div>
    </div>
  );
};