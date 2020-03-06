const router = require('express').Router();
let User = require ('../models/user.model');

router.route('/').get((req,res)=>{
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error'+ err));
});


//add or create a new user
router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const email = req.body.email
    const pantry = req.body.pantry;
    const favRecipes = req.body.favRecipes
    const fBaseId = req.body.fBaseId

    const newUser = new User({username, email, pantry,favRecipes, fBaseId});
    
    newUser.save()
    .then(()=> res.json('User added!!'))
    .catch(err => res.status(400).json('Error'+ err));
});



// will use to grab the user's info once logged in
router.route("/:fBaseId").get((req,res)=>{
    User.findOne({fBaseId:req.params.fBaseId})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error'+ err));
});




//to delete user
router.route("/:id").delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch(err => res.status(400).json('Error'+ err));
});




//add to the Pantry array
router.route("/addPantry/:id").post((req,res)=>{
    const pantry = req.body.pantry;
    
    User.findByIdAndUpdate(req.params.id,{ $push: { pantry: pantry } }, { new: true })
    .then(() => res.json("user's pantry updated!!"))
    .catch(err => res.status(400).json('Error'+ err));
});




//add to the recipes array
router.route("/addFav/:id").post((req,res)=>{
    const favRecipes = req.body.favRecipes;
    
    User.findByIdAndUpdate(req.params.id,{ $push: { favRecipes: favRecipes } }, { new: true })
    .then(() => res.json("user's Recipes updated!!"))
    .catch(err => res.status(400).json('Error'+ err));
});





//delete from Pantry
router.route("/deletePantry/:id").post((req,res)=>{
    const pantry = req.body.pantry;
    
    User.findByIdAndUpdate(req.params.id,{ $pull: { pantry: pantry} },{multi:true})
    .then(() => res.json("user's pantry updated!!"))
    .catch(err => res.status(400).json('Error'+ err));
});




//delete from favRecipes
router.route("/deleteFav/:id").post((req,res)=>{
    const title = req.body.title;
    
    User.findByIdAndUpdate(req.params.id,{ $pull: { "favRecipes" :{ 'title': title} } },{multi:true})
    .then(() => res.json("user's Recipes updated!!"))
    .catch(err => res.status(400).json('Error'+ err));
});


router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });



module.exports = router;