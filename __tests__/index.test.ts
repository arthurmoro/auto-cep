import { RaceCep } from "../src/services";
describe("Testing cep", () => {
  it("Should return valid cep", async () => {
    const autoCep = new RaceCep();
    const result = await autoCep.getAddress("04616-000");
    expect(result.logradouro).toBeDefined();
    expect(result.logradouro.toLowerCase()).toContain("rua pascal");
    console.log(result.origin);
  });
  it("Should return valid cep", async () => {
    const autoCep = new RaceCep();
    const result = await autoCep.getAddress("01314-000");
    expect(result.logradouro).toBeDefined();
    expect(result.logradouro.toLowerCase()).toContain("rua santo ant");
    console.log(result.origin);
  });
});
