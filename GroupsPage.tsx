import { Link } from 'wouter';
import { HogwartsSidebar } from '@/components/HogwartsSidebar';
import { useAppSelector } from '@/store/hooks';
import { Zap, Plus } from 'lucide-react';
import { GroupColor } from '@/store/slices/groupsSlice';
import gryffindorImg from '@assets/image_1760898017603.png';
import slytherinImg from '@assets/image_1760898029318.png';
import ravenclawImg from '@assets/image_1760898037646.png';

const groupImages: Record<GroupColor, string> = {
  gryffindor: gryffindorImg,
  slytherin: slytherinImg,
  ravenclaw: ravenclawImg,
  hufflepuff: gryffindorImg,
};

const groupColors: Record<GroupColor, { bg: string; card: string }> = {
  gryffindor: {
    bg: 'bg-gradient-to-br from-orange-400 to-orange-500',
    card: 'bg-[#F5F9FD]',
  },
  slytherin: {
    bg: 'bg-gradient-to-br from-teal-500 to-teal-600',
    card: 'bg-[#F5F9FD]',
  },
  ravenclaw: {
    bg: 'bg-gradient-to-br from-indigo-400 to-indigo-500',
    card: 'bg-[#F5F9FD]',
  },
  hufflepuff: {
    bg: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
    card: 'bg-[#F5F9FD]',
  },
};

export const GroupsPage = () => {
  const groups = useAppSelector(state => state.groups.groups);
  const students = useAppSelector(state => state.students.students);
  
  const sortedGroups = [...groups].sort((a, b) => (b.points || 0) - (a.points || 0));

  return (
    <div className="flex min-h-screen bg-white">
      <HogwartsSidebar />
      
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-normal mb-8 text-[#222222]" data-testid="heading-groups">
          Группы
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl">
          {groups.map((group, index) => {
            const colors = groupColors[group.color];
            const groupImage = groupImages[group.color];
            const groupStudents = students.filter(s => group.studentIds.includes(s.id));
            
            return (
              <Link key={group.id} href={`/group/${group.id}`}>
                <div 
                  className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-sm bg-white border border-gray-200"
                  data-testid={`card-group-${group.id}`}
                >
                  <div className="relative h-48">
                    <img 
                      src={groupImage} 
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <div className={`w-6 h-6 rounded ${colors.bg}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-[#222222] truncate">
                        {group.name}
                      </h3>
                      <p className="text-sm text-[#007C81]">
                        {groupStudents.length} учеников
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          <Link href="/create-group">
            <div 
              className="rounded-2xl border-2 border-dashed border-[#007C81] bg-white h-full min-h-[280px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#EFFDFE] hover:border-solid"
              data-testid="button-add-group"
            >
              <Plus className="w-12 h-12 text-[#007C81] mb-3" />
              <span className="text-lg text-[#007C81] font-normal">Добавить группу</span>
            </div>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-normal mb-6 text-[#222222]" data-testid="heading-rating">
            Рейтинг групп
          </h2>
          
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]" data-testid="header-place">
                    Место
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]" data-testid="header-group-name">
                    Название группы
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-normal text-[#222222]" data-testid="header-points">
                    Количество баллов
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedGroups.map((group, index) => (
                  <tr 
                    key={group.id}
                    className="hover:bg-gray-50 transition-colors"
                    data-testid={`row-ranking-${group.id}`}
                  >
                    <td className="px-6 py-4">
                      <span 
                        className={`text-lg font-normal ${
                          index === 0 ? 'text-orange-500' : 
                          index === 1 ? 'text-orange-400' : 
                          index === 2 ? 'text-orange-300' : 
                          'text-gray-600'
                        }`}
                        data-testid={`text-rank-${group.id}`}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-base text-[#222222]" data-testid={`text-group-name-ranking-${group.id}`}>
                        {group.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-[#222222]" data-testid={`text-points-${group.id}`}>
                          {group.points || 0}
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
    </div>
  );
};
