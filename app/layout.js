import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Inter } from 'next/font/google'
import { TeacherProvider } from "./context/TeacherContext";
import { StudentProvider } from "./context/StudentContext"; 
import { CourseProvider } from "./context/CourseContext"; 
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Face Attendance Admin',
  description: 'Admin panel for facial recognition attendance system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TeacherProvider>
            <StudentProvider>
              <CourseProvider>
            {children}
              </CourseProvider>
            </StudentProvider>
          </TeacherProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



