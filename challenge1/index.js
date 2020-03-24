const express = require('express');

const server = express();
server.use(express.json());

var nRequests = 0;
server.use((req, res, next) => {
  nRequests++;
  console.time(`Request ${nRequests}`);
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd(`Request ${nRequests}`);
});

function checkProjectInArray(req, res, next) {
  const id = req.params.id;
  var index = getIndexOfProjectById(id, projects);

  if (index !== false) {
    return next();
  }
  else {
    return res.status(400).json({ error: "Project does not exist." });
  }
}

function findProjectAddTask(id, task) {
  var projectIndex = getIndexOfProjectById(id, projects);
  return projects[projectIndex].tasks.push(task);
}

function getIndexOfProjectById(id, projects) {
  for (let [index, project] of projects.entries()) {
    if (project.id == id) {
      return index;
    }
  }
  return false;
}

var projects = [{
  id: "1",
  title: "First project",
  tasks: []
}];

// List all projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Add new project
server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  var project = {
    id,
    title,
    tasks
  };

  projects.push(project);

  return res.send("Inserted new project.");
});

// Add task to project's tasks list by project id
server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  findProjectAddTask(id, title);

  return res.send("Added task.");
});

// Delete project by id
server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;

  var projectId = getIndexOfProjectById(id, projects);
  projects.splice(projectId, 1);

  return res.send("Deleted project.");
});

// Edit project title by project's id
server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  var projectId = getIndexOfProjectById(id, projects);
  var oldTitle = projects[projectId].title;

  projects[projectId].title = title;

  return res.send(`Edited project's title from "${oldTitle}" to "${title}."`);
});

server.listen(2832);
