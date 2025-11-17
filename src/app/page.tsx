"use client"

import { useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")

  const addTask = () => {
    if (inputValue.trim() === "") return
    
    const newTask: Task = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }
    
    setTasks([...tasks, newTask])
    setInputValue("")
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
            Lista de Tarefas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Organize suas atividades do dia
          </p>

          {/* Input para adicionar tarefa */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite uma nova tarefa..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>

          {/* Lista de tarefas */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <p className="text-lg">Nenhuma tarefa ainda</p>
                <p className="text-sm mt-2">Adicione sua primeira tarefa acima!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 group"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 dark:border-gray-500 hover:border-green-500"
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </button>
                  
                  <span
                    className={`flex-1 text-gray-800 dark:text-gray-100 transition-all duration-200 ${
                      task.completed
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Contador de tarefas */}
          {tasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Total: {tasks.length} tarefa{tasks.length !== 1 ? "s" : ""}</span>
              <span>
                Concluídas: {tasks.filter(t => t.completed).length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
