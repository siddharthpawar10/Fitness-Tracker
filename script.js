const workouts = [];
let goal = 0;

function addWorkout() {
  const name = document.getElementById('exerciseName').value.trim();
  const calories = parseInt(document.getElementById('caloriesBurned').value);

  if (!name || isNaN(calories)) {
    alert('Please enter valid workout details.');
    return;
  }

  const workout = {
    name,
    calories,
    date: new Date().toLocaleDateString()
  };

  workouts.unshift(workout);
  renderWorkouts();
  updateSummary();

  document.getElementById('exerciseName').value = '';
  document.getElementById('caloriesBurned').value = '';
}

function renderWorkouts() {
  const list = document.getElementById('workoutList');
  list.innerHTML = '';

  workouts.forEach(w => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${w.date} - ${w.name}</span><span>${w.calories} cal</span>`;
    list.appendChild(li);
  });
}

function updateSummary() {
  const total = workouts.reduce((sum, w) => sum + w.calories, 0);
  document.getElementById('totalCalories').textContent = total;

  if (goal > 0) {
    const percent = Math.min((total / goal) * 100, 100).toFixed(0);
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percent + '%';
    progressBar.textContent = percent + '%';
    document.getElementById('goalText').textContent = `${percent}% of ${goal} cal goal`;
  }
}

document.getElementById('goalInput').addEventListener('input', function () {
  goal = parseInt(this.value);
  updateSummary();
});
