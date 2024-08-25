
<template>
  <div>
    <div class="min-h-screen flex flex-col">
     
      

      <div class="flex-1 bg-[#f2f2f2] px-4 py-6 sm:py-6 sm:px-4 md:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="text-base sm:text-lg md:text-xl font-medium text-right">Task List</div>
        </div>
         <!-- Filter Section Start  -->
        <div class="bg-white border-t-[0px] border-t-[#f3f3f9] mt-3">
          <h3 class="p-4 text-base font-medium text-gray-700 border-b border-b-gray-200">Filter</h3>

          <div class="p-4">
            <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <label class="text-sm font-medium text-gray-500 pb-2 block">TYPE</label>
                <div class="relative">
                  <select v-model="filterObject.statusType"
                    class=" sm:w-full p-2 text-sm text-gray-600 bg-transparent border border-gray-200 rounded focus:outline-none focus:ring-0 focus:border-[#48cef3]">
                    <option value="" class="sm:text-xs">Please Select Type</option>
                    <option value="Open" class="sm:text-xs">Open</option>
                    <option value="Completed" class="sm:text-xs">Completed</option>
                  </select>
                  <span class="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                  </span>
                </div>
              </div>


              <div>
                <label class="text-sm font-medium text-gray-500 pb-2 block">Sort By</label>
                <div class="relative">
                  <select v-model="filterObject.sortType"
                    class=" sm:w-full p-2 text-sm text-gray-600 bg-transparent border border-gray-200 rounded focus:outline-none focus:ring-0 focus:border-[#48cef3]">
                    <option value="">Sort By date</option>
                    <option value="ascending">Ascending</option>
                    <option value="decending">Descending</option>
                  </select>
                  <span class="absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none">
                  </span>
                </div>
              </div>
            </div>

            <div class="flex justify-end pt-5">
              <button @click="clearFilterData"
                class="flex items-center justify-center h-[45px] px-4 py-2 mr-6 text-sm font-medium text-gray-600 bg-[#f4f4f4] rounded">
                Clear
              </button>
              <!-- <button  
              @click="filterData"
              class="flex items-center justify-center h-[45px] px-4 py-2 text-sm font-medium text-white bg-[#8bc63e] rounded"
            >
              Search
            </button> -->
            </div>
          </div>
        </div>
        <!-- Filter Section End  -->
        
        
        <div class="table-content mt-6 overflow-y-auto rounded-sm max-h-screen">
          <div v-if="filteredTasks.length" class="mt-4">
            <div class="overflow-x-auto">
              <!-- Horizontal scroll for the table -->
              <div class="min-w-full align-middle inline-block">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="sticky top-0 bg-gray-50">
                    <tr class="divide-x divide-gray-200">
                      <th class="px-2 py-3 text-left text-xs font-semibold text-gray-900 sm:px-4 sm:text-sm">Task Title
                      </th>
                      <th class="px-2 py-3 text-left text-xs font-semibold text-gray-900 sm:px-4 sm:text-sm">Description
                      </th>
                      <th class="px-2 py-3 text-left text-xs font-semibold text-gray-900 sm:px-4 sm:text-sm">Due Date
                      </th>
                      <th class="px-2 py-3 text-left text-xs font-semibold text-gray-900 sm:px-4 sm:text-sm">Status</th>
                      <th class="px-2 py-3 text-left text-xs font-semibold text-gray-900 sm:px-4 sm:text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in filteredTasks" :key="index" class="divide-x divide-gray-200">
                      <td class="px-2 py-4 text-sm font-medium text-gray-900 whitespace-normal sm:px-4">{{ item.title }}
                      </td>
                      <td class="px-2 py-4 text-sm text-gray-500 whitespace-normal sm:px-4">{{ item.description }}</td>
                      <td class="px-2 py-4 text-sm text-gray-500 whitespace-nowrap sm:px-4">{{
                        formattedDate(item.dueDate) }}</td>
                      <td class="px-2 py-4 text-sm whitespace-nowrap sm:px-4">
                        <span
                          :class="item.taskStatus == 'Open' ? 'bg-blue-100 text-blue-600' : 'bg-green-600 text-white'"
                          class="px-2 py-1 rounded-full">
                          {{ item.taskStatus == 'Open' ? 'Open' : 'Completed' }}
                        </span>
                      </td>
                      <td class="px-2 py-4 text-sm text-gray-500 whitespace-normal sm:px-4">
                        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <a @click="editTaskItem(item, index)"
                            class="cursor-pointer text-orange-500 hover:text-orange-900 pr-2 sm:border-r sm:border-gray-300">Edit</a>
                          <a @click="chnagePublishStatus(item, index)"
                            :class="item.taskStatus == 'Open' ? 'text-green-600' : 'text-blue-500'"
                            class="cursor-pointer mt-2 sm:mt-0 sm:ml-3">
                            {{ item.taskStatus == 'Open' ? 'Mark as Completed' : 'Make as Open' }}
                          </a>
                          <a @click="viewTaskDetails(item)"
                            class="cursor-pointer text-green-800 hover:text-green-900 mt-2 sm:mt-0 sm:ml-3">View</a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center min-h-[350px] text-center">
            <img src="~/assets/css/images/nodata.jpg" alt="No Data" class="h-auto max-w-full pb-2" />
            <div>No Tasks Found</div>
          </div>
        </div>
      </div>
    </div>


    <AtomsTaskDetails v-if="showTaskDetailsPopup" :task="taskObject" @emitPopupData="emitPopupData" />
  </div>
