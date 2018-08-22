let visualizerData

// https://www.michaelbromley.co.uk/blog/audio-visualization-with-web-audio-canvas-and-the-soundcloud-api/
const visualizer = function(audioElement) {
    const player = document.getElementById(audioElement)
    const self = this
    let analyser
    const audioCtx = new (window.AudioContext || window.webkitAudioContext) // this is because it's not been standardised accross browsers yet.
    analyser = audioCtx.createAnalyser()
    analyser.fftSize = 256 // see - there is that 'fft' thing.
    const source = audioCtx.createMediaElementSource(player) // this is where we hook up the <audio> element
    source.connect(analyser)
    analyser.connect(audioCtx.destination)
    const sampleAudioStream = function() {
        // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
        // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and
        // continue to give real-time data on the audio stream.
        analyser.getByteFrequencyData(self.streamData)
        // calculate an overall volume value
        let total = 0
        for (let i = 0; i < 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += self.streamData[i]
        }
        self.volume = total

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyser.getByteTimeDomainData(dataArray)
        window.data = dataArray
        visualizerData = dataArray
    }
    setInterval(sampleAudioStream, 20) //
    // public properties and methods
    this.volume = 0
    this.streamData = new Uint8Array(128) // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255.
    this.playStream = function() {
        // get the input stream from the audio element
        player.play()
    }
}


const vis = new visualizer('audio')
vis.playStream()

export {
    visualizerData,
}
