import { useEffect, useState } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../services/api'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import styles from './Home.module.css'

const initialForm = {
  title: '',
  description: '',
}

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    setLoading(true)
    setError('')
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError('Não foi possível carregar as tarefas. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(task) {
    setError('')
    try {
      if (task.id) {
        const updated = await updateTask(task.id, task)
        setTasks((current) => current.map((item) => (item.id === updated.id ? updated : item)))
        setMessage('Tarefa atualizada com sucesso.')
      } else {
        const created = await createTask(task)
        setTasks((current) => [created, ...current])
        setMessage('Tarefa criada com sucesso.')
      }
      setSelectedTask(null)
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar tarefa.')
    }
  }

  async function handleRemove(id) {
    setError('')
    const confirmed = window.confirm('Tem certeza que deseja excluir esta tarefa?')
    if (!confirmed) {
      return
    }

    try {
      await deleteTask(id)
      setTasks((current) => current.filter((task) => task.id !== id))
      if (selectedTask?.id === id) {
        setSelectedTask(null)
      }
      setMessage('Tarefa removida com sucesso.')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir tarefa.')
    }
  }

  async function handleToggle(task) {
    setError('')
    try {
      const updated = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      })
      setTasks((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao atualizar status.')
    }
  }

  function handleEdit(task) {
    setSelectedTask(task)
    setMessage('')
    setError('')
  }

  function handleCancel() {
    setSelectedTask(null)
    setError('')
    setMessage('')
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.tag}>Gerenciador de Tarefas</p>
          <h1>Organize suas tarefas com facilidade</h1>
          <p className={styles.subtitle}>
            Use o formulário para criar ou editar tarefas e gerencie o status diretamente da
            lista.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.panel}>
          <TaskForm
            key={selectedTask?.id ?? 'new'}
            task={selectedTask ?? initialForm}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Tarefas</h2>
            <span>{tasks.length} tarefa{tasks.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className={styles.status}>Carregando tarefas...</div>
          ) : error ? (
            <div className={styles.statusError}>{error}</div>
          ) : tasks.length === 0 ? (
            <div className={styles.status}>Nenhuma tarefa encontrada.</div>
          ) : (
            <TaskList tasks={tasks} onDelete={handleRemove} onToggle={handleToggle} onEdit={handleEdit} />
          )}

          {message && <div className={styles.statusSuccess}>{message}</div>}
        </div>
      </section>
    </main>
  )
}
