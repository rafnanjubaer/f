// Smart Digital Hostel - Pure HTML/CSS/JS Application
// Main Application Controller

// State Management
const AppState = {
  currentPage: 'home',
  currentPortal: null, // 'tenant' or 'admin'
  sidebarOpen: false,
  theme: localStorage.getItem('theme') || 'light',
  activeTab: {},
  modals: {}
};

// SVG Icons
const Icons = {
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  bed: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,
  creditCard: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
  utensils: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
  messageSquare: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  wallet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  xCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`,
  trendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  trendingDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`,
  arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  arrowDownLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  moreHorizontal: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  thumbsUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>`,
  messageCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`,
  alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
  ticket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>`,
  fan: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12V3c0-1.1.9-2 2-2s2 .9 2 2c0 1-1 2-2 2h-2"/><path d="M12 12h9c1.1 0 2 .9 2 2s-.9 2-2 2c-1 0-2-1-2-2v-2"/><path d="M12 12v9c0 1.1-.9 2-2 2s-2-.9-2-2c0-1 1-2 2-2h2"/><path d="M12 12H3c-1.1 0-2-.9-2-2s.9-2 2-2c1 0 2 1 2 2v2"/><circle cx="12" cy="12" r="2"/></svg>`,
  wrench: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  userPlus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  userCheck: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  router();
  window.addEventListener('hashchange', router);
});

