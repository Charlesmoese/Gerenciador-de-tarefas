import styles from './TaskList.module.css'

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <article key={task.id} className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
          <div className={styles.topRow}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description || 'Sem descrição'}</p>
            </div>
            <span className={styles.status}>{task.completed ? 'Concluída' : 'Pendente'}</span>
          </div>

          <div className={styles.details}>
            <small>Criada em {new Date(task.createdAt).toLocaleString('pt-BR')}</small>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={() => onToggle(task)}>
              {task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
            </button>
            <button type="button" onClick={() => onEdit(task)}>
              Editar
            </button>
            <button type="button" className={styles.deleteButton} onClick={() => onDelete(task.id)}>
              Excluir
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
