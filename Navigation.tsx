import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, FolderPlus, Home } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-gray-900">Школа управления</h1>
          </div>
          
          <div className="flex gap-2">
            <Link href="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Группы
              </Button>
            </Link>
            
            <Link href="/create-group">
              <Button 
                variant={isActive('/create-group') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <FolderPlus className="h-4 w-4" />
                Создать группу
              </Button>
            </Link>
            
            <Link href="/add-student">
              <Button 
                variant={isActive('/add-student') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Добавить ученика
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
