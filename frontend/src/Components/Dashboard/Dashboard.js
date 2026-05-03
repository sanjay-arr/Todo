import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoService, authService } from '../../Services/Api';
import { Plus, Trash2, CheckCircle, Circle, LogOut, Loader2, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoService.getAll();
      setTodos(response.data);
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await todoService.create({ title: newTodo, is_completed: false });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleComplete = async (todo) => {
    setActionLoading(todo.id);
    try {
      const updatedTodo = { ...todo, is_completed: !todo.is_completed };
      await todoService.update(todo.id, updatedTodo);
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
    } catch (err) {
      console.error('Error updating todo:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    setActionLoading(id);
    try {
      await todoService.delete(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar glass-card">
        <div className="nav-brand">
          <LayoutDashboard size={24} color="var(--primary)" />
          <span>TaskFlow AI</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>

      <main className="dashboard-content">
        <div className="header-section animate-fade-in">
          <h1>My Tasks</h1>
          <p>Manage your daily activities with ease</p>
        </div>

        <div className="todo-input-card glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="submit">
              <Plus size={20} />
              <span>Add Task</span>
            </button>
          </form>
        </div>

        <div className="todo-list animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {loading ? (
            <div className="loading-state">
              <Loader2 className="spin" size={40} color="var(--primary)" />
              <p>Fetching your tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="empty-state glass-card">
              <p>No tasks yet. Start by adding one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className={`todo-item glass-card ${todo.is_completed ? 'completed' : ''}`}>
                <div className="todo-info" onClick={() => toggleComplete(todo)}>
                  {todo.is_completed ? (
                    <CheckCircle className="check-icon completed" size={24} />
                  ) : (
                    <Circle className="check-icon" size={24} />
                  )}
                  <span>{todo.title}</span>
                </div>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(todo.id)}
                  disabled={actionLoading === todo.id}
                >
                  {actionLoading === todo.id ? (
                    <Loader2 className="spin" size={18} />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background: #0f172a;
        }
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          margin: 20px;
          border-radius: 16px;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 20px;
          color: var(--text-main);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 500;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }
        .dashboard-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .header-section {
          margin-bottom: 32px;
        }
        .header-section h1 {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .header-section p {
          color: var(--text-muted);
        }
        .todo-input-card {
          padding: 8px;
          border-radius: 16px;
          margin-bottom: 32px;
        }
        .todo-input-card form {
          display: flex;
          gap: 12px;
        }
        .todo-input-card input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 20px;
          color: var(--text-main);
          font-size: 16px;
        }
        .todo-input-card button {
          background: var(--primary);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .todo-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .todo-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .todo-item:hover {
          transform: translateX(4px);
          border-color: var(--primary);
        }
        .todo-info {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          cursor: pointer;
        }
        .todo-info span {
          font-size: 16px;
          transition: all 0.3s;
        }
        .todo-item.completed .todo-info span {
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .check-icon {
          color: var(--border);
          transition: all 0.3s;
        }
        .check-icon.completed {
          color: var(--success);
        }
        .delete-btn {
          color: var(--text-muted);
          background: transparent;
          padding: 8px;
          border-radius: 8px;
        }
        .delete-btn:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }
        .loading-state {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }
        .empty-state {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
