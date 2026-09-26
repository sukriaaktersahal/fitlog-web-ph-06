// use client for usePathname..
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

// Navbar component
export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a] backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                {left logo}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl text-[#ccff00]">FitLog</span>
                    <span className="font-display text-xl font-bold tracking-wide">FITLOG</span>
                </Link>

                {/* Middle nav links */}
                <div className="hidden gap-6 sm:flex">
                    <Link
                        href="/"
                        className={`text-sm font-semibold uppercase tracking-wide transition ${
                            pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
                            >
                                Workout
                            </Link>
                    <Link
                        href="my/plan"
                        className={`text-sm font-semibold uppercase tracking-wide transition ${
                            pathname === "/my/plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
                            >
                                My Plan
                            </Link>
                </div>

                {/* Right-aligned nav links */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold text-black transition hover:bg-[#b8e600]"
                    >
                        Plan
                        <span className="rounded-full bg-black/20 px-1.5">{plan.length}</span>
                    </Link>
                    <Link
                        href="/my-plan"
                        className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                        >
                            Saved
                            <span className="rounded-full bg-white/10 px-1.5">{saved.length}</span>
                        </Link>
                    </div>
            </nav>
        </header>
    );
}