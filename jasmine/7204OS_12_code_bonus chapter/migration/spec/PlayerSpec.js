describe_("플레이어는", function() {
  var player;
  var song;

  beforeEach_(function() {
    player = new Player();
    song = new Song();
  });

  it_("곡을 재생할 수 있어야 한다", function() {
    player.play(song);
    expect_(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect_(player).toBePlaying(song);
  });

  describe_("재생이 잠시 중단되었을 때", function() {
    beforeEach_(function() {
      player.play(song);
      player.pause();
    });

    it_("현재 중단된 노래가 무엇인지 나타내야 한다", function() {
      expect_(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect_(player).not.toBePlaying(song);
    });

    it_("재생을 중단할 수 있어야 한다", function() {
      player.resume();
      expect_(player.isPlaying).toBeTruthy();
      expect_(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it_("현재 재생 중인 곡을 사용자가 즐겨찾기 했는지 알려줘야 한다", function() {
    spyOn_(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect_(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe_("#resume", function() {
    it_("곡이 재생 중이라면 오류를 던져야 한다", function() {
      player.play(song);

      expect_(function() {
        player.resume();
      }).toThrowError("이미 곡을 재생 중입니다!");
    });
  });
});
