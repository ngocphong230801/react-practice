import React, { useState, useEffect } from 'react';
import Input from "../../components/common/Input";
import { StudentProfile } from 'src/types';

interface StudentSearchProps {
    students: StudentProfile[];
    onSearchResult: (filteredStudents: StudentProfile[]) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ students, onSearchResult }) => {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const filteredStudents = students.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        onSearchResult(filteredStudents);
    }, [searchQuery, students, onSearchResult]);
    

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Input
            className="secondary"
            type="text"
            name="search-box"
            placeholder="Search for a student by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
        />
    );
};

export default StudentSearch;
