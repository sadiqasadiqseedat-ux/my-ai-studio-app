import React, { useState } from 'react';
import {
  Clock,
  CheckSquare,
  AlertTriangle,
  Plus,
  Calendar,
  User,
  ArrowRight,
  CheckCircle2,
  X,
  Filter,
} from 'lucide-react';
import { DeadlineRecord, TaskRecord, PriorityLevel } from '../../types/legal';

interface DeadlinesTasksViewProps {
  deadlines: DeadlineRecord[];
  tasks: TaskRecord[];
  onAddDeadline: (d: DeadlineRecord) => void;
  onUpdateDeadline: (d: DeadlineRecord) => void;
  onAddTask: (t: TaskRecord) => void;
  onUpdateTask: (t: TaskRecord) => void;
}

export const DeadlinesTasksView: React.FC<DeadlinesTasksViewProps> = ({
  deadlines,
  tasks,
  onAddDeadline,
  onUpdateDeadline,
  onAddTask,
  onUpdateTask,
}) => {
  const [activeTab, setActiveTab] = useState<'deadlines' | 'kanban'>('deadlines');

  // Task Form State
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskMatter, setTaskMatter] = useState('BBBC/2026/001');
  const [taskClient, setTaskClient] = useState('Alhaji Garba Danladi');
  const [taskAssignee, setTaskAssignee] = useState('Hadiza Mohammed, Esq.');
  const [taskPriority, setTaskPriority] = useState<PriorityLevel>('Normal');
  const [taskDue, setTaskDue] = useState('2026-03-20');
  const [taskDesc, setTaskDesc] = useState('');

  const kanbanColumns = [
    { id: 'To Do', label: 'To Do' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Waiting', label: 'Waiting / Review' },
    { id: 'Completed', label: 'Completed' },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TaskRecord = {
      id: 'TSK-' + Date.now(),
      title: taskTitle,
      matterRef: taskMatter,
      clientName: taskClient,
      assignedPerson: taskAssignee,
      priority: taskPriority,
      dueDate: taskDue,
      status: 'To Do',
      description: taskDesc,
    };
    onAddTask(created);
    setShowTaskModal(false);
    setTaskTitle('');
    setTaskDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Deadlines, Limitation Dates & Task Kanban
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of statutory filing limitations, court orders, and counsel workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('deadlines')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'deadlines'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Statutory Deadlines ({deadlines.length})
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'kanban'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tasks Kanban ({tasks.length})
            </button>
          </div>

          <button
            onClick={() => setShowTaskModal(true)}
            className="px-3.5 py-2 bg-[#0B1B3D] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* View 1: Statutory Deadlines */}
      {activeTab === 'deadlines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { label: 'OVERDUE', color: 'bg-red-600 text-white', count: deadlines.filter(d => d.status === 'OVERDUE').length },
              { label: 'DUE TODAY', color: 'bg-amber-500 text-slate-950 font-bold', count: deadlines.filter(d => d.status === 'DUE TODAY').length },
              { label: 'DUE WITHIN 3 DAYS', color: 'bg-blue-600 text-white', count: deadlines.filter(d => d.status === 'DUE WITHIN 3 DAYS').length },
              { label: 'DUE THIS WEEK', color: 'bg-slate-700 text-white', count: deadlines.filter(d => d.status === 'DUE THIS WEEK').length },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">{stat.label}</span>
                  <span className="text-xl font-bold font-heading text-slate-900">{stat.count}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${stat.color}`}>Active</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#800020]" />
              <span>Chambers Central Limitation & Statutory Deadlines Ledger</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {deadlines.map((dl) => (
                <div key={dl.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dl.status === 'OVERDUE'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : dl.status === 'DUE TODAY'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {dl.status}
                      </span>
                      <span className="font-mono font-bold text-[#0B1B3D] text-[11px]">{dl.matterRef}</span>
                      <span className="text-[11px] text-slate-400">· {dl.category}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">{dl.title}</p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <p className="font-mono font-bold text-slate-900 text-xs">Due: {dl.dueDate}</p>
                    <p className="text-[11px] text-slate-500">Counsel: {dl.assignedLawyer}</p>
                    {dl.status !== 'COMPLETED' && (
                      <button
                        onClick={() => onUpdateDeadline({ ...dl, status: 'COMPLETED' })}
                        className="mt-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        Mark Completed ✓
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Interactive Tasks Kanban */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);

            return (
              <div key={col.id} className="bg-slate-100/70 rounded-xl p-3.5 flex flex-col min-h-[450px] border border-slate-200">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 text-xs">
                  <span className="font-bold text-slate-800">{col.label}</span>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs space-y-2 hover:border-[#0B1B3D] transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-slate-400 font-semibold">{t.matterRef}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded font-bold ${
                            t.priority === 'Urgent'
                              ? 'bg-red-100 text-red-800'
                              : t.priority === 'High'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs leading-snug">{t.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{t.description}</p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="truncate max-w-[110px]">{t.assignedPerson.split(',')[0]}</span>
                        <span className="font-mono font-medium">Due: {t.dueDate.slice(5)}</span>
                      </div>

                      {/* Quick Move Buttons */}
                      <div className="pt-1 flex items-center justify-between text-[10px]">
                        {col.id !== 'To Do' && (
                          <button
                            onClick={() => onUpdateTask({ ...t, status: 'To Do' })}
                            className="text-slate-400 hover:text-slate-800"
                          >
                            ← To Do
                          </button>
                        )}
                        {col.id !== 'In Progress' && (
                          <button
                            onClick={() => onUpdateTask({ ...t, status: 'In Progress' })}
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                          >
                            In Progress →
                          </button>
                        )}
                        {col.id !== 'Completed' && (
                          <button
                            onClick={() => onUpdateTask({ ...t, status: 'Completed' })}
                            className="text-emerald-700 hover:text-emerald-900 font-bold"
                          >
                            Complete ✓
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Assign New Chambers Task</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Draft Written Address on Jurisdiction"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Matter Reference</label>
                  <input
                    type="text"
                    value={taskMatter}
                    onChange={(e) => setTaskMatter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assignee</label>
                  <select
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Hadiza Mohammed, Esq.">Hadiza Mohammed, Esq.</option>
                    <option value="Chinedu Eze, Esq.">Chinedu Eze, Esq.</option>
                    <option value="Fatima Abdullahi, Esq.">Fatima Abdullahi, Esq.</option>
                    <option value="Mrs. Folake Adeyemi">Mrs. Folake Adeyemi</option>
                    <option value="Engr. Segun Ogundimu">Engr. Segun Ogundimu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskDue}
                    onChange={(e) => setTaskDue(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Task Instructions</label>
                <textarea
                  rows={3}
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-xs"
                  placeholder="Specific requirements, case laws to check, filing instructions..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
