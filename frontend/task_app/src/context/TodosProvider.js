import { createContext, useState } from "react";

// const initValue = {todosData: [], setTodos: () => {}}
const TodosContext = createContext({});

export const TodosProvider = ({ children }) => {
    const [todosData, setTodos] = useState([]);

    return (
        <TodosContext.Provider value={{ todosData, setTodos }}>
            {children}
        </TodosContext.Provider>
    )
}

export default TodosContext