// stores/tasks.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<any[]>([])

  console.log("taskslist",tasks)
  const newTask = ref('')

  function addTask(task: any) {
    // console.log("add to task called")
    // console.log("task",task)
    tasks.value = task
   // tasks.value.push(task)
  }

  function removeTask(index: number) {
    tasks.value.splice(index, 1)
  }

  function filterTask(filterObj: any) {
  console.log("filterObj", filterObj.value);
  
  let filteredTasks = [...tasks.value]; // Create a copy of the tasks array

  if (filterObj.value.statusType) {
    console.log("Filtering by status type:", filterObj.value.statusType);
    filteredTasks = filteredTasks.filter(task => task.taskStatus === filterObj.value.statusType);
  }

  if (filterObj.value.sortType) {
   // console.log("Sorting by date:", filterObj.value.sortType);
    filteredTasks = filterByDate(filteredTasks, filterObj.value.sortType);
  }

  return filteredTasks;
 }

  function filterByDate(tasksArray: any[], sortType: string) {
    if (sortType === 'ascending') {
      return tasksArray.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else {
      return tasksArray.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }
  }

  return {
    tasks,
    newTask,
    addTask,
    removeTask,
    filterTask,
    filterByDate
  }
})
