import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ArrowLeft, User, Hash, Key } from "lucide-react";

interface LoginScreenProps {
  role: 'student' | 'teacher';
  onBack: () => void;
  onLogin: (data: { name: string; rollNumber: string; classCode: string }) => void;
}

export const LoginScreen = ({ role, onBack, onLogin }: LoginScreenProps) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    classCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.rollNumber && formData.classCode) {
      onLogin(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name && formData.rollNumber && formData.classCode;

  return (
    <div className="mobile-page gradient-background">
      {/* Status Bar Spacing */}
      <div className="status-bar-height" />

      {/* Header */}
      <div className="mobile-header">
        <div className="flex items-center">
          <Button variant="ghost" size="icon-sm" onClick={onBack} className="mr-3 touch-target">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <div className="text-2xl mr-4">{role === 'student' ? '👤' : '👨‍💼'}</div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {role === 'student' ? 'Student Login' : 'Teacher Login'}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Enter your details
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 safe-area-padding pt-4">
        <div className="mobile-container">
          <Card className="mobile-card-spacing shadow-[var(--shadow-card)]">
            <form onSubmit={handleSubmit} className="mobile-section-spacing">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mobile-input pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="rollNumber" className="text-base font-medium text-foreground">
                  {role === 'student' ? 'Roll Number' : 'Teacher ID'}
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder={role === 'student' ? "Enter roll number" : "Enter teacher ID"}
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    className="mobile-input pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="classCode" className="text-base font-medium text-foreground">
                  Class Code
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="classCode"
                    type="text"
                    placeholder="Enter class code"
                    value={formData.classCode}
                    onChange={(e) => handleInputChange('classCode', e.target.value)}
                    className="mobile-input pl-10"
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 safe-area-padding pb-8">
        <div className="mobile-container mobile-form-spacing">
          <Button
            variant="default"
            size="lg"
            className="mobile-button w-full"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            {role === 'student' ? 'Join Class' : 'Access Class'}
          </Button>

          {role === 'teacher' && (
            <Button variant="outline" size="lg" className="mobile-button w-full">
              Create New Class
            </Button>
          )}

          <p className="text-sm text-muted-foreground text-center opacity-80">
            Make sure to enter the correct class code provided by your {role === 'student' ? 'teacher' : 'institution'}
          </p>
        </div>
      </div>
    </div>
  );
};