import { useState } from 'react';
import { HogwartsSidebar } from '@/components/HogwartsSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/store/hooks';
import { addStudent } from '@/store/slices/studentsSlice';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AddStudentPage = () => {
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    grade: '',
  });

  const [birthDate, setBirthDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const newStudentId = Date.now().toString();
    const studentData = {
      id: newStudentId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: '+7 900 000-00-00',
      createdAt: new Date().toISOString(),
      gender: formData.gender as 'male' | 'female' | undefined,
      birthDate: birthDate?.toISOString(),
      grade: formData.grade,
      points: 0,
    };

    dispatch(addStudent(studentData));

    toast({
      title: "Успешно!",
      description: `Ученик ${formData.firstName} ${formData.lastName} добавлен`,
    });

    setLocation('/');
  };

  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      <HogwartsSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-normal mb-8 text-[#222222]" data-testid="heading-new-student">
          Новый ученик
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-base font-normal text-[#222222]">
              Имя<span className="text-[#007C81]">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Имя"
              value={formData.firstName}
              onChange={(e) => handleNameChange('firstName', e.target.value)}
              data-testid="input-first-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-base font-normal text-[#222222]">
              Фамилия<span className="text-[#007C81]">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={(e) => handleNameChange('lastName', e.target.value)}
              data-testid="input-last-name"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-normal text-[#222222]">
              Дата рождения<span className="text-[#007C81]">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                    data-testid="button-select-birth-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Input
                type="text"
                placeholder=""
                className="bg-gray-50"
                readOnly
                data-testid="input-birth-date-display"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-normal text-[#222222]">
              Пол<span className="text-[#007C81]">*</span>
            </Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={formData.gender === 'male' ? 'default' : 'outline'}
                className={cn(
                  "flex-1",
                  formData.gender === 'male' 
                    ? "bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-300" 
                    : "border-gray-200 hover:bg-gray-50"
                )}
                onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                data-testid="button-gender-male"
              >
                Мужской
              </Button>
              <Button
                type="button"
                variant={formData.gender === 'female' ? 'default' : 'outline'}
                className={cn(
                  "flex-1",
                  formData.gender === 'female' 
                    ? "bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-300" 
                    : "border-gray-200 hover:bg-gray-50"
                )}
                onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                data-testid="button-gender-female"
              >
                Женский
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade" className="text-base font-normal text-[#222222]">
              Класс обучения<span className="text-[#007C81]">*</span>
            </Label>
            <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}>
              <SelectTrigger data-testid="select-grade">
                <SelectValue placeholder="Класс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 класс</SelectItem>
                <SelectItem value="2">2 класс</SelectItem>
                <SelectItem value="3">3 класс</SelectItem>
                <SelectItem value="4">4 класс</SelectItem>
                <SelectItem value="5">5 класс</SelectItem>
                <SelectItem value="6">6 класс</SelectItem>
                <SelectItem value="7">7 класс</SelectItem>
                <SelectItem value="8">8 класс</SelectItem>
                <SelectItem value="9">9 класс</SelectItem>
                <SelectItem value="10">10 класс</SelectItem>
                <SelectItem value="11">11 класс</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-[#007C81] hover:bg-[#006570] text-white"
              data-testid="button-add-student"
            >
              Добавить ученика
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
    </div>
  );
};
