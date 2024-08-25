<template>
  <div>
    <div>
      <div class="flex flex-col min-h-screen">
    <main class="flex-1">
        <div class="content pt-6 pb-10 px-4 sm:pt-6 sm:px-4 sm:pb-10 md:pt-8 lg:pt-6 md:px-4 lg:px-8 bg-[#f2f2f2]">
            <div class="table-content bg-white rounded-sm shadow-sm mx-auto mt-4 max-w-7xl">
                <div class="p-4">
                    <h1 class="text-base sm:text-lg md:text-xl font-medium text-[#303e67] pb-4">
                        Add Task
                        <p v-if="errormessage" class="text-xs text-red-600">
                            {{ errormessage }}
                        </p>
                    </h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="relative z-0 w-full  mb-2 sm:mb-6 md:mt-4 ">
                            <input
                                type="text"
                                name="title"
                                v-model="taskForm.title"
                                @input="handleChange"
                                placeholder=""
                                autocomplete="off"
                                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 focus:border-firoza border-gray-200 text-sm"
                            />
                            <label
                                for="name"
                                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 text-sm"
                            >Enter Task Title</label>
                            <p class="text-xs text-red-600"></p>
                        </div>
                        

                        <div class="relative z-0 w-full mb-2 sm:mb-6 md:mt-4">
                            <input
                                type="text"
                                name="description"
                                placeholder=""
                                v-model="taskForm.description"
                                @input="handleChange"
                                autocomplete="off"
                                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 focus:border-firoza border-gray-200 text-sm"
                           />
                            <label
                                for="name"
                                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 text-sm"
                            >Enter Task Description</label>
                            <p class="text-xs text-red-600"></p>
                        </div>

                        <div class="relative  w-full mb-2 sm:mb-6 flex flex-col">
        <label
          
            class="absolute duration-300 -top-3  origin-0 text-gray-500 text-sm"
        >Due Date</label>
        <div class="pt-5 z-999">
            <VueDatePicker
                :clearable="false" 
                :format="'dd/MM/yyyy'"
                :enable-time-picker="false"
                v-model="taskForm.dueDate"
                @change="handleChange"
                :min-date="new Date()"
                class="mt-0 bg-transparent border-0 focus:outline-none focus:ring-0 focus:border-firoza border-gray-200 text-sm"
            />
        </div>
    </div>

                        <div class="relative z-0 w-full mb-6 flex items-end">
        <button
            :disabled="!isFormValid"
            :class="!isFormValid
                ? 'cursor-not-allowed bg-[#8bc63e] opacity-50'
                : 'cursor-pointer bg-[#8bc63e]'"
            @click="!isEditMode ? submitForm() : updateForm()"
            type="button"
            class="w-full sm:w-auto rounded-md bg-[#8bc63e] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#8bc63e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 min-w-[180px]"
        >
            <span>{{buttonTitle}}</span>
        </button>
    </div>
                    </div>

                </div>

                <client-only>
                <view-added-tasks @emitEditableData="handleEvent" />
                </client-only>
            </div>
        </div>
    </main>
</div>

    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// Reactive form state
const taskForm = ref({
  title: '',
  description: '',
  dueDate: new Date(),
  taskStatus: 'Open'
})

const errormessage = ref('')
const taskFormList = ref([])
const taskStore = useTaskStore()
const isFormValid = ref(false)
const isEditMode = ref(false)
const selectedIndexForEdit = ref(null)
const buttonTitle = ref('Submit')

//const fetchData = ref(null)

onBeforeMount(() => {
  taskFormList.value  = localStorage.getItem(('myTaskList'))  ? JSON.parse(localStorage.getItem(('myTaskList'))) : []
  taskStore.addTask(taskFormList.value)
});


function handleEvent(data) {
 console.log("data in parent component",data)
 taskForm.value.title = data.titlevalue
 taskForm.value.description = data.descriptionvalue
 taskForm.value.dueDate = data.dueDatevalue
 taskForm.value.taskStatus = data.taskStatusvalue
 selectedIndexForEdit.value = data.indexVal

 if(selectedIndexForEdit.value !== null){
  isEditMode.value = true
  buttonTitle.value = 'Update'
  isFormValid.value = true
 }
}


function submitForm(){
  try {
  const titleExists = checkTitleExists(taskForm.value.title);
  if(titleExists){
    errormessage.value = 'Title name already exists'
  setTimeout(() => {
    errormessage.value = ''
  }, 3000)
  return false
  }
 // console.log("taskForm.value",taskForm.value)
   taskFormList.value.push({...taskForm.value})
   addtaskToStore()
  } catch (error) {
   console.log("error")
  }
}

  function addtaskToStore(){
   try {
   localStorage.setItem("myTaskList",JSON.stringify(taskFormList.value))
   taskStore.addTask(taskFormList.value)
   resetForm()
   }catch (error) {
   console.log("error")
   }
  }

   function updateForm(){
    
    try {
    const titleExists = checkIfAnytitleValueExistAtthatIndex(taskForm.value,selectedIndexForEdit.value)
    //console.log("titleExists",titleExists)

    if(titleExists){
    errormessage.value = 'Title name already exists'
    setTimeout(() => {
    errormessage.value = ''
    }, 3000)
    return false
    }

    taskFormList.value[selectedIndexForEdit.value] ={ ...taskForm.value }
    addtaskToStore()
   }catch(error){

   }
    }

    function checkIfAnytitleValueExistAtthatIndex(selectedTask,selectedIndex){
      return taskFormList.value.some((task, index) => task.title == selectedTask.title  && index !== selectedIndex);
    }

   

    function handleChange(evt) {
        let keyName = evt.target.name;
        let keyValue = evt.target.value;
       

        if(taskForm.value.title && taskForm.value.description && taskForm.value.dueDate){
          isFormValid.value = true
        }else{
          isFormValid.value = false
        }
      
      }

function checkTitleExists(title) {
    return taskFormList.value.some(task => task.title === title);
}



function resetForm(){
  setInitialValue()
  isFormValid.value = false
  isEditMode.value = false
  buttonTitle.value = 'Submit'

}

function setInitialValue(){
  taskForm.value.title = ''
  taskForm.value.description = ''
  taskForm.value.dueDate = new Date()
  taskForm.value.taskStatus = 'Open'
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
  