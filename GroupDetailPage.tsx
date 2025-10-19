import { Link, useRoute } from 'wouter';
import { HogwartsSidebar } from '@/components/HogwartsSidebar';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Calendar, Award, Zap, Search, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch } from '@/store/hooks';
import { addStudentToGroup } from '@/store/slices/groupsSlice';

export const GroupDetailPage = () => {
  const [, params] = useRoute('/group/:id');
  const groupId = params?.id;
  const dispatch = useAppDispatch();
  
  const group = useAppSelector(state => 
    state.groups.groups.find(g => g.id === groupId)
  );
  const allStudents = useAppSelector(state => state.students.students);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [searchStudent, setSearchStudent] = useState('');

  if (!group) {
    return (
      <div className="flex min-h-screen">
        <HogwartsSidebar />
        <div className="flex-1 p-8">
          <p>Группа не найдена</p>
        </div>
      </div>
    );
  }

  const groupStudents = allStudents
    .filter(s => group.studentIds.includes(s.id))
    .sort((a, b) => (b.points || 0) - (a.points || 0));

  const availableStudents = allStudents.filter(s => !group.studentIds.includes(s.id));
  
  const filteredAvailableStudents = availableStudents.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const handleAddStudents = () => {
    selectedStudents.forEach(studentId => {
      dispatch(addStudentToGroup({ groupId: group.id, studentId }));
    });
    setShowAddStudent(false);
    setSelectedStudents([]);
    setSearchStudent('');
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      <HogwartsSidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-normal text-[#222222]" data-testid="text-group-name">
                {group.name}
              </h1>
              <button className="p-1 hover:bg-gray-100 rounded-lg" data-testid="button-edit-group">
                <Edit2 className="w-5 h-5 text-[#007C81]" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-lg text-[#222222] mb-8 max-w-3xl" data-testid="text-group-description">
          {group.description}
        </p>

        {group.tasks && group.tasks.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-normal text-[#222222]" data-testid="heading-tasks">
                Задания группы
              </h2>
              <button className="text-[#007C81] hover:underline flex items-center gap-1" data-testid="button-edit-tasks">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="rounded-lg bg-[#EFFDFE] p-6"
                  data-testid={`card-task-${task.id}`}
                >
                  <h3 className="text-lg text-[#222222] mb-4 text-right" data-testid={`text-task-title-${task.id}`}>
                    {task.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3 text-sm text-[#222222]">
                    <Calendar className="w-4 h-4 text-[#007C81]" />
                    <span data-testid={`text-task-date-${task.id}`}>{task.dateRange}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-[#222222]">
                    <Award className="w-4 h-4 text-[#3B4365]" />
                    <span data-testid={`text-task-difficulty-${task.id}`}>{task.difficulty}</span>
                  </div>
                  
                  <Button
                    variant={task.status === 'completed' ? 'default' : 'outline'}
                    className={`w-full rounded-lg ${
                      task.status === 'completed' 
                        ? 'bg-[#007C81] hover:bg-[#006570] text-white' 
                        : 'border-[#007C81] text-[#007C81] hover:bg-[#EFFDFE]'
                    }`}
                    data-testid={`button-task-status-${task.id}`}
                  >
                    {task.status === 'completed' ? 'Выполнено' : 'Не выполнено'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-normal text-[#222222]" data-testid="heading-rating">
              Рейтинг
            </h2>
            <div className="flex items-center gap-3">
              {sortBy && (
                <select 
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  data-testid="select-sort"
                >
                  <option value="">Сортировать по...</option>
                  <option value="points">По баллам</option>
                  <option value="name">По имени</option>
                </select>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Найти по ФИО..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                  data-testid="input-search-student"
                />
              </div>
              <Button
                onClick={() => setShowAddStudent(true)}
                className="bg-[#007C81] hover:bg-[#006570] text-white rounded-lg"
                data-testid="button-add-students"
              >
                Добавить ученика
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]">Место</th>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]">ФИО</th>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]">Класс</th>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]">Количество баллов</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {groupStudents
                  .filter(s => searchQuery ? 
                    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) 
                    : true
                  )
                  .map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50" data-testid={`row-student-${student.id}`}>
                      <td className="px-6 py-4">
                        <span className={`text-lg font-normal ${
                          index === 0 ? 'text-orange-500' : 
                          index === 1 ? 'text-orange-400' : 
                          index === 2 ? 'text-orange-300' : 
                          'text-gray-600'
                        }`} data-testid={`text-rank-${student.id}`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-base text-[#222222]" data-testid={`text-student-name-${student.id}`}>
                          {student.firstName} {student.lastName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-base text-[#222222]" data-testid={`text-grade-${student.id}`}>
                          {student.grade || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base text-[#222222]" data-testid={`text-points-${student.id}`}>
                            {student.points || 0}
                          </span>
                          <Zap className="w-4 h-4 text-[#007C81] fill-[#007C81]" />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
        <DialogContent className="max-w-2xl" data-testid="dialog-add-students">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal">Добавить ученика</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Вяне"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="pl-10"
                data-testid="input-search-available-students"
              />
            </div>

            <div className="border rounded-lg max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-normal text-[#222222]">ФИО</th>
                    <th className="px-4 py-3 text-left text-sm font-normal text-[#222222]">Класс</th>
                    <th className="px-4 py-3 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAvailableStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50" data-testid={`row-available-student-${student.id}`}>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#222222]">
                          {student.firstName} {student.lastName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-[#222222]">{student.grade || '-'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudent(student.id)}
                          data-testid={`checkbox-student-${student.id}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddStudent(false);
                  setSelectedStudents([]);
                  setSearchStudent('');
                }}
                data-testid="button-cancel-add"
              >
                Отменить
              </Button>
              <Button
                onClick={handleAddStudents}
                disabled={selectedStudents.length === 0}
                className="bg-[#007C81] hover:bg-[#006570] text-white"
                data-testid="button-confirm-add"
              >
                Добавить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
