'use client';

import { useTeacher } from '../../context/TeacherContext';

export default function TeachersPage() {
  const { teachers } = useTeacher();

  return (
    <div>
      <h1>All Teachers</h1>

      {teachers.length === 0 ? (
        <p>No teachers added yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
