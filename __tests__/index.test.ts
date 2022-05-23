import AutoCep from "../src/main";
describe('Testing cep', () => {
  it("Should return valid cep", async () => {
    const result = await AutoCep("04616-000");
    console.log(result)
  })
})