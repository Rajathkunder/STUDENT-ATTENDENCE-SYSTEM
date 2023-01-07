import React, { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';


function App() {
  const [rollNumber, setRollNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  }

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const currentTime = new Date();
const checkInTime = currentTime.toLocaleString();

const newAttendanceData = [...attendanceData, { rollNumber, studentName, checkInTime }];
setAttendanceData(newAttendanceData);
setRollNumber('');
setStudentName('');


  }
  const checkedInCount = useCheckedInCount(attendanceData, setAttendanceData);

  return (

    <><>
    <header  className="mt-1" style={{ textAlign: 'center', backgroundColor: '#6a5acd', color: 'white', padding: '20px' }}>
  <h2 style={{ margin: 0 }}>STUDENT ATTENDENCE SYSTEM</h2>
</header>

    <div className="container mt-3">
  <form onSubmit={handleSubmit} className="form-inline justify-content-center mt-2">
    <div className="form-group mr-2">
      <label htmlFor="rollNumber" className="sr-only">Roll Number</label>
      <input type="text" className="form-control mt-2" id="rollNumber" value={rollNumber} onChange={handleRollNumberChange} placeholder="Roll Number" required/>
    </div>
    <div className="form-group mr-2">
      <label htmlFor="studentName" className="sr-only mt-2">Student Name</label>
      <input type="text" className="form-control mt-2" id="studentName" value={studentName} onChange={handleStudentNameChange} placeholder="Student Name" required/>
    </div>
    <button type="submit" className="btn btn-primary mt-2">Check In</button>
  </form>
</div>
<Table  responsive striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>ROLL NO</th>
            <th>NAME</th>
            <th>CHECK IN</th>
            <th>CHECK OUT</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student) => (
            <tr key={student.rollNumber} >
              <td>{student.rollNumber}</td>
        <td>{student.studentName}</td>
        <td>{student.checkInTime}</td>
        <td>{student.checkOutTime || '-'}</td>
              <td><button onClick={() => handleCheckOut(student.rollNumber,attendanceData, setAttendanceData)} className="btn btn-danger">Check Out</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table></>
      <footer class="fs-5" style={{ textAlign: 'center', backgroundColor: '#6a5acd', color: '#fff', padding: '20px' }}>
      <p><b>NUMBER OF STUDENTS CHECKED IN : {checkedInCount}</b></p></footer></>
      

  
  );
}


function useCheckedInCount(attendanceData, setAttendanceData) {
  const [checkedInCount, setCheckedInCount] = useState(0);

  useEffect(() => {
    const checkedInStudents = attendanceData.filter((student) => !student.checkOutTime);
    setCheckedInCount(checkedInStudents.length);
  }, [attendanceData]);

  return checkedInCount;
}

const handleCheckOut = (rollNumber,attendanceData, setAttendanceData) => {
  const updatedAttendanceData = attendanceData.map((student) => {
    if (student.rollNumber === rollNumber) {
      const currentTime = new Date();
      const checkOutTime = currentTime.toLocaleString();
      return { ...student, checkOutTime };
    }
    return student;
  });
  setAttendanceData(updatedAttendanceData);
}

export default App;
