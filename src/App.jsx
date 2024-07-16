import { useState , useCallback,useEffect, useRef } from "react"


function App() {
const[length, setlength] = useState(8)
const[numallowed, setNumallowed]= useState(false)
const[charallowed, setCharallowed]= useState(false)
const[password, setpassword]= useState("")

   const passgenerator =useCallback(()=>{
    let pass= ''
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if(numallowed){
      string +="0123456789"
    }
    if(charallowed){
      string +="@!#$%^&*{}"
    }
    for(let i=1; i<=length; i++){
      let newset = Math.floor(Math.random()*string.length+1)
      pass += string.charAt(newset)
    }
   setpassword(pass)

   }
    ,[length,numallowed,charallowed])

    useEffect(()=>{
      passgenerator()
    }
      ,[length,numallowed,charallowed,passgenerator])

      const passref = useRef(null)
      const handlecopy = ()=>{
        passref.current?.select()

        window.navigator.clipboard.writeText(password)
      }

  return (
    <div className="h-screen w-screen bg-blue-800 flex justify-center items-center">
       <div className="bg-white p-10 py-14 rounded-3xl">
<div className="flex mb-3">
  
          <input type="text" 
          value={password}
          readOnly
         placeholder="Password"
         className="p-3 rounded-l-xl outline-none w-full"
        ref={passref}
          />
          <button
          onClick={handlecopy}
          className="bg-blue-700 p-3  rounded-r-xl text-white">Copy</button>
         </div>

<div className="gap-2 flex">
   {/* range */}
    <input type="range" 
    min={6}
    max={100}
    value={length}
    onChange={(e)=>{setlength(e.target.value)}}
      
    />
<label>Length : {length}</label>


{/* numalowed */}
<input type="checkbox" id=""
defaultChecked= {numallowed}
onChange={()=>{setNumallowed((prev)=> !prev)}}
/>
<label >Numbers</label>

{/* charallowed */}
<input type="checkbox" id=""
defaultChecked= {charallowed}
onChange={()=>{setCharallowed((prev)=> !prev)}}
/>
<label >Characters</label>
</div>
 

       </div>
         

    </div>
  )
}

export default App
