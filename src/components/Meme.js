import React from 'react'

const Meme = () => {
    const [meme,setMeme] = React.useState({
        toptext : "",
        bottomtext:"",
        randomImage:"https://i.imgflip.com/4t0m5.jpg"
    })
    console.log(meme)
    
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    function getMeme(){
      const randomNum = Math.floor(Math.random() * allMemes.length)
      const url = allMemes[randomNum].url
      setMeme(prevalue => ({
        ...prevalue,
        randomImage:url
      }))
    }

    function handleChange(event){
      const {name, value} = event.target
      setMeme(prevalue => ({
        ...prevalue,
        [name] : value
      }))
    }

  return (
    <div className='form'>
        <div className='form-input'>
            <input 
              type="text" padding
              placeholder='Top Text...'
              name='toptext'
              value={meme.toptext}
              onChange={handleChange}
            />
            <input 
              type="text" 
              placeholder='Bottom Text'
              name='bottomtext'
              value={meme.bottomtext}
              onChange={handleChange}
            />
        </div>
      
      <button className='form-button' onClick={getMeme}>Get a new meme image</button>
      <div className='meme'>
          <h1 className='meme--text top'>{meme.toptext}</h1>

          <img src={meme.randomImage} alt="" />

          <h1 className='meme--text bottom'>{meme.bottomtext}</h1>
      </div>
    </div>
  )
}

export default Meme
