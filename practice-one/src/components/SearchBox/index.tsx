// react
import React, { useState, useEffect, useCallback } from 'react';

// components
import Input from '@components/common/Input';

// types
import { StudentProfile } from 'src/types';

import debounce from 'lodash/debounce';


interface StudentSearchProps {
    students: StudentProfile[];
    onSearchResult: (filteredStudents: StudentProfile[]) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ students, onSearchResult }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const debounceSearch = useCallback(
        debounce(query => {
            const filteredStudents = students.filter(student =>
                student.name.toLowerCase().includes(query.toLowerCase()) || 
                student.email.toLowerCase().includes(query.toLowerCase())
            );
            onSearchResult(filteredStudents);
        }, 300),
        [students, onSearchResult] 
    );
    
    useEffect(() => {
        debounceSearch(searchQuery);
        return () => debounceSearch.cancel();
    }, [searchQuery, debounceSearch]);
    

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
