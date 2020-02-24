const express = require("express");
const application = express();
 const path = require("path");
const mongoose = require("mongoose");
const router=express.Router();
const UserModel = mongoose.model('User');
const ProcessModel = mongoose.model('Process');
const GoogleCharts= require("google-charts");
const session = require('express-session');
application.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

mongoose.set('useFindAndModify', false);
// import {GoogleCharts} from 'google-charts';

// var dir = path.join(__dirname, './views/images');

// application.use(express.static(dir));
router.get("/", (req, res)=>{
    //res.render("views/adminHome")
});
router.get("/adminHome", (req, res)=>{
res.render("adminHome")
});
router.get("/captureProcess", (req, res)=>{
    res.render("captureProcess")
});



router.get("/processDiscovery", (req, res)=>{
    res.render("processDiscovery")
});
router.get("/processViewById", (req, res)=>{
    res.render("processViewById")
});
router.get("/adminViewById", (req, res)=>{
     res.render("adminViewById")
 });
 router.get("/approveProcess", (req, res)=>{
    res.render("approveProcess")
});
router.get("/processPrioritization", (req, res)=>{
    res.render("processPrioritization")
});
 router.get("/userManagement", (req, res)=>{
    res.render("userManagement")
});
router.get("/register", (req, res)=>{
    res.render("register")
});
router.get("/About", (req, res)=>{
    res.render("About")
});
router.get("/Contact", (req, res)=>{
    res.render("Contact")
});
router.post("/checkUser",(req,res) => {
    // var sess=req.session;
    if(req.body.userName=="ADMIN"&&req.body.password=="ADMIN$1"){
        res.render("adminHome",{viewtitle:"ADMIN"});
    }
    else{
    UserModel.findOne({
        userName:req.body.userName,
        password: req.body.password
      })
      .exec(function (err, result) {
        if(result) { // auth was successful
          req.session.user = result; // so writing user document to session
          console.log(result.userName);
          return res.render("adminHome",{viewtitle:result.userName}); // redirecting user to interface
        }
  
        // auth not successful, because result is null
        res.render("index",{viewtitle :"Invalid User"}) // redirect to login page
    });
    }
});
router.post("/adduser", (req, res)=>{
    if(req.body.password==req.body.cpassword){
    var usermodel = new UserModel();
    usermodel.userName = req.body.userName;
   usermodel.email = req.body.email;
    usermodel. employeeId = req.body.employeeId;
    usermodel.password = req.body.password;
    usermodel.save((err, doc) => {
        if (!err){
        res.send("Registerd Successfully");
        //console.log("success");
    }
        else{
        console.log('Error during record insertion : ' + err);
        res.send("Error Occured");
    }
});
    }
    else
    res.render("register",{viewtitle:"Password not matched.."});
});

