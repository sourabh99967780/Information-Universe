/*speech rec variables*/

var recognition_available

var myRec

var most_recent_word
    /*speech rec variables*/
function init_speech_rec() {
    /*Speech recognition*/
    if ('webkitSpeechRecognition' in window) {
        recognition_available = true;
        walls = false;

        // myRec = new p5.SpeechRec('en-US', parseResult);
        myRec = new p5.SpeechRec();
        myRec.onResult = showResult; // bind callback function to trigger when speech is recognized

        myRec.continuous = true;
        // myRec.interimResults = true;



        myRec.onEnd = function() {
            console.log('~~~~~~~~~~~')
            console.log('Speech recognition service disconnected');

            // if(!pause)

            console.log('restarting service.......')
            console.log('~~~~~~~~~~~')

            myRec.start()

        }

        myRec.onStart = function() {
            console.log('------------------')
            console.log('Speech recognition service started');
            console.log('------------------')
        }

        myRec.onError = function() {
            console.log('*****************')
            console.log('Unexpected Error!!');
            console.log('*****************')
        }

        myRec.start()
    } else {
        recognition_available = false;
        walls = true;

    }
    /*Speech recognition*/

}







//////////SPEECH RECOGNITION COMMANDS////////////////


function showResult() {
    console.log(myRec.resultString); // log the result
}

function parseResult() {

    // console.log(myRec.resultString)
    most_recent_word = myRec.resultString.split(' ').pop()
    var confidence = myRec.resultConfidence;

    // console.log(most_recent_word + "  conficence::  " + confidence)
    // if (most_recent_word.indexOf("left") !== -1) {
    //     s.dir(-1, 0)
    //     // console.log(dx)
    // } else

    // if (most_recent_word.indexOf("right") !== -1) {
    //     s.dir(1, 0)
    //     // console.log(dx)
    // }


    // if (most_recent_word.indexOf("up") !== -1) {
    //     s.dir(0, -1)
    //     // console.log(dy)
    // } else

    // if (most_recent_word.indexOf("down") !== -1) {
    //     s.dir(0, 1)
    //     // console.log(dy)
    // }


    // if (most_recent_word.indexOf("stop") !== -1) {
    //     pause = true;
    //     noLoop();
    // } else
    // if (most_recent_word.indexOf("start") !== -1) {
    //     pause = false
    //     loop()
    // } else
    // if (most_recent_word.indexOf("reset") !== -1) {
    //     reset()
    // } else
    // if (most_recent_word.indexOf("reload") !== -1) {
    //     location.reload()
    // }

    // if (most_recent_word.indexOf("fast") !== -1) {
    //     difficulty *= 1.2;
    //     frameRate(10 * difficulty);
    //     // console.log(difficulty)
    // } else

    // if (most_recent_word.indexOf("slow") !== -1) {
    //     difficulty *= 0.8
    //     frameRate(10 * difficulty);
    //     // console.log(difficulty)
    // }



}


// init_speech_rec();
