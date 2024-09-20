const Pagination = ({ currentPage, tasksPerPage, totalTasks, setCurrentPage }) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <nav>
        <ul className="flex justify-center space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => handleClick(number)}
                className={`px-3 py-1 border rounded ${
                  currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
