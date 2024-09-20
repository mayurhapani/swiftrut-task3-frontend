import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import FileUpload from "./components/FileUpload";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const [filters, setFilters] = useState({ status: "", priority: "", assignee: "" });

  useEffect(() => {
    fetchTasks();
  }, [currentPage, filters]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        params: {
          page: currentPage,
          filters: filters,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Error exporting CSV");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <div className="mb-4">
        <FileUpload fetchTasks={fetchTasks} />
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      <TaskList tasks={tasks} />
      <Pagination
        currentPage={currentPage}
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
