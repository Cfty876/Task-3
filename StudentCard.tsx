import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { Student } from '@/store/slices/studentsSlice';
import { useAppSelector } from '@/store/hooks';

interface StudentCardProps {
  student: Student;
  onDelete?: (id: string) => void;
  showGroups?: boolean;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onDelete, showGroups = true }) => {
  const groups = useAppSelector(state => 
    state.groups.groups.filter(g => g.studentIds.includes(student.id))
  );

  const initials = `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {student.firstName} {student.lastName}
              </CardTitle>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(student.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{student.phone}</span>
        </div>
        {student.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{student.email}</span>
          </div>
        )}
        {showGroups && groups.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {groups.map(group => (
              <Badge key={group.id} variant="outline" className="text-xs">
                {group.name}
              </Badge>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-2">
          Добавлен: {new Date(student.createdAt).toLocaleDateString('ru-RU')}
        </div>
      </CardContent>
    </Card>
  );
};