</template>

    

      
      <script setup> 
      import moment from 'moment'
        const showTaskDetailsPopup  = ref(false)

        const filteredTasks = computed(() => taskStore.filterTask(filterObject))
      
        const taskObject = ref({
        title: '',
        description: '',
        dueDate: '',
        taskStatus: ''
        })

        const filterObject = ref({
        statusType: '',
        sortType: '',
        })

        const EdittaskForm = ref({
        indexVal:null,
        titlevalue: '',
        descriptionvalue: '',
        dueDatevalue: new Date(),
        taskStatusvalue: ''
        })
      
      import { useTaskStore } from '@/stores/tasks'
      const emit = defineEmits(['emitEditableData'])
      // Initialize the task store
      const taskStore = useTaskStore()
      const tasks = taskStore.tasks
      const count = ref(0);
      const taskList = ref(tasks) ; 

            
      // lifecycle hooks
      onMounted(() => {
      });

      function clearFilterData(){
       filterObject.value.statusType = ''
       filterObject.value.sortType = ''
      }

      // function filterData(){
      //   console.log("tasks",tasks)
      //  console.log(filterObject.value.statusType)
      //  filterTaskData()
      // }

      // function filterTaskData(){
      //   console.log(taskList.value)
      //   taskStore.filterTask(filterObject)
      // }
      

      function formattedDate(dueDate){
        return moment(dueDate).format('MMMM Do YYYY')
      }

      function editTaskItem(item,index){
        EdittaskForm.value.indexVal = index
        EdittaskForm.value.titlevalue = item.title
        EdittaskForm.value.descriptionvalue = item.description
        EdittaskForm.value.dueDatevalue = item.dueDate
        EdittaskForm.value.taskStatusvalue = item.taskStatus
        emit('emitEditableData', EdittaskForm.value)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      function chnagePublishStatus(item,index){
      try {
     //console.log(tasks,index,item)
      tasks[index].taskStatus = item.taskStatus == 'Open' ? 'Completed' : 'Open' 
      addtaskToStore(tasks)
      } catch (error) {
      console.log("error")
      }
      
    }

      function viewTaskDetails(itemdetails){
        taskObject.value.title = itemdetails.title
        taskObject.value.description = itemdetails.description
        taskObject.value.dueDate = formattedDate(itemdetails.dueDate)
        taskObject.value.taskStatus = itemdetails.taskStatus
        showTaskDetailsPopup.value = true
      }

      function emitPopupData(popupstatus){
        showTaskDetailsPopup.value = false
      }
    

      function addtaskToStore(tasks){
      localStorage.setItem("myTaskList",JSON.stringify(tasks))
      taskStore.addTask(tasks)
    
    }   

      </script>
      
      
      
        <style>
      .-z-1 {
        z-index: -1;
      }
      
      .origin-0 {
        transform-origin: 0%;
      }
      
      input[type="text"]:focus ~ label,
      input[type="email"]:focus ~ label,
      input[type="text"]:not(:placeholder-shown) ~ label,
      input[type="email"]:not(:placeholder-shown) ~ label,
      textarea:focus ~ label,
      textarea:not(:placeholder-shown) ~ label,
      select:focus ~ label,
      select:not([value=""]):valid ~ label {
        /* @apply transform; scale-75; -translate-y-6; */
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 0;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
          rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
          scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        --tw-scale-x: 0.75;
        --tw-scale-y: 0.75;
        --tw-translate-y: -1.5rem;
      }
      
      input[type="text"]:focus ~ label,
      input[type="email"]:focus ~ label,
      select:focus ~ label {
        /* @apply text-black; left-0; */
        --tw-text-opacity: 1;
        color: rgba(72, 206, 243, var(--tw-text-opacity));
        left: 0px;
      }
      
      input[type="text"]:not(:placeholder-shown) ~ label,
      select:not([value=""]):valid ~ label {
        color: rgba(72, 206, 243, var(--tw-text-opacity));
      }
      
      .subcategory-list {
        min-height: 150px;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 300px;
      }
      
      .accordion-button:not(.collapsed)::after {
        background-image: url(~/assets/images/down-arrow.svg) !important;
        transform: rotate(-180deg) !important;
      }
      
      .accordion-button::after {
        width: 1rem !important;
        height: 1rem !important;
        background-size: 1rem !important;
        background-image: url(~/assets/images/down-arrow.svg) !important;
      }
      
      .accordion-item:first-of-type {
        border-top-left-radius: 0rem !important;
        border-top-right-radius: 0rem !important;
      }
      
      .accordion-item:not(:first-of-type) {
        border-top: 1px solid #e5e7eb !important;
      }
      
      .accordion-item:last-of-type {
        border-bottom-right-radius: 0rem !important;
        border-bottom-left-radius: 0rem !important;
      }
      
      .accordion-button:not(.collapsed) {
        box-shadow: none !important;
        border-bottom: 1px solid #e5e7eb !important;
      }
      </style>
        