import React, { useState } from "react";
import { Input } from "../shared/input";
import { Button } from "../shared/button";

export const Todo = () => {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const onChange = (e) => {
    let { name, value } = e.target;
    setInput(value);
    console.log(input);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setTaskList([...taskList, input]);
    setInput("");
    console.log(taskList);
  };
  const handleDelete = (task, index) => {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    setTaskList((currentTasks) =>
      currentTasks.filter((todo) => index === removeIndex)
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center m-6">
        <h1 className="text-xl font-semibold"> To Do Board</h1>
        <form className="flex gap-3 py-6">
          <Input
            type="text"
            name="tododata"
            placeholder="Add a task"
            value={input}
            onChange={(e) => onChange(e)}
            className="border rounded-lg px-6 py-2 text-lg"
            taskList={taskList}
            setTaskList={setTaskList}
          />
          <Button
            type="submit"
            onClick={handleClick}
            className="border rounded-lg px-4 py-2 text-white bg-green-600 font-semibold hover:opacity-90 hover:border-green-800 hover:shadow-xl"
            buttonText="Add"
          />
        </form>
      </div>
      <div className="grid grid-cols-3 px-4 sm:px-8 md:px-10 lg:px-12">
        {taskList.map((task, index) => {
          return (
            <div
              key={index}
              className="max-w-xl flex flex-col item-center justify-center text-center border py-4"
            >
              <p className="py-4">{task}</p>
              <Button
                buttonText="delete"
                onClick={() => handleDelete(task, index)}
                className="bg-red-700 text-white px-4 py-2 rounded-lg font-normal text-xs"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
