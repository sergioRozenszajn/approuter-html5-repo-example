startRecording = function () {
    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    } else {
        console.log("No access to camera...");
    }

    // Show photo section
    document.getElementById('video').style.display = "block";
    document.getElementById('canvas').style.display = "none";

    document.getElementById('snap').style.display = "inline";
    document.getElementById('reset').style.display = "none";
    document.getElementById('send').style.display = "none";
}

stopRecording = function () {
    video.pause();
    video.src = "";
    var tracks = video.srcObject.getTracks();
    for (i in tracks) {
        tracks[i].stop();
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    //Hide photo button to create new game
    document.getElementById('create').addEventListener("click", function () {
        document.getElementById('photo').style.display = "none";
    });

    //activate dialog and start recording to take winning picture
    document.getElementById('photo').addEventListener("click", function () {
        document.getElementById('photo-dialog').setAttribute("class", "fd-dialog-docs-static fd-dialog fd-dialog--active");
        startRecording();
    });

    //deactivate dialog and stop recording
    document.getElementById('photo-dialog-close').addEventListener("click", function () {
        document.getElementById('photo-dialog').setAttribute("class", "fd-dialog-docs-static fd-dialog");
        stopRecording();
    });

    // Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function () {
        context.drawImage(video, 0, 0, 400, 300);
        document.getElementById('video').style.display = "none";
        document.getElementById('canvas').style.display = "block";

        document.getElementById('snap').style.display = "none";
        document.getElementById('reset').style.display = "inline";
        document.getElementById('send').style.display = "inline";
    });

    // Reset photo take
    document.getElementById("reset").addEventListener("click", function () {
        document.getElementById('video').style.display = "block";
        document.getElementById('canvas').style.display = "none";

        document.getElementById('snap').style.display = "inline";
        document.getElementById('reset').style.display = "none";
        document.getElementById('send').style.display = "none";
    });

    // Send picture
    document.getElementById("send").addEventListener("click", function () {
        var canvas = document.getElementById('canvas');

        fetch("photo-wall",{
            method: 'POST',
            headers: {
              'Content-Type': 'image/png',
              'filekey': "key-" + Date.now()
            },
            body: canvas.toDataURL("image/png")
        });

        //deactivate dialog, hide photo and stop recording
        document.getElementById('photo-dialog').setAttribute("class", "fd-dialog-docs-static fd-dialog");
        document.getElementById('photo').style.display = "none";
        stopRecording();
    });
});