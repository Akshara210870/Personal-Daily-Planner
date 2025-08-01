 const planner = document.getElementById("planner");

    function formatTime(hour) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${displayHour}:00 ${ampm}`;
    }

    for (let hour = 7; hour <= 22; hour++) {
      const savedText = localStorage.getItem("task-" + hour) || "";
      const isDone = localStorage.getItem("done-" + hour) === "true";

      const row = document.createElement("div");
      row.className = "row";

      row.innerHTML = `
        <div class="row-top">
          <div class="time">${formatTime(hour)}</div>
        </div>
        <input type="text" id="task-${hour}" value="${savedText}" class="${isDone ? 'done' : ''}">
        <div class="actions">
          <label><input type="checkbox" id="done-${hour}" ${isDone ? 'checked' : ''}> Done</label>
          <button onclick="saveTask(${hour})">Save</button>
        </div>
      `;

      planner.appendChild(row);
    }

    function saveTask(hour) {
      const taskInput = document.getElementById("task-" + hour);
      const doneCheck = document.getElementById("done-" + hour);

      localStorage.setItem("task-" + hour, taskInput.value);
      localStorage.setItem("done-" + hour, doneCheck.checked);

      if (doneCheck.checked) {
        taskInput.classList.add("done");
      } else {
        taskInput.classList.remove("done");
      }
    }