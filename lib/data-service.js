import { supabase } from "./supabase-client"

// Profile functions
export async function getProfile(userId) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId)

  if (error) throw error
  return data
}

// Workout functions
export async function getWorkouts(userId) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) throw error
  return data
}

export async function createWorkout(workout) {
  const { data, error } = await supabase.from("workouts").insert([workout]).select()

  if (error) throw error
  return data[0]
}

export async function getWorkoutExercises(workoutId) {
  const { data, error } = await supabase
    .from("exercises_log")
    .select("*")
    .eq("workout_id", workoutId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function addExerciseToWorkout(exercise) {
  const { data, error } = await supabase.from("exercises_log").insert([exercise]).select()

  if (error) throw error
  return data[0]
}

// Meal functions
export async function getMeals(userId) {
  const { data, error } = await supabase
    .from("meals")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) throw error
  return data
}

export async function createMeal(meal) {
  const { data, error } = await supabase.from("meals").insert([meal]).select()

  if (error) throw error
  return data[0]
}

// Water intake functions
export async function getWaterIntake(userId, date) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const { data, error } = await supabase
    .from("water_intake")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startOfDay.toISOString())
    .lte("date", endOfDay.toISOString())

  if (error) throw error
  return data
}

export async function addWaterIntake(userId, amount) {
  const { data, error } = await supabase
    .from("water_intake")
    .insert([
      {
        user_id: userId,
        amount,
        date: new Date().toISOString(),
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

// Weight log functions
export async function getWeightLogs(userId) {
  const { data, error } = await supabase
    .from("weight_logs")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) throw error
  return data
}

export async function addWeightLog(userId, weight) {
  const { data, error } = await supabase
    .from("weight_logs")
    .insert([
      {
        user_id: userId,
        weight,
        date: new Date().toISOString(),
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

// Steps log functions
export async function getStepsLogs(userId, date) {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const { data, error } = await supabase
    .from("steps_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startOfDay.toISOString())
    .lte("date", endOfDay.toISOString())

  if (error) throw error
  return data
}

export async function addStepsLog(userId, steps) {
  const { data, error } = await supabase
    .from("steps_logs")
    .insert([
      {
        user_id: userId,
        steps,
        date: new Date().toISOString(),
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

// Food items functions
export async function getFoodItems(category = null) {
  let query = supabase.from("food_items").select("*")

  if (category) {
    query = query.eq("food_category", category)
  }

  const { data, error } = await query.order("name", { ascending: true })

  if (error) throw error
  return data
}

// Exercise functions
export async function getExercises(category = null) {
  let query = supabase.from("exercises").select("*, exercise_categories(name)")

  if (category) {
    query = query.eq("category_id", category)
  }

  const { data, error } = await query.order("name", { ascending: true })

  if (error) throw error
  return data
}

// User goals functions
export async function getUserGoals(userId) {
  const { data, error } = await supabase
    .from("user_goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createUserGoal(goal) {
  const { data, error } = await supabase.from("user_goals").insert([goal]).select()

  if (error) throw error
  return data[0]
}

export async function updateUserGoal(goalId, updates) {
  const { data, error } = await supabase.from("user_goals").update(updates).eq("goal_id", goalId)

  if (error) throw error
  return data
}
