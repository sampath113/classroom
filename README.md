# 📚 Classroom Attendance Tracker

A modern, mobile-first classroom attendance tracking application built with React, TypeScript, and Tailwind CSS. Designed for both students and teachers with intuitive interfaces and smart insights.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)

## ✨ Features

### 👨‍🎓 For Students
- **Dashboard**: View today's attendance status and streak tracking
- **Attendance Summary**: Detailed statistics with interactive charts
- **Goal Tracker**: Set attendance goals and track progress with gamification
- **Smart Alerts**: Get notified about low attendance and improvement tips
- **Calendar View**: Visual representation of attendance patterns
- **Profile Management**: Customize settings and preferences

### 👨‍🏫 For Teachers
- **Quick Attendance**: Fast tap-tap-tap interface for marking attendance
- **Class Overview**: Real-time statistics and insights
- **Student Management**: Filter and manage student attendance
- **Analytics**: Track class performance and identify at-risk students
- **Alerts**: Get notified about attendance patterns and trends

## 🎨 Design Features

- **Mobile-First**: Optimized for smartphones and tablets
- **Material Design**: Following Google's Material Design principles
- **Apple HIG Compliant**: iOS-friendly interactions and animations
- **Dark/Light Theme**: Automatic theme switching support
- **Responsive**: Works seamlessly across all device sizes
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **Notifications**: Sonner for toast messages
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/yarn/bun

## 🛠️ Installation

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/sampath113/classroom.git
cd classroom

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui base components
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── StudentDashboard.tsx
│   ├── TeacherDashboard.tsx
│   ├── MarkAttendanceScreen.tsx
│   ├── AttendanceSummaryScreen.tsx
│   ├── AlertsScreen.tsx
│   ├── GoalTrackerScreen.tsx
│   ├── ProfileScreen.tsx
│   └── CalendarView.tsx
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── main.tsx            # App entry point
```

## 📱 Complete User Journey

1. **Welcome Screen** → Role selection (Student/Teacher)
2. **Login Screen** → Enter name, roll number, class code
3. **Dashboard** → Role-based home screen with quick actions
4. **Calendar View** → Visual attendance patterns
5. **Mark Attendance** (Teachers) → Quick student attendance marking
6. **Attendance Summary** (Students) → Detailed stats with charts
7. **Goal Tracker** → Set goals and track streaks
8. **Smart Alerts** → Attendance warnings and insights
9. **Profile & Settings** → Account management and preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ for better education management
