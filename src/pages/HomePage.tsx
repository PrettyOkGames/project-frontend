import axios from "axios"
import { useState } from "react"

function HomePage() {

  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setinputPassword] = useState('')
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [emailInputVaild, setEmailInputVaild] = useState(false)
  //const [currentProjects, setCurrentProjects] = useState<[]>([])

  async function registerAccount() {
    if (inputEmail && inputPassword && emailInputVaild) {
      axios.post(`http://localhost:4000/api/users/register`, {
        email: inputEmail,
        password: inputPassword,
        username: inputEmail,
      })
      setUserLoggedIn(true)
    }
  }
  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setInputEmail(e.target.value)
    if (inputEmail.length >= 1) {
      setEmailInputVaild(true)
    }
    else {
      setEmailInputVaild(false)
    }
  }
  async function logIn() {
    if (inputEmail && inputPassword && emailInputVaild) {
      console.log("loggin")
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
            //fetch projects
            const projects = axios.get('http://localhost:4000/api/projects/', {
              headers: {
                'Authorization': `Bearer ${response.data.token}`
              }
            })
            console.log(await projects)
            //setCurrentProjects((await projects).data)
          })
      }
      catch (error: any) {
        setErrorMessage(error.ToString())
      }
    }
  }
  // async function submitProject() {

  // }

  if (!userLoggedIn) {
    return <div>
      <div className="flex justify-center mt-[300px]">
        <div className="mr-[200px]">
          <h1 className="text-8xl font-bold text-white">Pro Tasker</h1>
        </div>
        <div className="ml-[200px] bg-[#ffffff] rounded-[4px] p-[20px]">
          <div className="mb-[50px]">
            <form action="" method="post">
              <input type="email" placeholder="Email" className="w-[250px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" required onChange={updateEmail} />
              <input type="text" placeholder="Password" className="w-[250px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" onChange={(e) => setinputPassword(e.target.value)} />
              <button type="button" className="bg-[#276fc2] hover:bg-[#1c5494] w-full h-[50px] rounded-[4px] text-white text-2xl font-bold" onClick={logIn}>Log In</button>
              <div className="flex justify-center">
                <p style={{ color: emailInputVaild ? "#ffffff" : "#9c0300" }}>{errorMessage}</p>
              </div>
            </form>
          </div>
          <div>
            <p className="text-[#adadad] text-2xl mb-[15px]">Don't have an account?</p>
            <div className="flex justify-center">
              <button type="button" className="bg-[#179c3d] hover:bg-[#158a36] w-[80%] h-[50px] rounded-[4px] text-white text-xl" onClick={registerAccount}>Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  if (userLoggedIn) {
    return <div>
      <div className="flex justify-center">
        <div>
          <h1 className="text-8xl font-bold text-white my-[25px]">Pro Tasker</h1>
        </div>
      </div>
      <div className="mx-[100px]">
        <div className="mb-[25px] flex justify-center">
          <form action="" method="post">
            <input type="email" placeholder="Project Name" className="w-[1000px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" required />
            <input type="text" placeholder="Description" className="w-[1000px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" />
            <div className="flex justify-center">
              <button type="button" className="bg-[#276fc2] hover:bg-[#1c5494] w-[25%] h-[50px] rounded-[8px] text-white text-2xl font-bold" onClick={logIn}>Create</button>
            </div>
          </form>
        </div>
        <h2 className="text-white text-4xl">Projects:</h2>
        {/* <button type="button" className="bg-#c8c8c8 text-white border w-[100px] mt-[25px]">Fetch Users</button>
        <p className="mt-[25px] text-white">Users:</p> */}
      </div>
    </div>
  }
}

export default HomePage;
