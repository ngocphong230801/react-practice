import { StoryObj, Meta } from '@storybook/react';
import InformationStudent, { InformationStudentProps } from './index';
import { StudentProfile } from '../../types'; 
import "../../index.css"
import "./Information.css"

const sampleStudent: StudentProfile = {
  studentID: 98898,
  name: 'John Doe',
  imageUrl: 'https://i.ibb.co/MR3sF65/avt1.jpg',
  age: 17,
  gender: "Male",
  phone: 979245571,
  email: 'nnphong962015@gmail.com',
  classes: 'Math, Science',
  password: 'password123'
};

const sampleStudents: StudentProfile[] = [
  { ...sampleStudent, studentID: 12346, name: 'Nguyen Ngoc Phong' },
  { ...sampleStudent, studentID: 31455, name: 'Phong Nguyen' },
  { ...sampleStudent, studentID: 3147, name: 'Phong Nguyen', imageUrl: 'https://i.ibb.co/HqTbBRY/avt2.jpg' },
];

export default {
  title: 'Components/InformationStudent',
  component: InformationStudent,
} as Meta;

export const Default: StoryObj<InformationStudentProps> = {
    args : {
        student: sampleStudent,
        students: sampleStudents,
    }
}
