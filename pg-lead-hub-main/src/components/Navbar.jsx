import { Bell, Menu } from 'lucide-react';
import { useCrm } from '@/context/CrmContext';

const Navbar = ({ onToggleSidebar, onToggleMobile, sidebarCollapsed }) => {
  const { leads } = useCrm();
  const reminderCount = leads.filter((l) => l.needsFollowUp).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border bg-white px-4 sm:px-6">
      {/* Left — hamburger */}
      <div className="flex items-center gap-3">
        {/* Desktop toggle */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu size={20} />
        </button>

        {/* Mobile toggle */}
        <button
          onClick={onToggleMobile}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:block h-6 w-px bg-border" />

        <h2 className="text-sm font-semibold text-slate-800 hidden sm:block">
          <span className="text-blue-600">Ghar</span>payy CRM
        </h2>
      </div>

      {/* Right — notifications + avatar */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
          <Bell size={18} />
          {reminderCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {reminderCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-border" />

        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-bold text-white shadow-sm hover:shadow-md transition-shadow">
          GP
        </button>
      </div>
    </header>
  );
};

export default Navbar;
