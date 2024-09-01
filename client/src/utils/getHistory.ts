export const getHistory = () => {
  const history = localStorage.getItem("keywordHistory");
  return history ? history.split(",") : [];
}