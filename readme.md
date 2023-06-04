## Edge cases
    1. Right now the implmentation doesnot work if the member is a generic class

## Ideas for Future
    1. No one would want to add these decoarators by themselves in every class. And doing this would only pollute your codebase.
    2. An Idea is to inject decorators or alter the TypeScript code at transpile-time.
    3. This requires to create typescript transformer which uses the AST and returns modified AST
    4. But Typescript doesnot support official transformers
    5. What else could we do:
        a. There are packages out there like ts-transformer-keys or ts-transformer-auto-annotate that may help.
        b. Clean solution is to write a script that can take a typescript file and inject decorators into the class definition and return a file.