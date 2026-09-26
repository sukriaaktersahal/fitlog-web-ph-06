// use client for useState, useEffect, useContext...
"use client";
import { useState, useEffect } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "./WorkoutCard";

// LibrarySection component
export default function LibrarySection() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect to fetch workouts
    useEffect(() => {
        async function loadData() {
            try {
                const data = await getAllWorkouts();
                setWorkouts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load workouts. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            {/* section heading */}
            <div className="mb-8">
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">The Library</h2>
                <p className="mt-1 text-sm text-gray-500">Twelve lifts covering every major muscle group.</p>
            </div>

            {/* loading state */}
            {loading &&(
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-3">
                        {/* spinner */}
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
                        <p className="text-sm text-gray-400">Loading workouts.......</p>
                    </div>
                </div>
            )}

            {/* error state */}
            {error &&(
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">{error}</div>
            )}

            {/* workouts grid */}
            {!loading && !error &&(
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{workouts.map((workout) =>(
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
                </div>
            )}
        </section>
    );
}
