// In this exercise, you'll refactor some ES5 code into ES2015

// ES5 Global Constants
    var PI = 3.14;
    PI = 42; // stop me from doing this!

// ES2015 Global Constants
    const PI = 3.14;

// Quiz
    // What is the difference between var and let?
        // var is scoped to a function, but will also hoist to the top of the scope it is defined in, 
            // while let is block-scoped

    // What is the difference between var and const?
        // var can be redeclared and reassigned, while const con not be either redeclared or reassigned

    // What is the difference between let and const?
        // while they are both block-scoped, let can be reassigned, but const cannot be redefined or redeclared

    // What is hoisting?
        // Hoisting is when a declared variable is defined within to the top of the scope it is defined in