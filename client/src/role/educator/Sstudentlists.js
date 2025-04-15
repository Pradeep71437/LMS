import React from "react";

export default function Studentlist({
  filteredLearners = [], // Default to an empty array if undefined
  selectedStudents = [], // Default to an empty array if undefined
  setSelectedStudents,
}) {
  // Function to handle selecting/deselecting a student
  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId) // Remove if already selected
        : [...prev, studentId] // Add if not selected
    );
  };

  return (
    <div className="student-list">
      {filteredLearners.length > 0 ? (
        filteredLearners.map((student) => (
          <div key={student.id || student._id} className="student-item">
            <input
              type="checkbox"
              checked={selectedStudents.includes(student.id || student._id)}
              onChange={() =>
                handleSelectStudent(student.id || student._id) // Use `_id` if `id` is missing
              }
            />
            {student.name || "Unnamed Student"} {/* Fallback for missing name */}
          </div>
        ))
      ) : (
        <p>No students found.</p> // Show a message if there are no learners
      )}
    </div>
  );
}
