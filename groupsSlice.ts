import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GroupColor = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface Task {
  id: string;
  title: string;
  dateRange: string;
  difficulty: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

export interface Group {
  id: string;
  name: string;
  description: string;
  studentIds: string[];
  createdAt: string;
  color: GroupColor;
  points: number;
  tasks?: Task[];
}

interface GroupsState {
  groups: Group[];
}

const defaultGroups: Group[] = [
  {
    id: '1',
    name: 'Гриффиндор',
    description: 'Среди наших учеников царит дух смелости и отваги. Мы приветствуем инициативу и поощряем самых ярких и активных',
    studentIds: ['1', '2', '3'],
    createdAt: new Date().toISOString(),
    color: 'gryffindor',
    points: 1280,
    tasks: [
      {
        id: 't1',
        title: 'Организация школьного спектакля',
        dateRange: '12.04 - 26.04',
        difficulty: 'Школьный уровень',
        status: 'not-started'
      },
      {
        id: 't2',
        title: 'Принять участие в викторине',
        dateRange: '10.04 - 17.04',
        difficulty: 'Муниципальный уровень',
        status: 'not-started'
      },
      {
        id: 't3',
        title: 'Поучаствовать во ВКОШП',
        dateRange: '10.04 - 17.04',
        difficulty: 'Всероссийский уровень',
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    name: 'Слизерин',
    description: 'Мудрость и хитрость - наши главные качества',
    studentIds: ['4', '5'],
    createdAt: new Date().toISOString(),
    color: 'slytherin',
    points: 1009,
  },
  {
    id: '3',
    name: 'Когтевран',
    description: 'Ум и знания превыше всего',
    studentIds: [],
    createdAt: new Date().toISOString(),
    color: 'ravenclaw',
    points: 963,
  },
];

const loadGroupsFromStorage = (): Group[] => {
  try {
    const saved = localStorage.getItem('hogwartsGroups');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading groups from localStorage:', error);
  }
  return defaultGroups;
};

const initialState: GroupsState = {
  groups: loadGroupsFromStorage(),
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Omit<Group, 'id' | 'createdAt' | 'points'>>) => {
      const newGroup: Group = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        points: 0,
      };
      state.groups.push(newGroup);
      localStorage.setItem('hogwartsGroups', JSON.stringify(state.groups));
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
        localStorage.setItem('hogwartsGroups', JSON.stringify(state.groups));
      }
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
      localStorage.setItem('hogwartsGroups', JSON.stringify(state.groups));
    },
    addStudentToGroup: (state, action: PayloadAction<{ groupId: string; studentId: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group && !group.studentIds.includes(action.payload.studentId)) {
        group.studentIds.push(action.payload.studentId);
        localStorage.setItem('hogwartsGroups', JSON.stringify(state.groups));
      }
    },
    removeStudentFromGroup: (state, action: PayloadAction<{ groupId: string; studentId: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.studentIds = group.studentIds.filter(id => id !== action.payload.studentId);
        localStorage.setItem('hogwartsGroups', JSON.stringify(state.groups));
      }
    },
    updateGroupPoints: (state, action: PayloadAction<{ groupId: string; points: number }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.points = action.payload.points;
        localStorage.setItem('hogwartsGroups', JSON.stringify(state.groups));
      }
    },
  },
});

export const { addGroup, updateGroup, removeGroup, addStudentToGroup, removeStudentFromGroup, updateGroupPoints } = groupsSlice.actions;
export default groupsSlice.reducer;
