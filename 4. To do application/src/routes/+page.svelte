<script>
    import "../app.css";
    import { onMount } from "svelte";
    let todos = [];
    let newTask = "";
    let today = new Date();
    let showToast = false;
    let toastMessage = "";
    let toastTimeout;
    let color = "";

    let month, fullDate;

    onMount(() => {
        month = today.toLocaleDateString("en-US", { month: "long" });
        fullDate = today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
    });

    function addTodo() {
        if (newTask.trim()) {
            todos = [...todos, { text: newTask.trim(), done: false }];
            newTask = "";
            triggerToast("Task added successfully.", "success");
        } else {
            triggerToast("Please enter a task.", "error");
        }
    }

    function toggleTodo(index) {
        todos[index].done = !todos[index].done;
        if (todos[index].done) {
            triggerToast("Task marked as complete.", "success");
        } else {
            triggerToast("Task marked as incomplete.", "error");
        }
    }

    function triggerToast(message, type) {
        toastMessage = message;
        showToast = true;

        color = type === "success" ? "bg-green-500" : "bg-red-500";
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            
            showToast = false;
        }, 3000);

        document.querySelector('.toast').className = `fixed top-6 left-1/2 transform -translate-x-1/2 ${color} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300`;
    }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-xl rounded-xl p-6 w-full max-w-md relative">
        <div class="text-center mb-4 font-bold">
            <h1 class="text-6xl mb-5" style="color: #5e6477;">{month}</h1>
            <h2 class="text-m" style="color: #acb2e0;">{fullDate}</h2>
        </div>

        <hr class="my-4 border-gray-300" />

        <div class="space-y-3">
            {#each todos as todo, index}
                <div
                    class="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm"
                >
                    <span
                        class:text-gray-800={!todo.done}
                        class:text-gray-400={todo.done}
                        class:line-through={todo.done}
                    >
                        {todo.text}
                    </span>
                    <button on:click={() => toggleTodo(index)} class="ml-4">
                        {#if todo.done}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#4ade80"
                                class="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                                />
                            </svg>
                        {:else}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#caced6"
                                class="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                                />
                            </svg>
                        {/if}
                    </button>
                </div>
            {/each}
        </div>

        <div class="mt-6">
            <input
                bind:value={newTask}
                on:keydown={(e) => e.key === "Enter" && addTodo()}
                type="text"
                placeholder="Add Task"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-9 mt-3"
            />
        </div>

        <div
            class="absolute bottom-[-1.2rem] left-1/2 transform -translate-x-1/2"
        >
            <button
                on:click={addTodo}
                class="bg-green-500 text-white px-12 font-bold py-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
            >
                Add
            </button>
        </div>
    </div>

    {#if showToast}
        <div
            class="fixed top-6 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300"
            class:bg-green-500={color === "bg-green-500"}
            class:bg-red-500={color === "bg-red-500"}
        >
            {toastMessage}
        </div>
    {/if}
</div>
