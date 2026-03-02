// ===== 应用状态 =====
const state = {
  projects: [],
  tasks: [],
  members: [],
  activities: [],
  notifications: [],
  currentSection: 'dashboard',
  currentDate: new Date(),
  currentTaskId: null,
  currentProjectId: null,
  selectedDate: null,
  currentUserId: 'm1',
  projectFilter: 'all',
  projectSort: 'date',
  projectView: 'grid',
};

const OVERLOAD_THRESHOLD = 4; // 活跃任务数超过此值视为负载过高
let milestoneInputCount = 0;

// ===== 示例数据 =====
const sampleData = {
  projects: [
    {
      id: 'p1', name: '电商平台重构',
      description: '对现有电商平台进行全面技术重构，提升性能和用户体验',
      startDate: '2026-01-01', endDate: '2026-04-30',
      priority: 'high', color: '#4f46e5', status: 'active',
      members: ['m1', 'm2', 'm3'], createdAt: '2026-01-01',
      milestones: [
        { id: 'ms1', name: '需求分析完成', dueDate: '2026-01-31', completed: true },
        { id: 'ms2', name: '前端原型上线', dueDate: '2026-03-01', completed: false },
        { id: 'ms3', name: '全量发布', dueDate: '2026-04-30', completed: false },
      ],
    },
    {
      id: 'p2', name: '移动端App开发',
      description: '开发iOS和Android双端原生应用',
      startDate: '2026-01-15', endDate: '2026-06-30',
      priority: 'high', color: '#22c55e', status: 'active',
      members: ['m2', 'm4'], createdAt: '2026-01-15',
      milestones: [
        { id: 'ms4', name: 'iOS Alpha版', dueDate: '2026-03-31', completed: false },
        { id: 'ms5', name: 'Android Beta版', dueDate: '2026-05-31', completed: false },
      ],
    },
    {
      id: 'p3', name: '数据分析平台',
      description: '建立企业级数据分析和可视化平台',
      startDate: '2025-10-01', endDate: '2026-01-31',
      priority: 'medium', color: '#f59e0b', status: 'completed',
      members: ['m1', 'm3'], createdAt: '2025-10-01',
      milestones: [
        { id: 'ms6', name: '数据接入完成', dueDate: '2025-12-01', completed: true },
        { id: 'ms7', name: '可视化上线', dueDate: '2026-01-31', completed: true },
      ],
    },
    {
      id: 'p4', name: 'API网关升级',
      description: '升级API网关，增加限流、鉴权等功能',
      startDate: '2026-02-01', endDate: '2026-03-31',
      priority: 'medium', color: '#ef4444', status: 'paused',
      members: ['m2'], createdAt: '2026-02-01',
      milestones: [],
    },
  ],
  tasks: [
    {
      id: 't1', name: '设计首页UI原型',
      description: '使用Figma设计首页交互原型，包含桌面端和移动端适配方案',
      projectId: 'p1', assigneeId: 'm3', priority: 'high', status: 'done',
      dueDate: '2026-02-10', estimatedHours: 16, tags: ['设计', 'UI'],
      createdAt: '2026-01-05', dependsOn: null,
      comments: [
        { id: 'c1', memberId: 'm1', text: '原型图非常清晰，可以直接进入开发阶段', timestamp: '2026-02-08 14:30' },
        { id: 'c2', memberId: 'm3', text: '感谢反馈，移动端适配部分已优化', timestamp: '2026-02-09 09:15' },
      ],
    },
    {
      id: 't2', name: '实现用户认证模块',
      description: '基于JWT实现登录、注册、权限管理功能',
      projectId: 'p1', assigneeId: 'm1', priority: 'high', status: 'done',
      dueDate: '2026-02-15', estimatedHours: 24, tags: ['后端', '安全'],
      createdAt: '2026-01-08', dependsOn: null, comments: [],
    },
    {
      id: 't3', name: '商品列表页开发',
      description: '开发商品筛选、排序、分页功能',
      projectId: 'p1', assigneeId: 'm2', priority: 'medium', status: 'inprogress',
      dueDate: '2026-03-01', estimatedHours: 20, tags: ['前端'],
      createdAt: '2026-01-20', dependsOn: 't1',
      comments: [
        { id: 'c3', memberId: 'm2', text: '筛选功能已完成，分页正在开发中', timestamp: '2026-02-20 16:00' },
      ],
    },
    {
      id: 't4', name: '购物车功能实现',
      description: '实现添加商品、数量修改、价格计算等购物车核心功能',
      projectId: 'p1', assigneeId: 'm1', priority: 'high', status: 'inprogress',
      dueDate: '2026-03-10', estimatedHours: 32, tags: ['前端', '后端'],
      createdAt: '2026-02-01', dependsOn: 't3', comments: [],
    },
    {
      id: 't5', name: 'App启动页设计',
      description: '设计App启动页和引导页',
      projectId: 'p2', assigneeId: 'm3', priority: 'low', status: 'done',
      dueDate: '2026-02-05', estimatedHours: 8, tags: ['设计', '移动端'],
      createdAt: '2026-01-16', dependsOn: null, comments: [],
    },
    {
      id: 't6', name: 'iOS登录模块',
      description: '实现iOS端用户登录和注册功能',
      projectId: 'p2', assigneeId: 'm4', priority: 'high', status: 'inprogress',
      dueDate: '2026-03-20', estimatedHours: 28, tags: ['iOS', 'Swift'],
      createdAt: '2026-02-10', dependsOn: 't5', comments: [],
    },
    {
      id: 't7', name: '数据报表导出',
      description: '支持将报表数据导出为Excel和PDF格式',
      projectId: 'p3', assigneeId: 'm1', priority: 'medium', status: 'done',
      dueDate: '2026-01-20', estimatedHours: 16, tags: ['后端', '数据'],
      createdAt: '2025-12-01', dependsOn: null, comments: [],
    },
    {
      id: 't8', name: '支付接口集成',
      description: '集成支付宝和微信支付接口',
      projectId: 'p1', assigneeId: 'm2', priority: 'high', status: 'todo',
      dueDate: '2026-03-25', estimatedHours: 20, tags: ['后端', '支付'],
      createdAt: '2026-02-15', dependsOn: 't2', comments: [],
    },
    {
      id: 't9', name: '性能优化测试',
      description: '对平台进行压力测试和性能优化',
      projectId: 'p1', assigneeId: 'm2', priority: 'medium', status: 'todo',
      dueDate: '2026-04-10', estimatedHours: 24, tags: ['测试', '性能'],
      createdAt: '2026-02-20', dependsOn: 't8', comments: [],
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

// ===== LocalStorage =====
function saveData() {
  try {
    localStorage.setItem('pm_projects', JSON.stringify(state.projects));
    localStorage.setItem('pm_tasks', JSON.stringify(state.tasks));
    localStorage.setItem('pm_members', JSON.stringify(state.members));
    localStorage.setItem('pm_activities', JSON.stringify(state.activities));
    localStorage.setItem('pm_notifications', JSON.stringify(state.notifications));
  } catch (e) {
    console.error('saveData error:', e);
    showToast('数据保存失败：存储空间不足，请清理浏览器缓存', 'error');
  }
}

function loadData() {
  try {
    const raw = localStorage.getItem('pm_projects');
    if (raw) {
      state.projects = JSON.parse(raw);
      state.tasks = JSON.parse(localStorage.getItem('pm_tasks') || '[]');
      state.members = JSON.parse(localStorage.getItem('pm_members') || '[]');
      state.activities = JSON.parse(localStorage.getItem('pm_activities') || '[]');
      state.notifications = JSON.parse(localStorage.getItem('pm_notifications') || '[]');
      // 向前兼容：补齐缺失字段
      state.projects.forEach(p => { if (!p.milestones) p.milestones = []; });
      state.tasks.forEach(t => {
        if (!t.comments) t.comments = [];
        if (t.dependsOn === undefined) t.dependsOn = null;
      });
    } else {
      state.projects = sampleData.projects;
      state.tasks = sampleData.tasks;
      state.members = sampleData.members;
      state.activities = sampleData.activities;
      saveData();
    }
  } catch (e) {
    console.error('loadData error:', e);
    showToast('数据读取异常，已重置为示例数据', 'error');
    state.projects = sampleData.projects;
    state.tasks = sampleData.tasks;
    state.members = sampleData.members;
    state.activities = sampleData.activities;
  }
  // 恢复当前用户
  const savedUser = localStorage.getItem('pm_currentUser');
  if (savedUser) state.currentUserId = savedUser;
}

function genId(prefix) {
  return prefix + Date.now() + Math.random().toString(36).slice(2, 6);
}

// ===== XSS 防护 =====
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightText(text, query) {
  const safe = escHtml(text);
  if (!query) return safe;
  const escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(escapedQ, 'gi'), '<mark>$&</mark>');
}

// ===== 防抖 =====
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}
const debouncedSearch = debounce(handleSearch, 300);

// ===== 焦点管理 =====
let _lastFocus = null;

// ===== 确认对话框 =====
let _confirmCallback = null;

function confirmAction(title, message, onConfirm, okLabel = '确认', danger = true) {
  _confirmCallback = onConfirm;
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  const okBtn = document.getElementById('confirmOkBtn');
  okBtn.textContent = okLabel;
  okBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
  openModal('confirmModal');
}

function executeConfirm() {
  closeModal('confirmModal');
  if (typeof _confirmCallback === 'function') {
    _confirmCallback();
    _confirmCallback = null;
  }
}

// ===== 当前用户管理 =====
function initCurrentUser() {
  const select = document.getElementById('currentUserSelect');
  if (!select) return;
  select.innerHTML = state.members.map(m =>
    `<option value="${m.id}" ${m.id === state.currentUserId ? 'selected' : ''}>${m.name}</option>`
  ).join('');
  updateCurrentUserUI();
}

function changeCurrentUser(userId) {
  state.currentUserId = userId;
  try { localStorage.setItem('pm_currentUser', userId); } catch (e) {}
  updateCurrentUserUI();
}

function updateCurrentUserUI() {
  const m = getMember(state.currentUserId);
  if (!m) return;
  const avatar = document.getElementById('currentUserAvatar');
  const roleEl = document.getElementById('currentUserRole');
  if (avatar) { avatar.textContent = getInitials(m.name); avatar.style.background = m.color; }
  if (roleEl) roleEl.textContent = m.role;
}

// ===== 数据备份与恢复 =====
function exportAllData() {
  const payload = {
    version: 1,
    exportDate: new Date().toISOString(),
    projects: state.projects,
    tasks: state.tasks,
    members: state.members,
    activities: state.activities,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pm-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('数据备份已下载');
}

function importData(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data.projects) || !Array.isArray(data.tasks) || !Array.isArray(data.members)) {
        throw new Error('格式无效');
      }
      confirmAction(
        '确认恢复数据',
        `将导入 ${data.projects.length} 个项目、${data.tasks.length} 个任务，当前所有数据将被覆盖，此操作不可撤销。是否继续？`,
        () => {
          state.projects = data.projects;
          state.tasks = data.tasks;
          state.members = data.members;
          state.activities = data.activities || [];
          state.projects.forEach(p => { if (!p.milestones) p.milestones = []; });
          state.tasks.forEach(t => { if (!t.comments) t.comments = []; if (t.dependsOn === undefined) t.dependsOn = null; });
          saveData();
          generateNotifications();
          initCurrentUser();
          showSection(state.currentSection);
          showToast(`数据恢复成功：${data.projects.length} 个项目，${data.tasks.length} 个任务`);
        },
        '确认覆盖', true
      );
    } catch (err) {
      showToast('数据导入失败：文件格式无效', 'error');
    }
    fileInput.value = '';
  };
  reader.readAsText(file);
}

