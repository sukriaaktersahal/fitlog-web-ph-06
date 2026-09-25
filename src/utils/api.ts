// importing workout from types
import {Workout} from "@/types";

// fitlog api_base url
const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

// workout function
export async function getAllWorkouts(): Promise<Workout[]> {
    const res = await fetch(API_BASE);

    if(!res.ok){
        throw new Error(`Failed to fetch workouts: ${res.status}`);
    }

    const data = await res.json();
    return data;
}

// workout with function id
export async function getWorkoutById(id: string | number): Promise<Workout>{
    const res = await fetch(`${API_BASE}/${id}`);

    if(!res.ok){
        throw new Error(`Failed to fetch workout with id ${id}: ${res.status}`);
    }
    const data = await res.json();
    return data;
}
