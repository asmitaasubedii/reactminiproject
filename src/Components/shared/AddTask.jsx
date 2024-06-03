import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
const initialData = {
  projectName: "",
  projectDescription: "",
};
export const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [fieldData, setFieldData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
    setErrorMessage("");
    if (fieldData.projectName === "") {
      setErrorMessage("Please Enter Project Name To Continue");
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!fieldData.projectName) {
      setErrorMessage("Please Enter Project Name To Continue");
    } else {
      let timestamp = new Date();
      let tempList = taskList;
      console.log("first", fieldData);
      tempList.push({ fieldData, timestamp: timestamp, duration: 0 });
      localStorage.setItem("taskList", JSON.stringify(tempList));
      window.location.reload();
      setTaskList([...taskList, { fieldData, timestamp: timestamp }]);
    }
    setAddModal(false);
    setFieldData(initialData);
  };

  return (
    <div>
      <Button
        type="button"
        buttonText="+ New"
        onClick={() => setAddModal(true)}
        className="text-white bg-blue-500 uppercase text-sm font-semibold rounded-xl py-2 pl-3 pr-3.5 mx-1"
      />
      {addModal ? (
        <>
          <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 translate-y-16">
            <div className="w-8/12 bg-white border rounded-lg shadow-md relative flex flex-col">
              <div className="flex flex-row justify-between p-5  ">
                <h3 className=" text-2xl uppercase font-semibold">
                  Add New Task
                </h3>
                <Button
                  buttonText="x"
                  onClick={() => setAddModal(false)}
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
                    className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  />
                  <p className="text-red-500 text-center mt-2 mb-5">
                    {errorMessage}
                  </p>
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
                  buttonText="Add Task"
                  onClick={handleAdd}
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
