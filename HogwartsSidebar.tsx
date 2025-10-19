import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { GraduationCap, UserPlus, Bell, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const HogwartsSidebar = () => {
  const [location] = useLocation();
  const [groupsExpanded, setGroupsExpanded] = useState(true);

  return (
    <aside className="w-64 min-h-screen border-r sidebar-divider sidebar-gradient p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-mont tracking-tight text-[#222222]" data-testid="logo">
          ХОГВАРДС
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <div>
          <button
            onClick={() => setGroupsExpanded(!groupsExpanded)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-normal text-[#222222] transition-colors",
              (location === '/' || location.startsWith('/group/')) && "sidebar-active"
            )}
            data-testid="button-toggle-groups"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5" />
              <span>Группы</span>
            </div>
            {groupsExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {groupsExpanded && (
            <div className="ml-4 mt-2 space-y-1">
              <Link href="/create-group">
                <button
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-1 text-sm text-[#222222] rounded-lg transition-colors hover:sidebar-active"
                  )}
                  data-testid="link-new-group"
                >
                  <span>Новая группа</span>
                  <Plus className="w-4 h-4 ml-auto" />
                </button>
              </Link>

              <Link href="/">
                <button
                  className={cn(
                    "w-full flex items-center px-4 py-1 text-sm text-[#222222] rounded-lg transition-colors",
                    location === '/' && "sidebar-active"
                  )}
                  data-testid="link-all-groups"
                >
                  Все группы
                </button>
              </Link>
            </div>
          )}
        </div>

        <Link href="/add-student">
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal text-[#222222] transition-colors hover:sidebar-active",
              location === '/add-student' && "sidebar-active"
            )}
            data-testid="link-add-student"
          >
            <UserPlus className="w-5 h-5" />
            <span>Добавить ученика</span>
          </button>
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t sidebar-divider">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-normal text-[#222222] transition-colors hover:sidebar-active"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5" />
          <span>Уведомления</span>
        </button>
      </div>
    </aside>
  );
};
