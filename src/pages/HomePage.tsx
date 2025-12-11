import axios from "axios"
import React, { useState } from "react"
import type { Project } from "../types"

function HomePage() {

  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setinputPassword] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('PLEASE use a proper email🙄')
  const [emailInputVaild, setEmailInputVaild] = useState(false)
  const [currentProjects, setCurrentProjects] = useState<Project[]>([])
  const [inputProject, setInputProject] = useState('')
  const [inputDescription, setInputDescription] = useState('')
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')

  async function registerAccount() {
    if (inputEmail && inputPassword && emailInputVaild) {
      await axios.post(`http://localhost:4000/api/users/register`, {
        email: inputEmail,
        password: inputPassword,
        username: inputEmail,
      })
      await logIn()
    }
  }
  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setInputEmail(e.target.value)
    if (inputEmail.length >= 1 && inputEmail.includes("@")) {
      setEmailInputVaild(true)
    }
    else {
      setEmailInputVaild(false)
    }
  }
  async function logIn() {
    if (inputEmail && inputPassword && emailInputVaild) {
      try {
        axios.post(`http://localhost:4000/api/users/login`, {
          email: inputEmail,
          password: inputPassword,
          username: inputEmail,
        })
          .then(async (response) => {
            if (response.status == 400) {
              setUserLoggedIn(false)
              setErrorMessage(response.status.toString())
              return
            }
            setUserLoggedIn(true)
            setUserId(response.data.user._id)
            setToken(response.data.token)
            loadProjects(response.data.token)
          })
      }
      catch (error: any) {
        setErrorMessage(error.ToString())
      }
    }
  }
  async function logout() {
    setUserLoggedIn(false)
    setInputEmail('')
    setinputPassword('')
    setEmailInputVaild(false)
    setCurrentProjects([])
    setInputProject('')
    setInputDescription('')
    setUserId('')
    setToken('')
  }
  async function loadProjects(token: String) {
    const projects = axios.get('http://localhost:4000/api/projects/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setCurrentProjects((await projects).data)
  }
  async function submitProject() {
    if (inputDescription.length >= 1 && inputProject.length >= 1) {
      try {
        axios.post(`http://localhost:4000/api/projects/`, {
          user: userId,
          name: inputProject,
          description: inputDescription,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        await loadProjects(token)
      }
      catch (error: any) {
        setErrorMessage(error.ToString())
      }
    }
  }
  async function deleteProject(projectId: String) {
    try {
        axios.delete(`http://localhost:4000/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        await loadProjects(token)
      }
      catch (error: any) {
        setErrorMessage(error)
      }
  }

  if (!userLoggedIn) {
    return <div>
      <div className="flex justify-center mt-[300px]">
        <div className="mr-[200px]">
          <h1 className="text-8xl font-bold text-white">Pro Tasker</h1>
        </div>
        <div className="ml-[200px] bg-[#ffffff] rounded-[4px] p-[20px]">
          <div className="mb-[15px]">
            <form method="post">
              <input type="email" placeholder="Email" className="w-[450px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#303030] px-[10px] mb-[10px] block" required onChange={updateEmail} />
              <input type="text" placeholder="Password" className="w-[450px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#303030] px-[10px] mb-[10px] block" onChange={(e) => setinputPassword(e.target.value)} />
              <div className="flex justify-center">
                <p style={{ display: emailInputVaild ? "none" : "block" }} className="text-[#000000]">{errorMessage}</p>
              </div>
              <div className="flex justify-between mt-[40px]">
              <button type="button" className="bg-[#276fc2] hover:bg-[#1c5494] h-[60px] rounded-[4px] w-[50%] px-[10px] text-white text-xl font-bold mr-[15px]" onClick={logIn}>Log In</button>
              <button type="button" className="bg-[#179c3d] hover:bg-[#158a36] h-[60px] rounded-[4px] w-[50%] px-[10px] text-white text-xl font-bold ml-[15px]" onClick={registerAccount}>Create new account</button>
              </div>
            </form>
          </div>
          <div>
            <p className="text-[#adadad] text-s text-right">Don't have an account?</p>
            <div className="flex justify-center">
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  if (userLoggedIn) {
    return <div>
      <div className="flex justify-center">
        <div className="mb-[15px]">
          <h1 className="text-8xl font-bold text-white my-[25px]">Pro Tasker</h1>
          <div className="flex justify-center">
            <p className="text-white">Account: {inputEmail}</p>
          </div>
          <div className="flex justify-center">
            <button className="text-white hover:text-[#5863db] cursor-pointer" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="mx-[100px]">
        <div className="mb-[25px] flex justify-center">
          <form action="" method="post">
            <input type="email" placeholder="Project Name" className="w-[1000px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" required onChange={(e) => setInputProject(e.target.value)} />
            <input type="text" placeholder="Description" className="w-[1000px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" onChange={(e) => setInputDescription(e.target.value)} />
            <div className="flex justify-center">
              <button type="button" className="bg-[#276fc2] hover:bg-[#1c5494] w-[25%] h-[50px] rounded-[8px] text-white text-2xl font-bold" onClick={submitProject}>Create</button>
            </div>
          </form>
        </div>
        <h2 className="text-white text-4xl">Projects:</h2>
        <div className="flex">
          {currentProjects.map(project => (
            <div key={project._id}>
              <div className="mx-[10px]">
                <div className="bg-[#ffffff] w-[250px] mt-[25px] pb-[50px] rounded p-[10px]">
                  <h1 className="text-2xl font-bold">{project.name}</h1>
                  <div className="mt-[10px]">
                    <p className="truncate">{project.description}</p>
                  </div>
                </div>
                <div className="mt-[10px] justify-between flex">
                  <button className="bg-[#911a1a] hover:bg-[#801616] rounded w-[80px] text-white text-xl" onClick={() => deleteProject(project._id)}>Delete</button>
                  <button className="bg-[#808a7d] hover:bg-[#666e64] rounded w-[80px] text-white text-xl">Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  }
}

export default HomePage;
