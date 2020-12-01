import Firebase from "../config/firebase";

const fetchReports = async (type, city) => {
  return new Promise((resolve, reject) => {
    const todoRef = Firebase.database().ref(type).child(city);
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const dbReport = Object.keys(todos).map((key) => {
        return { ...todos[key], id: key };
      });
      resolve(dbReport);
    });
  });
};
export default fetchReports;
