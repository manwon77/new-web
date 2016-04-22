describe("플레이어는", function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("곡을 재생할 수 있어야 한다", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //커스텀 매처 사용 예시
    expect(player).toBePlaying(song);
  });

  describe("재생이 잠시 중단되었을 때", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("현재 중단된 노래가 무엇인지 나타내야 한다", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("재생을 중단할 수 있어야 한다", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("현재 재생 중인 곡을 사용자가 즐겨찾기 했는지 알려줘야 한다", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("곡이 재생 중이라면 오류를 던져야 한다", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrow("이미 곡을 재생 중입니다!");
    });
  });
});
