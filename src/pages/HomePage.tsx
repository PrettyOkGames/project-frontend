

function HomePage() {
  
  function login() {

  }

  return (
    //If not logged in
    <div>
      <div className="flex justify-center mt-[500px]">
        <div className="mr-[200px]">
          <h1 className="text-8xl font-bold text-white">Pro Tasker</h1>
        </div>
        <div className="ml-[200px] bg-[#ffffff] rounded-[4px] p-[20px]">
          <div className="mb-[50px]">
            <form action="" method="post">
              <input type="text" placeholder="Email" className="w-[250px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" />
              <input type="text" placeholder="Password" className="w-[250px] h-[50px] border-[#c2c2c2] border-[1px] rounded-[8px] text-[#adadad] px-[10px] mb-[15px] block" />
              <button type="button" className="bg-[#276fc2] hover:bg-[#1c5494] w-full h-[50px] rounded-[4px] text-white text-2xl font-bold" onClick={() => console.log("Hey")}>Log In</button>
            </form>
          </div>
          <div>
            <p className="text-[#adadad] text-2xl mb-[15px]">Don't have an account?</p>
            <div className="flex justify-center">
              <button type="button" className="bg-[#179c3d] hover:bg-[#158a36] w-[80%] h-[50px] rounded-[4px] text-white text-xl" onClick={() => console.log("Hey")}>Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
