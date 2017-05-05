//For background sound - I add the 

document.getElementById("sound").innerHTML = "<audio autoplay loop src='sound/wind2.mp3'></audio>";

$('#pauseSound').on('click', function() {
	$("audio")[0].play();
	 
	$('#playSound').show(); //icon for sound
  $('#pauseSound').hide(); //icon for soundoff
});

$('#playSound').on('click', function() {
	$("audio")[0].pause();
  
  $('#pauseSound').show();
  $('#playSound').hide();
});