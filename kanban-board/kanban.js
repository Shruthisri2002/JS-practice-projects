class KanbanBoard {
    constructor(selector) {
      this.parentContainer = document.querySelector(selector);
      this.db = {
        boards: this.getBoardsFromLocalStorage(),
        tasks: this.getTasksFromLocalStorage(),
      };
      this.renderUI();
    }
  
    /**
     *
     * @returns {array}
     */
    getBoardsFromLocalStorage() {
      if (localStorage.getItem("boards"))
        return JSON.parse(localStorage.getItem("boards"));
      return [];
    }
  
    /**
     *
     * @returns {array}
     */
    getTasksFromLocalStorage() {
      if (localStorage.getItem("tasks"))
        return JSON.parse(localStorage.getItem("tasks"));
      return [];
    }
  
    getTasksByBoardId(id) {
      return this.db.tasks.filter((e) => e.boardId === id);
    }
  
    handleAddBoard() {
      const boardName = prompt("Board Title");
      if (!boardName) return;
  
      const entry = {
        id: `${boardName}_${Date.now()}`,
        name: boardName,
        createdAt: Date.now(),
      };
  
      this.db.boards.push(entry);
      localStorage.setItem("boards", JSON.stringify(this.db.boards));
      this.renderUI();
    }
  
    renderUI() {
      const currentTree = this.parentContainer; // Current Tree Structure
      const fragment = this.renderBoards(); // Updated Tree Structure
      this.parentContainer.innerHTML = ""; //  Discarding Current
      this.parentContainer.appendChild(fragment); // Updating the new one
    }
  
    attachEventListenerToCard(card) {
      card.addEventListener("dragstart", () => {
        card.classList.add("is-dragging");
        card.addEventListener("dragend", () => {
          card.classList.remove("is-dragging");
  
          const boardId = card.parentElement.id;
          const id = card.id;
  
          const index = this.db.tasks.findIndex((e) => e.id === id);
          this.db.tasks[index].boardId = boardId;
          localStorage.setItem("tasks", JSON.stringify(this.db.tasks));
          this.renderUI();
        });
      });
    }
  
    
      
    renderBoards() {
        const fragment = document.createDocumentFragment();
      
        const boards = this.db.boards;
        for (const board of boards) {
          const { id, name } = board;
          const container = document.createElement("div");
          container.classList.add("board");
          container.id = id;
      
          const boardHeadingContainer = document.createElement("div");
          const h3Tag = document.createElement("h3");
      
          const addTaskBtn = document.createElement("button");
          addTaskBtn.innerText = `Create task`;
      
          addTaskBtn.addEventListener("click", () => {
            const task = prompt(`Enter task for ${name}`);
            if (!task) return;
            const entry = {
              id: `${Date.now()}`,
              title: task,
              boardId: id,
              createdAt: Date.now(),
            };
            this.db.tasks.push(entry);
            localStorage.setItem("tasks", JSON.stringify(this.db.tasks));
            this.renderUI();
          });
      
          h3Tag.innerText = name;
          boardHeadingContainer.appendChild(h3Tag);
          boardHeadingContainer.appendChild(addTaskBtn);
      
          container.appendChild(boardHeadingContainer);
      
          const tasks = this.getTasksByBoardId(id);
      
          for (const task of tasks) {
            const { id, title } = task;
            const taskContainer = document.createElement("div");
            taskContainer.classList.add("task-container");
      
            const taskPara = document.createElement("p");
            taskPara.innerText = title;
            taskPara.id = id;
            taskPara.classList.add("card");
            taskPara.setAttribute("draggable", "true");
            this.attachEventListenerToCard(taskPara);
      
            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
      
            // Recycle bin icon
            const recycleIcon = document.createElement("span");
            recycleIcon.innerHTML = "&#x1F5D1;"; // Recycle bin emoji
            deleteBtn.appendChild(recycleIcon);
      
            // Attach event listener for deletion
            deleteBtn.addEventListener("click", () => {
              this.deleteTask(task.id, id);
            });
      
            // Append task and delete button to the task container
            taskContainer.appendChild(taskPara);
            taskContainer.appendChild(deleteBtn);
            container.appendChild(taskContainer);
          }
      
          function findClosestElement(board, mouseY) {
            const tasks = board.querySelectorAll(".card:not(.is-dragging)");
      
            let closestElement = null;
            let closestDistance = Number.NEGATIVE_INFINITY;
      
            tasks.forEach((task) => {
              const { top } = task.getBoundingClientRect();
              const distance = mouseY - top;
      
              if (distance < 0 && distance > closestDistance) {
                closestDistance = distance;
                closestElement = task;
              }
            });
      
            return closestElement;
          }
      
          container.addEventListener("dragover", (e) => {
            const card = document.querySelector(".is-dragging");
            const closestElement = findClosestElement(container, e.clientY);
            if (closestElement) {
              container.insertBefore(card, closestElement);
            } else {
              container.appendChild(card);
            }
          });
      
          fragment.appendChild(container);
        }
      
        const addBoardButton = document.createElement("button");
        addBoardButton.innerText = "Create Board";
        addBoardButton.addEventListener("click", this.handleAddBoard.bind(this));
      
        fragment.appendChild(addBoardButton);
      
        return fragment;
      }
      
      deleteTask(taskId, boardId) {
        // Remove the task from the tasks array
        const taskIndex = this.db.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          this.db.tasks.splice(taskIndex, 1);
          localStorage.setItem("tasks", JSON.stringify(this.db.tasks));
          this.renderUI();
        }
      }
       
      
}
  
new KanbanBoard(".container");