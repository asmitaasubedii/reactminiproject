import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

const initialData = {
  projectName: "",
  projectDescription: "",
};
export const EditTask = ({ taskList, setTaskList, index, task }) => {
  const [editModal, setEditModal] = useState(false);
  const [fieldData, setFieldData] = useState(initialData);
  useEffect(() => {
    setFieldData(task.fieldData);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
  };
  {
    console.log("EDIT MODULE", fieldData);
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      fieldData,
      timestamp: task.timestamp,
      duration: task.duration,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.location.reload();

    setEditModal(false);
    setFieldData(initialData);
  };
  return (
    <div>
      <Button
        buttonText="Edit"
        onClick={() => setEditModal(true)}
        className="bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg"
      />
      {editModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 translate-y-16">
            <div className="w-8/12 bg-white border rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5  ">
                <h3 className=" text-2xl uppercase font-semibold">Edit Task</h3>
                <Button
                  buttonText="x"
                  onClick={() => setEditModal(false)}
                  className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold block"
                />
              </div>
              <form className="pt-4 px-6">
                <div>
                  <label className="tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2">
                    Project Name
                  </label>
                  <Input
                    placeholder="Project name"
                    type="text"
                    id="project-name"
                    name="projectName"
                    value={fieldData.projectName}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2">
                    Project Description
                  </label>
                  <textarea
                    id="task-description"
                    name="projectDescription"
                    value={fieldData.projectDescription}
                    rows="3"
                    required
                    onChange={handleChange}
                    placeholder="Task Description"
                    className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                  />
                </div>
              </form>
              <div className="flex justify-end p-6">
                <Button
                  type="submit"
                  buttonText="Update Task"
                  onClick={handleUpdate}
                  className="text-white bg-blue-500 uppercase text-sm
                font-semibold rounded-xl py-2 pl-3 pr-3.5 mx-1"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
