import './DNA.css'
import { useState } from 'react'

const DNA = () => {
    // const [upload, setUpload] = useState()
    const [enterText, setEnterText] = useState(false)
     return(
        <>
        <div className='container'>
            <div className='buttons-container'>
                <button className='action-button'>Upload foto</button>
                <button className='action-button'>Take foto</button>
                <button className='action-button' onClick={() => setEnterText(prev => !prev)}>Enter text</button>
            </div>
            <div className='action-container'>
                {enterText && (
                    <div className='input-row'>
                        <textarea
                        type="text"
                        placeholder="DNA Sequence"
                        className="text-input"
                        ></textarea>
                        <button className='send-button'>Analyze</button>
                    </div>
                )}
            </div>
            <div className='results'>
                <div className='result-container'>
                    <h3> Most accurate match: </h3>
                    <div className='result-background'>
                        <h3> VALUE </h3>
                    </div>
                </div>
                <div className='accuracy-container'>
                    <h3> By: </h3>
                    <div className='result-background'>
                        <h3> VALUE % </h3>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DNA