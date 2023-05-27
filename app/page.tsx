import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ED Optimizer",
  description:
    "An application for analyzing existing emergency department schedules and quickly designing new shift schedules that are optimized to match the pattern of arrivals.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <p>Will need a login page here!</p>

        <Link
          href="/data-load"
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          Data Loader
        </Link>
        <Link
          href="/schedule-analyzer"
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          Schedule Analyzer
        </Link>
      </div>
    </main>
  );
}
