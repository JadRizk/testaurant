# Testaurant 🧑‍🍳

Testing made deliciously easy

Testaurant is a command line tool for generating unit tests using GPT-3 or ChatGPT. It allows you to quickly and easily
generate unit tests for your code without having to write them manually.

## Installation

To install Testaurant, run the following command:

```bash
yarn add global testaurant
```

## Usage

### Basic usage

To generate tests for a file, run the following command:

```bash
testaurant auto-test --input-file /path/to/file.js --output-file /path/to/output.js --api-key YOUR_API_KEY --model MODEL_NAME
```

### Using a configuration file

You can also use a configuration file to specify default options for Testaurant. To use a configuration file, create a
YAML file with the following structure:

Replace YOUR_API_KEY with your OpenAI API key and MODEL_NAME with the name of the GPT-3 model you want to use.

```yml
.js:
  techs:
    - Jest
  tips:
    - Use the `describe` function to group your tests
    - Use the `test` function to write individual tests
  examples:
    - code: |
        function sum(a, b) {
          return a + b;
        }
      tests: |
        describe("sum", () => {
          test("adds 1 + 2 to equal 3", () => {
            expect(sum(1, 2)).toBe(3);
          });
          test("adds 0 + 0 to equal 0", () => {
            expect(sum(0, 0)).toBe(0);
          });
        })
...
```

Save the file as testaurant.yaml in your project directory, then run the following command:

```bash
testaurant auto-test --input-file /path/to/file.js
```

This will generate tests for /path/to/file.js using the default options specified in testaurant.yaml.

Options

```
--input-file: The path to the file to generate tests for.
--output-file: The path to the file to write the generated tests to.
--api-key: Your OpenAI API key.
--model: The name of the GPT-3 model to use.
--techs: An array of technologies to use (e.g. "jest").
--tips: An array of tips to include in the prompt.
--examples: An array of example code snippets with corresponding test cases.
--config: The path to a configuration file to use.
```