router.post("/addProcess", (req, res)=>{
    try{
    var processmodel = new ProcessModel();
    processmodel.clientName = req.body.clientName;
    processmodel.Buss_Unit = req.body.Buss_Unit;
    processmodel.Sub_Buss_Unit = req.body.Sub_Buss_Unit;
    processmodel.Proc_Name = req.body.Proc_Name;
    processmodel. Proc_Id = req.body.Proc_Id;
    processmodel.Proc_Desc = req.body.Proc_Desc;
    processmodel.Mon_Vol = req.body.Mon_Vol;
    processmodel.AHT = req.body.AHT;
    processmodel.FTE = req.body.FTE;
    processmodel.SLA = req.body.SLA;
    processmodel.TAT = req.body.TAT;
    processmodel.App_Used = req.body.App_Used;
    processmodel.Doc_Present = req.body.Doc_Present;
    processmodel.Rule_Based = req.body.Rule_Based;
    processmodel.Stuc_Data = req.body.Stuc_Data;
    processmodel.Inp_Data_Type = req.body.Inp_Data_Type;
    processmodel.Amenable_RPA = req.body.Amenable_RPA;
    processmodel.Amenable_Cognitive = req.body.Amenable_Cognitive;
    processmodel. Automation_Ready = req.body.Automation_Ready;
    processmodel.AP_Perc = req.body.AP_Perc;
    processmodel.FTE_Benefit = req.body.FTE_Benefit;
    processmodel.Status="REQUESTED";
    processmodel.save((err, doc) => {
        if (err){
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                return res.status(422).send({ success: false, message: 'Process already exist!' });
              }
        // res.redirect("/user/processlist");
        // console.log("success");
        return res.status(422).send(err);
    }
        else{
       res.render("captureProcess",{viewtitle:"Captured Successfully"});
    }
});
}
catch(e){
    res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
}   
});
router.get('/list', (req,res) => {
    ProcessModel.find((err, docs) => {
    if(!err){
    res.render("processPrioritization", {list: docs});
  
    console.log(docs);
    }
    else {
    console.log('Failed to retrieve the Course List: '+ err);
    }
    });
    });
    router.get('/userList', (req,res) => {
        UserModel.find((err, docs) => {
        if(!err){
        res.render("viewUser", {list: docs});
        console.log(docs);
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
        });

    router.get('/viewbubblechart', (req,res) => {
        ProcessModel.find((err, docs) => {
            // GoogleCharts.load('current', {'packages':['corechart']});
            // GoogleCharts.setOnLoadCallback(drawChart);
      
            // function drawChart() {
            //     alert("hbjh")
            //   var data = GoogleCharts.api.visualization.arrayToDataTable([
            //     ['Year', 'Sales', 'Expenses'],
            //     ['2004',  1000,      400],
            //     ['2005',  1170,      460],
            //     ['2006',  660,       1120],
            //     ['2007',  1030,      540]
            //   ]);
      
            //   var options = {
            //     title: 'Company Performance',
            //     curveType: 'function',
            //     legend: { position: 'bottom' }
            //   };
      
            //   var chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('curve_chart'));
      
            //   chart.draw(data, options);
            // }
            console.log(docs);
        if(!err){
        res.render("bubblechart" ,{list: docs});
//         var info=[]
// info1=[];
// docs.forEach(element => {
//     console.log(element)
// info[0]=element.AP_Perc
// info[1]=element.FTE_Benefit
// info1.push(info);
// info=[];

// });


        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        
        });
        });
         

    router.get('/viewById', (req, res) => {
        console.log("Inside router")
        console.log(req.query.Proc_Id);
       if(req.query.Proc_Id) {
        ProcessModel.find({Proc_Id:req.query.Proc_Id},(err, doc) => {
            console.log(doc)
            if(doc.length!=0){
        if (doc[0].Status=="APPROVED") {
        res.render("processList", {viewtitle:"process",process:doc[0]
        });
        console.log(doc);
        }
        else
        res.render("processViewById",{viewtitle:"Process is not Approved wait for the admin approval"});
        }
        else{
            res.render("processViewById",{viewtitle : "Process is not captured!" })
        }
    });
    }
    else
    res.render("processViewById",{viewtitle:"Please enter the Process Id"});
        });

router.get("/approveProcessById", (req, res)=>{
    console.log(req.query.Proc_Id);
    if(req.query.Proc_Id){
        ProcessModel.find({Proc_Id: req.query.Proc_Id},(err,doc)=>{
           if(doc.length!=0){
                if(doc[0].Status=="REQUESTED"){
                    ProcessModel.updateOne({ Proc_Id: req.query.Proc_Id },{ Status: "APPROVED" }, (err, doc) => {
                        //console.log(doc)
                        if (!err) {
                             res.render("approveProcess",{viewresult:"APPROVED Successfully"}); 
                            }         
                      else
                        { res.send('Error during updating the record: ' + err);}
                            });
                }
                else{
                    res.render("approveProcess",{viewtitle : "Process is alredy approved!"})
                }
           }
           else{
            res.render("approveProcess",{viewtitle : "Process is not captured!"})
           }
        });
    
        }
        else
        res.render("approveProcess",{viewtitle : "please enter the Process Id"})   
               
        });
    //Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
    //var valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
    UserModel.findByIdAndRemove(req.params.Proc_Id, (err, doc) => {
    if (!err) {
    res.redirect('/user/list');
    }
    else { console.log('Failed to Delete Course Details: ' + err); }
    });
}
else
res.send('error: please provide correct id');
    });
    application.get('*', function(req, res){
        res.status(404).send('what???');
      });
module.exports = router;