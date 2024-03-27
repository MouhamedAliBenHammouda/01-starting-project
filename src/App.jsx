import { useState } from "react";
import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelecte";
import ProjectsSidebar from "./Components/ProjectsSideBar";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectsState,setProjectsState]=useState({
    selctedProjectId:undefined,
    projects:[],
    task:[]
  });

  function handleAddTask(text){
    setProjectsState(prevState=>{
      const taskId=Math.random();
      const newTask={
        text:text,
        projectId:prevState.selctedProjectId,
        id:taskId,
      }
      return {
        ...prevState,
        task:[newTask,...prevState.task]
      };
    }
    )

  }

  function handleDeleteTask(id){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        task:prevState.task.filter((tas)=>tas.id!==id)
      };
    })
  }

  function handleSelectProject(id){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selctedProjectId:id,
      };
    })
  }
  function handelStartAddProject(){
      setProjectsState(prevState=>{
        return{
          ...prevState,
          selctedProjectId:null,
        };
      })
  }

  function hnadleCancelAddProject (){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selctedProjectId:undefined,
      };
    })
  }

  function handleAddProject(projectData){
    setProjectsState(prevState=>{
      const newProject={
        ...projectData,
        selctedProjectId:Math.random()
      }
      return {
        ...prevState,
        selctedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      };
    }
    )
  }

  function handleDeleteProject(){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selctedProjectId:undefined,
        projects:prevState.projects.filter((project)=>project.selctedProjectId!==prevState.selctedProjectId)
      };
    })
  }

  const selectedProject = projectsState.projects.find(pr=>pr.selctedProjectId===projectsState.selctedProjectId)

  let content=<SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask} 
  onDeleteTask={handleDeleteTask}
  task={projectsState.task}
  />
  
  if(projectsState.selctedProjectId===null){
    content =<NewProject onAdd={handleAddProject} onCancel={hnadleCancelAddProject}/>
  }else if(projectsState.selctedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handelStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
      onStartAddProject={handelStartAddProject} 
      projects={projectsState.projects}
      onSelectProject={handleSelectProject}
      selctedProjectId={projectsState.selctedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
