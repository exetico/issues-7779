it("should add 1 + 1", async () => {
    expect(1 + 1).toEqual(2);
});

it("should get a response from hosting emulator", async () => {
    const response = await fetch("http://127.0.0.1:5000/hello-world.txt")
    const text = await response.text()
    expect(text).toEqual("hello world!");
});