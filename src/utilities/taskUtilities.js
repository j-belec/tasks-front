const getStatus = (status) => {
  switch (status) {
    case 1:
      return "Open";
    case 2:
      return "In progress";
    case 3:
      return "Completed";
    default:
      return;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "#7a7a7a7c";
    case 2:
      return "#2581b68a";
    case 3:
      return "#2aa3307c";
    default:
      return;
  }
};

const getPriority = (status) => {
  switch (status) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return;
  }
};

const getPriorityColor = (status) => {
  switch (status) {
    case 1:
      return "#2f44ff77";
    case 2:
      return "#e2bf22c9";
    case 3:
      return "#ff282879";
    default:
      return;
  }
};

export { getStatus, getStatusColor, getPriority, getPriorityColor };
