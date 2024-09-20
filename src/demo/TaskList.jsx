const TaskList = ({ tasks }) => {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/4 px-4 py-2">Title</th>
          <th className="w-1/4 px-4 py-2">Description</th>
          <th className="w-1/4 px-4 py-2">Due Date</th>
          <th className="w-1/4 px-4 py-2">Priority</th>
          <th className="w-1/4 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border px-4 py-2">{task.title}</td>
            <td className="border px-4 py-2">{task.description}</td>
            <td className="border px-4 py-2">{task.dueDate}</td>
            <td className="border px-4 py-2">{task.priority}</td>
            <td className="border px-4 py-2">{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default TaskList;
