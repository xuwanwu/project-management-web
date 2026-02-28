// ===== 应用状态 =====
const state = {
  projects: [],
  tasks: [],
  members: [],
  activities: [],
  currentSection: 'dashboard',
  currentDate: new Date(),
  currentTaskId: null,
  projectFilter: 'all',
  projectSort: 'date',
  projectView: 'grid',
};

// ===== 示例数据 =====
const sampleData = {
  projects: [
    {
      id: 'p1',
      name: '电商平台重构',
      description: '对现有电商平台进行全面技术重构，提升性能和用户体验',
      startDate: '2026-01-01',
      endDate: '2026-04-30',
      priority: 'high',
      color: '#4f46e5',
      status: 'active',
      members: ['m1', 'm2', 'm3'],
      createdAt: '2026-01-01',
    },
    {
      id: 'p2',
      name: '移动端App开发',
      description: '开发iOS和Android双端原生应用',
      startDate: '2026-01-15',
      endDate: '2026-06-30',
      priority: 'high',
      color: '#22c55e',
      status: 'active',
      members: ['m2', 'm4'],
      createdAt: '2026-01-15',
    },
    {
      id: 'p3',
      name: '数据分析平台',
      description: '建立企业级数据分析和可视化平台',
      startDate: '2025-10-01',
      endDate: '2026-01-31',
      priority: 'medium',
      color: '#f59e0b',
      status: 'completed',
      members: ['m1', 'm3'],
      createdAt: '2025-10-01',
    },
    {
      id: 'p4',
      name: 'API网关升级',
      description: '升级API网关，增加限流、鉴权等功能',
      startDate: '2026-02-01',
      endDate: '2026-03-31',
      priority: 'medium',
      color: '#ef4444',
      status: 'paused',
      members: ['m2'],
      createdAt: '2026-02-01',
    },
  ],
  tasks: [
    {
      id: 't1',
      name: '设计首页UI原型',
      description: '使用Figma设计首页交互原型，包含桌面端和移动端适配方案',
      projectId: 'p1',
      assigneeId: 'm3',
      priority: 'high',
      status: 'done',
      dueDate: '2026-02-10',
      estimatedHours: 16,
      tags: ['设计', 'UI'],
      createdAt: '2026-01-05',
    },
    {
      id: 't2',
      name: '实现用户认证模块',
      description: '基于JWT实现登录、注册、权限管理功能',
      projectId: 'p1',
      assigneeId: 'm1',
      priority: 'high',
      status: 'done',
      dueDate: '2026-02-15',
      estimatedHours: 24,
      tags: ['后端', '安全'],
      createdAt: '2026-01-08',
    },
    {
      id: 't3',
      name: '商品列表页开发',
      description: '开发商品筛选、排序、分页功能',
      projectId: 'p1',
      assigneeId: 'm2',
      priority: 'medium',
      status: 'inprogress',
      dueDate: '2026-03-01',
      estimatedHours: 20,
      tags: ['前端'],
      createdAt: '2026-01-20',
    },
    {
      id: 't4',
      name: '购物车功能实现',
      description: '实现添加商品、数量修改、价格计算等购物车核心功能',
      projectId: 'p1',
      assigneeId: 'm1',
      priority: 'high',
      status: 'inprogress',
      dueDate: '2026-03-10',
      estimatedHours: 32,
      tags: ['前端', '后端'],
      createdAt: '2026-02-01',
    },
    {
      id: 't5',
      name: 'App启动页设计',
      description: '设计App启动页和引导页',
      projectId: 'p2',
      assigneeId: 'm3',
      priority: 'low',
      status: 'done',
      dueDate: '2026-02-05',
      estimatedHours: 8,
      tags: ['设计', '移动端'],
      createdAt: '2026-01-16',
    },
    {
      id: 't6',
      name: 'iOS登录模块',
      description: '实现iOS端用户登录和注册功能',
      projectId: 'p2',
      assigneeId: 'm4',
      priority: 'high',
      status: 'inprogress',
      dueDate: '2026-03-20',
      estimatedHours: 28,
      tags: ['iOS', 'Swift'],
      createdAt: '2026-02-10',
    },
    {
      id: 't7',
      name: '数据报表导出',
      description: '支持将报表数据导出为Excel和PDF格式',
      projectId: 'p3',
      assigneeId: 'm1',
      priority: 'medium',
      status: 'done',
      dueDate: '2026-01-20',
      estimatedHours: 16,
      tags: ['后端', '数据'],
      createdAt: '2025-12-01',
    },
    {
      id: 't8',
      name: '支付接口集成',
      description: '集成支付宝和微信支付接口',
      projectId: 'p1',
      assigneeId: 'm2',
      priority: 'high',
      status: 'todo',
      dueDate: '2026-03-25',
      estimatedHours: 20,
      tags: ['后端', '支付'],
      createdAt: '2026-02-15',
    },
    {
      id: 't9',
      name: '性能优化测试',
      description: '对平台进行压力测试和性能优化',
      projectId: 'p1',
      assigneeId: 'm2',
      priority: 'medium',
      status: 'todo',
      dueDate: '2026-04-10',
      estimatedHours: 24,
      tags: ['测试', '性能'],
      createdAt: '2026-02-20',
    },
  ],
  members: [
    { id: 'm1', name: '张伟', role: '全栈工程师', email: 'zhangwei@example.com', color: '#4f46e5' },
    { id: 'm2', name: '李娜', role: '前端工程师', email: 'lina@example.com', color: '#22c55e' },
    { id: 'm3', name: '王芳', role: 'UI设计师', email: 'wangfang@example.com', color: '#f59e0b' },
    { id: 'm4', name: '赵磊', role: 'iOS开发工程师', email: 'zhaolei@example.com', color: '#ef4444' },
  ],
  activities: [
    { memberId: 'm1', action: '完成了任务', target: '实现用户认证模块', time: '10分钟前' },
    { memberId: 'm3', action: '更新了', target: 'App启动页设计', time: '32分钟前' },
    { memberId: 'm2', action: '开始了任务', target: '商品列表页开发', time: '1小时前' },
    { memberId: 'm4', action: '加入了项目', target: '移动端App开发', time: '2小时前' },
    { memberId: 'm1', action: '创建了项目', target: '电商平台重构', time: '昨天' },
  ],
};

