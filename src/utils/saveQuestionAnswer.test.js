import { _saveQuestionAnswer } from "./_DATA";
describe("saveQuestionAnswer", () => {
  it("will return true is returned when correctly formatted data is passed to the function", async () => {
    var question = {
      answer: "optionTwo",
      qid: "vthrdm985a262al8qx3do",
      authedUser: "tylermcginnis",
    };
    var response = await _saveQuestionAnswer(question);
    expect(response).toEqual(true);
  });

  it("will return an error is returned if incorrect data is passed to the function", async () => {
    var question = {
      answer: "optionTwo",
      qid: undefined,
      authedUser: "tylermcginnis",
    };
    var response = await _saveQuestionAnswer(question).catch((error) => error);
    await expect(response).toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
