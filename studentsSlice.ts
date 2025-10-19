import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  createdAt: string;
  gender?: 'male' | 'female';
  birthDate?: string;
  grade?: string;
  points?: number;
}

interface StudentsState {
  students: Student[];
}

const defaultStudents: Student[] = [
  {
    id: '1',
    firstName: 'Александр',
    lastName: 'Гришенкин',
    phone: '+7 900 123-45-67',
    email: 'ivan@example.com',
    createdAt: new Date().toISOString(),
    grade: '11.2',
    points: 215,
  },
  {
    id: '2',
    firstName: 'Ксения',
    lastName: 'Харитонова',
    phone: '+7 900 234-56-78',
    email: 'maria@example.com',
    createdAt: new Date().toISOString(),
    grade: '10.2',
    points: 200,
  },
  {
    id: '3',
    firstName: 'Олеся',
    lastName: 'Михальчук',
    phone: '+7 900 345-67-89',
    createdAt: new Date().toISOString(),
    grade: '8.1',
    points: 190,
  },
  {
    id: '4',
    firstName: 'Андрей',
    lastName: 'Романович',
    phone: '+7 900 456-78-90',
    createdAt: new Date().toISOString(),
    grade: '10.2',
    points: 160,
  },
  {
    id: '5',
    firstName: 'Игорь',
    lastName: 'Алексеевич',
    phone: '+7 900 567-89-01',
    createdAt: new Date().toISOString(),
    grade: '11.2',
    points: 130,
  },
];

const loadStudentsFromStorage = (): Student[] => {
  try {
    const saved = localStorage.getItem('hogwartsStudents');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading students from localStorage:', error);
  }
  return defaultStudents;
};

const initialState: StudentsState = {
  students: loadStudentsFromStorage(),
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
      localStorage.setItem('hogwartsStudents', JSON.stringify(state.students));
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
      localStorage.setItem('hogwartsStudents', JSON.stringify(state.students));
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
        localStorage.setItem('hogwartsStudents', JSON.stringify(state.students));
      }
    },
  },
});

export const { addStudent, removeStudent, updateStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
