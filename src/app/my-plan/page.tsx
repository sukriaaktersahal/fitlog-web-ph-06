// use "use client", importing link, image ....
"use client"

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import {Workout, PlanWorkout} from "@/types";

// myPlanPage function
export default function MyPlanPage(){
    const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    metrics,
  } = usePlan();

//   active tab state
const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

// sort state
const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

// current list
const currentList: (Workout | PlanWorkout)[] = activeTab === "plan" ? plan : saved;

// sorting
const sortedList = [...currentList].sort((a, b) =>{
    if(sortBy === "duration") return a.duration - b.duration;
    if(sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if(sortBy === "rating") return b.rating - a.rating;
    return 0;
});

return(
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* title */}
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">My Plan</h1>
        <p className="mt-2 text-sm text-gray-500">Cap of five lifts for today. Finish them then load more.</p>

        {/* metrics summary row */}
        <div className="mt-8  grid grid-cols-3 gap-4 rounded-xl border border-white/10 bg-[#111111] p-5 sm:gap-6 sm:p-6">
        <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Exercises</p>
            <p className="font-display mt-1 text-3xl font-bold text-[#ccff00] sm:text-4xl">{metrics.exercises}</p>
        </div>

        <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Minutes</p>
            <p className="font-display mt-1 text-3xl font-bold text-[#ccff00] sm:text-4xl">{metrics.minutes}</p>
        </div>

        <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Calories</p>
            <p className="font-display mt-1 text-3xl font-bold text-[#ccff00] sm:text-4xl">{metrics.calories}</p>
        </div>
        </div>

        {/* tab with sorting */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            {/* tabs */}
            <div className="flex gap-2">
                <button onClick={() => setActiveTab("plan")} className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                    activeTab === "plan" ? "bg-[#ccff00] text-black": "border border-white/20 text-gray-400 hover:text-white"
                }`}
                >Today&apos;s Plan</button>

                <button onClick={() => setActiveTab("saved")} className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                    activeTab === "saved"? "bg-[#ccff00] text-black": "border border-white/20 text-gray-400 hover:text-white"
                }`}
                >Saved</button>
            </div>

            {/* sorting dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort By</span>
                <select value={sortBy} onChange={(e) =>
                    setSortBy(e.target.value as "duration" | "calories" | "rating")
                }
                className="rounded-lg border border-white/20 bg-[#111111] px-3 py-1.5 text-sm text-white outline-none focus:border-[#ccff00]">
                    <option value="duration">Duration</option>
                    <option value="calories">Calories</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
        </div>

        {/* content */}
        <div className="mt-6">
            {sortedList.length === 0?(
            // empty state
            <div className="rounded-xl border border-dashed border-white/20 p-12 text-center">
                <h3 className="font-display text-2xl font-bold uppercase">Nothing here yet</h3>
                <p className="mt-2 text-sm text-gray-500">Browse the library & add a lift to get today moving.</p>

                <Link href="/" className="mt-5 inline-block rounded-full bg-[#ccff00] px-6 py-2.5 font-bold text-black transition hover:bg-[#b8e600]">Go to workouts</Link>
            </div>
            ):(
                // workout list
                <div className="space-y-3"> 
                    {sortedList.map((item) => {
              const isDone = "isDone" in item && item.isDone;

              return ( 
                <div key={item.id} className={`flex flex-col gap-4 rounded-xl border border-white/10 bg-[#111111] p-4 sm:flex-row sm:items-center ${
                    isDone ? "opacity-50": ""}`} >

                        {/* thumbnail */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a] sm:h-16 sm:w-16">
                            <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" unoptimized/>
                        </div>

                        {/* info */}
                        <div className="min-w-0 flex-1">
                            <h3 className={`font-display text-lg font-bold uppercase leading-tight ${ isDone? "line-through" : "" }`}>{item.name}</h3>
                            <p className="mt-0.5 text-xs text-gray-500">{item.equipment}</p>

                            {/* status */}
                            <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-gray-400">
                                <span>⏱{item.duration}min</span>
                                <span>🔥{item.caloriesBurned}kcal</span>
                                <span>⭐{item.rating}</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex shrink-0 items-center gap-2">

                            {/* view details */}
                            <Link href={`/workout/${item.id}`} className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold transition hover:border-[#ccff00] hover:text-[#ccff00]">View Details</Link>

                            {/* mark as done  */}
                            {activeTab === "plan" && !isDone &&(
                                <button onClick={() => markAsDone(item.id)} className="rounded-full bg-[#ccff00] px-4 py-1.5 text-xs font-bold text-black transition hover:bg-[#b8e600]">✓Mark As Done</button>
                    )}

                    {/* remove button */}
                    <button onClick={() => 
                        activeTab === "plan"? removeFromPlan(item.id) : removeFromSaved(item.id)
                    } 
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-gray-400 transition hover:border-red-500 hover:text-red-500" aria-label="Remove">✕</button>
                    </div>
                </div>
              );
                })}
            </div>
            )}
        </div>
    </div>
);
}