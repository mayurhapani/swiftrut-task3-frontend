import axios from "axios";
import { toast } from "react-toastify";

const FileUpload = ({ fetchTasks }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/tasks/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully.");
      fetchTasks(); // Re-fetch the tasks after upload
    } catch (error) {
      toast.error("Error uploading file.");
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
      >
        Upload CSV
      </button>
    </div>
  );
};

export default FileUpload;