// ===== LocalStorage 持久化 =====
function saveData() {
  localStorage.setItem('pm_projects', JSON.stringify(state.projects));
  localStorage.setItem('pm_tasks', JSON.stringify(state.tasks));
  localStorage.setItem('pm_members', JSON.stringify(state.members));
  localStorage.setItem('pm_activities', JSON.stringify(state.activities));
}

function loadData() {
  const projects = localStorage.getItem('pm_projects');
  if (projects) {
    state.projects = JSON.parse(projects);
    state.tasks = JSON.parse(localStorage.getItem('pm_tasks') || '[]');
    state.members = JSON.parse(localStorage.getItem('pm_members') || '[]');
    state.activities = JSON.parse(localStorage.getItem('pm_activities') || '[]');
  } else {
    state.projects = sampleData.projects;
    state.tasks = sampleData.tasks;
    state.members = sampleData.members;
    state.activities = sampleData.activities;
    saveData();
  }
}

// ===== ID 生成器 =====
function genId(prefix) {
  return prefix + Date.now() + Math.random().toString(36).slice(2, 6);
}

// ===== 导航 =====
function showSection(section) {
  state.currentSection = section;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + section).classList.add('active');

  const navItems = document.querySelectorAll('.nav-item');
  const sectionMap = { dashboard: 0, projects: 1, tasks: 2, team: 3, calendar: 4, reports: 5 };
  navItems.forEach(item => item.classList.remove('active'));
  if (sectionMap[section] !== undefined) navItems[sectionMap[section]].classList.add('active');

  const titleMap = {
    dashboard: '仪表盘', projects: '项目列表', tasks: '任务管理',
    team: '团队成员', calendar: '日历视图', reports: '报表分析',
  };
  document.getElementById('pageTitle').textContent = titleMap[section] || '';

  if (section === 'dashboard') renderDashboard();
  if (section === 'projects') renderProjects();
  if (section === 'tasks') renderKanban();
  if (section === 'team') renderTeam();
  if (section === 'calendar') renderCalendar();
  if (section === 'reports') renderReports();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ===== 模态框 =====
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.getElementById('overlay').classList.add('active');
  if (id === 'createTaskModal') populateTaskForm();
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  const anyActive = document.querySelectorAll('.modal.active').length > 0;
  if (!anyActive) document.getElementById('overlay').classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.getElementById('overlay').classList.remove('active');
}

