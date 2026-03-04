const state = {
  currentSection: 'dashboard',
  currentDate: new Date(),
  calendarEvents: [
    { id: 1, title: '产品路线评审', date: '2026-03-05', type: '工作', color: '#4f46e5' },
    { id: 2, title: '设计走查', date: '2026-03-08', type: '设计', color: '#0ea5e9' },
    { id: 3, title: 'Sprint Planning', date: '2026-03-12', type: '研发', color: '#22c55e' },
    { id: 4, title: '发布窗口', date: '2026-03-18', type: '里程碑', color: '#f59e0b' },
    { id: 5, title: '团队 Retro', date: '2026-03-25', type: '会议', color: '#ef4444' },
    { id: 6, title: '客户同步会', date: '2026-03-25', type: '会议', color: '#a855f7' },
  ],
};

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('collapsed');
}

function showSection(sectionName) {
  state.currentSection = sectionName;
  document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
  document.getElementById(`section-${sectionName}`)?.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  const target = navItems.find(item => item.getAttribute('onclick')?.includes(`'${sectionName}'`));
  target?.classList.add('active');

  const titles = {
    dashboard: '仪表盘',
    projects: '项目列表',
    tasks: '任务管理',
    team: '团队成员',
    calendar: 'Notion Calendar',
    reports: '报表分析',
  };
  const title = document.getElementById('pageTitle');
  if (title) title.textContent = titles[sectionName] || '项目管理';

  if (sectionName === 'calendar') {
    renderCalendar();
    renderMiniCalendar();
    renderLegend();
  }
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getEventsByDate(dateKey) {
  return state.calendarEvents.filter(event => event.date === dateKey);
}

function renderCalendar() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  const title = document.getElementById('calendarTitle');
  if (title) title.textContent = `${year}年 ${month + 1}月`;

  const firstDay = new Date(year, month, 1);
  const startWeekDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const todayKey = formatDateKey(new Date());

  const calendarDays = document.getElementById('calendarDays');
  if (!calendarDays) return;
  calendarDays.innerHTML = '';

  for (let i = startWeekDay - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.className = 'calendar-day other-month';
    day.textContent = daysInPrevMonth - i;
    calendarDays.appendChild(day);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateKey = formatDateKey(date);
    const events = getEventsByDate(dateKey);

    const day = document.createElement('div');
    day.className = 'calendar-day';
    if (dateKey === todayKey) day.classList.add('today');

    const number = document.createElement('span');
    number.className = 'day-number';
    number.textContent = d;
    day.appendChild(number);

    const eventContainer = document.createElement('div');
    eventContainer.className = 'day-events';
    events.slice(0, 2).forEach(event => {
      const eventEl = document.createElement('div');
      eventEl.className = 'calendar-event-pill';
      eventEl.style.backgroundColor = `${event.color}20`;
      eventEl.style.color = event.color;
      eventEl.textContent = event.title;
      eventContainer.appendChild(eventEl);
    });

    if (events.length > 2) {
      const more = document.createElement('div');
      more.className = 'event-more';
      more.textContent = `+${events.length - 2} 更多`;
      eventContainer.appendChild(more);
    }

    day.appendChild(eventContainer);
    calendarDays.appendChild(day);
  }

  const cells = startWeekDay + daysInMonth;
  const trailing = (7 - (cells % 7)) % 7;
  for (let i = 1; i <= trailing; i++) {
    const day = document.createElement('div');
    day.className = 'calendar-day other-month';
    day.textContent = i;
    calendarDays.appendChild(day);
  }
}

function renderMiniCalendar() {
  const mini = document.getElementById('miniCalendar');
  if (!mini) return;

  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let html = '<div class="mini-calendar-week">日 一 二 三 四 五 六</div><div class="mini-calendar-grid">';

  for (let i = 0; i < firstDay; i++) html += '<span class="mini-day empty"></span>';
  for (let d = 1; d <= days; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasEvent = getEventsByDate(dateKey).length > 0;
    html += `<span class="mini-day ${hasEvent ? 'has-event' : ''}">${d}</span>`;
  }

  html += '</div>';
  mini.innerHTML = html;
}

function renderLegend() {
  const legend = document.getElementById('calendarLegend');
  if (!legend) return;
  const typeColor = [...new Map(state.calendarEvents.map(item => [item.type, item.color])).entries()];
  legend.innerHTML = typeColor.map(([type, color]) => `
    <li>
      <span class="legend-dot" style="background:${color}"></span>
      <span>${type}</span>
    </li>
  `).join('');
}

function changeMonth(offset) {
  state.currentDate.setMonth(state.currentDate.getMonth() + offset);
  renderCalendar();
  renderMiniCalendar();
}

function goToToday() {
  state.currentDate = new Date();
  renderCalendar();
  renderMiniCalendar();
}

function openModal(id) {
  document.getElementById(id)?.classList.add('active');
  document.getElementById('overlay')?.classList.add('active');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
  const hasActiveModal = document.querySelector('.modal.active');
  if (!hasActiveModal) document.getElementById('overlay')?.classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  document.getElementById('overlay')?.classList.remove('active');
}

function notify(message = '功能开发中') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function handleSearch() {}
function filterProjects() {}
function filterTasks() {}
function allowDrop(event) { event.preventDefault(); }
function drop(event) { event.preventDefault(); }
function createProject() { notify('创建项目功能已简化为日历演示'); closeModal('createProjectModal'); }
function createTask() { notify('任务已加入演示队列'); closeModal('createTaskModal'); }
function addMember() { notify('成员添加成功（演示）'); closeModal('addMemberModal'); }
function saveTaskDetail() { notify('任务详情已保存（演示）'); closeModal('taskDetailModal'); }
function deleteCurrentTask() { notify('任务已删除（演示）'); closeModal('taskDetailModal'); }

window.addEventListener('DOMContentLoaded', () => {
  showSection('calendar');
});