// ===== 项目成员管理 =====
function openProjectMembers(projectId) {
  state.currentProjectId = projectId;
  const project = getProject(projectId);
  if (!project) return;
  renderProjectMembersModal(project);
  openModal('projectMembersModal');
}

function renderProjectMembersModal(project) {
  document.getElementById('projectMembersBody').innerHTML = `
    <p style="margin-bottom:1rem;color:var(--text-secondary)">项目：<strong>${escHtml(project.name)}</strong></p>
    <div class="member-toggle-list">
      ${state.members.length === 0 ? '<div style="padding:1rem;text-align:center;color:var(--text-light)">暂无成员，请先添加团队成员</div>' :
        state.members.map(m => {
          const isMember = (project.members || []).includes(m.id);
          return `<div class="member-toggle-item ${isMember ? 'member-in-project' : ''}">
            <div class="member-toggle-info">
              <div class="member-toggle-avatar" style="background:${m.color}">${escHtml(getInitials(m.name))}</div>
              <div>
                <div style="font-weight:600;font-size:0.875rem">${escHtml(m.name)}</div>
                <div style="font-size:0.75rem;color:var(--text-secondary)">${escHtml(m.role)}</div>
              </div>
            </div>
            <button class="btn btn-sm ${isMember ? 'btn-danger' : 'btn-primary'}"
                    onclick="toggleProjectMember('${project.id}','${m.id}')">
              <i class="fas fa-${isMember ? 'times' : 'plus'}"></i> ${isMember ? '移除' : '加入'}
            </button>
          </div>`;
        }).join('')
      }
    </div>`;
}

function toggleProjectMember(projectId, memberId) {
  const project = getProject(projectId);
  if (!project) return;
  if (!project.members) project.members = [];
  const idx = project.members.indexOf(memberId);
  const member = getMember(memberId);
  if (idx === -1) {
    project.members.push(memberId);
    addActivity(state.currentUserId, '加入了项目', project.name);
    showToast(`${member?.name || '成员'} 已加入项目`);
  } else {
    project.members.splice(idx, 1);
    showToast(`${member?.name || '成员'} 已从项目移除`, 'info');
  }
  saveData();
  renderProjectMembersModal(project);
  if (state.currentSection === 'projects') renderProjects();
}

// ===== 项目编辑/删除 =====
function openEditProjectModal(projectId) {
  const p = getProject(projectId);
  if (!p) return;
  document.getElementById('editProjectId').value = p.id;
  document.getElementById('editProjectName').value = p.name;
  document.getElementById('editProjectDesc').value = p.description || '';
  document.getElementById('editProjectStart').value = p.startDate || '';
  document.getElementById('editProjectEnd').value = p.endDate || '';
  document.getElementById('editProjectStatus').value = p.status || 'active';
  document.getElementById('editProjectPriority').value = p.priority || 'medium';
  document.getElementById('editProjectColor').value = p.color || '#4f46e5';
  openModal('editProjectModal');
}

function saveEditProject() {
  const id = document.getElementById('editProjectId').value;
  const p = getProject(id);
  if (!p) return;
  if (!validateField('editProjectName', '项目名称')) return;
  p.name = document.getElementById('editProjectName').value.trim();
  p.description = document.getElementById('editProjectDesc').value.trim();
  p.startDate = document.getElementById('editProjectStart').value;
  p.endDate = document.getElementById('editProjectEnd').value;
  p.status = document.getElementById('editProjectStatus').value;
  p.priority = document.getElementById('editProjectPriority').value;
  p.color = document.getElementById('editProjectColor').value;
  addActivity(state.currentUserId, '更新了项目', p.name);
  saveData();
  closeModal('editProjectModal');
  showToast(`项目 "${escHtml(p.name)}" 已更新`);
  if (state.currentSection === 'projects') renderProjects();
  if (state.currentSection === 'dashboard') renderDashboard();
}

function deleteProject(projectId) {
  const p = getProject(projectId);
  if (!p) return;
  const taskCount = state.tasks.filter(t => t.projectId === projectId).length;
  confirmAction(
    '删除项目',
    `确定要删除项目 "${p.name}" 吗？其下 ${taskCount} 个任务也将被永久删除，此操作不可撤销。`,
    () => {
      const taskIds = state.tasks.filter(t => t.projectId === projectId).map(t => t.id);
      state.tasks = state.tasks.filter(t => t.projectId !== projectId);
      // 清除其他任务对已删任务的依赖
      state.tasks.forEach(t => { if (taskIds.includes(t.dependsOn)) t.dependsOn = null; });
      state.projects = state.projects.filter(pr => pr.id !== projectId);
      addActivity(state.currentUserId, '删除了项目', p.name);
      saveData();
      generateNotifications();
      closeModal('editProjectModal');
      showToast(`项目 "${escHtml(p.name)}" 已删除`, 'info');
      if (state.currentSection === 'projects') renderProjects();
      if (state.currentSection === 'dashboard') renderDashboard();
    }
  );
}

// ===== 成员编辑/删除 =====
function openEditMemberModal(memberId) {
  const m = getMember(memberId);
  if (!m) return;
  document.getElementById('editMemberId').value = m.id;
  document.getElementById('editMemberName').value = m.name;
  document.getElementById('editMemberRole').value = m.role || '';
  document.getElementById('editMemberEmail').value = m.email || '';
  document.getElementById('editMemberColor').value = m.color || '#4f46e5';
  openModal('editMemberModal');
}

function saveEditMember() {
  const id = document.getElementById('editMemberId').value;
  const m = getMember(id);
  if (!m) return;
  if (!validateField('editMemberName', '成员姓名')) return;
  m.name = document.getElementById('editMemberName').value.trim();
  m.role = document.getElementById('editMemberRole').value.trim();
  m.email = document.getElementById('editMemberEmail').value.trim();
  m.color = document.getElementById('editMemberColor').value;
  saveData();
  initCurrentUser();
  closeModal('editMemberModal');
  showToast(`成员 "${escHtml(m.name)}" 已更新`);
  if (state.currentSection === 'team') renderTeam();
}

