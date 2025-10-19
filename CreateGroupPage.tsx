import { useState } from 'react';
import { HogwartsSidebar } from '@/components/HogwartsSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addGroup, GroupColor } from '@/store/slices/groupsSlice';
import { addStudentToGroup } from '@/store/slices/groupsSlice';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus } from 'lucide-react';

export const CreateGroupPage = () => {
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const allStudents = useAppSelector(state => state.students.students);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'gryffindor' as GroupColor,
  });

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchStudent, setSearchStudent] = useState('');
  const [charCount, setCharCount] = useState({ name: 0, description: 0 });

  const filteredStudents = allStudents.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    dispatch(addGroup({
      name: formData.name,
      description: formData.description,
      studentIds: [],
      color: formData.color,
    }));

    toast({
      title: "Успешно!",
      description: `Группа "${formData.name}" создана`,
    });

    setLocation('/');
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleNameChange = (value: string) => {
    if (value.length <= 100) {
      setFormData(prev => ({ ...prev, name: value }));
      setCharCount(prev => ({ ...prev, name: value.length }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    if (value.length <= 500) {
      setFormData(prev => ({ ...prev, description: value }));
      setCharCount(prev => ({ ...prev, description: value.length }));
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <HogwartsSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-normal mb-8 text-[#222222]" data-testid="heading-new-group">
          Новая группа
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-normal text-[#222222]">
              Название
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="Название"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="pr-12"
                data-testid="input-group-name"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                {charCount.name}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-normal text-[#222222]">
              Описание группы
            </Label>
            <div className="relative">
              <Textarea
                id="description"
                placeholder="Описание группы"
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                rows={4}
                className="pr-12"
                data-testid="input-group-description"
              />
              <span className="absolute right-3 bottom-3 text-sm text-gray-400">
                {charCount.description}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-normal text-[#222222]">Ученики</Label>
            
            <div className="min-h-[200px] border-2 border-dashed border-[#007C81] rounded-lg flex flex-col items-center justify-center p-8 bg-white">
              <button
                type="button"
                onClick={() => setShowAddStudent(true)}
                className="flex flex-col items-center gap-3 text-[#007C81] hover:opacity-80 transition-opacity"
                data-testid="button-add-students-to-group"
              >
                <Plus className="w-12 h-12" />
                <span className="text-lg font-normal">Добавить учеников</span>
              </button>
            </div>

            {selectedStudents.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Выбрано учеников: {selectedStudents.length}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudents.map(studentId => {
                    const student = allStudents.find(s => s.id === studentId);
                    return student ? (
                      <span key={studentId} className="px-3 py-1 bg-white rounded-full text-sm border">
                        {student.firstName} {student.lastName}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-[#007C81] hover:bg-[#006570] text-white"
              data-testid="button-create-group"
            >
              Создать группу
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation('/')}
              data-testid="button-cancel"
            >
              Отменить
            </Button>
          </div>
        </form>
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
                data-testid="input-search-students"
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
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50" data-testid={`row-student-${student.id}`}>
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
                  setSearchStudent('');
                }}
                data-testid="button-cancel-add"
              >
                Отменить
              </Button>
              <Button
                onClick={() => setShowAddStudent(false)}
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
