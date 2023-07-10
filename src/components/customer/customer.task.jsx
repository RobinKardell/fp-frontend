import { Box, FormControl, FormLabel, Heading, Input, Text, Stack, HStack, VStack, Button, Checkbox, Select } from "@chakra-ui/react";
import { useState } from "react";

const Task = ({ task, onUpdateStatus, users }) => {
    const [selectedUser, setSelectedUser] = useState(task.userId);

    const handleCheckboxChange = (e) => {
        onUpdateStatus(task.id, e.target.checked, selectedUser);
    };

    const handleUserSelect = (e) => {
        setSelectedUser(parseInt(e.target.value));
        onUpdateStatus(task.id, task.completed, parseInt(e.target.value));
    };
    console.log(task)
    return (
        <HStack>
            <Checkbox isChecked={task.completed} onChange={handleCheckboxChange}>
                {task.title} {task.whenDate}
            </Checkbox>
            <Select value={selectedUser} onChange={handleUserSelect}>
                <option value={null}>Unassigned</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </Select>
        </HStack>
    );
};


const TaskForm = ({ onSubmit, users }) => {
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [userId, setUserId] = useState("");
    const [whenDate, setWhenDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, completed, userId, whenDate });
        setTitle("");
        setCompleted(false);
        setUserId("");
        setWhenDate("")
    };

    return (
        <form onSubmit={handleSubmit}>
            <Heading size={"md"}>Create task</Heading>
            <FormControl>
                <FormLabel>Task Title</FormLabel>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Assign to user</FormLabel>
                <Select
                    placeholder="Select user"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>Task Completed?</FormLabel>
                <Checkbox
                    isChecked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                >
                    Completed
                </Checkbox>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel>When will this been done?</FormLabel>
                <Input 
                    type="date"
                    value={whenDate} 
                    onChange={(e) => setWhenDate(e.target.value)}
                />
            </FormControl>
            <Button type="submit" mt={4}>
                Add Task
            </Button>
        </form>
    );
};


function Tasks() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Buy groceries", completed: false, userId: 1,whenDate:"" },
        { id: 2, title: "Do laundry", completed: true, userId: 1,whenDate:"" },
        { id: 3, title: "Finish React project", completed: false, userId: 3,whenDate:"" },
    ]);
    const [users, setUsers] = useState([
        { id: 1, name: "John Smith" },
        { id: 2, name: "Jane Doe" },
        { id: 3, name: "Bob Johnson" },
    ]);

    const handleAddTask = (task) => {
        const newTask = {
            id: tasks.length + 1,
            title: task.title,
            completed: task.completed,
            userId: task.userId,
            whenDate: task.whenDate
        };
        setTasks([...tasks, newTask]);
    };
    const updateTaskStatus = (taskId, completed) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed } : task
            )
        );
    };

    return (
        <Box>
            <Heading>Uppgifter att göra</Heading>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onUpdateStatus={updateTaskStatus} users={users} />

            ))}
            <TaskForm onSubmit={handleAddTask} users={users} />
        </Box>
    );
}
export default Tasks