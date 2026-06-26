import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();


  const passwordGenerator = useCallback(()=>{

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";

    if(charAllowed) str += "!@#$%^&*?<>/_₹";

    for(let i = 1; i<= length;i++){
      
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])


  // Copy Generated Password Function

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,200);
    window.navigator.clipboard.writeText(password)
  },[password])
    

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    
    <div className='bg-gray-800 w-1/2 mx-auto my-10 h-32 rounded-2xl flex flex-col justify-center items-center'>
     <h4 className='mb-2 mt-2 text-white'>Random Password Generator</h4>
     
     <div className='flex flex-row w-80 h-1/4  mt-3.5 mb-5'>
     <input
     type='text'
     value={password}
     className='bg-gray-200 w-80 h-8 outline-none px-2 my-auto text-orange-500 rounded-l-sm'
     placeholder='password'
     ref={passwordRef}
     readOnly
     />
     <button onClick={copyPasswordToClipboard} className='bg-blue-600 text-white text-sm rounded-r-sm h-8  px-1 hover:bg-blue-700'>Copy</button>
     </div>
     
     
     <div className="flex justify-center items-center gap-3 w-full">
       
        <input
          type="range"
          min={8}
          max={30}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-20 cursor-pointer text-orange-500"
        />

        <label className="text-orange-500  whitespace-nowrap">
          Length: {length}
        </label>

        <input
          type="checkbox"
          className="cursor-pointer"
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }}
        />
        <label className="text-orange-500 whitespace-nowrap">
          Numbers
        </label>

        <input
          type="checkbox"
          className="cursor-pointer"
          defaultChecked={charAllowed}
          onChange={()=>{
            setCharAllowed((prev) => !prev)
          }}
        />
        <label className="text-orange-500 whitespace-nowrap">
          Characters
        </label>
      </div>
    </div>
    </>
  )
}

export default App
