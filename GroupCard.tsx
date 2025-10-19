import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Trash2 } from 'lucide-react';
import { Group } from '@/store/slices/groupsSlice';
import { useAppSelector } from '@/store/hooks';

interface GroupCardProps {
  group: Group;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onDelete, onClick }) => {
  const students = useAppSelector(state => 
    state.students.students.filter(s => group.studentIds.includes(s.id))
  );

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(group.id)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold">{group.name}</CardTitle>
            <CardDescription className="mt-2">{group.description}</CardDescription>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(group.id);
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{group.studentIds.length} студентов</span>
          {students.length > 0 && (
            <div className="flex gap-1 ml-2">
              {students.slice(0, 3).map(student => (
                <Badge key={student.id} variant="secondary" className="text-xs">
                  {student.firstName}
                </Badge>
              ))}
              {students.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{students.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Создана: {new Date(group.createdAt).toLocaleDateString('ru-RU')}
        </div>
      </CardContent>
    </Card>
  );
};
