exports.getHome = (req, res, next) => {
    res.render("home", {
        pagetitle: "Onyx",
        user: req.session.user || "",
    });
};