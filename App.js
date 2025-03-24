
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const initialProjects = [
  {
    id: 1,
    name: "Downtown Office Build",
    location: "New York, NY",
    budget: 12000000,
    progress: 40,
    goals: [
      { group: "Women", target: 30, current: 25 },
      { group: "Minorities", target: 40, current: 35 }
    ],
    tasks: [
      { name: "Foundation", status: "Complete" },
      { name: "Framing", status: "In Progress" },
      { name: "Electrical", status: "Not Started" }
    ],
    costs: {
      projected: 12000000,
      actual: 10500000
    },
    subcontractors: [
      { name: "ABC Concrete", trade: "Foundation", amountPaid: 2000000 },
      { name: "XYZ Electric", trade: "Electrical", amountPaid: 0 }
    ],
    documents: [
      { name: "Contract - ABC Concrete.pdf" },
      { name: "Invoice - XYZ Electric.pdf" }
    ],
    changeOrders: [
      { description: "Add second elevator", approved: true },
      { description: "Modify HVAC system", approved: false }
    ]
  }
];

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  const handleDocumentUpload = (event) => {
    const files = event.target.files;
    for (let file of files) {
      console.log("Simulated upload:", file.name);
      if (selectedProject) {
        const newDoc = { name: file.name };
        const updated = {
          ...selectedProject,
          documents: [...selectedProject.documents, newDoc]
        };
        setSelectedProject(updated);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto grid gap-6">
      <h1 className="text-3xl font-bold text-center">Construction Project Dashboard</h1>

      {!selectedProject ? (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 bg-white rounded-xl shadow cursor-pointer hover:bg-gray-50" onClick={() => handleSelectProject(project)}>
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>{project.location}</p>
              <p>Budget: ${project.budget.toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded" style={{ width: `${project.progress}%` }}></div>
              </div>
              <p className="text-sm mt-1">Progress: {project.progress}%</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          <button onClick={handleBack} className="text-blue-600 underline text-sm">← Back to Projects</button>
          <h2 className="text-2xl font-semibold">{selectedProject.name}</h2>
          <p>{selectedProject.location}</p>
          <p>Budget: ${selectedProject.budget.toLocaleString()}</p>

          <div className="grid gap-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Tasks</h3>
              <ul className="list-disc pl-6">
                {selectedProject.tasks.map((task, i) => (
                  <li key={i}>{task.name} - <strong>{task.status}</strong></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Budget</h3>
              <p>Projected: ${selectedProject.costs.projected.toLocaleString()}</p>
              <p>Actual: ${selectedProject.costs.actual.toLocaleString()}</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[selectedProject.costs]}>
                  <XAxis dataKey="label" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projected" fill="#8884d8" />
                  <Bar dataKey="actual" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Subcontractors</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={selectedProject.subcontractors} dataKey="amountPaid" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {selectedProject.subcontractors.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Documents</h3>
              <input type="file" multiple onChange={handleDocumentUpload} className="mb-2" />
              <ul className="list-disc pl-6">
                {selectedProject.documents.map((doc, i) => (
                  <li key={i}>{doc.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
