import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Kanban,
  CalendarCheck,
  Trophy,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/leads/new', icon: UserPlus, label: 'Add Lead' },
  { to: '/pipeline', icon: Kanban, label: 'Pipeline' },
  { to: '/visits', icon: CalendarCheck, label: 'Visits' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const AppSidebar = ({ collapsed, mobileOpen, onCloseMobile }) => {
  const location = useLocation();

  const sidebarContent = (isMobile = false) => (
    <>
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-white/[0.06] px-5 shrink-0 ${collapsed && !isMobile ? 'justify-center px-0' : ''}`}>
        {collapsed && !isMobile ? (
          <span className="text-lg font-bold text-blue-400">G</span>
        ) : (
          <div>
            <h1 className="text-base font-bold tracking-tight text-white">
              <span className="text-blue-400">Ghar</span>payy
            </h1>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">Lead Management CRM</p>
          </div>
        )}
        {isMobile && (
          <button
            onClick={onCloseMobile}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              onClick={() => { if (isMobile) onCloseMobile(); }}
              className={`group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-150
                ${collapsed && !isMobile ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'}
                ${active
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
              title={collapsed && !isMobile ? label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {(!collapsed || isMobile) && (
                <span className="truncate">{label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {(!collapsed || isMobile) && (
        <div className="shrink-0 border-t border-white/[0.06] px-5 py-3">
          <p className="text-[10px] text-slate-600">v1.0 MVP · Mock Mode</p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#0f172a] border-r border-white/[0.06] transition-all duration-300 shrink-0 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onCloseMobile}
        >
          <aside
            className="flex flex-col w-[280px] h-full bg-[#0f172a] shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};

export default AppSidebar;
