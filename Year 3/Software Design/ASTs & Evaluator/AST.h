#ifndef AST_H
#define AST_H
#include <string>

// Forward declaration of Visitor class
class Visitor;

// Expr class
class Expr {
public:
    /**
     * Declares a pure virtual function to convert an expression to a string
     * @return a string representation of the expression
     */
    virtual std::string toStr() = 0;

    /**
     * Pure virtual function to allow visiting expressions
     * @param visitor a pointer to the Visitor object
     * @return a double representing the evaluated result
     */
    virtual double eval(Visitor* visitor) = 0;

    virtual ~Expr() = default;  // Virtual Deconstructor
};

// Base class
class BinaryExpr : public Expr {
protected:
    Expr* left;
    Expr* right;

public:
    /**
     * Constructor that assigns the left and right values in our expression
     * @param left a pointer that points to the left expression
     * @param right a pointer that points to the right expression
     */
    BinaryExpr(Expr* left, Expr* right);

    /**
     * Method to retrieve the left expression
     * @return a pointer that points to the left expression
     */
    Expr* getleftExpr();

    /**
     * Method to retrieve the right expression
     * @return a pointer that points to the right expression
     */
    Expr* getrightExpr();

    /**
     * Method to assign the new left expression
     * @param left a pointer that points to a new left expression
     */
    void setleftExpr(Expr* left);

    /**
     * Method to assign the new right expression
     * @param right a pointer that points to a new right expression
     */
    void setrightExpr(Expr* right);
};

class AddExpr : public BinaryExpr {
public:
    /**
     * Constructor that initializes the left and right expression by passing them into the BinaryExpr constructor
     * @param left a pointer that points to the left expression
     * @param right a pointer that points to the right expression
     */
    AddExpr(Expr* left, Expr* right);

    /**
     * Method to generate a string version of the addition operation
     * @return a string representation of the addition operation
     */
    std::string toStr() override;

    /**
     * Method that delegates the evaluation of the expression to the visitor
     * @param visitor a pointer to the Visitor object
     * @return The evaluated value of the addition
     */
    double eval(Visitor* visitor) override;
};

class SubExpr : public BinaryExpr {
public:
    /**
     * Constructor that initializes the left and right expression by passing them into the BinaryExpr constructor
     * @param left a pointer that points to the left expression
     * @param right a pointer that points to the right expression
     */
    SubExpr(Expr* left, Expr* right);

    /**
     * Method to generate a string version of the subtraction operation
     * @return a string representation of the subtraction operation
     */
    std::string toStr() override;

    /**
     * Method that delegates the evaluation of the expression to the visitor
     * @param visitor a pointer to the Visitor object
     * @return The evaluated value of the subtraction
     */
    double eval(Visitor* visitor) override;
};

class MulExpr : public BinaryExpr {
public:
    /**
     * Constructor that initializes the left and right expression by passing them into the BinaryExpr constructor
     * @param left a pointer that points to the left expression
     * @param right a pointer that points to the right expression
     */
    MulExpr(Expr* left, Expr* right);

    /**
     * Method to generate a string version of the multiplication operation
     * @return a string representation of the multiplication operation
     */
    std::string toStr() override;

    /**
     * Method that delegates the evaluation of the expression to the visitor
     * @param visitor a pointer to the Visitor object
     * @return The evaluated value of the multiplication
     */
    double eval(Visitor* visitor) override;
};

class DivExpr : public BinaryExpr {
public:
    /**
     * Constructor that initializes the left and right expression by passing them into the BinaryExpr constructor
     * @param left a pointer that points to the left expression
     * @param right a pointer that points to the right expression
     */
    DivExpr(Expr* left, Expr* right);

    /**
     * Method to generate a string version of the division operation
     * @return a string representation of the division operation
     */
    std::string toStr() override;

    /**
     * Method that delegates the evaluation of the expression to the visitor
     * @param visitor a pointer to the Visitor object
     * @return The evaluated value of the division
     */
    double eval(Visitor* visitor) override;
};

class ModExpr : public BinaryExpr {
public:
    /**
     * Constructor that initializes the left and right expression by passing them into the BinaryExpr constructor
     * @param left a pointer that points to the left expression
     * @param right a pointer that points to the right expression
     */
    ModExpr(Expr* left, Expr* right);

    /**
     * Method to generate a string version of the modulus operation
     * @return a string representation of the modulus operation
     */
    std::string toStr() override;

    /**
     * Method that delegates the evaluation of the expression to the visitor
     * @param visitor a pointer to the Visitor object
     * @return The evaluated value of the modulus operation
     */
    double eval(Visitor* visitor) override;
};

// ConstExpr class
class ConstExpr : public Expr {
    double value;

public:
    /**
     * Constructor to initialize a ConstExpr
     * @param v a double variable that will be stored in the expression
     */
    ConstExpr(double v);

    /**
     * A method to convert our stored value into a string
     * @return a string version of the value in our expression
     */
    std::string toStr() override;

    /**
     * Method that delegates the evaluation of the expression to the visitor
     * @param visitor a pointer to the Visitor object
     * @return the double value of our current expression
     */
    double eval(Visitor* visitor) override;

    /**
     * Method to retrieve the double value stored
     * @return the value stored in the expression
     */
    double getValue() const;
};

// Visitor class
class Visitor {
public:
    virtual ~Visitor() = default;   // Virtual Deconstructor

    /**
     * Pure virtual method to visit generic Expr
     * @param expr a pointer pointing to the expression to be visited
     * @return the result of evaluating the expression
     */
    virtual double visit(Expr* expr) = 0;

    // Pure virtual methods for specific expression types
    virtual double visit(AddExpr* expr) = 0;
    virtual double visit(SubExpr* expr) = 0;
    virtual double visit(MulExpr* expr) = 0;
    virtual double visit(DivExpr* expr) = 0;
    virtual double visit(ModExpr* expr) = 0;
    virtual double visit(ConstExpr* expr) = 0;
};

// NumVisitor class
class NumVisitor : public Visitor {
public:
    double visit(Expr* expr) override;
    double visit(AddExpr* expr) override;
    double visit(SubExpr* expr) override;
    double visit(MulExpr* expr) override;
    double visit(DivExpr* expr) override;
    double visit(ModExpr* expr) override;
    double visit(ConstExpr* expr) override;
};
#endif
