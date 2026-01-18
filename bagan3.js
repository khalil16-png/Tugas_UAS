document.addEventListener('DOMContentLoaded', () => {
    const addtaskbtn = document.getElementById('addtaskbtn');
    const taskinput = document.getElementById('taskinput');
    const tasklist = document.getElementById('tasklist');
    const taskdate = document.getElementById('taskdate');
    const tasktime = document.getElementById('tasktime');

    let tasks = JSON.parse(localStorage.getItem("todo-data")) || [];

    function saveToLocalStorage() {
        localStorage.setItem('todo-data', JSON.stringify(tasks));
    }

    // Fungsi tanggal random 1 tahun ke belakang
    function getRandomDate() {
        const now = new Date();
        const past = new Date();
        past.setFullYear(now.getFullYear() - 1);

        const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
        return new Date(randomTime);
    }

    function addTask() {
        const taskText = taskinput.value.trim();

        if (taskText === "") {
            alert("Tugas tidak boleh kosong!");
            return;
        }

        let finalDateObj;

        // User pilih tanggal + waktu
        if (taskdate.value && tasktime.value) {
            finalDateObj = new Date(`${taskdate.value}T${tasktime.value}`);

        // Jika user hanya isi tanggal
        } else if (taskdate.value && !tasktime.value) {
            finalDateObj = new Date(`${taskdate.value}T00:00`);

        // Jika user hanya isi waktu
        } else if (!taskdate.value && tasktime.value) {
            const today = new Date().toISOString().split("T")[0];
            finalDateObj = new Date(`${today}T${tasktime.value}`);

        // Tidak memilih → random
        } else {
            finalDateObj = getRandomDate();
        }

        const task = {
            text: taskText,
            completed: false,
            date: finalDateObj.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
            time: finalDateObj.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            })
        };

        tasks.push(task);
        saveToLocalStorage();
        renderTasks();

        taskinput.value = '';
        taskdate.value = '';
        tasktime.value = '';
    }

    function renderTasks() {
        tasklist.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = task.completed ? 'completed' : '';

            listItem.innerHTML = `
                <div class="task-box">
                    <span class="task-text">${task.text}</span>
                    <span class="task-time">${task.date} — ${task.time}</span>
                </div>
                <button class="delete-btn">Delete</button>
            `;

            // Klik task → toggle selesai
            listItem.addEventListener('click', () => {
                task.completed = !task.completed;
                saveToLocalStorage();
                renderTasks();
            });

            // Tombol hapus
            const deleteBtn = listItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                tasks.splice(index, 1);
                saveToLocalStorage();
                renderTasks();
            });

            tasklist.appendChild(listItem);
        });

        updateCounts();
    }

    function updateCounts() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById("totalCount").textContent = total;
        document.getElementById("completedCount").textContent = completed;
        document.getElementById("pendingCount").textContent = pending;
    }

    addtaskbtn.addEventListener('click', addTask);

    taskinput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});
