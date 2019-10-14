const playSound = (sound) => {
  if(sound) {
    const audio = new Audio(sound);
    audio.play();
  }
}
