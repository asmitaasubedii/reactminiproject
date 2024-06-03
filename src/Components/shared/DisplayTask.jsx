import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { EditTask } from "./EditTask";
import { useDrag } from "react-dnd";

export const DisplayTask = ({ task, taskList, setTaskList, index }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: index,
      fieldData: task.fieldData,
      timestamp: task.timestamp,
      duration: task.duration,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = (itemId) => {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    // setTaskList((currentTasks) =>
    //   currentTasks.filter((todo) => todo.id !== itemId)
    // );
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };
  const handleStop = () => {
    setRunning(false);
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      fieldData: task.fieldData,
      timestamp: task.timestamp,
      duration: time,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();
  };
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <div
        className="flex flex-col item-start justify-start bg-white my-4  py-4 px-6 w-3/4 max-w-lg  border rounded shadow-md"
        ref={drag}
      >
        <div className="flex flex-row justify-between w-full">
          <p className="font-semibold text-xl">{task.fieldData.projectName}</p>
          <EditTask
            taskList={taskList}
            setTaskList={setTaskList}
            index={index}
            task={task}
          />
        </div>
        <p className="text-lg py-2 overflow-hidden">
          {task.fieldData.projectDescription}
        </p>
        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly pb-4">
          <div className="sm:w-1/4 text-xl font-semibold py-4">
            <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span className="text-sm">
              {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
          </div>
          <div className="w-1/3 max-w-sm flex  justify-center gap-4 ">
            {running ? (
              <Button
                buttonText="Stop"
                className="border rounded-lg py-1 px-3.5"
                onClick={handleStop}
              ></Button>
            ) : (
              <>
                <Button
                  buttonText="Start"
                  className="border rounded-lg py-1 px-3.5"
                  onClick={() => setRunning(true)}
                ></Button>
              </>
            )}
            <Button
              buttonText="Reset"
              className="border rounded-lg py-1 px-2.5"
              onClick={() => setTime(0)}
            ></Button>
          </div>
        </div>

        <div className="flex  justify-center w-full">
          <Button
            buttonText="Delete"
            onClick={handleDelete}
            className="bg-red-500 text-white text-sm uppercase font-semibold px-3 py-1.5 mb-1 rounded-lg"
          />
        </div>
      </div>
    </>
  );
};
