import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "friday.mpscexam.in | Radix Admin Panel",
  description: "MPSC Exam Content Management Panel - Radix Black & White",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-panel min-h-screen bg-[#fafafa] text-zinc-950 font-sans antialiased selection:bg-zinc-900 selection:text-white">
      {children}
    </div>
  );
}