function deleteMember(memberId) {
  const m = getMember(memberId);
  if (!m) return;
  confirmAction(
    '删除成员',
    `确定要删除成员 "${m.name}" 吗？其负责的任务将变为未分配状态。`,
    () => {
      state.tasks.forEach(t => { if (t.assigneeId === memberId) t.assigneeId = ''; });
      state.projects.forEach(p => {
        if (p.members) p.members = p.members.filter(mid => mid !== memberId);
      });
      state.members = state.members.filter(mem => mem.id !== memberId);
      if (state.currentUserId === memberId) {
        state.currentUserId = state.members[0]?.id || '';
        try { localStorage.setItem('pm_currentUser', state.currentUserId); } catch (e) {}
      }
      saveData();
      initCurrentUser();
      closeModal('editMemberModal');
      showToast(`成员 "${escHtml(m.name)}" 已删除`, 'info');
      if (state.currentSection === 'team') renderTeam();
    }
  );
}

// ===== 快捷完成任务 =====
function quickDoneTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  if (task.status !== 'done' && !checkDependencies(task)) return;
  const prevStatus = task.status;
  task.status = task.status === 'done' ? 'todo' : 'done';
  addActivity(state.currentUserId, task.status === 'done' ? '完成了任务' : '重新开启了任务', task.name);
  saveUndo(`任务 "${escHtml(task.name)}" 状态已变更`, () => {
    task.status = prevStatus;
    saveData();
    generateNotifications();
    if (state.currentSection === 'tasks') renderKanban();
    if (state.currentSection === 'dashboard') renderDashboard();
  });
  saveData();
  generateNotifications();
  if (state.currentSection === 'tasks') renderKanban();
  if (state.currentSection === 'dashboard') renderDashboard();
}

// ===== 依赖校验 =====
function hasDependencyCycle(taskId, newDependsOnId) {
  if (!newDependsOnId || newDependsOnId === taskId) return newDependsOnId === taskId;
  const visited = new Set();
  let cur = newDependsOnId;
  while (cur) {
    if (cur === taskId) return true;
    if (visited.has(cur)) break;
    visited.add(cur);
    const dep = state.tasks.find(t => t.id === cur);
    cur = dep?.dependsOn || null;
  }
  return false;
}

function checkDependencies(task) {
  if (!task.dependsOn) return true;
  const dep = state.tasks.find(t => t.id === task.dependsOn);
  if (dep && dep.status !== 'done') {
    showToast(`无法完成：前置任务 "${escHtml(dep.name)}" 尚未完成`, 'error');
    return false;
  }
  return true;
}

// ===== P0: 表单内联校验 =====
function showFieldError(fieldId, msg) {
  clearFieldError(fieldId);
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.classList.add('input-error');
  const err = document.createElement('div');
  err.className = 'field-error';
  err.id = fieldId + '-err';
  err.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
  el.parentNode.appendChild(err);
}

function clearFieldError(fieldId) {
  const el = document.getElementById(fieldId);
  if (el) el.classList.remove('input-error');
  const err = document.getElementById(fieldId + '-err');
  if (err) err.remove();
}

function clearAllErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.remove());
  document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
}

function validateField(fieldId, label) {
  const el = document.getElementById(fieldId);
  if (!el || !el.value.trim()) {
    showFieldError(fieldId, `${label}不能为空`);
    return false;
  }
  clearFieldError(fieldId);
  return true;
}

// ===== P0: 触控拖拽 =====
let touchTaskId = null;
let touchGhost = null;

function setupTouchDrag() {
  document.addEventListener('touchstart', (e) => {
    const card = e.target.closest('.kanban-task-card');
    if (!card) return;
    touchTaskId = card.dataset.taskId;
    touchGhost = card.cloneNode(true);
    touchGhost.style.cssText = `position:fixed;opacity:0.8;pointer-events:none;z-index:9999;width:${card.offsetWidth}px;box-shadow:var(--shadow-lg);transform:rotate(2deg);`;
    document.body.appendChild(touchGhost);
    moveTouchGhost(e.touches[0]);
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!touchGhost) return;
    e.preventDefault();
    moveTouchGhost(e.touches[0]);
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    if (!touchGhost || !touchTaskId) return;
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const col = el ? el.closest('.kanban-tasks') : null;
    if (col) {
      const newStatus = col.id.replace('tasks-', '');
      const task = state.tasks.find(t => t.id === touchTaskId);
      if (task && task.status !== newStatus) {
        if (newStatus === 'done' && !checkDependencies(task)) {
          touchGhost.remove(); touchGhost = null; touchTaskId = null; return;
        }
        task.status = newStatus;
        addActivity(state.currentUserId, '移动了任务', task.name);
        saveData();
        renderKanban();
        showToast('任务状态已更新', 'info');
      }
    }
    touchGhost.remove();
    touchGhost = null;
    touchTaskId = null;
  });
}

function moveTouchGhost(touch) {
  if (!touchGhost) return;
  touchGhost.style.left = (touch.clientX - 20) + 'px';
  touchGhost.style.top = (touch.clientY - 30) + 'px';
}

// ===== P1: 通知系统 =====
function generateNotifications() {
  state.notifications = [];
  const now = new Date();
  const soon = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  state.tasks.filter(t => isOverdue(t)).forEach(t => {
    state.notifications.push({
      id: genId('n'), type: 'danger', icon: 'fa-exclamation-circle',
      text: `任务 "<strong>${t.name}</strong>" 已逾期，请及时处理`,
      time: '刚刚', read: false, taskId: t.id,
    });
  });

  state.tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false;
    const d = new Date(t.dueDate);
    return d > now && d <= soon;
  }).forEach(t => {
    state.notifications.push({
      id: genId('n'), type: 'warning', icon: 'fa-clock',
      text: `任务 "<strong>${t.name}</strong>" 将于 ${formatDate(t.dueDate)} 截止`,
      time: '今天', read: false, taskId: t.id,
    });
  });

  // 里程碑预警
  state.projects.forEach(p => {
    (p.milestones || []).filter(ms => !ms.completed && ms.dueDate && new Date(ms.dueDate) <= soon).forEach(ms => {
      state.notifications.push({
        id: genId('n'), type: 'info', icon: 'fa-flag',
        text: `项目 "<strong>${p.name}</strong>" 里程碑 "${ms.name}" 即将到期`,
        time: '今天', read: false,
      });
    });
  });

  updateNotificationBadge();
  renderNotifications();
}

function updateNotificationBadge() {
  const unread = state.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notificationBadge');
  if (unread > 0) {
    badge.textContent = unread > 9 ? '9+' : unread;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }
}

function renderNotifications() {
  const list = document.getElementById('notificationList');
  if (!state.notifications.length) {
    list.innerHTML = '<div class="notif-empty"><i class="fas fa-check-circle" style="color:var(--success);margin-right:0.35rem"></i>暂无新通知</div>';
    return;
  }
  list.innerHTML = state.notifications.map(n => `
    <div class="notification-item ${n.read ? '' : 'unread'}" onclick="onNotifClick('${n.id}', '${n.taskId || ''}')">
      <div class="notif-icon ${n.type}"><i class="fas ${n.icon}"></i></div>
      <div class="notif-body">
        <p>${n.text}</p>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>`).join('');
}

function toggleNotifications(e) {
  e.stopPropagation();
  document.getElementById('notificationDropdown').classList.toggle('open');
}

function markAllRead(e) {
  e.stopPropagation();
  state.notifications.forEach(n => n.read = true);
  updateNotificationBadge();
  renderNotifications();
}

function onNotifClick(nId, taskId) {
  const notif = state.notifications.find(n => n.id === nId);
  if (notif) notif.read = true;
  updateNotificationBadge();
  renderNotifications();
  document.getElementById('notificationDropdown').classList.remove('open');
  if (taskId) openTaskDetail(taskId);
}

// ===== P2: 里程碑 =====
function addMilestoneInput() {
  milestoneInputCount++;
  const container = document.getElementById('milestoneInputs');
  const row = document.createElement('div');
  row.className = 'milestone-input-row';
  row.id = `msRow${milestoneInputCount}`;
  row.innerHTML = `
    <input type="text" class="form-input" placeholder="里程碑名称" id="msName${milestoneInputCount}">
    <input type="date" class="form-input" id="msDate${milestoneInputCount}">
    <button type="button" class="btn btn-icon" onclick="removeMilestoneRow(${milestoneInputCount})" title="删除">
      <i class="fas fa-times"></i>
    </button>`;
  container.appendChild(row);
}

function removeMilestoneRow(i) {
  const row = document.getElementById(`msRow${i}`);
  if (row) row.remove();
}

