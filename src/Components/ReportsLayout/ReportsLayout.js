import React, { useEffect, useState } from "react";
import './ReportsLayout.css'; // optional, for styling

const ReportsLayout = () => {
  const [doctorReports, setDoctorReports] = useState([]);

  const formatDoctorName = (name) => {
    return name
        .toLowerCase()
        .replace(/\./g, '')          // remove all dots
        .replace(/\s+/g, '_');       // replace spaces with underscores
    };

  useEffect(() => {
    // Example: pull one or more doctors from localStorage
    const storedDoctor = localStorage.getItem("doctorData");

    if (storedDoctor) {
      const parsed = JSON.parse(storedDoctor);
      setDoctorReports([parsed]); // wrap in array if it's a single object
    } else {
      // fallback mock data
      setDoctorReports([
        {
          name: "Dr. Paul A. Wilkins",
          speciality: "Dentist",
        },
        {
          name: "Dr. John D. Monty",
          speciality: "Immunology",
        }
      ]);
    }
  }, []);

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {doctorReports.map((doctor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <button className="view-btn" onClick={() => alert(`Viewing report for ${doctor.name}`)}>
                  View Report
                </button>
              </td>

              <td>
                <button
                    className="download-btn"
                    onClick={() => {
                        const filename = formatDoctorName(doctor.name) + ".pdf";
                        const fileUrl = `/reports/${filename}`;
                        fetch(fileUrl)
                        .then((res) => {
                            if (!res.ok || !res.headers.get("Content-Type")?.includes("application/pdf")) {
                            throw new Error("File not found or not a valid PDF");
                            }
                            return res.blob();
                        })
                        .then((blob) => {
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            window.URL.revokeObjectURL(url);
                        })
                        .catch(() => {
                            alert(`Sorry, the report for ${doctor.name} is not available.`);
                        });
                    }}
                    >
                    Download Report
                </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
