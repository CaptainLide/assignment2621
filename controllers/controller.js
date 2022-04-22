const Book = require("/home/ajalcantara/test_env/serve_html/models/book");

exports.getAllBooks = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.getSingleBooks = (req, res, next) => {
    let paramsName = req.params.number;
    console.log(req.params.number)
    Book.find({bookNumber: paramsName}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next()
    });
};

exports.getSingleBookswithid = (req, res, next) => {
    let paramsName = req.params._id;
    console.log(paramsName)
    Book.find({_id: paramsName}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next()
    });
};

exports.showform = (req,res,next) => {
    res.render("addingbooks");
};

exports.delete = (req,res,next) => {
    let userID = req.params.id;
    Book.findByIdAndRemove(userID)
    .then(() => {
        res.locals.redirect = "/home";
        next();
    })
    .catch(error => {
        console.log(`Error deleting:${error.message}`);
    });
};

exports.showUserID = (req,res,next)=> {
    let userID = req.params.id;
    userID.findByID(userID)
    .then(user => {
        res.locals.user = user;
        next()
    })
    .catch(error => {
        console.log("error")
    });
};