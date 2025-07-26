import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeft, Save, Users, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  isPresent: boolean;
}

interface MarkAttendanceScreenProps {
  onBack: () => void;
  className?: string;
}

export const MarkAttendanceScreen = ({ onBack, className }: MarkAttendanceScreenProps) => {
  const [filter, setFilter] = useState<'all' | 'present' | 'absent'>('all');
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Aarav Sharma', rollNumber: 'CS001', isPresent: true },
    { id: '2', name: 'Priya Patel', rollNumber: 'CS002', isPresent: true },
    { id: '3', name: 'Rahul Kumar', rollNumber: 'CS003', isPresent: false },
    { id: '4', name: 'Sneha Gupta', rollNumber: 'CS004', isPresent: true },
    { id: '5', name: 'Arjun Singh', rollNumber: 'CS005', isPresent: false },
    { id: '6', name: 'Kavya Reddy', rollNumber: 'CS006', isPresent: true },
    { id: '7', name: 'Vikram Joshi', rollNumber: 'CS007', isPresent: true },
    { id: '8', name: 'Ananya Iyer', rollNumber: 'CS008', isPresent: false },
    { id: '9', name: 'Rohan Mehta', rollNumber: 'CS009', isPresent: true },
    { id: '10', name: 'Ishita Agarwal', rollNumber: 'CS010', isPresent: true },
    { id: '11', name: 'Karan Verma', rollNumber: 'CS011', isPresent: false },
    { id: '12', name: 'Nisha Bansal', rollNumber: 'CS012', isPresent: true },
    { id: '13', name: 'Siddharth Roy', rollNumber: 'CS013', isPresent: true },
    { id: '14', name: 'Pooja Nair', rollNumber: 'CS014', isPresent: false },
    { id: '15', name: 'Amit Saxena', rollNumber: 'CS015', isPresent: true },
  ]);

  const toggleAttendance = (studentId: string) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'present') return student.isPresent;
    if (filter === 'absent') return !student.isPresent;
    return true;
  });

  const presentCount = students.filter(s => s.isPresent).length;
  const totalCount = students.length;

  const handleSaveAttendance = () => {
    toast.success(`Attendance saved! ${presentCount}/${totalCount} students present`);
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
              <h1 className="text-xl font-bold text-foreground">Mark Attendance</h1>
              <p className="text-base text-muted-foreground">CS101 - Data Structures</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-base px-3 py-1 rounded-full">
            Today
          </Badge>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="default"
              onClick={() => setFilter('all')}
              className="flex items-center space-x-2 h-12 px-6"
            >
              <Users className="h-5 w-5" />
              <span>All ({totalCount})</span>
            </Button>
            <Button
              variant={filter === 'present' ? 'default' : 'outline'}
              size="default"
              onClick={() => setFilter('present')}
              className="flex items-center space-x-2 h-12 px-6"
            >
              <UserCheck className="h-5 w-5" />
              <span>Present ({presentCount})</span>
            </Button>
            <Button
              variant={filter === 'absent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('absent')}
              className="flex items-center space-x-2"
            >
              <UserX className="h-4 w-4" />
              <span>Absent ({totalCount - presentCount})</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-3 py-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      student.isPresent ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {student.isPresent ? 'Present' : 'Absent'}
                    </p>
                  </div>
                  <Switch
                    checked={student.isPresent}
                    onCheckedChange={() => toggleAttendance(student.id)}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Save Button */}
      <div className="flex-shrink-0 p-4 bg-background border-t border-border">
        <Button 
          onClick={handleSaveAttendance}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Attendance ({presentCount}/{totalCount})
        </Button>
      </div>
    </div>
  );
};
