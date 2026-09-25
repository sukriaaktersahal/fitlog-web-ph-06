// typescript type
// data from API

export interface Workout{
    id : number;
    name : string;
    image : string;
    muscleGroups : string[];
    equipment :string;
    difficulty : string;
    duration : number;
    caloriesBurned : number;
    sets : number;
    reps : string;
    rating : number;
    description : string;
    instructions : string[];
}

// plan workkout interface 
export interface PlanWorkout extends Workout{
    isDone : boolean;
}
