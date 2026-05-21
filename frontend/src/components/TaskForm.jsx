import { useState, useEffect } from 'react'
import styles from './TaskForm.module.css'

export default function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title || '')
  const [description, setDescription] = useState(task.description || '')
  const [error, setError] = useState('')

  useEffect(() => {
    setTitle(task?.title || '')
    setDescription(task?.description || '')
    setError('')
  }, [task?.id])

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) {
      setError('O título é obrigatório.')
      return
    }

    onSave({
      id: task.id,
      title: title.trim(),
      description: description.trim(),
      completed: task.completed || false,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>{task.id ? 'Editar tarefa' : 'Nova tarefa'}</h2>
      </div>
      <label className={styles.field}>
        Título
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Digite o título da tarefa"
        />
      </label>
      <label className={styles.field}>
        Descrição
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descrição opcional"
          rows={4}
        />
      </label>
      {error && <p className={styles.formError}>{error}</p>}
      <div className={styles.actions}>
        <button type="submit" className={styles.saveButton}>
          {task.id ? 'Salvar mudanças' : 'Criar tarefa'}
        </button>
        {task.id && (
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
