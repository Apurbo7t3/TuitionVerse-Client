const SubjectFilter = ({ subjects, selectedSubject, onSubjectChange }) => {
    return (
        <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Subject</label>
            <select
                value={selectedSubject}
                onChange={(e) => onSubjectChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-none bg-white transition-colors hover:border-gray-300"
            >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                    <option value={subject} key={subject}>{subject}</option>
                ))}
            </select>
        </div>
    );
};

export default SubjectFilter;