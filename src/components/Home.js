import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';

export default function Home() {

  const [recording, setrecording] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(false);
  const [recordMode, setRecordMode] = useState({ video: true })

  const [revi, setrevi] = useState("primary");
  const [scvi, setscvi] = useState("secondary");

  const recordVideo = async () => {
    setRecordMode({ video: true })
    setrevi("primary")
    setscvi("secondary")
  }

  const recordScreen = async () => {
    setRecordMode({ screen: true })
    setrevi("secondary")
    setscvi("primary")
  }

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(recordMode)

  const startCptr = () => {
    startRecording()
    setrecording(true)
    console.log(recordMode)
  }

  const stopRe = async () => {
    stopRecording()
    setrecording(false);
    setMediaUrl(true);
    console.log(mediaBlobUrl)
  }

  const uploadMedia = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("vToken")) {
        alert("please login to upload video")
    }else{
      fetch(mediaBlobUrl).then((res) => {
        return res.blob()
      }).then(async (resp) => {
        console.log(resp)
  
        let formData = new FormData();
        formData.append("video", resp, "recording.mp4")
  
        const requ = await fetch("http://localhost:5001/api/video/upload", {
          method: "POST",
          headers: {"auth-token" : localStorage.getItem("vToken") },
          body: formData
        });
        console.log(requ)
  
      })
    }
    
  }

  const reSetRocording = () => {
    setMediaUrl(false)
    setrecording(false)
  }

  return (

    <div>
      <p className={`text-center  text-${recording ? "success" : "danger"} fs-1 mt-2 `} >{status === "recording" ? "Recording" : "Stoped"}</p>
      <div className="d-flex justify-content-center ">
        <div className='border border-secondary rounded p-1' >
          {
            !mediaUrl ? <div>
              {recordMode.screen ? <img className='border border-secondary rounded' width={720} src="/assets/img/scBG.png" alt='Now your screen is recording' />
                : <Webcam width={720} className='border border-secondary rounded' />}
            </div> : <video src={mediaBlobUrl} className='border border-secondary rounded' width={720} controls autoPlay></video>
          }
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {!mediaUrl ? <div className='my-2'>
          {
            recording ? <button className="btn btn-danger" onClick={stopRe} >Stop Recording </button> : <div className='d-flex gap-2' >
              <button className='btn btn-success' onClick={startCptr}  >Start Recording</button>
              <button className={`btn btn-${revi}`} onClick={recordVideo} >Record Video</button>
              <button className={`btn btn-${scvi}`} onClick={recordScreen}  >Record Screen</button>
            </div>
          }
        </div> : <div className='d-flex gap-2 my-2'>
          <button className="btn btn-success" onClick={uploadMedia} >Upload</button>
          <button className="btn btn-warning" onClick={reSetRocording} >Reset</button>
        </div>
        }

      </div>
    </div>
  )
}
