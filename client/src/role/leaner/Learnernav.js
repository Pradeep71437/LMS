import React from 'react'

export default function Learnernav({setlearnernav,learnernav}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="space-x-4 flex justify-around items-center p-4">
        <button
          onClick={() => setlearnernav("studyplan")}
          className={`px-4 py-2 rounded-lg ${
            learnernav === "studyplan" ? "bg-blue-500 text-white" : "bg-red-500"
          }`}
        >
          Study Plan
        </button>
        <button
          onClick={() => setlearnernav("assignment")}
          className={`px-4 py-2 rounded-lg ${
            learnernav === "assignment" ? "bg-blue-500 text-white" : "bg-red-500"
          }`}
        >
          Assignments
        </button>
        <button
          onClick={() => setlearnernav("courses")}
          className={`px-4 py-2 rounded-lg ${
            learnernav === "courses" ? "bg-blue-500 text-white" : "bg-red-500"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setlearnernav("feedback")}
          className={`px-4 py-2 rounded-lg ${
            learnernav === "feedback" ? "bg-blue-500 text-white" : "bg-red-500"
          }`}
        >
          Feedback
        </button>
      </div>
    </div>
  )
}
