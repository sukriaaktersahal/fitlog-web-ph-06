// use client for useState, usePlan....
"use client";

// importing use..., workout, image....
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";

// params 
type Params = Promise<{ id: string }>;

// workout details page function
export default function WorkoutDetailsPage({ params }: { params: Params }) {
  const { id } = use(params);
  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // workout function
  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  // loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
          <p className="text-sm text-gray-400">Loading workout…</p>
        </div>
      </div>
    );
  }

  // error or !workout
  if (error || !workout) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="font-display text-4xl font-bold">NOT FOUND</h1>
        <p className="text-gray-400"> This workout doesn&apos;t exist or failed to load.</p>
      </div>
    );
  }

  //button
  const isPlanFull = plan.length >= 5;
  const isInPlan = plan.some((item) => item.id === workout.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* left image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/*right image*/}
        <div>
          {/* title */}
          <h1 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">{workout.name}</h1>

          {/* description */}
          <p className="mt-3 text-gray-400">{workout.description}</p>

          {/* tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#ccff00]/10 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* key specification*/}
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
            {[
              ["Equipment", workout.equipment],
              ["Difficulty", workout.difficulty],
              ["Sets", workout.sets],
              ["Reps", workout.reps],
              ["Duration", `${workout.duration} min`],
              ["Calories", `${workout.caloriesBurned} kcal`],
              ["Rating", workout.rating],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 last:border-0">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {label}
                </span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* instructions*/}
          <div className="mt-6">
            <h3 className="font-display text-lg font-bold uppercase">
              Instructions
            </h3>
            <ol className="mt-3 space-y-2">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-400">
                  <span className="shrink-0 font-bold text-[#ccff00]">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/*action buttons*/}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)} disabled={isPlanFull || isInPlan} className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50">
              {isInPlan? "✓ Already in Plan": isPlanFull? "Plan Full (5)" : "➕ Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00]">
              🔖 Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}