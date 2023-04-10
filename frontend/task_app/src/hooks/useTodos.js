import { useContext } from "react";
import TodosProvider from "../context/TodosProvider";
 const useTodos = () => {
     return useContext(TodosProvider);
 }

 export default useTodos;