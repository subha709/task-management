<template>
<div v-if="task" class="bg-gray-100 flex items-center justify-center min-h-screen">
  <button class="bg-blue-500 text-white px-4 py-2 rounded">Open Task Details</button>

  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Modal Content -->
    <div class="relative bg-white rounded-lg shadow-lg p-4 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
      <!-- Close Button -->
      <button @click="closePopup" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">
        &times;
      </button>

      <!-- Modal Title -->
      <h2 class="text-lg sm:text-xl font-semibold mb-4 text-center">Task Details</h2>

      <!-- Task Details Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b-2 border-gray-300 text-left">Task Title</th>
              <th class="py-2 px-4 border-b-2 border-gray-300 text-left">Task Description</th>
              <th class="py-2 px-4 border-b-2 border-gray-300 text-left">Due Date</th>
              <th class="py-2 px-4 border-b-2 border-gray-300 text-left">Task Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 border-b border-gray-300">{{ task.title }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ task.description }}</td>
              <td class="py-2 px-4 border-b border-gray-300">{{ task.dueDate }}</td>
              <td :class="task.taskStatus == 'Open' ? 'bg-blue-100 text-blue-600' : 'bg-green-600 text-white'" class="py-2 px-4 border-b border-gray-300">
                {{ task.taskStatus == 'Open' ? 'Open' : 'Completed' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  </template>
  
  <script setup>
  const emit = defineEmits(['emitPopupData'])
  const showDetPopup = ref(false)
  const props = defineProps({
  task: Object
  })

  onMounted(() => {
  console.log('Task Object:', props.task)
  })
  
 function closePopup(){
  emit('emitPopupData', false)
  }
 
  </script>
  
  <style>
  /* Additional styles can go here if needed */
  </style>
  