// ===== Toast 通知 =====
function showToast(message, type = 'success') {
  const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${iconMap[type]}"></i><span class="toast-message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== 辅助函数 =====
function getMember(id) { return state.members.find(m => m.id === id); }
function getProject(id) { return state.projects.find(p => p.id === id); }

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isOverdue(task) {
  if (!task.dueDate || task.status === 'done') return false;
  return new Date(task.dueDate) < new Date();
}

function calcProjectProgress(projectId) {
  const tasks = state.tasks.filter(t => t.projectId === projectId);
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100);
}

function getInitials(name) { return name ? name.slice(0, 1) : '?'; }

function clearForm(ids) {
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function addActivity(memberId, action, target) {
  state.activities.unshift({ memberId, action, target, time: '刚刚' });
  if (state.activities.length > 20) state.activities.pop();
}

// ===== 仪表盘 =====
function renderDashboard() {
  document.getElementById('totalProjects').textContent = state.projects.length;
  document.getElementById('completedTasks').textContent = state.tasks.filter(t => t.status === 'done').length;
  document.getElementById('inProgressTasks').textContent = state.tasks.filter(t => t.status === 'inprogress').length;
  document.getElementById('overdueTasks').textContent = state.tasks.filter(t => isOverdue(t)).length;

  renderProjectProgress();
  renderRecentTasks();
  renderActivityList();
  renderTaskStatusChart();
}

function renderProjectProgress() {
  const list = document.getElementById('projectProgressList');
  list.innerHTML = state.projects.slice(0, 5).map(p => {
    const progress = calcProjectProgress(p.id);
    return `
      <div class="project-progress-item">
        <div class="project-color-dot" style="background:${p.color}"></div>
        <div class="project-progress-info">
          <h4>${p.name}</h4>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${progress}%;background:${p.color}"></div>
          </div>
        </div>
        <span class="progress-text">${progress}%</span>
      </div>`;
  }).join('');
}

function renderRecentTasks() {
  const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
  const tasks = [...state.tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  document.getElementById('recentTasksList').innerHTML = tasks.map(t => `
    <div class="recent-task-item" onclick="openTaskDetail('${t.id}')">
      <div class="task-priority-dot priority-${t.priority}"></div>
      <div class="recent-task-info">
        <h4>${t.name}</h4>
        <span>${formatDate(t.dueDate)}</span>
      </div>
      <span class="task-status-badge status-${t.status}">${statusLabels[t.status]}</span>
    </div>`).join('');
}

function renderActivityList() {
  document.getElementById('activityList').innerHTML = state.activities.slice(0, 5).map(a => {
    const m = getMember(a.memberId);
    if (!m) return '';
    return `
      <div class="activity-item">
        <div class="activity-avatar" style="background:${m.color}">${getInitials(m.name)}</div>
        <div class="activity-content">
          <p><strong>${m.name}</strong> ${a.action} <strong>${a.target}</strong></p>
          <span class="activity-time">${a.time}</span>
        </div>
      </div>`;
  }).join('');
}

let taskStatusChartInst = null;
function renderTaskStatusChart() {
  const ctx = document.getElementById('taskStatusChart').getContext('2d');
  const counts = {
    todo: state.tasks.filter(t => t.status === 'todo').length,
    inprogress: state.tasks.filter(t => t.status === 'inprogress').length,
    done: state.tasks.filter(t => t.status === 'done').length,
  };

  if (taskStatusChartInst) taskStatusChartInst.destroy();
  taskStatusChartInst = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['待办', '进行中', '已完成'],
      datasets: [{ data: [counts.todo, counts.inprogress, counts.done], backgroundColor: ['#f59e0b', '#4f46e5', '#22c55e'], borderWidth: 0 }],
    },
    options: { responsive: true, plugins: { legend: { display: false } }, cutout: '70%' },
  });

  document.getElementById('chartLegend').innerHTML = [
    { label: '待办', color: '#f59e0b', count: counts.todo },
    { label: '进行中', color: '#4f46e5', count: counts.inprogress },
    { label: '已完成', color: '#22c55e', count: counts.done },
  ].map(item => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${item.color}"></div>
      ${item.label} (${item.count})
    </div>`).join('');
}

// ===== 项目列表 =====
function renderProjects() {
  populateTaskProjectFilter();
  let projects = [...state.projects];

  if (state.projectFilter !== 'all') {
    projects = projects.filter(p => p.status === state.projectFilter);
  }
  if (state.projectSort === 'name') {
    projects.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.projectSort === 'progress') {
    projects.sort((a, b) => calcProjectProgress(b.id) - calcProjectProgress(a.id));
  } else {
    projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const statusLabels = { active: '进行中', completed: '已完成', paused: '已暂停' };
  const priorityLabels = { low: '低', medium: '中', high: '高' };
  const container = document.getElementById('projectsContainer');

  container.innerHTML = projects.map(p => {
    const progress = calcProjectProgress(p.id);
    const taskCount = state.tasks.filter(t => t.projectId === p.id).length;
    const membersHtml = (p.members || []).slice(0, 4).map(mid => {
      const m = getMember(mid);
      return m ? `<div class="project-member-avatar" style="background:${m.color}" title="${m.name}">${getInitials(m.name)}</div>` : '';
    }).join('');
    return `
      <div class="project-card" style="border-left-color:${p.color}" onclick="showSection('tasks')">
        <div class="project-card-header">
          <h3>${p.name}</h3>
          <span class="project-status status-${p.status}">${statusLabels[p.status]}</span>
        </div>
        <div class="project-card-body">
          <p>${p.description}</p>
          <div class="project-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(p.endDate)}</span>
            <span><i class="fas fa-tasks"></i> ${taskCount} 个任务</span>
            <span><i class="fas fa-flag"></i> ${priorityLabels[p.priority]}</span>
          </div>
        </div>
        <div class="project-card-footer">
          <div class="project-members">${membersHtml}</div>
          <div style="text-align:right">
            <div class="progress-bar" style="width:80px">
              <div class="progress-fill" style="width:${progress}%;background:${p.color}"></div>
            </div>
            <span style="font-size:0.75rem;color:var(--text-secondary)">${progress}%</span>
          </div>
        </div>
      </div>`;
  }).join('') || '<div style="padding:2rem;text-align:center;color:var(--text-light)">暂无项目，点击"新建项目"开始</div>';
}

function filterProjects(value) {
  state.projectFilter = value;
  renderProjects();
}

function sortProjects(value) {
  state.projectSort = value;
  renderProjects();
}

function toggleView(viewType, btn) {
  state.projectView = viewType;
  document.getElementById('projectsContainer').className = `projects-container ${viewType}-view`;
  document.querySelectorAll('.view-toggle .btn-icon').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function createProject() {
  const name = document.getElementById('projectName').value.trim();
  if (!name) { showToast('请输入项目名称', 'error'); return; }

  const project = {
    id: genId('p'),
    name,
    description: document.getElementById('projectDesc').value.trim(),
    startDate: document.getElementById('projectStart').value,
    endDate: document.getElementById('projectEnd').value,
    priority: document.getElementById('projectPriority').value,
    color: document.getElementById('projectColor').value,
    status: 'active',
    members: [],
    createdAt: new Date().toISOString().split('T')[0],
  };

  state.projects.unshift(project);
  addActivity('m1', '创建了项目', project.name);
  saveData();
  closeModal('createProjectModal');
  clearForm(['projectName', 'projectDesc', 'projectStart', 'projectEnd']);
  showToast(`项目 "${name}" 创建成功`);
  if (state.currentSection === 'projects') renderProjects();
  if (state.currentSection === 'dashboard') renderDashboard();
}

// ===== 任务管理 =====
function populateTaskForm() {
  document.getElementById('taskProject').innerHTML = state.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  document.getElementById('taskAssignee').innerHTML = `<option value="">未分配</option>` + state.members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
}

function populateTaskProjectFilter() {
  const filter = document.getElementById('taskProjectFilter');
  if (!filter) return;
  filter.innerHTML = `<option value="all">所有项目</option>` + state.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

function renderKanban() {
  populateTaskProjectFilter();
  const projFilter = document.getElementById('taskProjectFilter').value;
  const statusFilter = document.getElementById('taskStatusFilter').value;
  const priorityFilter = document.getElementById('taskPriorityFilter').value;

  let tasks = [...state.tasks];
  if (projFilter !== 'all') tasks = tasks.filter(t => t.projectId === projFilter);
  if (statusFilter !== 'all') tasks = tasks.filter(t => t.status === statusFilter);
  if (priorityFilter !== 'all') tasks = tasks.filter(t => t.priority === priorityFilter);

  const columns = { todo: [], inprogress: [], done: [] };
  tasks.forEach(t => { if (columns[t.status]) columns[t.status].push(t); });

  Object.keys(columns).forEach(status => {
    document.getElementById(`count-${status}`).textContent = columns[status].length;
    document.getElementById(`tasks-${status}`).innerHTML = columns[status].map(renderTaskCard).join('');
  });
}

function renderTaskCard(task) {
  const member = getMember(task.assigneeId);
  const project = getProject(task.projectId);
  const tagsHtml = (task.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
  const overdue = isOverdue(task);
  return `
    <div class="kanban-task-card"
         draggable="true"
         ondragstart="drag(event, '${task.id}')"
         onclick="openTaskDetail('${task.id}')">
      ${tagsHtml ? `<div class="kanban-task-tags">${tagsHtml}</div>` : ''}
      <div class="kanban-task-title">${task.name}</div>
      <div class="kanban-task-meta">
        <span style="color:${overdue ? 'var(--danger)' : 'inherit'}">
          <i class="fas fa-calendar-alt"></i> ${formatDate(task.dueDate)}
        </span>
        ${member ? `<div class="kanban-task-assignee" style="background:${member.color}" title="${member.name}">${getInitials(member.name)}</div>` : ''}
      </div>
      ${project ? `<div style="margin-top:0.35rem;font-size:0.7rem;color:var(--text-light)"><i class="fas fa-folder"></i> ${project.name}</div>` : ''}
    </div>`;
}

function filterTasks() { renderKanban(); }

function createTask() {
  const name = document.getElementById('taskName').value.trim();
  if (!name) { showToast('请输入任务名称', 'error'); return; }

  const tagsStr = document.getElementById('taskTags').value.trim();
  const task = {
    id: genId('t'),
    name,
    description: document.getElementById('taskDesc').value.trim(),
    projectId: document.getElementById('taskProject').value,
    assigneeId: document.getElementById('taskAssignee').value,
    priority: document.getElementById('taskPriority').value,
    status: 'todo',
    dueDate: document.getElementById('taskDue').value,
    estimatedHours: parseInt(document.getElementById('taskHours').value) || 0,
    tags: tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [],
    createdAt: new Date().toISOString().split('T')[0],
  };

  state.tasks.unshift(task);
  addActivity('m1', '创建了任务', task.name);
  saveData();
  closeModal('createTaskModal');
  clearForm(['taskName', 'taskDesc', 'taskTags', 'taskDue', 'taskHours']);
  showToast(`任务 "${name}" 创建成功`);
  if (state.currentSection === 'tasks') renderKanban();
  if (state.currentSection === 'dashboard') renderDashboard();
}

// ===== 拖拽看板 =====
let draggedTaskId = null;

function drag(event, taskId) {
  draggedTaskId = taskId;
  event.dataTransfer.effectAllowed = 'move';
}

function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function drop(event, newStatus) {
  event.preventDefault();
  if (!draggedTaskId) return;
  const task = state.tasks.find(t => t.id === draggedTaskId);
  if (task && task.status !== newStatus) {
    const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
    task.status = newStatus;
    addActivity('m1', '移动了任务至', `${statusLabels[newStatus]} — ${task.name}`);
    saveData();
    renderKanban();
    showToast('任务状态已更新', 'info');
  }
  draggedTaskId = null;
}

// ===== 任务详情 =====
function openTaskDetail(taskId) {
  state.currentTaskId = taskId;
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  document.getElementById('taskDetailTitle').textContent = task.name;
  document.getElementById('taskDetailBody').innerHTML = `
    <div class="form-group">
      <label>任务名称</label>
      <input type="text" class="form-input" id="detail-name" value="${task.name}">
    </div>
    <div class="form-group">
      <label>任务描述</label>
      <textarea class="form-input" id="detail-desc" rows="3">${task.description || ''}</textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>状态</label>
        <select class="form-input" id="detail-status">
          <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>待办</option>
          <option value="inprogress" ${task.status === 'inprogress' ? 'selected' : ''}>进行中</option>
          <option value="done" ${task.status === 'done' ? 'selected' : ''}>已完成</option>
        </select>
      </div>
      <div class="form-group">
        <label>优先级</label>
        <select class="form-input" id="detail-priority">
          <option value="low" ${task.priority === 'low' ? 'selected' : ''}>低</option>
          <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>中</option>
          <option value="high" ${task.priority === 'high' ? 'selected' : ''}>高</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>截止日期</label>
        <input type="date" class="form-input" id="detail-due" value="${task.dueDate || ''}">
      </div>
      <div class="form-group">
        <label>预计工时（小时）</label>
        <input type="number" class="form-input" id="detail-hours" value="${task.estimatedHours || 0}" min="0">
      </div>
    </div>
    <div class="form-group">
      <label>标签（逗号分隔）</label>
      <input type="text" class="form-input" id="detail-tags" value="${(task.tags || []).join(', ')}">
    </div>`;

  openModal('taskDetailModal');
}

function saveTaskDetail() {
  const task = state.tasks.find(t => t.id === state.currentTaskId);
  if (!task) return;
  task.name = document.getElementById('detail-name').value.trim();
  task.description = document.getElementById('detail-desc').value.trim();
  task.status = document.getElementById('detail-status').value;
  task.priority = document.getElementById('detail-priority').value;
  task.dueDate = document.getElementById('detail-due').value;
  task.estimatedHours = parseInt(document.getElementById('detail-hours').value) || 0;
  const tagsStr = document.getElementById('detail-tags').value.trim();
  task.tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
  saveData();
  closeModal('taskDetailModal');
  showToast('任务已保存');
  if (state.currentSection === 'tasks') renderKanban();
  if (state.currentSection === 'dashboard') renderDashboard();
}

function deleteCurrentTask() {
  if (!state.currentTaskId) return;
  const task = state.tasks.find(t => t.id === state.currentTaskId);
  state.tasks = state.tasks.filter(t => t.id !== state.currentTaskId);
  if (task) addActivity('m1', '删除了任务', task.name);
  saveData();
  closeModal('taskDetailModal');
  showToast('任务已删除', 'info');
  if (state.currentSection === 'tasks') renderKanban();
  if (state.currentSection === 'dashboard') renderDashboard();
}

// ===== 团队成员 =====
function renderTeam() {
  document.getElementById('teamGrid').innerHTML = state.members.map(m => {
    const memberTasks = state.tasks.filter(t => t.assigneeId === m.id);
    const done = memberTasks.filter(t => t.status === 'done').length;
    return `
      <div class="team-card">
        <div class="team-avatar" style="background:${m.color}">${getInitials(m.name)}</div>
        <h3>${m.name}</h3>
        <p class="team-role">${m.role}</p>
        <p class="team-email">${m.email}</p>
        <div class="team-stats">
          <div class="team-stat">
            <div class="stat-number">${memberTasks.length}</div>
            <div class="stat-label">总任务</div>
          </div>
          <div class="team-stat">
            <div class="stat-number">${done}</div>
            <div class="stat-label">已完成</div>
          </div>
          <div class="team-stat">
            <div class="stat-number">${memberTasks.length - done}</div>
            <div class="stat-label">进行中</div>
          </div>
        </div>
      </div>`;
  }).join('') || '<div style="padding:2rem;text-align:center;color:var(--text-light)">暂无成员</div>';
}

function addMember() {
  const name = document.getElementById('memberName').value.trim();
  if (!name) { showToast('请输入成员姓名', 'error'); return; }
  const member = {
    id: genId('m'),
    name,
    role: document.getElementById('memberRole').value.trim(),
    email: document.getElementById('memberEmail').value.trim(),
    color: document.getElementById('memberColor').value,
  };
  state.members.push(member);
  addActivity('m1', '添加了成员', member.name);
  saveData();
  closeModal('addMemberModal');
  clearForm(['memberName', 'memberRole', 'memberEmail']);
  showToast(`成员 "${name}" 已添加`);
  if (state.currentSection === 'team') renderTeam();
}

// ===== 日历 =====
function renderCalendar() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  document.getElementById('calendarTitle').textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const today = new Date();

  let html = '';
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="calendar-day other-month">${daysInPrev - i}</div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasTasks = state.tasks.some(t => t.dueDate === dateStr);
    html += `
      <div class="calendar-day ${isToday ? 'today' : ''}">
        ${d}
        ${hasTasks ? '<div class="task-dot"></div>' : ''}
      </div>`;
  }
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let i = 1; i <= totalCells - firstDay - daysInMonth; i++) {
    html += `<div class="calendar-day other-month">${i}</div>`;
  }
  document.getElementById('calendarDays').innerHTML = html;

  const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
  const monthlyTasks = state.tasks
    .filter(t => { if (!t.dueDate) return false; const d = new Date(t.dueDate); return d.getFullYear() === year && d.getMonth() === month; })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  document.getElementById('monthlyTasks').innerHTML = monthlyTasks.length
    ? monthlyTasks.map(t => `
        <div class="recent-task-item" onclick="openTaskDetail('${t.id}')">
          <div class="task-priority-dot priority-${t.priority}"></div>
          <div class="recent-task-info">
            <h4>${t.name}</h4>
            <span>${formatDate(t.dueDate)}</span>
          </div>
          <span class="task-status-badge status-${t.status}">${statusLabels[t.status]}</span>
        </div>`).join('')
    : '<div style="padding:1rem;text-align:center;color:var(--text-light)">本月暂无截止任务</div>';
}

function changeMonth(delta) {
  state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + delta, 1);
  renderCalendar();
}

// ===== 报表分析 =====
let completionChartInst = null;
let workloadChartInst = null;
let trendChartInst = null;

function renderReports() {
  renderCompletionChart();
  renderWorkloadChart();
  renderTrendChart();
}

function renderCompletionChart() {
  const ctx = document.getElementById('completionChart').getContext('2d');
  if (completionChartInst) completionChartInst.destroy();
  completionChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state.projects.map(p => p.name.length > 8 ? p.name.slice(0, 8) + '…' : p.name),
      datasets: [{
        label: '完成率(%)',
        data: state.projects.map(p => calcProjectProgress(p.id)),
        backgroundColor: state.projects.map(p => p.color + 'cc'),
        borderColor: state.projects.map(p => p.color),
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: { responsive: true, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { display: false } } },
  });
}

function renderWorkloadChart() {
  const ctx = document.getElementById('workloadChart').getContext('2d');
  if (workloadChartInst) workloadChartInst.destroy();
  workloadChartInst = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state.members.map(m => m.name),
      datasets: [{
        label: '任务数量',
        data: state.members.map(m => state.tasks.filter(t => t.assigneeId === m.id).length),
        backgroundColor: state.members.map(m => m.color + 'cc'),
        borderColor: state.members.map(m => m.color),
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

function renderTrendChart() {
  const ctx = document.getElementById('trendChart').getContext('2d');
  if (trendChartInst) trendChartInst.destroy();

  const now = new Date();
  const months = [], created = [], completed = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    months.push(`${y}/${m + 1}`);
    created.push(state.tasks.filter(t => { if (!t.createdAt) return false; const cd = new Date(t.createdAt); return cd.getFullYear() === y && cd.getMonth() === m; }).length);
    completed.push(state.tasks.filter(t => { if (!t.dueDate || t.status !== 'done') return false; const dd = new Date(t.dueDate); return dd.getFullYear() === y && dd.getMonth() === m; }).length);
  }

  trendChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: '新建任务', data: created, borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.1)', tension: 0.4, fill: true },
        { label: '完成任务', data: completed, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { min: 0 } } },
  });
}

// ===== 搜索 =====
function handleSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    if (state.currentSection === 'projects') renderProjects();
    if (state.currentSection === 'tasks') renderKanban();
    return;
  }
  if (state.currentSection === 'projects') {
    const statusLabels = { active: '进行中', completed: '已完成', paused: '已暂停' };
    const filtered = state.projects.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    document.getElementById('projectsContainer').innerHTML = filtered.map(p => {
      const progress = calcProjectProgress(p.id);
      return `
        <div class="project-card" style="border-left-color:${p.color}">
          <div class="project-card-header">
            <h3>${p.name}</h3>
            <span class="project-status status-${p.status}">${statusLabels[p.status]}</span>
          </div>
          <div class="project-card-body"><p>${p.description}</p></div>
          <div class="project-card-footer">
            <span style="font-size:0.75rem;color:var(--text-secondary)">${progress}%</span>
          </div>
        </div>`;
    }).join('') || '<div style="padding:2rem;text-align:center;color:var(--text-light)">未找到相关项目</div>';
  }
  if (state.currentSection === 'tasks') {
    const filtered = state.tasks.filter(t => t.name.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
    const columns = { todo: [], inprogress: [], done: [] };
    filtered.forEach(t => { if (columns[t.status]) columns[t.status].push(t); });
    Object.keys(columns).forEach(status => {
      document.getElementById(`count-${status}`).textContent = columns[status].length;
      document.getElementById(`tasks-${status}`).innerHTML = columns[status].map(renderTaskCard).join('');
    });
  }
}

// ===== 初始化 =====
function init() {
  loadData();
  renderDashboard();
}

document.addEventListener('DOMContentLoaded', init);
