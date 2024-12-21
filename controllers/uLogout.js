const uLogout = (req, res) => {
    //changes the expire date
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    //redirect to webpage
    res.status(200).redirect("/");
    console.log("LOGGED OUT");
}

module.exports = uLogout;