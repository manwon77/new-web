describe("jquery.disable는", function() {
  var $input;

  beforeEach(function() {
    setFixtures('<input type="text" name="add" value="Add">')
    $input = $('input[type=text]');
  });

  it("체이닝이 가능해야 한다", function() {
    expect($input.disableInput()).toBe($input);
  });

  it("입력부를 disable시켜야 한다", function() {
    $input.disableInput();
    expect($input).toBeDisabled();
  });
});

describe("jquery.enable는", function() {
  var $input;

  beforeEach(function() {
    setFixtures('<input type="text" name="add" value="Add" disabled="disabled">')
    $input = $('input[type=text]');
  });

  it("체이닝이 가능해야 한다", function() {
    expect($input.enableInput()).toBe($input);
  });

  it("입력부를 enable시켜야 한다", function() {
    $input.enableInput();
    expect($input).not.toBeDisabled();
  });
});