// Theme Management
function initTheme() {
  if (AppState.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', AppState.theme);
}

// Router
function router() {
  const hash = window.location.hash || '#home';
  const [page, subpage] = hash.slice(1).split('/');
  
  AppState.currentPage = page;
  
  if (page === 'tenant') {
    AppState.currentPortal = 'tenant';
    renderTenantPortal(subpage || 'dashboard');
  } else if (page === 'admin') {
    AppState.currentPortal = 'admin';
    renderAdminPortal(subpage || 'dashboard');
  } else {
    AppState.currentPortal = null;
    renderHomePage();
  }
}

function navigate(path) {
  window.location.hash = path;
}

// Sidebar Toggle
function toggleSidebar() {
  AppState.sidebarOpen = !AppState.sidebarOpen;
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (sidebar) {
    sidebar.classList.toggle('closed', !AppState.sidebarOpen);
  }
  if (overlay) {
    overlay.classList.toggle('active', AppState.sidebarOpen);
  }
}

function closeSidebar() {
  AppState.sidebarOpen = false;
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (sidebar) sidebar.classList.add('closed');
  if (overlay) overlay.classList.remove('active');
}

// Tab Management
function setActiveTab(tabGroup, tabId) {
  AppState.activeTab[tabGroup] = tabId;
  
  // Update tab triggers
  document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab-trigger`).forEach(trigger => {
    trigger.classList.toggle('active', trigger.dataset.tab === tabId);
  });
  
  // Update tab contents
  document.querySelectorAll(`[data-tab-group="${tabGroup}"] .tab-content`).forEach(content => {
    content.classList.toggle('active', content.dataset.tab === tabId);
  });
}

// Modal Management
function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.add('active');
    AppState.modals[modalId] = true;
  }
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.remove('active');
    AppState.modals[modalId] = false;
  }
}

// Dropdown Management
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    const isActive = dropdown.classList.contains('active');
    // Close all dropdowns
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    // Toggle this one
    if (!isActive) {
      dropdown.classList.add('active');
    }
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
  }
});

// ========================================
// HOME PAGE
// ========================================
function renderHomePage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="home-gradient min-h-screen">
      <!-- Header -->
      <header class="container flex items-center justify-between py-6">
        <div class="flex items-center gap-2">
          <span class="icon-lg text-primary">${Icons.building}</span>
          <span class="text-xl font-bold">Smart Digital Hostel</span>
        </div>
        <button class="btn btn-ghost btn-icon" onclick="toggleTheme()">
          <span class="icon">${AppState.theme === 'dark' ? Icons.sun : Icons.moon}</span>
        </button>
      </header>

      <!-- Hero Section -->
      <main class="container py-12 md:py-24">
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="text-4xl font-bold tracking-tight md:text-5xl" style="text-wrap: balance;">
            Welcome to Smart Digital Hostel Ecosystem
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg text-muted" style="text-wrap: pretty;">
            A comprehensive hostel management system designed to simplify room allocation, 
            payments, meal management, and community interaction for both tenants and administrators.
          </p>
        </div>

        <!-- Portal Selection Cards -->
        <div class="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          <!-- Tenant Portal Card -->
          <div class="card portal-card cursor-pointer" onclick="navigate('tenant')">
            <div class="card-header">
              <div class="mb-2 stat-icon bg-primary-10">
                <span class="icon-lg text-primary">${Icons.user}</span>
              </div>
              <h3 class="card-title text-2xl">Tenant Portal</h3>
              <p class="card-description text-base">
                Access your room details, pay rent, check meal menus, and connect with the community.
              </p>
            </div>
            <div class="card-content">
              <ul class="space-y-2 text-sm text-muted mb-6">
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  View room and rent information
                </li>
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  Make payments via bKash, Nagad, Rocket
                </li>
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  Check daily meal menus and buy tokens
                </li>
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  Submit complaints and join discussions
                </li>
              </ul>
              <button class="btn btn-primary w-full">
                Enter Tenant Portal
                <span class="icon-sm">${Icons.arrowRight}</span>
              </button>
            </div>
          </div>

          <!-- Admin Portal Card -->
          <div class="card portal-card cursor-pointer" onclick="navigate('admin')">
            <div class="card-header">
              <div class="mb-2 stat-icon bg-primary-10">
                <span class="icon-lg text-primary">${Icons.shield}</span>
              </div>
              <h3 class="card-title text-2xl">Admin Portal</h3>
              <p class="card-description text-base">
                Manage users, rooms, finances, meals, and handle tenant complaints efficiently.
              </p>
            </div>
            <div class="card-content">
              <ul class="space-y-2 text-sm text-muted mb-6">
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  User verification and role management
                </li>
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  Room allocation and availability tracking
                </li>
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  Financial reports and transaction history
                </li>
                <li class="flex items-center gap-2">
                  <span class="feature-dot"></span>
                  Meal setup and complaint management
                </li>
              </ul>
              <button class="btn btn-secondary w-full">
                Enter Admin Portal
                <span class="icon-sm">${Icons.arrowRight}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Features Overview -->
        <div class="mx-auto mt-24 max-w-4xl">
          <h2 class="text-center text-2xl font-semibold">System Features</h2>
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            ${[
              { title: "Room Management", desc: "Floors, room types, and smart allocation" },
              { title: "Payment Gateway", desc: "bKash, Nagad, Rocket, Online & Offline" },
              { title: "Meal System", desc: "Daily menus and token management" },
              { title: "Complaint Handling", desc: "Submit, track, and resolve issues" },
              { title: "Community Board", desc: "Discussions and announcements" },
              { title: "Financial Reports", desc: "Track credits, debits, and history" }
            ].map(feature => `
              <div class="card p-4">
                <h4 class="font-medium">${feature.title}</h4>
                <p class="mt-1 text-sm text-muted">${feature.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="mt-24 border-t py-8">
        <div class="container text-center text-sm text-muted">
          <p>&copy; 2024 Smart Digital Hostel Ecosystem. All rights reserved.</p>
          <p class="mt-1">Frontend Demo - Backend Integration Ready</p>
        </div>
      </footer>
    </div>
  `;
}

// ========================================
// TENANT PORTAL
// ========================================
function renderTenantPortal(page) {
  const app = document.getElementById('app');
  
  const navItems = [
    { id: 'dashboard', title: 'Dashboard', icon: Icons.home },
    { id: 'room', title: 'Room & Rent', icon: Icons.bed },
    { id: 'payments', title: 'Payments', icon: Icons.creditCard },
    { id: 'meals', title: 'Meals', icon: Icons.utensils },
    { id: 'community', title: 'Community', icon: Icons.messageSquare }
  ];
  
  app.innerHTML = `
    <div class="app-layout">
      <!-- Sidebar Overlay -->
      <div class="sidebar-overlay" onclick="closeSidebar()"></div>
      
      <!-- Sidebar -->
      <aside class="sidebar closed">
        <div class="sidebar-header">
          <a href="#tenant" class="sidebar-logo">
            <span class="icon text-primary">${Icons.building}</span>
            <span>Smart Hostel</span>
          </a>
        </div>
        <nav class="sidebar-nav scroll-area">
          ${navItems.map(item => `
            <button class="nav-item ${page === item.id ? 'active' : ''}" onclick="navigate('tenant/${item.id}'); closeSidebar();">
              <span class="icon">${item.icon}</span>
              ${item.title}
            </button>
          `).join('')}
        </nav>
      </aside>
      
      <!-- Main Content -->
      <div class="main-content">
        ${renderAppHeader(currentUser)}
        <div class="page-content">
          ${renderTenantPage(page)}
        </div>
      </div>
    </div>
  `;
}

function renderTenantPage(page) {
  switch (page) {
    case 'room': return renderTenantRoom();
    case 'payments': return renderTenantPayments();
    case 'meals': return renderTenantMeals();
    case 'community': return renderTenantCommunity();
    default: return renderTenantDashboard();
  }
}

function renderTenantDashboard() {
  const room = getUserRoom(currentUser.id);
  const rentDue = getRentDue(currentUser.id);
  const todayMenus = getTodayMenu();
  const userComplaints = mockComplaints.filter(c => c.userId === currentUser.id);
  const pendingComplaints = userComplaints.filter(c => 
    c.status === ComplaintStatus.PENDING || c.status === ComplaintStatus.IN_PROGRESS
  ).length;
  const currentMealType = getCurrentMeal();
  
  return `
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div>
        <h1 class="text-2xl font-bold md:text-3xl">
          Welcome back, ${currentUser.name.split(' ')[0]}!
        </h1>
        <p class="text-muted">Here&apos;s an overview of your hostel account</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Room Info Card -->
        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Your Room</h4>
            <span class="icon text-muted">${Icons.bed}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">Room ${room?.roomNumber || 'N/A'}</div>
            <p class="text-xs text-muted">${room?.floorName || ''} ${room?.roomType ? '• ' + room.roomType : ''}</p>
          </div>
        </div>

        <!-- Rent Due Card -->
        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Rent Due</h4>
            <span class="icon text-muted">${Icons.wallet}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">
              ${rentDue ? formatCurrency(rentDue.amount) : 'Paid'}
            </div>
            <p class="text-xs text-muted">
              ${rentDue ? `${rentDue.month} ${rentDue.year}` : 'All dues cleared'}
            </p>
          </div>
        </div>

        <!-- Meal Tokens Card -->
        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Meal Tokens</h4>
            <span class="icon text-muted">${Icons.utensils}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">5 Active</div>
            <p class="text-xs text-muted">3 used this week</p>
          </div>
        </div>

        <!-- Complaints Card -->
        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Open Issues</h4>
            <span class="icon text-muted">${Icons.alertCircle}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">${pendingComplaints}</div>
            <p class="text-xs text-muted">
              ${pendingComplaints > 0 ? 'Pending resolution' : 'No open issues'}
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Today's Menu -->
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">
                  <span class="icon">${Icons.calendar}</span>
                  Today&apos;s Menu
                </h3>
                <p class="card-description">
                  ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('tenant/meals')">View All</button>
            </div>
          </div>
          <div class="card-content space-y-4">
            ${todayMenus.length > 0 ? todayMenus.map(menu => {
              const timing = mockMealTimings.find(t => t.mealType === menu.mealType);
              const isCurrentMeal = menu.mealType === currentMealType;
              return `
                <div class="meal-card ${isCurrentMeal ? 'current' : ''}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="font-semibold capitalize">${menu.mealType.toLowerCase()}</span>
                      ${isCurrentMeal ? '<span class="badge badge-default text-xs">Now Serving</span>' : ''}
                    </div>
                    ${timing ? `
                      <span class="flex items-center gap-1 text-sm text-muted">
                        <span class="icon-sm">${Icons.clock}</span>
                        ${formatTime(timing.startTime)} - ${formatTime(timing.endTime)}
                      </span>
                    ` : ''}
                  </div>
                  <div class="mt-2 flex flex-wrap gap-2">
                    ${menu.items.map(item => `<span class="badge badge-secondary">${item.name}</span>`).join('')}
                  </div>
                </div>
              `;
            }).join('') : `
              <p class="text-center text-muted py-4">No menu available for today</p>
            `}
          </div>
        </div>

        <!-- Room & Rent Summary -->
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">Room & Rent Details</h3>
                <p class="card-description">Your current accommodation info</p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('tenant/room')">Details</button>
            </div>
          </div>
          <div class="card-content space-y-6">
            ${room ? `
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-muted">Room Number</span>
                  <span class="font-medium">${room.roomNumber}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted">Floor</span>
                  <span class="font-medium">${room.floorName}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted">Room Type</span>
                  <span class="badge badge-outline">${room.roomType}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-muted">Monthly Rent</span>
                  <span class="font-bold text-lg">${formatCurrency(room.rentAmount)}</span>
                </div>
              </div>
              <div class="space-y-2">
                <span class="text-sm text-muted">Amenities</span>
                <div class="flex flex-wrap gap-2">
                  ${room.amenities.map(a => `<span class="badge badge-secondary">${a}</span>`).join('')}
                </div>
              </div>
              ${rentDue ? `
                <div class="alert danger">
                  <div class="flex items-center justify-between w-full">
                    <div>
                      <p class="font-medium text-red">Payment Due</p>
                      <p class="text-sm text-muted">${rentDue.month} ${rentDue.year}</p>
                    </div>
                    <button class="btn btn-primary" onclick="navigate('tenant/payments')">Pay Now</button>
                  </div>
                </div>
              ` : ''}
            ` : `
              <p class="text-center text-muted py-4">No room assigned yet</p>
            `}
          </div>
        </div>

        <!-- Recent Complaints -->
        <div class="card lg:col-span-2">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">Recent Complaints</h3>
                <p class="card-description">Track the status of your submitted issues</p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('tenant/community')">View All</button>
            </div>
          </div>
          <div class="card-content">
            ${userComplaints.length > 0 ? `
              <div class="space-y-4">
                ${userComplaints.slice(0, 3).map(complaint => `
                  <div class="flex items-center justify-between rounded-lg border p-4">
                    <div class="space-y-1">
                      <p class="font-medium">${complaint.title}</p>
                      <p class="text-sm text-muted line-clamp-1">${complaint.description}</p>
                    </div>
                    <div class="flex items-center gap-3">
                      ${renderComplaintBadge(complaint.status)}
                      <span class="icon-sm text-muted">${Icons.chevronRight}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p class="text-center text-muted py-8">No complaints submitted yet</p>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTenantRoom() {
  const room = getUserRoom(currentUser.id);
  const userRentHistory = mockRentHistory.filter(r => r.userId === currentUser.id);
  
  if (!room) {
    return `
      <div class="empty-state min-h-[60vh]">
        <span class="icon" style="width: 4rem; height: 4rem;">${Icons.building}</span>
        <h2 class="text-xl font-semibold mt-4">No Room Assigned</h2>
        <p class="text-muted">You haven&apos;t been assigned a room yet. Please contact the admin.</p>
      </div>
    `;
  }

  const occupancyPercentage = (room.occupancy / room.capacity) * 100;
  
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">My Room</h1>
        <p class="text-muted">View your room details and rent history</p>
      </div>

      <div class="tabs" data-tab-group="room-tabs">
        <div class="tabs-list">
          <button class="tab-trigger active" data-tab="details" onclick="setActiveTab('room-tabs', 'details')">Room Details</button>
          <button class="tab-trigger" data-tab="rent" onclick="setActiveTab('room-tabs', 'rent')">Rent History</button>
        </div>

        <div class="tab-content active" data-tab="details">
          <div class="space-y-6 mt-6">
            <!-- Room Overview -->
            <div class="grid gap-6 md:grid-cols-2">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">
                    <span class="icon">${Icons.building}</span>
                    Room ${room.roomNumber}
                  </h3>
                  <p class="card-description">${room.floorName} - ${room.roomType} Room</p>
                </div>
                <div class="card-content">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                      <p class="text-sm text-muted">Room Type</p>
                      <p class="font-medium capitalize">${room.roomType.toLowerCase()}</p>
                    </div>
                    <div class="space-y-1">
                      <p class="text-sm text-muted">Monthly Rent</p>
                      <p class="font-medium">${formatCurrency(room.rentAmount)}</p>
                    </div>
                    <div class="space-y-1">
                      <p class="text-sm text-muted">Status</p>
                      <span class="badge badge-success">Active</span>
                    </div>
                    <div class="space-y-1">
                      <p class="text-sm text-muted">Floor</p>
                      <p class="font-medium">${room.floorName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">
                    <span class="icon">${Icons.users}</span>
                    Occupancy
                  </h3>
                  <p class="card-description">Current room occupancy status</p>
                </div>
                <div class="card-content space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="icon-sm text-muted">${Icons.bed}</span>
                      <span class="text-sm">${room.occupancy} of ${room.capacity} beds occupied</span>
                    </div>
                    <span class="text-sm font-medium">${Math.round(occupancyPercentage)}%</span>
                  </div>
                  <div class="progress" style="height: 0.5rem;">
                    <div class="progress-bar" style="width: ${occupancyPercentage}%;"></div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    ${Array.from({ length: room.capacity }).map((_, i) => `
                      <div class="bed-indicator ${i < room.occupancy ? 'occupied' : 'empty'}">
                        <span class="icon-sm">${Icons.bed}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Amenities -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Room Amenities</h3>
                <p class="card-description">Facilities available in your room</p>
              </div>
              <div class="card-content">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  ${room.amenities.map(amenity => `
                    <div class="flex items-center gap-3 p-4 rounded-lg bg-emerald-10 border" style="border-color: rgba(16, 185, 129, 0.2);">
                      <span class="icon text-emerald">${Icons.checkCircle}</span>
                      <div>
                        <p class="font-medium text-sm">${amenity}</p>
                        <p class="text-xs text-muted">Available</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" data-tab="rent">
          <div class="space-y-6 mt-6">
            <!-- Rent Summary -->
            <div class="grid gap-4 md:grid-cols-3">
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-emerald-10">
                      <span class="icon text-emerald">${Icons.checkCircle}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">Total Paid</p>
                      <p class="text-xl font-bold">
                        ${formatCurrency(userRentHistory.filter(r => r.isPaid).reduce((sum, r) => sum + r.amount, 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-amber-10">
                      <span class="icon text-amber">${Icons.clock}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">Pending</p>
                      <p class="text-xl font-bold">
                        ${formatCurrency(userRentHistory.filter(r => !r.isPaid).reduce((sum, r) => sum + r.amount, 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-blue-10">
                      <span class="icon text-blue">${Icons.calendar}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">Months</p>
                      <p class="text-xl font-bold">${userRentHistory.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Rent History Table -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <span class="icon">${Icons.calendar}</span>
                  Payment History
                </h3>
                <p class="card-description">Your rent payment records</p>
              </div>
              <div class="card-content">
                <div class="table-container">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Paid Date</th>
                        <th>Method</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${userRentHistory.map(rent => `
                        <tr>
                          <td class="font-medium">${rent.month} ${rent.year}</td>
                          <td>${formatCurrency(rent.amount)}</td>
                          <td>${rent.paidAt ? formatDate(rent.paidAt) : '-'}</td>
                          <td class="capitalize">${rent.paymentMethod ? rent.paymentMethod.toLowerCase() : '-'}</td>
                          <td>
                            ${rent.isPaid 
                              ? '<span class="badge badge-success">Paid</span>' 
                              : '<span class="badge badge-warning">Pending</span>'}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTenantPayments() {
  const userTransactions = mockTransactions.filter(t => t.userId === currentUser.id);
  const totalCredits = userTransactions.filter(t => t.type === TransactionType.CREDIT).reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = userTransactions.filter(t => t.type === TransactionType.DEBIT).reduce((sum, t) => sum + t.amount, 0);
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Payments</h1>
          <p class="text-muted">Manage your wallet and transactions</p>
        </div>
        <button class="btn btn-primary gap-2" onclick="openModal('payment-modal')">
          <span class="icon-sm">${Icons.plus}</span>
          Make Payment
        </button>
      </div>

      <!-- Wallet Overview -->
      <div class="grid gap-4 md:grid-cols-3">
        <div class="card gradient-card">
          <div class="card-header pb-2">
            <h4 class="card-title text-lg">
              <span class="icon">${Icons.wallet}</span>
              Balance
            </h4>
          </div>
          <div class="card-content">
            <p class="text-3xl font-bold">${formatCurrency(0)}</p>
            <p class="text-sm text-muted mt-1">Available for payments</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header pb-2">
            <h4 class="card-title text-lg text-emerald">
              <span class="icon">${Icons.arrowDownLeft}</span>
              Total Paid
            </h4>
          </div>
          <div class="card-content">
            <p class="text-2xl font-bold">${formatCurrency(totalCredits)}</p>
            <p class="text-sm text-muted mt-1">All time payments</p>
          </div>
        </div>
        <div class="card">
          <div class="card-header pb-2">
            <h4 class="card-title text-lg text-amber">
              <span class="icon">${Icons.clock}</span>
              Pending
            </h4>
          </div>
          <div class="card-content">
            <p class="text-2xl font-bold">${formatCurrency(8000)}</p>
            <p class="text-sm text-muted mt-1">April 2024 rent</p>
          </div>
        </div>
      </div>

      <!-- Transactions -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span class="icon">${Icons.trendingUp}</span>
            Recent Transactions
          </h3>
          <p class="card-description">Your payment history</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${userTransactions.map(txn => `
                  <tr>
                    <td>${formatDate(txn.createdAt)}</td>
                    <td class="font-medium">${txn.description}</td>
                    <td class="capitalize">${txn.paymentMethod.toLowerCase()}</td>
                    <td class="text-sm text-muted">${txn.reference || '-'}</td>
                    <td class="text-right font-medium ${txn.type === TransactionType.CREDIT ? 'text-emerald' : 'text-red'}">
                      ${txn.type === TransactionType.CREDIT ? '+' : '-'}${formatCurrency(txn.amount)}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Payment Modal -->
      <div id="payment-modal" class="modal-overlay" onclick="if(event.target === this) closeModal('payment-modal')">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Make Payment</h3>
            <p class="modal-description">Choose a payment method and amount</p>
          </div>
          <div class="modal-body space-y-4">
            <div class="form-group">
              <label class="label">Amount</label>
              <input type="number" class="input" placeholder="Enter amount" value="8000">
            </div>
            <div class="form-group">
              <label class="label">Payment Method</label>
              <div class="radio-group mt-2">
                <label class="radio-item">
                  <input type="radio" name="payment-method" value="bkash" checked>
                  <span>bKash</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="payment-method" value="nagad">
                  <span>Nagad</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="payment-method" value="rocket">
                  <span>Rocket</span>
                </label>
                <label class="radio-item">
                  <input type="radio" name="payment-method" value="online">
                  <span>Online Banking</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="label">Transaction Reference</label>
              <input type="text" class="input" placeholder="Enter reference number">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal('payment-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="closeModal('payment-modal')">
              <span class="icon-sm">${Icons.send}</span>
              Submit Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTenantMeals() {
  const todayMenus = getTodayMenu();
  const currentMealType = getCurrentMeal();
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const today = days[new Date().getDay()];
  const userTokens = mockMealTokens.filter(t => t.userId === currentUser.id);
  
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Meals</h1>
        <p class="text-muted">View menu, manage preferences, and track meal tokens</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid gap-4 md:grid-cols-4">
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-primary-10">
                <span class="icon text-primary">${Icons.ticket}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total Tokens</p>
                <p class="text-xl font-bold">${userTokens.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-emerald-10">
                <span class="icon text-emerald">${Icons.checkCircle}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Used</p>
                <p class="text-xl font-bold">${userTokens.filter(t => t.isUsed).length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-amber-10">
                <span class="icon text-amber">${Icons.clock}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Remaining</p>
                <p class="text-xl font-bold">${userTokens.filter(t => !t.isUsed).length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-blue-10">
                <span class="icon text-blue">${Icons.calendar}</span>
              </div>
              <div>
                <p class="text-sm text-muted">This Month</p>
                <p class="text-xl font-bold">April 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs" data-tab-group="meals-tabs">
        <div class="tabs-list">
          <button class="tab-trigger active" data-tab="today" onclick="setActiveTab('meals-tabs', 'today')">Today&apos;s Menu</button>
          <button class="tab-trigger" data-tab="weekly" onclick="setActiveTab('meals-tabs', 'weekly')">Weekly Menu</button>
          <button class="tab-trigger" data-tab="tokens" onclick="setActiveTab('meals-tabs', 'tokens')">My Tokens</button>
        </div>

        <div class="tab-content active" data-tab="today">
          <div class="space-y-6 mt-6">
            <div class="flex items-center gap-2 text-muted">
              <span class="icon-sm">${Icons.calendar}</span>
              <span>${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            ${todayMenus.length > 0 ? `
              <div class="grid gap-4 md:grid-cols-3">
                ${[MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER].map(mealType => {
                  const menu = todayMenus.find(m => m.mealType === mealType);
                  const timing = mockMealTimings.find(t => t.mealType === mealType);
                  const isCurrent = mealType === currentMealType;
                  
                  return `
                    <div class="card ${isCurrent ? 'border-primary' : ''}">
                      <div class="card-header pb-3">
                        <div class="flex items-center justify-between">
                          <h4 class="card-title text-lg capitalize">
                            <span class="icon">${mealType === MealType.BREAKFAST ? Icons.coffee : Icons.utensils}</span>
                            ${mealType.toLowerCase()}
                          </h4>
                          ${isCurrent ? '<span class="badge badge-default text-xs">Now</span>' : ''}
                        </div>
                        <p class="card-description text-xs">
                          ${timing ? `${formatTime(timing.startTime)} - ${formatTime(timing.endTime)}` : ''}
                        </p>
                      </div>
                      <div class="card-content">
                        ${menu ? `
                          <div class="space-y-2">
                            ${menu.items.map(item => `
                              <div class="flex items-start gap-2">
                                <span class="icon-sm text-muted mt-0.5">${Icons.utensils}</span>
                                <div>
                                  <p class="text-sm font-medium">${item.name}</p>
                                  <p class="text-xs text-muted">${item.description}</p>
                                </div>
                              </div>
                            `).join('')}
                          </div>
                        ` : '<p class="text-sm text-muted">No menu available</p>'}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <div class="card">
                <div class="card-content empty-state">
                  <span class="icon" style="width: 3rem; height: 3rem;">${Icons.utensils}</span>
                  <h3 class="font-semibold mt-4">No Menu Available</h3>
                  <p class="text-sm text-muted">Today&apos;s menu hasn&apos;t been posted yet</p>
                </div>
              </div>
            `}
          </div>
        </div>

        <div class="tab-content" data-tab="weekly">
          <div class="space-y-6 mt-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Weekly Menu</h3>
                <p class="card-description">Meal schedule for the week</p>
              </div>
              <div class="card-content">
                <div class="table-container">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${days.map(day => {
                        const dayMenus = mockDailyMenus.filter(m => m.dayOfWeek === day);
                        const isToday = day === today;
                        return `
                          <tr class="${isToday ? 'bg-primary-10' : ''}">
                            <td class="font-medium capitalize">
                              <div class="flex items-center gap-2">
                                ${day.toLowerCase()}
                                ${isToday ? '<span class="badge badge-secondary text-xs">Today</span>' : ''}
                              </div>
                            </td>
                            <td class="text-sm">
                              ${dayMenus.find(m => m.mealType === MealType.BREAKFAST)?.items[0]?.name || '-'}
                            </td>
                            <td class="text-sm">
                              ${dayMenus.find(m => m.mealType === MealType.LUNCH)?.items[0]?.name || '-'}
                            </td>
                            <td class="text-sm">
                              ${dayMenus.find(m => m.mealType === MealType.DINNER)?.items[0]?.name || '-'}
                            </td>
                          </tr>
                        `;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-content" data-tab="tokens">
          <div class="space-y-6 mt-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">
                  <span class="icon">${Icons.ticket}</span>
                  Meal Token History
                </h3>
                <p class="card-description">Track your meal token usage</p>
              </div>
              <div class="card-content">
                <div class="table-container">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Meal Type</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${userTokens.map(token => `
                        <tr>
                          <td>${formatDate(token.date)}</td>
                          <td class="capitalize">${token.mealType.toLowerCase()}</td>
                          <td>${formatCurrency(token.price)}</td>
                          <td>
                            ${token.isUsed 
                              ? '<span class="badge badge-success"><span class="icon-sm mr-1">' + Icons.checkCircle + '</span>Used</span>'
                              : '<span class="badge badge-outline"><span class="icon-sm mr-1">' + Icons.clock + '</span>Available</span>'}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTenantCommunity() {
  const userComplaints = mockComplaints.filter(c => c.userId === currentUser.id);
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Community</h1>
          <p class="text-muted">Connect with fellow residents and raise concerns</p>
        </div>
      </div>

      <div class="tabs" data-tab-group="community-tabs">
        <div class="tabs-list">
          <button class="tab-trigger active gap-2" data-tab="discussions" onclick="setActiveTab('community-tabs', 'discussions')">
            <span class="icon-sm">${Icons.messageSquare}</span>
            Discussions
          </button>
          <button class="tab-trigger gap-2" data-tab="complaints" onclick="setActiveTab('community-tabs', 'complaints')">
            <span class="icon-sm">${Icons.alertTriangle}</span>
            My Complaints
          </button>
        </div>

        <div class="tab-content active" data-tab="discussions">
          <div class="space-y-6 mt-6">
            <!-- New Post -->
            <div class="card">
              <div class="card-header pb-3">
                <h4 class="text-base font-medium">Share with the community</h4>
              </div>
              <div class="card-content space-y-3">
                <textarea class="textarea" placeholder="What's on your mind? Share updates, ask questions, or start a discussion..." rows="3"></textarea>
                <div class="flex justify-end">
                  <button class="btn btn-primary gap-2">
                    <span class="icon-sm">${Icons.send}</span>
                    Post
                  </button>
                </div>
              </div>
            </div>

            <!-- Discussion Posts -->
            <div class="space-y-4">
              ${mockDiscussionPosts.map(post => `
                <div class="card discussion-post">
                  <div class="card-header pb-3">
                    <div class="flex items-start gap-3">
                      <div class="avatar">
                        ${getInitials(post.userName)}
                      </div>
                      <div class="flex-1">
                        <p class="font-semibold">${post.userName}</p>
                        <p class="text-xs text-muted">${formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-content">
                    <p class="text-sm">${post.content}</p>
                  </div>
                  <div class="card-footer border-t pt-3 mt-3">
                    <div class="flex items-center gap-4">
                      <button class="btn btn-ghost btn-sm gap-2 text-muted">
                        <span class="icon-sm">${Icons.thumbsUp}</span>
                        ${post.likes}
                      </button>
                      <button class="btn btn-ghost btn-sm gap-2 text-muted">
                        <span class="icon-sm">${Icons.messageCircle}</span>
                        ${post.replies.length} Comments
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="tab-content" data-tab="complaints">
          <div class="space-y-6 mt-6">
            <div class="flex justify-end">
              <button class="btn btn-primary gap-2" onclick="openModal('complaint-modal')">
                <span class="icon-sm">${Icons.plus}</span>
                New Complaint
              </button>
            </div>

            <!-- Complaints Summary -->
            <div class="grid gap-4 md:grid-cols-4">
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-muted">
                      <span class="icon">${Icons.alertTriangle}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">Total</p>
                      <p class="text-xl font-bold">${userComplaints.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-amber-10">
                      <span class="icon text-amber">${Icons.clock}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">Pending</p>
                      <p class="text-xl font-bold">${userComplaints.filter(c => c.status === ComplaintStatus.PENDING).length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-blue-10">
                      <span class="icon text-blue">${Icons.messageCircle}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">In Progress</p>
                      <p class="text-xl font-bold">${userComplaints.filter(c => c.status === ComplaintStatus.IN_PROGRESS).length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content pt-6">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon bg-emerald-10">
                      <span class="icon text-emerald">${Icons.checkCircle}</span>
                    </div>
                    <div>
                      <p class="text-sm text-muted">Resolved</p>
                      <p class="text-xl font-bold">${userComplaints.filter(c => c.status === ComplaintStatus.RESOLVED).length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Complaints List -->
            <div class="space-y-4">
              ${userComplaints.length === 0 ? `
                <div class="card">
                  <div class="card-content empty-state">
                    <span class="icon" style="width: 3rem; height: 3rem;">${Icons.checkCircle}</span>
                    <h3 class="font-semibold mt-4">No Complaints</h3>
                    <p class="text-sm text-muted">You haven&apos;t submitted any complaints yet</p>
                  </div>
                </div>
              ` : userComplaints.map(complaint => `
                <div class="card">
                  <div class="card-header pb-3">
                    <div class="flex items-start justify-between">
                      <div>
                        <h4 class="font-medium">${complaint.title}</h4>
                        <p class="card-description mt-1">
                          ${complaint.category} - Submitted ${formatDate(complaint.createdAt)}
                        </p>
                      </div>
                      ${renderComplaintBadge(complaint.status)}
                    </div>
                  </div>
                  <div class="card-content">
                    <p class="text-sm text-muted">${complaint.description}</p>
                    ${complaint.adminResponse ? `
                      <div class="mt-4 p-3 rounded-lg bg-muted">
                        <p class="text-xs font-medium text-muted mb-1">Admin Response:</p>
                        <p class="text-sm">${complaint.adminResponse}</p>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Complaint Modal -->
      <div id="complaint-modal" class="modal-overlay" onclick="if(event.target === this) closeModal('complaint-modal')">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Submit a Complaint</h3>
            <p class="modal-description">Describe your issue and we&apos;ll look into it promptly</p>
          </div>
          <div class="modal-body space-y-4">
            <div class="form-group">
              <label class="label">Category</label>
              <div class="select w-full">
                <select>
                  <option value="">Select category</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleanliness">Cleanliness</option>
                  <option value="noise">Noise</option>
                  <option value="security">Security</option>
                  <option value="food">Food Quality</option>
                  <option value="facilities">Facilities</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="label">Title</label>
              <input type="text" class="input" placeholder="Brief summary of the issue">
            </div>
            <div class="form-group">
              <label class="label">Description</label>
              <textarea class="textarea" placeholder="Provide details about your complaint..." rows="4"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal('complaint-modal')">Cancel</button>
            <button class="btn btn-primary gap-2" onclick="closeModal('complaint-modal')">
              <span class="icon-sm">${Icons.send}</span>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// ADMIN PORTAL
// ========================================
function renderAdminPortal(page) {
  const app = document.getElementById('app');
  const adminUser = mockUsers.find(u => u.role === UserRole.ADMIN);
  const pendingComplaintsCount = mockComplaints.filter(c => c.status === ComplaintStatus.PENDING).length;
  
  const navItems = [
    { id: 'dashboard', title: 'Dashboard', icon: Icons.home },
    { id: 'users', title: 'Users & Roles', icon: Icons.users },
    { id: 'rooms', title: 'Rooms', icon: Icons.bed },
    { id: 'financials', title: 'Financials', icon: Icons.wallet },
    { id: 'meals', title: 'Meal Setup', icon: Icons.utensils },
    { id: 'complaints', title: 'Complaints', icon: Icons.alertCircle, badge: pendingComplaintsCount }
  ];
  
  app.innerHTML = `
    <div class="app-layout">
      <!-- Sidebar Overlay -->
      <div class="sidebar-overlay" onclick="closeSidebar()"></div>
      
      <!-- Sidebar -->
      <aside class="sidebar closed">
        <div class="sidebar-header">
          <a href="#admin" class="sidebar-logo">
            <span class="icon text-primary">${Icons.building}</span>
            <span>Admin Portal</span>
          </a>
        </div>
        <nav class="sidebar-nav scroll-area">
          ${navItems.map(item => `
            <button class="nav-item ${page === item.id ? 'active' : ''}" onclick="navigate('admin/${item.id}'); closeSidebar();">
              <span class="icon">${item.icon}</span>
              ${item.title}
              ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </button>
          `).join('')}
        </nav>
      </aside>
      
      <!-- Main Content -->
      <div class="main-content">
        ${renderAppHeader(adminUser)}
        <div class="page-content">
          ${renderAdminPage(page)}
        </div>
      </div>
    </div>
  `;
}

function renderAdminPage(page) {
  switch (page) {
    case 'users': return renderAdminUsers();
    case 'rooms': return renderAdminRooms();
    case 'financials': return renderAdminFinancials();
    case 'meals': return renderAdminMeals();
    case 'complaints': return renderAdminComplaints();
    default: return renderAdminDashboard();
  }
}

function renderAdminDashboard() {
  const occupancyRate = Math.round((adminDashboardStats.occupiedRooms / adminDashboardStats.totalRooms) * 100);
  const recentTransactions = mockTransactions.slice(0, 5);
  const pendingComplaints = mockComplaints.filter(c => c.status === ComplaintStatus.PENDING);
  const unverifiedUsers = mockUsers.filter(u => u.role === UserRole.TENANT && !u.isVerified);
  
  return `
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p class="text-muted">Overview of hostel operations and management</p>
      </div>

      <!-- Key Metrics -->
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Total Tenants</h4>
            <span class="icon text-muted">${Icons.users}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">${adminDashboardStats.totalUsers}</div>
            <div class="flex items-center gap-1 text-xs text-muted">
              <span class="text-emerald flex items-center">
                <span class="icon-sm">${Icons.arrowUpRight}</span>
                ${adminDashboardStats.verifiedUsers} verified
              </span>
              <span>-</span>
              <span class="text-amber">
                ${adminDashboardStats.totalUsers - adminDashboardStats.verifiedUsers} pending
              </span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Room Occupancy</h4>
            <span class="icon text-muted">${Icons.bed}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">${adminDashboardStats.occupiedRooms}/${adminDashboardStats.totalRooms}</div>
            <div class="progress mt-2" style="height: 0.5rem;">
              <div class="progress-bar" style="width: ${occupancyRate}%;"></div>
            </div>
            <p class="mt-1 text-xs text-muted">${occupancyRate}% occupied</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Total Revenue</h4>
            <span class="icon text-emerald">${Icons.trendingUp}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">${formatCurrency(adminDashboardStats.totalRevenue)}</div>
            <p class="text-xs text-emerald flex items-center gap-1">
              <span class="icon-sm">${Icons.arrowUpRight}</span>
              +12.5% from last month
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-header flex items-center justify-between pb-2">
            <h4 class="text-sm font-medium">Pending Issues</h4>
            <span class="icon text-amber">${Icons.alertCircle}</span>
          </div>
          <div class="card-content">
            <div class="text-2xl font-bold">${adminDashboardStats.pendingComplaints}</div>
            <p class="text-xs text-muted">Requires immediate attention</p>
          </div>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Recent Transactions -->
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">Recent Transactions</h3>
                <p class="card-description">Latest financial activities</p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('admin/financials')">View All</button>
            </div>
          </div>
          <div class="card-content">
            <div class="space-y-4">
              ${recentTransactions.map(txn => `
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="stat-icon ${txn.type === TransactionType.CREDIT ? 'bg-emerald-10' : 'bg-rose-10'}">
                      <span class="icon ${txn.type === TransactionType.CREDIT ? 'text-emerald' : 'text-red'}">
                        ${txn.type === TransactionType.CREDIT ? Icons.trendingUp : Icons.trendingDown}
                      </span>
                    </div>
                    <div>
                      <p class="font-medium">${txn.userName}</p>
                      <p class="text-xs text-muted line-clamp-1">${txn.description}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold ${txn.type === TransactionType.CREDIT ? 'text-emerald' : 'text-red'}">
                      ${txn.type === TransactionType.CREDIT ? '+' : '-'}${formatCurrency(txn.amount)}
                    </p>
                    <p class="text-xs text-muted">${formatDate(txn.createdAt)}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Pending Complaints -->
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">Pending Complaints</h3>
                <p class="card-description">Issues awaiting resolution</p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('admin/complaints')">Manage All</button>
            </div>
          </div>
          <div class="card-content">
            ${pendingComplaints.length > 0 ? `
              <div class="space-y-4">
                ${pendingComplaints.map(complaint => `
                  <div class="flex items-start justify-between rounded-lg border p-3">
                    <div class="space-y-1">
                      <p class="font-medium">${complaint.title}</p>
                      <p class="text-sm text-muted">By ${complaint.userName}</p>
                      <p class="text-xs text-muted">${formatDate(complaint.createdAt)}</p>
                    </div>
                    <span class="badge badge-warning">
                      <span class="icon-sm mr-1">${Icons.clock}</span>
                      Pending
                    </span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="empty-state py-8">
                <span class="icon text-emerald" style="width: 3rem; height: 3rem;">${Icons.checkCircle}</span>
                <p class="mt-2 font-medium">All Caught Up!</p>
                <p class="text-sm text-muted">No pending complaints to review</p>
              </div>
            `}
          </div>
        </div>

        <!-- Room Status Overview -->
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">Room Status</h3>
                <p class="card-description">Current availability overview</p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('admin/rooms')">Manage Rooms</button>
            </div>
          </div>
          <div class="card-content space-y-4">
            ${Object.values(RoomStatus).map(status => {
              const count = mockRooms.filter(r => r.status === status).length;
              const percentage = Math.round((count / mockRooms.length) * 100);
              const colorClass = status === RoomStatus.AVAILABLE ? 'emerald' 
                : status === RoomStatus.OCCUPIED ? 'blue' : 'amber';
              
              return `
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="capitalize">${status.toLowerCase()}</span>
                    <span class="font-medium">${count} rooms (${percentage}%)</span>
                  </div>
                  <div class="progress ${colorClass}" style="height: 0.5rem;">
                    <div class="progress-bar" style="width: ${percentage}%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Users Pending Verification -->
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="card-title">Pending Verifications</h3>
                <p class="card-description">Users awaiting approval</p>
              </div>
              <button class="btn btn-outline btn-sm" onclick="navigate('admin/users')">View All Users</button>
            </div>
          </div>
          <div class="card-content">
            ${unverifiedUsers.length > 0 ? `
              <div class="space-y-4">
                ${unverifiedUsers.map(user => `
                  <div class="flex items-center justify-between rounded-lg border p-3">
                    <div class="flex items-center gap-3">
                      <div class="avatar">${getInitials(user.name)}</div>
                      <div>
                        <p class="font-medium">${user.name}</p>
                        <p class="text-sm text-muted">${user.email}</p>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <button class="btn btn-outline btn-sm">
                        <span class="icon-sm">${Icons.xCircle}</span>
                        Reject
                      </button>
                      <button class="btn btn-primary btn-sm">
                        <span class="icon-sm">${Icons.checkCircle}</span>
                        Verify
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="empty-state py-8">
                <span class="icon text-emerald" style="width: 3rem; height: 3rem;">${Icons.checkCircle}</span>
                <p class="mt-2 font-medium">All Users Verified!</p>
                <p class="text-sm text-muted">No pending verification requests</p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminUsers() {
  const tenants = mockUsers.filter(u => u.role === UserRole.TENANT);
  const admins = mockUsers.filter(u => u.role === UserRole.ADMIN);
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">User Management</h1>
          <p class="text-muted">Manage tenants and administrators</p>
        </div>
        <button class="btn btn-primary gap-2" onclick="openModal('add-user-modal')">
          <span class="icon-sm">${Icons.userPlus}</span>
          Add User
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-4">
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-primary-10">
                <span class="icon text-primary">${Icons.users}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total Users</p>
                <p class="text-xl font-bold">${mockUsers.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-blue-10">
                <span class="icon text-blue">${Icons.building}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Tenants</p>
                <p class="text-xl font-bold">${tenants.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-amber-10">
                <span class="icon text-amber">${Icons.shield}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Admins</p>
                <p class="text-xl font-bold">${admins.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-emerald-10">
                <span class="icon text-emerald">${Icons.userCheck}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Verified</p>
                <p class="text-xl font-bold">${mockUsers.filter(u => u.isVerified).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="card">
        <div class="card-content pt-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="input-with-icon flex-1">
              <span class="icon icon-sm">${Icons.search}</span>
              <input type="text" class="input" placeholder="Search by name or email...">
            </div>
            <div class="select" style="min-width: 160px;">
              <select>
                <option value="all">All Roles</option>
                <option value="TENANT">Tenants</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Users</h3>
          <p class="card-description">A list of all registered users in the system</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Room</th>
                  <th>Status</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${mockUsers.map(user => {
                  const userRoom = getUserRoom(user.id);
                  return `
                    <tr>
                      <td>
                        <div class="flex items-center gap-3">
                          <div class="avatar">${getInitials(user.name)}</div>
                          <div>
                            <p class="font-medium">${user.name}</p>
                            <p class="text-xs text-muted">Since ${formatDate(user.createdAt)}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="space-y-1">
                          <div class="flex items-center gap-1.5 text-sm">
                            <span class="icon-sm text-muted">${Icons.mail}</span>
                            ${user.email}
                          </div>
                          ${user.phone ? `
                            <div class="flex items-center gap-1.5 text-sm text-muted">
                              <span class="icon-sm">${Icons.phone}</span>
                              ${user.phone}
                            </div>
                          ` : ''}
                        </div>
                      </td>
                      <td>
                        <span class="badge ${user.role === UserRole.ADMIN ? 'badge-default' : 'badge-secondary'}">
                          ${user.role === UserRole.ADMIN ? '<span class="icon-sm mr-1">' + Icons.shield + '</span>' : ''}
                          ${user.role}
                        </span>
                      </td>
                      <td>
                        ${userRoom ? `<span class="font-medium">Room ${userRoom.roomNumber}</span>` : '<span class="text-muted">-</span>'}
                      </td>
                      <td>
                        ${user.isVerified 
                          ? '<span class="badge badge-success">Active</span>'
                          : '<span class="badge badge-warning">Pending</span>'}
                      </td>
                      <td class="text-right">
                        <div class="dropdown" id="user-dropdown-${user.id}">
                          <button class="btn btn-ghost btn-icon btn-sm" onclick="toggleDropdown('user-dropdown-${user.id}')">
                            <span class="icon">${Icons.moreHorizontal}</span>
                          </button>
                          <div class="dropdown-content">
                            <div class="dropdown-label">Actions</div>
                            <div class="dropdown-separator"></div>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.eye}</span>
                              View Details
                            </button>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.edit}</span>
                              Edit User
                            </button>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.building}</span>
                              Assign Room
                            </button>
                            <div class="dropdown-separator"></div>
                            <button class="dropdown-item destructive">
                              <span class="icon-sm">${Icons.trash}</span>
                              Delete User
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add User Modal -->
      <div id="add-user-modal" class="modal-overlay" onclick="if(event.target === this) closeModal('add-user-modal')">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Add New User</h3>
            <p class="modal-description">Create a new tenant or administrator account</p>
          </div>
          <div class="modal-body space-y-4">
            <div class="form-row">
              <div class="form-group">
                <label class="label">First Name</label>
                <input type="text" class="input" placeholder="John">
              </div>
              <div class="form-group">
                <label class="label">Last Name</label>
                <input type="text" class="input" placeholder="Doe">
              </div>
            </div>
            <div class="form-group">
              <label class="label">Email</label>
              <input type="email" class="input" placeholder="john@example.com">
            </div>
            <div class="form-group">
              <label class="label">Phone</label>
              <input type="tel" class="input" placeholder="+880 1712-345678">
            </div>
            <div class="form-group">
              <label class="label">Role</label>
              <div class="select w-full">
                <select>
                  <option value="">Select role</option>
                  <option value="TENANT">Tenant</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal('add-user-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="closeModal('add-user-modal')">Create User</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminRooms() {
  const totalCapacity = mockRooms.reduce((sum, r) => sum + r.capacity, 0);
  const totalOccupied = mockRooms.reduce((sum, r) => sum + r.occupancy, 0);
  const occupancyRate = (totalOccupied / totalCapacity) * 100;
  const availableRooms = mockRooms.filter(r => r.status === RoomStatus.AVAILABLE).length;
  const occupiedRooms = mockRooms.filter(r => r.status === RoomStatus.OCCUPIED).length;
  const maintenanceRooms = mockRooms.filter(r => r.status === RoomStatus.MAINTENANCE).length;
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Room Management</h1>
          <p class="text-muted">Manage rooms and allocations</p>
        </div>
        <button class="btn btn-primary gap-2" onclick="openModal('add-room-modal')">
          <span class="icon-sm">${Icons.plus}</span>
          Add Room
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-5">
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-primary-10">
                <span class="icon text-primary">${Icons.building}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total Rooms</p>
                <p class="text-xl font-bold">${mockRooms.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-emerald-10">
                <span class="icon text-emerald">${Icons.checkCircle}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Available</p>
                <p class="text-xl font-bold">${availableRooms}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-blue-10">
                <span class="icon text-blue">${Icons.users}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Occupied</p>
                <p class="text-xl font-bold">${occupiedRooms}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-amber-10">
                <span class="icon text-amber">${Icons.wrench}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Maintenance</p>
                <p class="text-xl font-bold">${maintenanceRooms}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <p class="text-sm text-muted">Occupancy</p>
                <p class="text-sm font-medium">${Math.round(occupancyRate)}%</p>
              </div>
              <div class="progress" style="height: 0.5rem;">
                <div class="progress-bar" style="width: ${occupancyRate}%;"></div>
              </div>
              <p class="text-xs text-muted">${totalOccupied}/${totalCapacity} beds</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rooms Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Rooms</h3>
          <p class="card-description">A list of all rooms in the hostel</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Occupancy</th>
                  <th>Rent</th>
                  <th>Amenities</th>
                  <th>Status</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${mockRooms.map(room => {
                  const occupancyPercent = (room.occupancy / room.capacity) * 100;
                  return `
                    <tr>
                      <td>
                        <div class="flex items-center gap-2">
                          <div class="stat-icon bg-muted" style="width: 2.25rem; height: 2.25rem;">
                            <span class="icon-sm">${Icons.building}</span>
                          </div>
                          <div>
                            <p class="font-medium">Room ${room.roomNumber}</p>
                            <p class="text-xs text-muted">${room.floorName}</p>
                          </div>
                        </div>
                      </td>
                      <td class="capitalize">${room.roomType.toLowerCase()}</td>
                      <td>
                        <div class="flex items-center gap-2">
                          <div class="flex items-center gap-1">
                            <span class="icon-sm text-muted">${Icons.bed}</span>
                            <span class="text-sm">${room.occupancy}/${room.capacity}</span>
                          </div>
                          <div class="progress" style="width: 4rem; height: 0.375rem;">
                            <div class="progress-bar" style="width: ${occupancyPercent}%;"></div>
                          </div>
                        </div>
                      </td>
                      <td class="font-medium">${formatCurrency(room.rentAmount)}</td>
                      <td>
                        <div class="flex flex-wrap gap-1">
                          ${room.amenities.slice(0, 2).map(a => `<span class="badge badge-secondary text-xs">${a}</span>`).join('')}
                          ${room.amenities.length > 2 ? `<span class="badge badge-secondary text-xs">+${room.amenities.length - 2}</span>` : ''}
                        </div>
                      </td>
                      <td>${renderRoomStatusBadge(room.status)}</td>
                      <td class="text-right">
                        <div class="dropdown" id="room-dropdown-${room.id}">
                          <button class="btn btn-ghost btn-icon btn-sm" onclick="toggleDropdown('room-dropdown-${room.id}')">
                            <span class="icon">${Icons.moreHorizontal}</span>
                          </button>
                          <div class="dropdown-content">
                            <div class="dropdown-label">Actions</div>
                            <div class="dropdown-separator"></div>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.eye}</span>
                              View Details
                            </button>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.edit}</span>
                              Edit Room
                            </button>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.userPlus}</span>
                              Assign Tenant
                            </button>
                            <button class="dropdown-item">
                              <span class="icon-sm">${Icons.wrench}</span>
                              Set Maintenance
                            </button>
                            <div class="dropdown-separator"></div>
                            <button class="dropdown-item destructive">
                              <span class="icon-sm">${Icons.trash}</span>
                              Delete Room
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add Room Modal -->
      <div id="add-room-modal" class="modal-overlay" onclick="if(event.target === this) closeModal('add-room-modal')">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Add New Room</h3>
            <p class="modal-description">Create a new room in the hostel</p>
          </div>
          <div class="modal-body space-y-4">
            <div class="form-row">
              <div class="form-group">
                <label class="label">Room Number</label>
                <input type="text" class="input" placeholder="101">
              </div>
              <div class="form-group">
                <label class="label">Floor</label>
                <input type="number" class="input" placeholder="1">
              </div>
            </div>
            <div class="form-group">
              <label class="label">Room Type</label>
              <div class="select w-full">
                <select>
                  <option value="">Select type</option>
                  <option value="SINGLE">Single</option>
                  <option value="DOUBLE">Double</option>
                  <option value="TRIPLE">Triple</option>
                  <option value="DORMITORY">Dormitory</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="label">Capacity</label>
                <input type="number" class="input" placeholder="2">
              </div>
              <div class="form-group">
                <label class="label">Monthly Rent</label>
                <input type="number" class="input" placeholder="8000">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal('add-room-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="closeModal('add-room-modal')">Create Room</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminFinancials() {
  const totalRevenue = mockTransactions.filter(t => t.type === TransactionType.CREDIT).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = mockTransactions.filter(t => t.type === TransactionType.DEBIT).reduce((sum, t) => sum + t.amount, 0);
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Financials</h1>
          <p class="text-muted">Manage payments, transactions, and revenue</p>
        </div>
        <button class="btn btn-outline gap-2">
          <span class="icon-sm">${Icons.download}</span>
          Export Report
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-4">
        <div class="card gradient-card emerald">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-emerald-10">
                <span class="icon text-emerald">${Icons.trendingUp}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total Revenue</p>
                <p class="text-xl font-bold">${formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-rose-10">
                <span class="icon text-red">${Icons.trendingDown}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total Expenses</p>
                <p class="text-xl font-bold">${formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-blue-10">
                <span class="icon text-blue">${Icons.wallet}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Net Balance</p>
                <p class="text-xl font-bold">${formatCurrency(totalRevenue - totalExpenses)}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-amber-10">
                <span class="icon text-amber">${Icons.clock}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Pending Rent</p>
                <p class="text-xl font-bold">${formatCurrency(mockRentHistory.filter(r => !r.isPaid).reduce((sum, r) => sum + r.amount, 0))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span class="icon">${Icons.wallet}</span>
            All Transactions
          </h3>
          <p class="card-description">Complete transaction history</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Description</th>
                  <th>Method</th>
                  <th>Type</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${mockTransactions.map(txn => `
                  <tr>
                    <td>${formatDate(txn.createdAt)}</td>
                    <td class="font-medium">${txn.userName}</td>
                    <td>${txn.description}</td>
                    <td class="capitalize">${txn.paymentMethod.toLowerCase()}</td>
                    <td>
                      <div class="flex items-center gap-2">
                        ${txn.type === TransactionType.CREDIT 
                          ? `<span class="icon-sm text-emerald">${Icons.arrowDownLeft}</span>`
                          : `<span class="icon-sm text-red">${Icons.arrowUpRight}</span>`}
                        <span class="capitalize">${txn.type.toLowerCase()}</span>
                      </div>
                    </td>
                    <td class="text-right font-medium ${txn.type === TransactionType.CREDIT ? 'text-emerald' : 'text-red'}">
                      ${txn.type === TransactionType.CREDIT ? '+' : '-'}${formatCurrency(txn.amount)}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminMeals() {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const tokenStats = {
    total: mockMealTokens.length,
    used: mockMealTokens.filter(t => t.isUsed).length,
    unused: mockMealTokens.filter(t => !t.isUsed).length
  };
  
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Meal Management</h1>
          <p class="text-muted">Manage menus and meal tokens</p>
        </div>
        <button class="btn btn-primary gap-2" onclick="openModal('add-menu-modal')">
          <span class="icon-sm">${Icons.plus}</span>
          Add Menu
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-4">
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-primary-10">
                <span class="icon text-primary">${Icons.ticket}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total Tokens</p>
                <p class="text-xl font-bold">${tokenStats.total}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-emerald-10">
                <span class="icon text-emerald">${Icons.checkCircle}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Used Tokens</p>
                <p class="text-xl font-bold">${tokenStats.used}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-amber-10">
                <span class="icon text-amber">${Icons.clock}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Available</p>
                <p class="text-xl font-bold">${tokenStats.unused}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-blue-10">
                <span class="icon text-blue">${Icons.users}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Subscribers</p>
                <p class="text-xl font-bold">${mockUsers.filter(u => u.role === UserRole.TENANT).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Menu Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            <span class="icon">${Icons.calendar}</span>
            Weekly Menu Schedule
          </h3>
          <p class="card-description">Manage the weekly meal schedule</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th style="width: 8rem;">Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                  <th class="text-right" style="width: 6rem;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${dayOrder.map(day => {
                  const dayMenus = mockDailyMenus.filter(m => m.dayOfWeek === day);
                  return `
                    <tr>
                      <td class="font-medium capitalize">${day.toLowerCase()}</td>
                      <td class="text-sm">
                        ${dayMenus.find(m => m.mealType === MealType.BREAKFAST)?.items.map(i => i.name).join(', ') || '-'}
                      </td>
                      <td class="text-sm">
                        ${dayMenus.find(m => m.mealType === MealType.LUNCH)?.items.map(i => i.name).join(', ') || '-'}
                      </td>
                      <td class="text-sm">
                        ${dayMenus.find(m => m.mealType === MealType.DINNER)?.items.map(i => i.name).join(', ') || '-'}
                      </td>
                      <td class="text-right">
                        <div class="flex items-center justify-end gap-1">
                          <button class="btn btn-ghost btn-icon btn-sm">
                            <span class="icon-sm">${Icons.edit}</span>
                          </button>
                          <button class="btn btn-ghost btn-icon btn-sm text-destructive">
                            <span class="icon-sm">${Icons.trash}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add Menu Modal -->
      <div id="add-menu-modal" class="modal-overlay" onclick="if(event.target === this) closeModal('add-menu-modal')">
        <div class="modal" style="max-width: 32rem;">
          <div class="modal-header">
            <h3 class="modal-title">Add/Edit Daily Menu</h3>
            <p class="modal-description">Set the menu for a specific day</p>
          </div>
          <div class="modal-body space-y-4">
            <div class="form-group">
              <label class="label">Day of Week</label>
              <div class="select w-full">
                <select>
                  ${dayOrder.map(day => `<option value="${day}" class="capitalize">${day.toLowerCase()}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="border-t pt-4 space-y-3">
              <div class="flex items-center gap-2 text-sm font-medium">
                <span class="icon-sm">${Icons.coffee}</span>
                Breakfast
              </div>
              <input type="text" class="input" placeholder="e.g., Paratha, Egg Curry, Tea">
            </div>
            <div class="border-t pt-4 space-y-3">
              <div class="flex items-center gap-2 text-sm font-medium">
                <span class="icon-sm">${Icons.sun}</span>
                Lunch
              </div>
              <input type="text" class="input" placeholder="e.g., Rice, Chicken Curry, Dal">
            </div>
            <div class="border-t pt-4 space-y-3">
              <div class="flex items-center gap-2 text-sm font-medium">
                <span class="icon-sm">${Icons.moon}</span>
                Dinner
              </div>
              <input type="text" class="input" placeholder="e.g., Rice, Fish Curry, Vegetables">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal('add-menu-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="closeModal('add-menu-modal')">Save Menu</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminComplaints() {
  const stats = {
    total: mockComplaints.length,
    pending: mockComplaints.filter(c => c.status === ComplaintStatus.PENDING).length,
    inProgress: mockComplaints.filter(c => c.status === ComplaintStatus.IN_PROGRESS).length,
    resolved: mockComplaints.filter(c => c.status === ComplaintStatus.RESOLVED).length
  };
  
  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Complaints</h1>
        <p class="text-muted">Manage and resolve tenant complaints</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-4">
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-primary-10">
                <span class="icon text-primary">${Icons.alertTriangle}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Total</p>
                <p class="text-xl font-bold">${stats.total}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-amber-10">
                <span class="icon text-amber">${Icons.clock}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Pending</p>
                <p class="text-xl font-bold">${stats.pending}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-blue-10">
                <span class="icon text-blue">${Icons.messageCircle}</span>
              </div>
              <div>
                <p class="text-sm text-muted">In Progress</p>
                <p class="text-xl font-bold">${stats.inProgress}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content pt-6">
            <div class="flex items-center gap-3">
              <div class="stat-icon bg-emerald-10">
                <span class="icon text-emerald">${Icons.checkCircle}</span>
              </div>
              <div>
                <p class="text-sm text-muted">Resolved</p>
                <p class="text-xl font-bold">${stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Complaints Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">All Complaints</h3>
          <p class="card-description">View and manage tenant complaints</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Tenant</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${mockComplaints.map(complaint => `
                  <tr>
                    <td>${formatDate(complaint.createdAt)}</td>
                    <td class="font-medium">${complaint.userName}</td>
                    <td>
                      <div style="max-width: 200px;">
                        <p class="font-medium truncate">${complaint.title}</p>
                        <p class="text-xs text-muted truncate">${complaint.description}</p>
                      </div>
                    </td>
                    <td><span class="badge badge-outline">${complaint.category}</span></td>
                    <td>${renderComplaintBadge(complaint.status)}</td>
                    <td class="text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button class="btn btn-outline btn-sm gap-1">
                          <span class="icon-sm">${Icons.eye}</span>
                          View
                        </button>
                        ${complaint.status !== ComplaintStatus.RESOLVED ? `
                          <button class="btn btn-primary btn-sm gap-1">
                            <span class="icon-sm">${Icons.send}</span>
                            Respond
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// SHARED COMPONENTS
// ========================================
function renderAppHeader(user) {
  return `
    <header class="app-header">
      <button class="btn btn-ghost btn-icon menu-toggle" onclick="toggleSidebar()">
        <span class="icon">${Icons.menu}</span>
        <span class="sr-only">Toggle menu</span>
      </button>

      <div class="flex-1"></div>

      <div class="flex items-center gap-4">
        <button class="btn btn-ghost btn-icon" onclick="toggleTheme()">
          <span class="icon">${AppState.theme === 'dark' ? Icons.sun : Icons.moon}</span>
          <span class="sr-only">Toggle theme</span>
        </button>

        <div class="dropdown" id="notifications-dropdown">
          <button class="btn btn-ghost btn-icon relative" onclick="toggleDropdown('notifications-dropdown')">
            <span class="icon">${Icons.bell}</span>
            <span class="notification-badge">3</span>
            <span class="sr-only">Notifications</span>
          </button>
          <div class="dropdown-content" style="width: 20rem;">
            <div class="dropdown-label">Notifications</div>
            <div class="dropdown-separator"></div>
            <button class="dropdown-item flex-col items-start gap-1">
              <p class="font-medium">Rent Due Reminder</p>
              <p class="text-sm text-muted">Your rent for April is due on 5th</p>
            </button>
            <button class="dropdown-item flex-col items-start gap-1">
              <p class="font-medium">Complaint Update</p>
              <p class="text-sm text-muted">Your AC complaint is being processed</p>
            </button>
            <button class="dropdown-item flex-col items-start gap-1">
              <p class="font-medium">New Menu Available</p>
              <p class="text-sm text-muted">Check out this week&apos;s meal menu</p>
            </button>
          </div>
        </div>

        <div class="dropdown" id="user-dropdown">
          <button class="btn btn-ghost rounded-full p-0" onclick="toggleDropdown('user-dropdown')">
            <div class="avatar">${getInitials(user?.name || 'User')}</div>
          </button>
          <div class="dropdown-content">
            <div class="p-3">
              <p class="text-sm font-medium">${user?.name || 'User'}</p>
              <p class="text-xs text-muted">${user?.email || ''}</p>
            </div>
            <div class="dropdown-separator"></div>
            <button class="dropdown-item">Profile Settings</button>
            <button class="dropdown-item">Help & Support</button>
            <div class="dropdown-separator"></div>
            <button class="dropdown-item destructive" onclick="navigate('home')">Log out</button>
          </div>
        </div>
      </div>
    </header>
  `;
}

function renderComplaintBadge(status) {
  switch (status) {
    case ComplaintStatus.RESOLVED:
      return `<span class="badge badge-success"><span class="icon-sm mr-1">${Icons.checkCircle}</span>Resolved</span>`;
    case ComplaintStatus.PENDING:
      return `<span class="badge badge-warning"><span class="icon-sm mr-1">${Icons.clock}</span>Pending</span>`;
    case ComplaintStatus.IN_PROGRESS:
      return `<span class="badge badge-info"><span class="icon-sm mr-1">${Icons.messageCircle}</span>In Progress</span>`;
    case ComplaintStatus.REJECTED:
      return `<span class="badge badge-destructive"><span class="icon-sm mr-1">${Icons.xCircle}</span>Rejected</span>`;
    default:
      return `<span class="badge badge-secondary">${status}</span>`;
  }
}

function renderRoomStatusBadge(status) {
  switch (status) {
    case RoomStatus.AVAILABLE:
      return '<span class="badge badge-success">Available</span>';
    case RoomStatus.OCCUPIED:
      return '<span class="badge badge-info">Occupied</span>';
    case RoomStatus.MAINTENANCE:
      return '<span class="badge badge-warning">Maintenance</span>';
    default:
      return `<span class="badge badge-secondary">${status}</span>`;
  }
}
