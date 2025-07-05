import React, { useEffect, useState } from "react";
import TaskForm from "./taskForm";
import { useParams } from "react-router-dom";
import { Task } from "../types/task";
import axios from "axios";

const EditTask = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <TaskForm OntaskCreated={() => {}} />
      </div>
    </div>
  );
};

export default EditTask; // This component is a placeholder for the edit task functionality.
