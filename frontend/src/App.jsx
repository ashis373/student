import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";

function Navigation() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
        Add Student
      </Link>
      <Link to="/student" className={`nav-link ${location.pathname === '/student' ? 'active' : ''}`}>
        View Students
      </Link>
    </nav>
  );
}

function AddStudent() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [cls, setCls] = useState("");
  const [success, setSuccess] = useState(false);

  function saveStudent(e) {
    e.preventDefault();
    axios.post(
      "/api/student.php",
      {
        student_name: name,
        roll_no: roll,
        class_name: cls
      }
    )
    .then(res => {
      console.log(res.data);
      setName("");
      setRoll("");
      setCls("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div className="container">
      <h1>Admin Student Panel</h1>
      
      {success && <div className="success-message">Student added successfully!</div>}
      
      <form onSubmit={saveStudent} className="form-group">
        <input
          placeholder="Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Roll No"
          value={roll}
          onChange={e => setRoll(e.target.value)}
          required
        />
        <input
          placeholder="Class"
          value={cls}
          onChange={e => setCls(e.target.value)}
          required
        />
        <button type="submit">Save Student</button>
      </form>
    </div>
  );
}

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("/api/student.php")
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h1>Student Directory</h1>
      
      <div className="student-grid">
        {students.map((s) => (
          <div key={s.id} className="student-card">
            <div className="name">{s.student_name}</div>
            <div className="details">
              <span><strong>Roll:</strong> {s.roll_no}</span>
              <span><strong>Class:</strong> {s.class_name}</span>
            </div>
          </div>
        ))}
        
        {students.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', gridColumn: '1 / -1' }}>
            No students found. Add some students first!
          </p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<AddStudent />} />
        <Route path="/student" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;