function collectMilestones() {
  const milestones = [];
  document.querySelectorAll('[id^="msRow"]').forEach(row => {
    const i = row.id.replace('msRow', '');
    const nameEl = document.getElementById(`msName${i}`);
    const dateEl = document.getElementById(`msDate${i}`);
    if (nameEl && nameEl.value.trim()) {
      milestones.push({ id: genId('ms'), name: nameEl.value.trim(), dueDate: dateEl ? dateEl.value : '', completed: false });
    }
  });
  return milestones;
}

function toggleMilestone(projectId, msId) {
  const project = getProject(projectId);
  if (!project) return;
  const ms = project.milestones.find(m => m.id === msId);
  if (!ms) return;
  ms.completed = !ms.completed;
  saveData();
  if (state.currentSection === 'projects') renderProjects();
  showToast(ms.completed ? `里程碑 "${ms.name}" 已完成` : `里程碑 "${ms.name}" 已重置`);
}

function renderMilestones(project) {
  if (!project.milestones || !project.milestones.length) return '';
  const today = new Date().toISOString().split('T')[0];
  return `<div style="margin-top:0.75rem;border-top:1px solid var(--border);padding-top:0.75rem">
    <div style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:0.5rem">
      <i class="fas fa-flag" style="margin-right:0.3rem"></i>里程碑
    </div>
    ${project.milestones.map(ms => {
      const overdue = !ms.completed && ms.dueDate && ms.dueDate < today;
      return `<div class="milestone-item">
        <div class="ms-check ${ms.completed ? 'done' : ''}" onclick="event.stopPropagation();toggleMilestone('${project.id}','${ms.id}')">
          ${ms.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <span class="ms-name ${ms.completed ? 'done' : ''}">${escHtml(ms.name)}</span>
        <span class="ms-due ${overdue ? 'overdue' : ''}">${escHtml(ms.dueDate || '-')}</span>
      </div>`;
    }).join('')}
  </div>`;
}

// ===== P2: CSV 导出 =====
function downloadCSV(filename, rows) {
  const content = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
  showToast(`${filename} 已导出`);
}

function exportTasksCSV() {
  const headers = ['任务名称', '项目', '负责人', '优先级', '状态', '截止日期', '预计工时(h)', '标签'];
  const pLabels = { low: '低', medium: '中', high: '高' };
  const sLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
  const rows = state.tasks.map(t => [
    t.name,
    getProject(t.projectId)?.name || '-',
    getMember(t.assigneeId)?.name || '未分配',
    pLabels[t.priority] || t.priority,
    sLabels[t.status] || t.status,
    t.dueDate || '-',
    t.estimatedHours || 0,
    (t.tags || []).join('|'),
  ]);
  downloadCSV('tasks.csv', [headers, ...rows]);
}

function exportProjectsCSV() {
  const headers = ['项目名称', '描述', '状态', '优先级', '开始日期', '截止日期', '进度(%)', '成员数', '任务数'];
  const pLabels = { low: '低', medium: '中', high: '高' };
  const sLabels = { active: '进行中', completed: '已完成', paused: '已暂停' };
  const rows = state.projects.map(p => [
    p.name, p.description,
    sLabels[p.status] || p.status,
    pLabels[p.priority] || p.priority,
    p.startDate || '-', p.endDate || '-',
    calcProjectProgress(p.id),
    (p.members || []).length,
    state.tasks.filter(t => t.projectId === p.id).length,
  ]);
  downloadCSV('projects.csv', [headers, ...rows]);
}

// ===== 导航 =====
function showSection(section) {
  state.currentSection = section;
  history.replaceState(null, '', '#' + section);
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + section).classList.add('active');
  const navItems = document.querySelectorAll('.nav-item');
  const sectionMap = { dashboard: 0, projects: 1, tasks: 2, team: 3, calendar: 4, reports: 5 };
  navItems.forEach(item => item.classList.remove('active'));
  if (sectionMap[section] !== undefined) navItems[sectionMap[section]].classList.add('active');
  const titleMap = { dashboard: '仪表盘', projects: '项目列表', tasks: '任务管理', team: '团队成员', calendar: '日历视图', reports: '报表分析' };
  document.getElementById('pageTitle').textContent = titleMap[section] || '';
  document.getElementById('notificationDropdown').classList.remove('open');
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
  clearAllErrors();
  if (id === 'createProjectModal') {
    milestoneInputCount = 0;
    document.getElementById('milestoneInputs').innerHTML = '';
    document.getElementById('projectName').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectStart').value = '';
    document.getElementById('projectEnd').value = '';
    document.getElementById('projectPriority').value = 'medium';
    document.getElementById('projectColor').value = '#4f46e5';
  }
  if (id === 'createTaskModal') {
    ['taskName', 'taskDesc', 'taskDue', 'taskHours', 'taskTags'].forEach(fid => {
      const el = document.getElementById(fid); if (el) el.value = '';
    });
    const pri = document.getElementById('taskPriority'); if (pri) pri.value = 'medium';
    populateTaskForm();
  }
  if (id === 'addMemberModal') {
    ['memberName', 'memberRole', 'memberEmail'].forEach(fid => {
      const el = document.getElementById(fid); if (el) el.value = '';
    });
    const col = document.getElementById('memberColor'); if (col) col.value = '#4f46e5';
  }
  _lastFocus = document.activeElement;
  const modal = document.getElementById(id);
  modal.classList.add('active');
  document.getElementById('overlay').classList.add('active');
  // 焦点陷阱：将焦点移入弹窗
  setTimeout(() => {
    const focusable = modal.querySelector('button:not([disabled]), input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }, 60);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  clearAllErrors();
  const anyActive = document.querySelectorAll('.modal.active').length > 0;
  if (!anyActive) document.getElementById('overlay').classList.remove('active');
  // 恢复焦点
  if (_lastFocus && typeof _lastFocus.focus === 'function') {
    try { _lastFocus.focus(); } catch (e) {}
    _lastFocus = null;
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('notificationDropdown').classList.remove('open');
}

// ===== Toast =====
function showToast(message, type = 'success') {
  const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i><span class="toast-message">${message}</span>`;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== 辅助函数 =====
function getMember(id) { return state.members.find(m => m.id === id); }
function getProject(id) { return state.projects.find(p => p.id === id); }

function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  } catch (e) { return '-'; }
}

function isOverdue(task) {
  if (!task.dueDate || task.status === 'done') return false;
  return new Date(task.dueDate) < new Date();
}

function calcProjectProgress(projectId) {
  const tasks = state.tasks.filter(t => t.projectId === projectId);
  if (!tasks.length) return 0;
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
  document.getElementById('projectProgressList').innerHTML = state.projects.slice(0, 5).map(p => {
    const progress = calcProjectProgress(p.id);
    return `<div class="project-progress-item">
      <div class="project-color-dot" style="background:${p.color}"></div>
      <div class="project-progress-info">
        <h4>${escHtml(p.name)}</h4>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%;background:${p.color}"></div></div>
      </div>
      <span class="progress-text">${progress}%</span>
    </div>`;
  }).join('');
}

function renderRecentTasks() {
  const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
  const tasks = [...state.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  document.getElementById('recentTasksList').innerHTML = tasks.map(t => `
    <div class="recent-task-item" onclick="openTaskDetail('${t.id}')">
      <div class="task-priority-dot priority-${t.priority}"></div>
      <div class="recent-task-info"><h4>${escHtml(t.name)}</h4><span>${formatDate(t.dueDate)}</span></div>
      <span class="task-status-badge status-${t.status}">${statusLabels[t.status]}</span>
    </div>`).join('');
}

function renderActivityList() {
  document.getElementById('activityList').innerHTML = state.activities.slice(0, 5).map(a => {
    const m = getMember(a.memberId);
    if (!m) return '';
    return `<div class="activity-item">
      <div class="activity-avatar" style="background:${m.color}">${escHtml(getInitials(m.name))}</div>
      <div class="activity-content">
        <p><strong>${escHtml(m.name)}</strong> ${escHtml(a.action)} <strong>${escHtml(a.target)}</strong></p>
        <span class="activity-time">${escHtml(a.time)}</span>
      </div>
    </div>`;
  }).join('');
}

// ===== 图表实例管理 =====
const chartInstances = {};
function safeDestroyChart(key) {
  if (chartInstances[key]) {
    try { chartInstances[key].destroy(); } catch (e) {}
    chartInstances[key] = null;
  }
}

function renderTaskStatusChart() {
  safeDestroyChart('taskStatus');
  const ctx = document.getElementById('taskStatusChart').getContext('2d');
  const counts = {
    todo: state.tasks.filter(t => t.status === 'todo').length,
    inprogress: state.tasks.filter(t => t.status === 'inprogress').length,
    done: state.tasks.filter(t => t.status === 'done').length,
  };
  chartInstances['taskStatus'] = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: ['待办', '进行中', '已完成'], datasets: [{ data: [counts.todo, counts.inprogress, counts.done], backgroundColor: ['#f59e0b', '#4f46e5', '#22c55e'], borderWidth: 0 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, cutout: '70%' },
  });
  document.getElementById('chartLegend').innerHTML = [
    { label: '待办', color: '#f59e0b', count: counts.todo },
    { label: '进行中', color: '#4f46e5', count: counts.inprogress },
    { label: '已完成', color: '#22c55e', count: counts.done },
  ].map(item => `<div class="legend-item"><div class="legend-dot" style="background:${item.color}"></div>${item.label} (${item.count})</div>`).join('');
}

// ===== 项目列表 =====
function renderProjects() {
  populateTaskProjectFilter();
  let projects = [...state.projects];
  if (state.projectFilter !== 'all') projects = projects.filter(p => p.status === state.projectFilter);
  if (state.projectSort === 'name') projects.sort((a, b) => a.name.localeCompare(b.name));
  else if (state.projectSort === 'progress') projects.sort((a, b) => calcProjectProgress(b.id) - calcProjectProgress(a.id));
  else projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const statusLabels = { active: '进行中', completed: '已完成', paused: '已暂停' };
  const priorityLabels = { low: '低', medium: '中', high: '高' };

  document.getElementById('projectsContainer').innerHTML = projects.map(p => {
    const progress = calcProjectProgress(p.id);
    const taskCount = state.tasks.filter(t => t.projectId === p.id).length;
    const doneMs = (p.milestones || []).filter(ms => ms.completed).length;
    const totalMs = (p.milestones || []).length;
    const membersHtml = (p.members || []).slice(0, 4).map(mid => {
      const m = getMember(mid);
      return m ? `<div class="project-member-avatar" style="background:${m.color}" title="${escHtml(m.name)}">${escHtml(getInitials(m.name))}</div>` : '';
    }).join('');
    return `
      <div class="project-card" style="border-left-color:${p.color}" onclick="showSection('tasks')">
        <div class="project-card-header">
          <h3 title="${escHtml(p.name)}">${escHtml(p.name)}</h3>
          <div style="display:flex;align-items:center;gap:0.4rem">
            <span class="project-status status-${p.status}">${statusLabels[p.status]}</span>
            <button class="btn btn-sm btn-icon" title="管理成员"
              onclick="event.stopPropagation();openProjectMembers('${p.id}')"
              style="padding:0.2rem 0.4rem;font-size:0.75rem">
              <i class="fas fa-users-cog"></i>
            </button>
            <button class="btn btn-sm btn-icon" title="编辑项目"
              onclick="event.stopPropagation();openEditProjectModal('${p.id}')"
              style="padding:0.2rem 0.4rem;font-size:0.75rem">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
        <div class="project-card-body">
          <p>${escHtml(p.description)}</p>
          <div class="project-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(p.endDate)}</span>
            <span><i class="fas fa-tasks"></i> ${taskCount} 任务</span>
            <span><i class="fas fa-flag"></i> ${priorityLabels[p.priority]}</span>
            ${totalMs > 0 ? `<span><i class="fas fa-map-marker-alt"></i> ${doneMs}/${totalMs} 里程碑</span>` : ''}
          </div>
        </div>
        <div class="project-card-footer">
          <div class="project-members" style="cursor:pointer" title="点击管理成员"
            onclick="event.stopPropagation();openProjectMembers('${p.id}')">${membersHtml}
            <div class="project-member-avatar" style="background:#e2e8f0;color:#64748b;font-size:0.65rem" title="管理成员">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div style="text-align:right">
            <div class="progress-bar" style="width:80px">
              <div class="progress-fill" style="width:${progress}%;background:${p.color}"></div>
            </div>
            <span style="font-size:0.75rem;color:var(--text-secondary)">${progress}%</span>
          </div>
        </div>
        ${renderMilestones(p)}
      </div>`;
  }).join('') || '<div style="padding:2rem;text-align:center;color:var(--text-light)">暂无项目，点击"新建项目"开始</div>';
}

function filterProjects(value) { state.projectFilter = value; renderProjects(); }
function sortProjects(value) { state.projectSort = value; renderProjects(); }

function toggleView(viewType, btn) {
  state.projectView = viewType;
  document.getElementById('projectsContainer').className = `projects-container ${viewType}-view`;
  document.querySelectorAll('.view-toggle .btn-icon').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function createProject() {
  if (!validateField('projectName', '项目名称')) return;
  const project = {
    id: genId('p'),
    name: document.getElementById('projectName').value.trim(),
    description: document.getElementById('projectDesc').value.trim(),
    startDate: document.getElementById('projectStart').value,
    endDate: document.getElementById('projectEnd').value,
    priority: document.getElementById('projectPriority').value,
    color: document.getElementById('projectColor').value,
    status: 'active',
    members: [],
    createdAt: new Date().toISOString().split('T')[0],
    milestones: collectMilestones(),
  };
  state.projects.unshift(project);
  addActivity(state.currentUserId, '创建了项目', project.name);
  saveData();
  generateNotifications();
  closeModal('createProjectModal');
  showToast(`项目 "${project.name}" 创建成功`);
  if (state.currentSection === 'projects') renderProjects();
  if (state.currentSection === 'dashboard') renderDashboard();
}

// ===== 任务管理 =====
function populateTaskForm() {
  const projSelect = document.getElementById('taskProject');
  projSelect.innerHTML = state.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  projSelect.onchange = onTaskProjectChange;
  onTaskProjectChange();
}

function onTaskProjectChange() {
  const projectId = document.getElementById('taskProject').value;
  const project = getProject(projectId);
  const members = (project && project.members.length > 0)
    ? project.members.map(id => getMember(id)).filter(Boolean)
    : state.members;
  document.getElementById('taskAssignee').innerHTML =
    `<option value="">未分配</option>` + members.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
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
  const sortBy = document.getElementById('kanbanSortBy')?.value || 'default';
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  let tasks = [...state.tasks];
  if (projFilter !== 'all') tasks = tasks.filter(t => t.projectId === projFilter);
  if (statusFilter !== 'all') tasks = tasks.filter(t => t.status === statusFilter);
  if (priorityFilter !== 'all') tasks = tasks.filter(t => t.priority === priorityFilter);
  if (sortBy === 'priority') {
    tasks.sort((a, b) => (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1));
  } else if (sortBy === 'due') {
    tasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }
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
  const overdue = isOverdue(task);
  const tagsHtml = (task.tags || []).map(tag => `<span class="tag">${escHtml(tag)}</span>`).join('');
  const isSelected = state.selectedTaskIds && state.selectedTaskIds.has(task.id);
  const batchMode = state.batchMode;
  const isDone = task.status === 'done';

  // 检查依赖是否未完成
  let depWarn = '';
  if (task.dependsOn) {
    const dep = state.tasks.find(t => t.id === task.dependsOn);
    if (dep && dep.status !== 'done') {
      depWarn = `<div class="dep-warning"><i class="fas fa-exclamation-triangle"></i>依赖 "${escHtml(dep.name)}" 未完成</div>`;
    }
  }

  const cardClick = batchMode ? `toggleTaskSelect('${task.id}')` : `openTaskDetail('${task.id}')`;

  return `<div class="kanban-task-card ${overdue ? 'task-overdue' : ''} ${isDone ? 'status-done' : ''} ${isSelected ? 'selected-task' : ''}"
       data-task-id="${task.id}"
       draggable="${batchMode ? 'false' : 'true'}"
       ondragstart="drag(event, '${task.id}')"
       onclick="${cardClick}">
    ${batchMode ? `<input type="checkbox" class="task-select-cb" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation();toggleTaskSelect('${task.id}')">` : ''}
    <button class="quick-done-btn" title="${isDone ? '取消完成' : '标记完成'}"
      onclick="event.stopPropagation();quickDoneTask('${task.id}')">
      <i class="fas fa-check"></i>
    </button>
    ${tagsHtml ? `<div class="kanban-task-tags">${tagsHtml}</div>` : ''}
    <div class="kanban-task-title" title="${escHtml(task.name)}" style="padding-right:1.5rem">${escHtml(task.name)}</div>
    <div class="kanban-task-meta">
      <span style="color:${overdue ? 'var(--danger)' : 'inherit'}">
        <i class="fas fa-calendar-alt"></i> ${formatDate(task.dueDate)}
      </span>
      ${member ? `<div class="kanban-task-assignee" style="background:${member.color}" title="${escHtml(member.name)}">${escHtml(getInitials(member.name))}</div>` : ''}
    </div>
    ${project ? `<div style="margin-top:0.35rem;font-size:0.7rem;color:var(--text-light)"><i class="fas fa-folder"></i> ${escHtml(project.name)}</div>` : ''}
    ${depWarn}
  </div>`;
}

function filterTasks() { renderKanban(); }

function createTask() {
  clearAllErrors();
  const nameOk = validateField('taskName', '任务名称');
  if (!nameOk) return;

  const tagsStr = document.getElementById('taskTags').value.trim();
  const task = {
    id: genId('t'),
    name: document.getElementById('taskName').value.trim(),
    description: document.getElementById('taskDesc').value.trim(),
    projectId: document.getElementById('taskProject').value,
    assigneeId: document.getElementById('taskAssignee').value,
    priority: document.getElementById('taskPriority').value,
    status: 'todo',
    dueDate: document.getElementById('taskDue').value,
    estimatedHours: parseInt(document.getElementById('taskHours').value) || 0,
    tags: tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [],
    createdAt: new Date().toISOString().split('T')[0],
    dependsOn: null,
    comments: [],
  };
  state.tasks.unshift(task);
  addActivity(state.currentUserId, '创建了任务', task.name);
  saveData();
  generateNotifications();
  closeModal('createTaskModal');
  showToast(`任务 "${task.name}" 创建成功`);
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
  event.currentTarget.classList.add('drag-over');
}

function removeDragOver(event) {
  event.currentTarget.classList.remove('drag-over');
}

function drop(event, newStatus) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  if (!draggedTaskId) return;
  const task = state.tasks.find(t => t.id === draggedTaskId);
  if (task && task.status !== newStatus) {
    if (newStatus === 'done' && !checkDependencies(task)) {
      draggedTaskId = null;
      return;
    }
    const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
    task.status = newStatus;
    addActivity(state.currentUserId, '移动了任务至', `${statusLabels[newStatus]} — ${task.name}`);
    saveData();
    generateNotifications();
    renderKanban();
    showToast('任务状态已更新', 'info');
  }
  draggedTaskId = null;
}

// ===== P1: 任务详情（含评论 + 依赖）=====
function openTaskDetail(taskId) {
  state.currentTaskId = taskId;
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  document.getElementById('taskDetailTitle').textContent = task.name;

  // 同一项目下的其他任务（依赖选项）
  const projectTasks = state.tasks.filter(t => t.projectId === task.projectId && t.id !== task.id);
  const depOptions = `<option value="">无</option>` +
    projectTasks.map(t => `<option value="${t.id}" ${task.dependsOn === t.id ? 'selected' : ''}>${escHtml(t.name)}</option>`).join('');

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
    <div class="form-row">
      <div class="form-group">
        <label>标签（逗号分隔）</label>
        <input type="text" class="form-input" id="detail-tags" value="${(task.tags || []).join(', ')}">
      </div>
      <div class="form-group">
        <label>前置任务（依赖）</label>
        <select class="form-input" id="detail-dep">${depOptions}</select>
      </div>
    </div>
    <div class="comments-section">
      <h4><i class="fas fa-comments" style="margin-right:0.35rem"></i>评论 (${(task.comments || []).length})</h4>
      <div id="commentsContainer">${renderComments(task)}</div>
      <div class="comment-input-area">
        <textarea id="commentInput" placeholder="写下你的评论..." onkeydown="handleCommentKey(event)"></textarea>
        <button class="btn btn-primary btn-sm" onclick="submitComment()">发送</button>
      </div>
    </div>`;

  openModal('taskDetailModal');
}

/// ===== P1: 评论 =====
function renderComments(task) {
  if (!task.comments || !task.comments.length) {
    return '<div style="padding:0.5rem 0;color:var(--text-light);font-size:0.825rem">暂无评论，来说点什么吧</div>';
  }
  return task.comments.map(c => {
    const m = getMember(c.memberId) || { name: '未知', color: '#94a3b8' };
    const canDelete = c.memberId === state.currentUserId;
    return `<div class="comment-item">
      <div class="comment-avatar" style="background:${m.color}">${escHtml(getInitials(m.name))}</div>
      <div class="comment-bubble">
        <div class="comment-meta">
          <span class="comment-author">${escHtml(m.name)}</span>
          <span class="comment-time-text">${escHtml(c.timestamp)}</span>
          ${canDelete ? `<button class="comment-delete-btn" title="删除评论" onclick="deleteComment('${task.id}','${c.id}')"><i class="fas fa-trash-alt"></i></button>` : ''}
        </div>
        <div class="comment-text">${escHtml(c.text)}</div>
      </div>
    </div>`;
  }).join('');
}

function deleteComment(taskId, commentId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.comments = (task.comments || []).filter(c => c.id !== commentId);
  saveData();
  document.getElementById('commentsContainer').innerHTML = renderComments(task);
  showToast('评论已删除', 'info');
}

function handleCommentKey(e) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submitComment();
}

function submitComment() {
  const input = document.getElementById('commentInput');
  const text = input ? input.value.trim() : '';
  if (!text || !state.currentTaskId) return;
  const task = state.tasks.find(t => t.id === state.currentTaskId);
  if (!task) return;
  if (!task.comments) task.comments = [];
  task.comments.push({
    id: genId('c'), memberId: state.currentUserId, text,
    timestamp: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
  });
  saveData();
  document.getElementById('commentsContainer').innerHTML = renderComments(task);
  input.value = '';
  addActivity(state.currentUserId, '评论了任务', task.name);
}

function saveTaskDetail() {
  const task = state.tasks.find(t => t.id === state.currentTaskId);
  if (!task) return;
  const newStatus = document.getElementById('detail-status').value;
  if (newStatus === 'done' && task.status !== 'done') {
    const depId = document.getElementById('detail-dep').value || task.dependsOn;
    if (!checkDependencies({ dependsOn: depId || null })) return;
  }
  task.name = document.getElementById('detail-name').value.trim();
  task.description = document.getElementById('detail-desc').value.trim();
  task.status = newStatus;
  task.priority = document.getElementById('detail-priority').value;
  task.dueDate = document.getElementById('detail-due').value;
  task.estimatedHours = parseInt(document.getElementById('detail-hours').value) || 0;
  const tagsStr = document.getElementById('detail-tags').value.trim();
  task.tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
  task.dependsOn = document.getElementById('detail-dep').value || null;
  addActivity(state.currentUserId, '更新了任务', task.name);
  saveData();
  generateNotifications();
  closeModal('taskDetailModal');
  showToast('任务已保存');
  if (state.currentSection === 'tasks') renderKanban();
  if (state.currentSection === 'dashboard') renderDashboard();
}

function deleteCurrentTask() {
  if (!state.currentTaskId) return;
  const task = state.tasks.find(t => t.id === state.currentTaskId);
  confirmAction(
    '删除任务',
    `确定要删除任务 "${task?.name || ''}" 吗？其他任务对它的依赖也将被清除，此操作不可撤销。`,
    () => {
      const taskId = state.currentTaskId;
      const taskSnapshot = { ...task, comments: [...(task.comments || [])] };
      const affectedTasks = state.tasks.filter(t => t.dependsOn === taskId).map(t => ({ id: t.id, dep: t.dependsOn }));
      state.tasks = state.tasks.filter(t => t.id !== taskId);
      state.tasks.forEach(t => { if (t.dependsOn === taskId) t.dependsOn = null; });
      if (task) addActivity(state.currentUserId, '删除了任务', task.name);
      saveData();
      generateNotifications();
      closeModal('taskDetailModal');
      saveUndo(`任务 "${escHtml(taskSnapshot.name)}" 已删除`, () => {
        state.tasks.unshift(taskSnapshot);
        affectedTasks.forEach(({ id, dep }) => { const t = state.tasks.find(x => x.id === id); if (t) t.dependsOn = dep; });
        saveData(); generateNotifications();
        if (state.currentSection === 'tasks') renderKanban();
        if (state.currentSection === 'dashboard') renderDashboard();
      });
      if (state.currentSection === 'tasks') renderKanban();
      if (state.currentSection === 'dashboard') renderDashboard();
    }
  );
}

/// ===== P2: 团队成员（含负载预警）=====
function renderTeam() {
  document.getElementById('teamGrid').innerHTML = state.members.map(m => {
    const allTasks = state.tasks.filter(t => t.assigneeId === m.id);
    const activeTasks = allTasks.filter(t => t.status !== 'done').length;
    const doneTasks = allTasks.filter(t => t.status === 'done').length;
    const overloaded = activeTasks >= OVERLOAD_THRESHOLD;
    return `<div class="team-card ${overloaded ? 'overloaded' : ''}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem">
        <div class="team-avatar" style="background:${m.color}">${escHtml(getInitials(m.name))}</div>
        <button class="btn btn-sm btn-icon" title="编辑成员" onclick="openEditMemberModal('${m.id}')"
          style="padding:0.2rem 0.4rem;font-size:0.75rem;opacity:0.7">
          <i class="fas fa-edit"></i>
        </button>
      </div>
      <h3>${escHtml(m.name)}${overloaded ? '<span class="overload-tag">超载</span>' : ''}</h3>
      <p class="team-role">${escHtml(m.role)}</p>
      <p class="team-email">${escHtml(m.email)}</p>
      ${overloaded ? `<p style="font-size:0.75rem;color:var(--danger);margin-bottom:0.75rem"><i class="fas fa-exclamation-triangle"></i> 活跃任务过多（${activeTasks}个），建议重新分配</p>` : ''}
      <div class="team-stats">
        <div class="team-stat"><div class="stat-number">${allTasks.length}</div><div class="stat-label">总任务</div></div>
        <div class="team-stat"><div class="stat-number">${doneTasks}</div><div class="stat-label">已完成</div></div>
        <div class="team-stat"><div class="stat-number">${activeTasks}</div><div class="stat-label">进行中</div></div>
      </div>
    </div>`;
  }).join('') || '<div style="padding:2rem;text-align:center;color:var(--text-light)">暂无成员</div>';
}

function addMember() {
  clearAllErrors();
  if (!validateField('memberName', '成员姓名')) return;
  const member = {
    id: genId('m'),
    name: document.getElementById('memberName').value.trim(),
    role: document.getElementById('memberRole').value.trim(),
    email: document.getElementById('memberEmail').value.trim(),
    color: document.getElementById('memberColor').value,
  };
  state.members.push(member);
  addActivity(state.currentUserId, '添加了成员', member.name);
  saveData();
  closeModal('addMemberModal');
  initCurrentUser();
  showToast(`成员 "${member.name}" 已添加`);
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
  for (let i = firstDay - 1; i >= 0; i--) html += `<div class="calendar-day other-month">${daysInPrev - i}</div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasTasks = state.tasks.some(t => t.dueDate === dateStr);
    const isSelected = state.selectedDate === dateStr;
    html += `<div class="calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
      onclick="selectCalendarDay('${dateStr}')"
      >${d}${hasTasks ? '<div class="task-dot"></div>' : ''}</div>`;
  }
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let i = 1; i <= totalCells - firstDay - daysInMonth; i++) html += `<div class="calendar-day other-month">${i}</div>`;
  document.getElementById('calendarDays').innerHTML = html;

  // 当天任务面板
  const dayPanel = document.getElementById('dayTasksPanel');
  const dayList = document.getElementById('dayTasksList');
  const dayTitle = document.getElementById('dayTasksTitle');
  const dayBtn = document.getElementById('dayTasksCreateBtn');
  const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
  if (state.selectedDate) {
    const dayTasks = state.tasks.filter(t => t.dueDate === state.selectedDate);
    dayTitle.textContent = `${state.selectedDate} 的任务（${dayTasks.length}）`;
    dayBtn.setAttribute('onclick', `createTaskForDate('${state.selectedDate}')`);
    dayList.innerHTML = dayTasks.length
      ? dayTasks.map(t => `<div class="recent-task-item" onclick="openTaskDetail('${t.id}')">
          <div class="task-priority-dot priority-${t.priority}"></div>
          <div class="recent-task-info"><h4>${t.name}</h4>
            <span>${getProject(t.projectId)?.name || '-'}</span></div>
          <span class="task-status-badge status-${t.status}">${statusLabels[t.status]}</span>
        </div>`).join('')
      : '<div style="padding:1rem;text-align:center;color:var(--text-light)">当天无截止任务，点击右上角按钮创建</div>';
    dayPanel.style.display = '';
  } else {
    dayPanel.style.display = 'none';
  }

  const monthlyTasks = state.tasks
    .filter(t => { if (!t.dueDate) return false; const d = new Date(t.dueDate); return d.getFullYear() === year && d.getMonth() === month; })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  document.getElementById('monthlyTasks').innerHTML = monthlyTasks.length
    ? monthlyTasks.map(t => `<div class="recent-task-item" onclick="openTaskDetail('${t.id}')">
        <div class="task-priority-dot priority-${t.priority}"></div>
        <div class="recent-task-info"><h4>${t.name}</h4><span>${formatDate(t.dueDate)}</span></div>
        <span class="task-status-badge status-${t.status}">${statusLabels[t.status]}</span>
      </div>`).join('')
    : '<div style="padding:1rem;text-align:center;color:var(--text-light)">本月暂无截止任务</div>';
}

function selectCalendarDay(dateStr) {
  state.selectedDate = state.selectedDate === dateStr ? null : dateStr;
  renderCalendar();
}

function createTaskForDate(dateStr) {
  openModal('createTaskModal');
  setTimeout(() => {
    const el = document.getElementById('taskDue');
    if (el) el.value = dateStr;
  }, 50);
}

function changeMonth(delta) {
  state.selectedDate = null;
  state.currentDate = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + delta, 1);
  renderCalendar();
}

// ===== P2: 报表分析（含燃尽图）=====
function renderReports() {
  renderCompletionChart();
  renderWorkloadChart();
  renderTrendChart();
  renderBurndownChart();
}

function renderCompletionChart() {
  safeDestroyChart('completion');
  const ctx = document.getElementById('completionChart').getContext('2d');
  chartInstances['completion'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state.projects.map(p => p.name.length > 8 ? p.name.slice(0, 8) + '…' : p.name),
      datasets: [{ label: '完成率(%)', data: state.projects.map(p => calcProjectProgress(p.id)), backgroundColor: state.projects.map(p => p.color + 'cc'), borderColor: state.projects.map(p => p.color), borderWidth: 1, borderRadius: 6 }],
    },
    options: { responsive: true, scales: { y: { min: 0, max: 100 } }, plugins: { legend: { display: false } } },
  });
}

function renderWorkloadChart() {
  safeDestroyChart('workload');
  const ctx = document.getElementById('workloadChart').getContext('2d');
  chartInstances['workload'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state.members.map(m => m.name),
      datasets: [{ label: '任务数量', data: state.members.map(m => state.tasks.filter(t => t.assigneeId === m.id).length), backgroundColor: state.members.map(m => m.color + 'cc'), borderColor: state.members.map(m => m.color), borderWidth: 1, borderRadius: 6 }],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

function renderTrendChart() {
  safeDestroyChart('trend');
  const ctx = document.getElementById('trendChart').getContext('2d');
  const now = new Date();
  const months = [], created = [], completed = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    months.push(`${y}/${m + 1}`);
    created.push(state.tasks.filter(t => { if (!t.createdAt) return false; const cd = new Date(t.createdAt); return cd.getFullYear() === y && cd.getMonth() === m; }).length);
    completed.push(state.tasks.filter(t => { if (!t.dueDate || t.status !== 'done') return false; const dd = new Date(t.dueDate); return dd.getFullYear() === y && dd.getMonth() === m; }).length);
  }
  chartInstances['trend'] = new Chart(ctx, {
    type: 'line',
    data: { labels: months, datasets: [
      { label: '新建任务', data: created, borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.1)', tension: 0.4, fill: true },
      { label: '完成任务', data: completed, borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', tension: 0.4, fill: true },
    ]},
    options: { responsive: true, plugins: { legend: { display: true, position: 'top' } }, scales: { y: { min: 0 } } },
  });
}

function renderBurndownChart() {
  safeDestroyChart('burndown');
  const ctx = document.getElementById('burndownChart').getContext('2d');
  const DAYS = 14;
  const labels = [], remaining = [], ideal = [];
  const totalTasks = state.tasks.length;
  for (let i = DAYS; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
    const createdUpTo = state.tasks.filter(t => t.createdAt && t.createdAt <= dStr).length;
    const doneUpTo = state.tasks.filter(t => t.status === 'done' && t.dueDate && t.dueDate <= dStr).length;
    remaining.push(Math.max(0, createdUpTo - doneUpTo));
    ideal.push(Math.round(totalTasks * (i / DAYS)));
  }
  chartInstances['burndown'] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [
      { label: '剩余任务', data: remaining, borderColor: '#4f46e5', backgroundColor: 'rgba(79,70,229,0.1)', tension: 0.3, fill: true, pointRadius: 3 },
      { label: '理想燃尽线', data: ideal, borderColor: '#94a3b8', borderDash: [6, 3], borderWidth: 2, pointRadius: 0, fill: false },
    ]},
    options: {
      responsive: true,
      plugins: { legend: { display: true, position: 'top' } },
      scales: { y: { min: 0, title: { display: true, text: '剩余任务数' } } },
    },
  });
}

// ===== 搜索（含关键词高亮）=====
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
      return `<div class="project-card" style="border-left-color:${p.color}">
        <div class="project-card-header"><h3>${highlightText(p.name, q)}</h3><span class="project-status status-${p.status}">${statusLabels[p.status]}</span></div>
        <div class="project-card-body"><p>${highlightText(p.description || '', q)}</p></div>
        <div class="project-card-footer"><span style="font-size:0.75rem;color:var(--text-secondary)">${progress}%</span></div>
      </div>`;
    }).join('') || '<div style="padding:2rem;text-align:center;color:var(--text-light)">未找到相关项目</div>';
  }
  if (state.currentSection === 'tasks') {
    const filtered = state.tasks.filter(t => t.name.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
    const columns = { todo: [], inprogress: [], done: [] };
    filtered.forEach(t => { if (columns[t.status]) columns[t.status].push(t); });
    Object.keys(columns).forEach(status => {
      document.getElementById(`count-${status}`).textContent = columns[status].length;
      // 搜索结果中高亮任务名
      document.getElementById(`tasks-${status}`).innerHTML = columns[status].map(t => {
        const card = renderTaskCard(t);
        // 替换任务标题为高亮版本
        return card.replace(
          `>${escHtml(t.name)}</div>`,
          `>${highlightText(t.name, q)}</div>`
        );
      }).join('');
    });
  }
}

// ===== 批量任务操作 =====
function toggleBatchMode() {
  state.batchMode = !state.batchMode;
  state.selectedTaskIds = new Set();
  const btn = document.getElementById('batchModeBtn');
  const bar = document.getElementById('batchActionBar');
  const board = document.getElementById('kanbanBoard');
  if (state.batchMode) {
    btn.innerHTML = '<i class="fas fa-times"></i> 退出选择';
    btn.classList.add('btn-danger');
    btn.classList.remove('btn-secondary');
    bar.style.display = 'flex';
    board.classList.add('batch-mode');
  } else {
    btn.innerHTML = '<i class="fas fa-check-square"></i> 批量选择';
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-secondary');
    bar.style.display = 'none';
    board.classList.remove('batch-mode');
  }
  renderKanban();
}

function toggleTaskSelect(taskId) {
  if (!state.selectedTaskIds) state.selectedTaskIds = new Set();
  if (state.selectedTaskIds.has(taskId)) {
    state.selectedTaskIds.delete(taskId);
  } else {
    state.selectedTaskIds.add(taskId);
  }
  const count = state.selectedTaskIds.size;
  document.getElementById('batchCountLabel').textContent = `已选 ${count} 个任务`;
  // 仅更新该卡片的选中状态，避免全量重绘
  const card = document.querySelector(`[data-task-id="${taskId}"]`);
  if (card) {
    card.classList.toggle('selected-task', state.selectedTaskIds.has(taskId));
    const cb = card.querySelector('.task-select-cb');
    if (cb) cb.checked = state.selectedTaskIds.has(taskId);
  }
}

function batchSetStatus(newStatus) {
  if (!state.selectedTaskIds || state.selectedTaskIds.size === 0) {
    showToast('请先选择任务', 'info'); return;
  }
  let blocked = 0;
  state.selectedTaskIds.forEach(id => {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    if (newStatus === 'done' && !checkDependencies(task)) { blocked++; return; }
    task.status = newStatus;
  });
  saveData();
  generateNotifications();
  const statusLabels = { todo: '待办', inprogress: '进行中', done: '已完成' };
  showToast(`已将 ${state.selectedTaskIds.size - blocked} 个任务标记为「${statusLabels[newStatus]}」`);
  if (blocked > 0) showToast(`${blocked} 个任务因依赖未完成无法标记`, 'error');
  state.selectedTaskIds = new Set();
  renderKanban();
}

function batchDelete() {
  if (!state.selectedTaskIds || state.selectedTaskIds.size === 0) {
    showToast('请先选择任务', 'info'); return;
  }
  const count = state.selectedTaskIds.size;
  confirmAction('批量删除', `确定要删除选中的 ${count} 个任务吗？此操作不可撤销。`, () => {
    const ids = [...state.selectedTaskIds];
    state.tasks = state.tasks.filter(t => !ids.includes(t.id));
    state.tasks.forEach(t => { if (ids.includes(t.dependsOn)) t.dependsOn = null; });
    addActivity(state.currentUserId, `批量删除了 ${count} 个任务`, '');
    saveData();
    generateNotifications();
    state.selectedTaskIds = new Set();
    showToast(`已删除 ${count} 个任务`, 'info');
    renderKanban();
    if (state.currentSection === 'dashboard') renderDashboard();
  });
}

// ===== 深色模式 =====
function initTheme() {
  const saved = localStorage.getItem('pm_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateDarkModeIcon(theme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('pm_theme')) {
      const t = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      updateDarkModeIcon(t);
    }
  });
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('pm_theme', next); } catch (e) {}
  updateDarkModeIcon(next);
}

function updateDarkModeIcon(theme) {
  const btn = document.getElementById('darkModeBtn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  btn.title = theme === 'dark' ? '切换浅色模式' : '切换深色模式';
}

// ===== 撤销系统 =====
let _undoData = null;
let _undoTimer = null;

function saveUndo(label, restoreFn) {
  _undoData = restoreFn;
  clearTimeout(_undoTimer);
  const existing = document.getElementById('undoToast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'undoToast';
  toast.className = 'toast info undo-toast';
  toast.innerHTML = `<i class="fas fa-info-circle"></i><span style="flex:1">${label}</span><button class="undo-btn" onclick="executeUndo()">撤销</button>`;
  document.getElementById('toastContainer').appendChild(toast);
  _undoTimer = setTimeout(() => {
    toast.remove();
    _undoData = null;
  }, 5000);
}

function executeUndo() {
  if (typeof _undoData === 'function') {
    _undoData();
    _undoData = null;
    clearTimeout(_undoTimer);
    const toast = document.getElementById('undoToast');
    if (toast) toast.remove();
    showToast('操作已撤销');
  }
}

// ===== URL 哈希路由 =====
function initHashRouting() {
  window.addEventListener('hashchange', () => {
    const sections = ['dashboard', 'projects', 'tasks', 'team', 'calendar', 'reports'];
    const hash = location.hash.slice(1);
    if (sections.includes(hash) && hash !== state.currentSection) showSection(hash);
  });
}

// ===== 初始化 =====
function init() {
  loadData();
  initTheme();
  initCurrentUser();
  initHashRouting();
  // 从 hash 决定初始页面
  const sections = ['dashboard', 'projects', 'tasks', 'team', 'calendar', 'reports'];
  const initSection = sections.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'dashboard';
  state.batchMode = false;
  state.selectedTaskIds = new Set();
  renderDashboard();
  if (initSection !== 'dashboard') showSection(initSection);
  generateNotifications();
  setupTouchDrag();

  // 点击外部关闭通知下拉
  document.addEventListener('click', (e) => {
    const bell = e.target.closest('.notification-bell');
    if (!bell) document.getElementById('notificationDropdown').classList.remove('open');
  });

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    // 输入框/textarea 内不触发
    if (e.target.matches('input, textarea, select')) return;
    const anyModal = document.querySelector('.modal.active');
    if (e.key === 'Escape') {
      if (anyModal) closeAllModals();
      if (state.batchMode) toggleBatchMode();
      return;
    }
    if (e.key === 'z' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); executeUndo(); return; }
    if (anyModal) return; // 弹窗开着时不触发其他快捷键
    if (e.key === 'n') { e.preventDefault(); openModal('createTaskModal'); }
    if (e.key === 'p') { e.preventDefault(); openModal('createProjectModal'); }
    if (e.key === '/') { e.preventDefault(); document.getElementById('searchInput').focus(); }
    if (e.key === '1') showSection('dashboard');
    if (e.key === '2') showSection('projects');
    if (e.key === '3') showSection('tasks');
    if (e.key === '4') showSection('team');
    if (e.key === '5') showSection('calendar');
    if (e.key === '6') showSection('reports');
  });

  // 多标签页数据同步
  window.addEventListener('storage', (e) => {
    if (!e.key || !e.key.startsWith('pm_')) return;
    try {
      state.projects = JSON.parse(localStorage.getItem('pm_projects') || '[]');
      state.tasks = JSON.parse(localStorage.getItem('pm_tasks') || '[]');
      state.members = JSON.parse(localStorage.getItem('pm_members') || '[]');
      state.activities = JSON.parse(localStorage.getItem('pm_activities') || '[]');
      state.projects.forEach(p => { if (!p.milestones) p.milestones = []; });
      state.tasks.forEach(t => { if (!t.comments) t.comments = []; if (t.dependsOn === undefined) t.dependsOn = null; });
    } catch (err) { return; }
    generateNotifications();
    initCurrentUser();
    if (state.currentSection === 'dashboard') renderDashboard();
    else if (state.currentSection === 'projects') renderProjects();
    else if (state.currentSection === 'tasks') renderKanban();
    else if (state.currentSection === 'team') renderTeam();
    else if (state.currentSection === 'calendar') renderCalendar();
    else if (state.currentSection === 'reports') renderReports();
    showToast('数据已在其他标签页更新，已自动同步', 'info');
  });
}

document.addEventListener('DOMContentLoaded', init);
