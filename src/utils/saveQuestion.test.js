import { _saveQuestion } from "./_DATA";
describe("saveQuestion", () => {
    it("the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function", async () => {
      var question = {
        optionOneText: "Never drink water",
        optionTwoText: "Never eat food",
        author: "sarahedo",
      };
      var response = await _saveQuestion(question);
      expect(response.optionOne.text).toEqual("Never drink water");
      expect(response.optionTwo.text).toEqual("Never eat food");
    });
    it("should return an error is returned if incorrect data is passed to the function", async () => {
      var question = {
        optionOneText: "Never drink water",
        optionTwoText: undefined,
        author: "sarahedo",
      };
      var response = await _saveQuestion(question).catch((error) => error);
      await expect(response).toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });
  