function toggleApp() {
    const app = document.getElementById('todoApp');
    const backdrop = document.getElementById('backdrop');
    const isVisible = app.style.display === 'block';
    app.style.display = isVisible ? 'none' : 'block';
    backdrop.style.display = isVisible ? 'none' : 'block';
  }
  
  // Set date
  const today = new Date();
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  document.getElementById('dayName').textContent = weekdays[today.getDay()];
  document.getElementById('dateNum').textContent = today.getDate();
  document.getElementById('monthName').textContent = months[today.getMonth()];
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
      tasks.push({ text: li.textContent.replace("🍂", "").trim(), done: li.classList.contains('done') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => {
      const li = createTaskElement(task.text, task.done);
      document.getElementById('taskList').appendChild(li);
    });
    updateProgress();
  }
  
  function createTaskElement(text, done = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if (done) li.classList.add('done');
    li.onclick = () => {
      li.classList.toggle('done');
      saveTasks();
      updateProgress();
    };
    return li;
  }
  
  function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text !== "") {
      const li = createTaskElement(text);
      document.getElementById('taskList').appendChild(li);
      input.value = "";
      saveTasks();
      updateProgress();
    }
  }
  
  function updateProgress() {
    const tasks = document.querySelectorAll('#taskList li');
    const done = document.querySelectorAll('#taskList li.done');
    const percent = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('progressPercent').textContent = `${percent}%`;
  }
  
  function finishDay() {
    alert("You’ve wrapped up today! ☕✨");
    localStorage.removeItem('tasks');
    document.getElementById('taskList').innerHTML = '';
    updateProgress();
  }
  
  function enterApp() {
    document.getElementById('welcome-screen').style.display = 'none';
    toggleApp();
  }
  
  loadTasks();
  