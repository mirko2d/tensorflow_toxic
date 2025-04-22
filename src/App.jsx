import { useState,useEffect } from 'react'
import clasificador from "./toxicityClassifier.js"
// import './App.css'

function App() {
  const [text,setText] = useState("")
  const [debounce,setDebounce] = useState("")
  const [classifier, setClassifier] = useState([ 
    { "label": "identity_attack", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false } ] }, 
    { "label": "insult", "results":  [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false } ] }, 
    { "label": "obscene", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false } ] }, 
    { "label": "severe_toxicity", "results": [ { "probabilities": { "0": 0.0, "1": 0.0 }, "match": false } ] }, 
    { "label": "sexual_explicit", "results": [ { "probabilities": { "0": 0.0, "1": 0.0 }, "match": false } ] }, 
    { "label": "threat", "results": [ { "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] }, 
    { "label": "toxicity", "results": [ { "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] } ])
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebounce(text)
    },1000)
    return () => clearTimeout(timer)
  },[text])
  useEffect(()=>{
    clasificador(debounce).then((results)=>{setClassifier(results)
      console.log(results)
    })
  },[debounce])
  
  return (
    <div className='flex flex-col w-full h-screen text-black   '>
      <div className=' w-3/4 h-3/4 my-auto self-center bg-slate-300 flex flex-col justify-center rounded-3xl shadow-orange-400 shadow-2xl '>
      <div className='mx-auto self-center shadow-lg outline-none '>
      <input type="text" name="frase" onChange={(e)=>setText(e.target.value)} className='align-text-bottom text-4xl w-full h-full outline-none text-white bg-blue-950' id="" />
      </div>
        <h1 className='text-4xl w-100 flex justify-around self-center '>{debounce}</h1>
      <div className='flex flex-col self-center justify-center w-50'>
      {classifier.map((category)=>
      <div className='grid grid-cols-2'>
        <div className='bg-red-500 w-50 transition-[width] rounded-r-xl duration-1000 delay-150 text-2xl ' style={{width:parseFloat(`${((category.results[0].probabilities[1]) * 100).toFixed(2)}}`)}}> {((category.results[0].probabilities[1]) * 100).toFixed(2)}%</div>
        <div className='w-50 text-3xl'>{category.label}</div> 
      </div>)}
      </div>
      </div>
    </div>
  )
}

export default App
