"use strict";

var audioContext = new AudioContext();


window.onload = function() {
    var onOff = document.getElementById("on-off");
    var span = document.getElementsByTagName("span")[0];
    var osc = false;
    var freqSliderVal = document.getElementsByTagName("input")[1].value;

    //_________________________________________BEGIN set selected waveform type value

    var selectedWaveform = "sawtooth";
   


    //_________________________________________BEGIN select all <li> elements
    var waveformTypes = document.getElementsByTagName('option');
   



    //_________________________________________BEGIN callback to select <li> by id and assign id name to selectWaveform
    function select() {
        selectedWaveform = document.getElementById(this.id).id;
        console.log(selectedWaveform);
    }




    //_________________________________________BEGIN loop through all <li> elements and set a click eventListener on them

    for (var i = 0; i < waveformTypes.length; i++) {
        waveformTypes[i].addEventListener('click', select);
    }





    setInterval(function() {

        if (!osc) {

            console.log("Oscillator is stopped. Waiting for oscillator to start");

        } else {

            freqSliderVal = document.getElementsByTagName("input")[1].value;
            osc.frequency.value = freqSliderVal;
            console.log("Oscillator is playing. Frequency value is " + freqSliderVal);
            osc.type = selectedWaveform;
        }


    }, 50);



//______________________________________________start button

    onOff.addEventListener("click", function() {



        if (!osc) {
            osc = audioContext.createOscillator();
            osc.type = selectedWaveform;
            osc.frequency.value = freqSliderVal;
            osc.connect(audioContext.destination);
            osc.start(audioContext.currentTime);
            onOff.value = "stop";
            span.innerHTML = "Click to stop oscillator";
        } else {

            osc.stop(audioContext.currentTime);
            osc = false;
            onOff.value = "start";
            span.innerHTML = "Click to start oscillator";
        }
    });

};