import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApplicationProvider } from "@/components/ApplicationContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerTrack | Job Application Tracker",
  description:
    "Track your job applications, manage interview pipelines, and monitor your job search progress with CareerTrack.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ApplicationProvider>
          {children}
        </ApplicationProvider>
      </body>
    </html>
  );
}
