
    let audioIN = { audio: true };
    //  audio is true, for recording
  
    // Access the permission for use
    // the microphone
    navigator.mediaDevices.getUserMedia(audioIN)
  
      // 'then()' method returns a Promise
      .then(function (mediaStreamObj) {
  
        // 
    let audioIN = { audio: true };
    //  audio is true, for recording
  
    // Access the permission for use
    // the microphone
    navigator.mediaDevices.getUserMedia(audioIN)
  
      // 'then()' method returns a Promise
      .then(function (mediaStreamObj) {
  
        // Connect the media stream to the
        // first audio element
        let audio = document.querySelector('audio');
        //returns the recorded audio via 'audio' tag
  
        // 'srcObject' is a property which 
        // takes the media object
        // This is supported in the newer browsers
        if ("srcObject" in audio) {
          audio.srcObject = mediaStreamObj;
        }
        else {   // Old version
          audio.src = window.URL
            .createObjectURL(mediaStreamObj);
        }
  
        // It will play the audio
        audio.onloadedmetadata = function (ev) {
  
          // Play the audio in the 2nd audio
          // element what is being recorded
          audio.play();
        };
  
        // Start record
        let start = document.getElementById('btnStart');
  
        // Stop record
        let stop = document.getElementById('btnStop');
  
        // 2nd audio tag for play the audio
        let playAudio = document.getElementById('adioPlay');
  
        // This is the main thing to recorde 
        // the audio 'MediaRecorder' API
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        // Pass the audio stream 
  
        // Start event
        start.addEventListener('click', function (ev) {
          mediaRecorder.start();
          // console.log(mediaRecorder.state);
        })
  
        // Stop event
        stop.addEventListener('click', function (ev) {
          mediaRecorder.stop();
          // console.log(mediaRecorder.state);
        });
  
        // If audio data available then push 
        // it to the chunk array
        mediaRecorder.ondataavailable = function (ev) {
          dataArray.push(ev.data);
        }
  
        // Chunk array to store the audio data 
        let dataArray = [];
  
        // Convert the audio data in to blob 
        // after stopping the recording
        mediaRecorder.onstop = function (ev) {
  
          // blob of type mp3
          let audioData = new Blob(dataArray, 
                    { 'type': 'audio/mp3;' });
            
          // After fill up the chunk 
          // array make it empty
          dataArray = [];
  
          // Creating audio url with reference 
          // of created blob named 'audioData'
          let audioSrc = window.URL
              .createObjectURL(audioData);
  
          // Pass the audio url to the 2nd video tag
          playAudio.src = audioSrc;
        }
      })
  
      // If any error occurs then handles the error 
      .catch(function (err) {
        console.log(err.name, err.message);
      }); the media stream to the
        // first audio element
        let audio = document.querySelector('audio');
        //returns the recorded audio via 'audio' tag
  
        // 'srcObject' is a property which 
        // takes the media object
        // This is supported in the newer browsers
        if ("srcObject" in audio) {
          audio.srcObject = mediaStreamObj;
        }
        else {   // Old version
          audio.src = window.URL
            .createObjectURL(mediaStreamObj);
        }
  
        // It will play the audio
        audio.onloadedmetadata = function (ev) {
  
          // Play the audio in the 2nd audio
          // element what is being recorded
          audio.play();
        };
  
        // Start record
        let start = document.getElementById('btnStart');
  
        // Stop record
        let stop = document.getElementById('btnStop');
  
        // 2nd audio tag for play the audio
        let playAudio = document.getElementById('adioPlay');
  
        // This is the main thing to recorde 
        // the audio 'MediaRecorder' API
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        // Pass the audio stream 
  
        // Start event
        start.addEventListener('click', function (ev) {
          mediaRecorder.start();
          // console.log(mediaRecorder.state);
        })
  
        // Stop event
        stop.addEventListener('click', function (ev) {
          mediaRecorder.stop();
          // console.log(mediaRecorder.state);
        });
  
        // If audio data available then push 
        // it to the chunk array
        mediaRecorder.ondataavailable = function (ev) {
          dataArray.push(ev.data);
        }
  
        // Chunk array to store the audio data 
        let dataArray = [];
  
        // Convert the audio data in to blob 
        // after stopping the recording
        mediaRecorder.onstop = function (ev) {
  
          // blob of type mp3
          let audioData = new Blob(dataArray, 
                    { 'type': 'audio/mp3;' });
            
          // After fill up the chunk 
          // array make it empty
          dataArray = [];
  
          // Creating audio url with reference 
          // of created blob named 'audioData'
          let audioSrc = window.URL
              .createObjectURL(audioData);
  
          // Pass the audio url to the 2nd video tag
          playAudio.src = audioSrc;
        }
      })
  
      // If any error occurs then handles the error 
      .catch(function (err) {
        console.log(err.name, err.message);
      });
      
      //audio
      //audio
      
      
      
    const ROI_X = 250;
    const ROI_Y = 150;
    const ROI_WIDTH = 240;
    const ROI_HEIGHT = 180;
    
    const FPS = 25;
    
    let cameraStream = null;
    let processingStream = null;
    let mediaRecorder = null;
    let mediaChunks = null;
    let processingPreviewIntervalId = null;

    function processFrame() {
        let cameraPreview = document.getElementById("cameraPreview");
        
        processingPreview
            .getContext('2d')
            .drawImage(cameraPreview, ROI_X, ROI_Y, ROI_WIDTH, ROI_HEIGHT, 0, 0, ROI_WIDTH, ROI_HEIGHT);
    }
    
    function generateRecordingPreview() {
        let mediaBlob = new Blob(mediaChunks, { type: "video/webm" });
        let mediaBlobUrl = URL.createObjectURL(mediaBlob);
        
        let recordingPreview = document.getElementById("recordingPreview");
        recordingPreview.src = mediaBlobUrl;

        let downloadButton = document.getElementById("downloadButton");
        downloadButton.href = mediaBlobUrl;
        downloadButton.download = "RecordedVideo.webm";
    }
        
    function startCapture() {
        const constraints = { video: true, audio: false };
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            cameraStream = stream;
            
            let processingPreview = document.getElementById("processingPreview");
            processingStream = processingPreview.captureStream(FPS);
            
            mediaRecorder = new MediaRecorder(processingStream);
            mediaChunks = []
            
            mediaRecorder.ondataavailable = function(event) {
                mediaChunks.push(event.data);
                if(mediaRecorder.state == "inactive") {
                    generateRecordingPreview();
                }
            };
            
            mediaRecorder.start();
            
            let cameraPreview = document.getElementById("cameraPreview");
            cameraPreview.srcObject = stream;
        
            processingPreviewIntervalId = setInterval(processFrame, 1000 / FPS);
        })
        .catch((err) => {
            alert("No media device found!");
        });
    };
    
    function stopCapture() {
        if(cameraStream != null) {
            cameraStream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
        
        if(processingStream != null) {
            processingStream.getTracks().forEach(function(track) {
                track.stop();
            });
        }
        
        if(mediaRecorder != null) {
            if(mediaRecorder.state == "recording") {
                mediaRecorder.stop();
            }
        }
        
        if(processingPreviewIntervalId != null) {
            clearInterval(processingPreviewIntervalId);
            processingPreviewIntervalId = null;
        }
    };