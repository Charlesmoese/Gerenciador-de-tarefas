const tasks = [
  {
    id: 1,
    title: 'Estudar React',
    description: 'Revisar hooks e context',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 2;

function createTaskData({ title, description }) {
  const task = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}

function findTask(id) {
  return tasks.find((task) => task.id === id);
}

module.exports = {
  tasks,
  createTaskData,
  findTask,
};
