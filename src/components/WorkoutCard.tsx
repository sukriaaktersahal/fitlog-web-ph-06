// importing link, image....
import Link from "next/link";
import Image from "next/image";
import {Workout} from "@/types";

// workout interface props
interface WorkoutCardProps {
    workout: Workout;
}

// workout function component
export default function WorkoutCard({ workout }: WorkoutCardProps) {
    return (
        <Link href={`/workout/${workout.id}`} className="group block overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-[#ccff00]/50">
            {/* image */}
            <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-110" unoptimized />
                {/* unoptimized as API image URL not in Next.js configuration */}
            </div>

            {/* info */}
            <div className="p-4">
                {/* category  */}
                <div className="mb-2 flex flex-wrap gap-1.5">
                    {workout.muscleGroups.map((tag) => (
                        <span key={tag} className="rounded-full border border-[#ccff00]/40 px-2 py-0.5 text-[10px] font-bold uppercase text-[#ccff00]">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* name */}
                <h3 className="font-display text-lg font-bold uppercase leading-tight">{workout.name}</h3>

                {/* equipment */}
                <p className="mt-1 text-xs text-gray-500">{workout.equipment}</p>

                {/* starts row */}
                <div className="mt-3 flex items-center gap-4 border-t border-white/10 pt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        ⏱{workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                        🔥 {workout.caloriesBurned} kal
                    </span>
                    <span className="flex items-center gap-1">
                        ⭐ {workout.rating}
                    </span>
                </div>
            </div>
        </Link>
    );
}