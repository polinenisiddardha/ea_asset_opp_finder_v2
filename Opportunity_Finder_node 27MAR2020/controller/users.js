const express = require("express");
const application = express();
 const path = require("path");
const mongoose = require("mongoose");

const UserModel = mongoose.model('User');
const ProcessModel = mongoose.model('Process');
const SecondProcessModel =mongoose.model('SecondProcess')
const ConfigurationDetailsModel = mongoose.model('ConfigurationDetails')
const GoogleCharts= require("google-charts");
const session = require('express-session');
var uniqBy = require('lodash.uniqby');
var BusinessModel = mongoose.model('Business')
application.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

mongoose.set('useFindAndModify', false);
// import {GoogleCharts} from 'google-charts';

// var dir = path.join(__dirname, './views/images');
application.use('/user', express.static('views/images'));

application.use(express.static(__dirname + '/public'));
// application.use(express.static(dir));
const router=express.Router();
router.get("/", (req, res)=>{
    //res.render("views/adminHome")
});
router.get("/adminHome", (req, res)=>{
res.render("adminHome")
});
router.get("/Calculation", (req, res)=>{
    res.render("Calculation")
    });
router.get("/captureProcess", (req, res)=>{
    res.render("captureProcess")
});



router.get("/processDiscovery", (req, res)=>{
    res.render("processDiscovery")
});
router.get("/businessTable", (req, res)=>{
    res.render("businessTable")
});
router.get("/confirmBusiness", (req, res)=>{
    res.render("confirmBusiness")
});

router.get("/processViewById", (req, res)=>{
   
    ProcessModel.find((err, docs) => {
        if(!err){
        res.render("processViewById", {list: docs});
      
        console.log(docs);
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
});
router.get("/businessTableDetails", (req, res)=>{
   
    SecondProcessModel.find((err, docs) => {
        if(!err){
        res.render("businessTable", {list: docs});
      
        console.log(docs);
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
});
router.get("/configurationDetails",(req,res)=>{
    res.render("configurationDetails")
});
router.get("/defaultConfigurationDetails",(res,req)=>{
    res.render("defaultConfigurationDetails")
});
router.get("/fetchConfigurationDetails",(req,res)=>{
    ConfigurationDetailsModel.find((err,doc)=>{
        if(!err)
        {
            res.render("defaultConfigurationDetails",{list:doc[0]})
        }
        else{
            res.send(err)
            console.log(err)
        }
    });

});
router.post("/addConfigurationDetails",(req,res)=>{

    var configurationdetailsmodel = new ConfigurationDetailsModel();
    configurationdetailsmodel.Simple_Dev=req.body.Simple_Dev;
    configurationdetailsmodel.Simple_Srdev=req.body.Simple_Srdev;
    configurationdetailsmodel.Simple_BA=req.body.Simple_BA;
    configurationdetailsmodel.Simple_Arch=req.body.Simple_Arch;
    configurationdetailsmodel.Simple_PM=req.body.Simple_PM;
    configurationdetailsmodel.Simple_DM=req.body.Simple_DM;
    configurationdetailsmodel.Medium_Dev=req.body.Medium_Dev;
    configurationdetailsmodel.Medium_Srdev=req.body.Medium_Srdev;
    configurationdetailsmodel.Medium_BA=req.body.Medium_BA;
    configurationdetailsmodel.Medium_Arch=req.body.Medium_Arch;
    configurationdetailsmodel.Medium_PM=req.body.Medium_PM;
    configurationdetailsmodel.Medium_DM=req.body.Medium_DM;
    configurationdetailsmodel.Complex_Dev=req.body.Complex_Dev;
    configurationdetailsmodel.Complex_Srdev=req.body.Complex_Srdev;
    configurationdetailsmodel.Complex_BA=req.body.Complex_BA;
    configurationdetailsmodel.Complex_Arch=req.body.Complex_Arch;
    configurationdetailsmodel.Complex_PM=req.body.Complex_PM;
    configurationdetailsmodel.Complex_DM=req.body.Complex_DM;
    configurationdetailsmodel.Dev_Cost=req.body.Dev_Cost;
    configurationdetailsmodel.Srdev_Cost=req.body.Srdev_Cost;
    configurationdetailsmodel.BA_Cost=req.body.BA_Cost;
    configurationdetailsmodel.Arch_Cost=req.body.Arch_Cost;
    configurationdetailsmodel.PM_Cost=req.body.PM_Cost;
    configurationdetailsmodel.DUlead_Cost=req.body.DUlead_Cost;
    configurationdetailsmodel.Bot_Creator_Cost=req.body.Bot_Creator_Cost;
    configurationdetailsmodel.Bot_Run_Unatt_Cost=req.body.Bot_Run_Unatt_Cost;
    configurationdetailsmodel.Bot_Run_Att_Cost=req.body.Bot_Run_Att_Cost;
    configurationdetailsmodel.Cont_Room_Cost=req.body.Cont_Room_Cost;
    configurationdetailsmodel.VM_Cost=req.body.VM_Cost;
    configurationdetailsmodel.Server_Cost=req.body.Server_Cost;
    ConfigurationDetailsModel.find((err,doc)=>{
        if(!err)
        {
        if(doc.length)
        {
            var updated_doc={$set: {Simple_Dev:req.body.Simple_Dev, 
                Simple_Srdev:req.body.Simple_Srdev,
                Simple_BA:req.body.Simple_BA,
                Simple_Arch:req.body.Simple_Arch,
                Simple_PM:req.body.Simple_PM,
                Simple_DM:req.body.Simple_DM,
                Medium_Dev:req.body.Medium_Dev,
                Medium_Srdev:req.body.Medium_Srdev,
                Medium_BA:req.body.Medium_BA,
                Medium_Arch:req.body.Medium_Arch,
                Medium_PM:req.body.Medium_PM,
                Medium_DM:req.body.Medium_DM,
                Complex_Dev:req.body.Complex_Dev,
                Complex_Srdev:req.body.Complex_Srdev,
                Complex_BA:req.body.Complex_BA,
                Complex_Arch:req.body.Complex_Arch,
                Complex_PM:req.body.Complex_PM,
                Complex_DM:req.body.Complex_DM,
                Dev_Cost:req.body.Dev_Cost,
                Srdev_Cost:req.body.Srdev_Cost,
                BA_Cost:req.body.BA_Cost,
                Arch_Cost:req.body.Arch_Cost,
                PM_Cost:req.body.PM_Cost,
                DUlead_Cost:req.body.DUlead_Cost,
                Bot_Creator_Cost:req.body.Bot_Creator_Cost,
                Bot_Run_Unatt_Cost:req.body.Bot_Run_Unatt_Cost,
                Bot_Run_Att_Cost:req.body.Bot_Run_Att_Cost,
                Cont_Room_Cost:req.body.Cont_Room_Cost,
                VM_Cost:req.body.VM_Cost,
                Server_Cost:req.body.Server_Cost,
                }}
            ConfigurationDetailsModel.updateOne({Simple_Dev:doc[0].Simple_Dev},updated_doc,(err,doc)=>{
                if(!err)
                {
                   res.render("configurationDetails",{viewtitle:"Updated Successfully"})
                }
                else{
                    console.log(err);
                    res.render("configurationDetails",{viewerror:"error Occured in proceeding"})
                }
            });
        }
        // { $set: { <field1>: <value1>, ... } }
        else
        {
            configurationdetailsmodel.save((err,doc)=>{
                if(!err)
                {
                    // res.send(simplecount,mediumcount,complexcount);
                    res.render("configurationDetails",{viewtitle:"Details Saved Successfully"})
                }
                else
                {
                    console.log(err)
                    res.render("configurationDetails",{viewerror:"error Occured while Saving the details"});
                }
            });
        
        }
    }
    else{
        console.log(err)
        res.send("error")
    }
    });
});
router.post("/addSelectedProcess",(req,res)=>{
    var businessmodel= new BusinessModel();
    businessmodel.Selected_Process=req.body.Selected_Process; 
    console.log(businessmodel.Selected_Process.length)
    businessmodel.Total_Count=businessmodel.Selected_Process.length;
    var simplecount=0;
    var mediumcount=0;
    var complexcount=0;
    
    for(i=0;i<businessmodel.Selected_Process.length;i++){
        if(businessmodel.Selected_Process[i].includes('Simple'))
             simplecount=simplecount+1;
        else if(businessmodel.Selected_Process[i].includes('Medium'))
            mediumcount=mediumcount+1;
        else
            complexcount=complexcount+1;
    }
    
    businessmodel.Simple_Count=simplecount;
    businessmodel.Medium_Count=mediumcount;
    businessmodel.Complex_Count=complexcount;
    BusinessModel.find((err,doc)=>{
        if(!err)
        {
        if(doc.length)
        {
            var updated_doc={$set: {Selected_Process:req.body.Selected_Process, Total_Count:req.body.Selected_Process.length,Simple_Count:simplecount,Medium_Count:mediumcount,Complex_Count:complexcount}}
            BusinessModel.updateOne({Total_Count:doc[0].Total_Count},updated_doc,(err,doc)=>{
                if(!err)
                {
                    BusinessModel.find((err,docs)=>{
                        if(!err)
                        {
                            console.log(docs)
                            res.render("confirmBusiness",{list:docs[0]})
                        }
                        else
                        {
                            res.send("error occured"+err)
                        }
                    });
                }
                else{
                    console.log(err);
                    res.send("error Occured in proceeding")
                }
            });
        }
        // { $set: { <field1>: <value1>, ... } }
        else
        {
            BusinessModel.save((err,doc)=>{
                if(!err)
                {
                    // res.send(simplecount,mediumcount,complexcount);
                    res.render("confirmBusiness",{list:doc})
                }
                else{
                    console.log(err)
                    res.send("error in Proceeding");
                }
            });
        
        }
    }
    else{
        console.log(err)
        res.send("error")
    }
    });
});
router.post("/effortcalculation",(req,res)=>{
    console.log("i am in effortcalculation")
    projectduration=req.body.Proj_Dura;
    simplecount=req.body.Simple_Count;
    mediumcount=req.body.Medium_Count;
    complexcount=req.body.Complex_Count;
    totalcount=req.body.Total_Count;
    ConfigurationDetailsModel.find((err,docs)=>{
        if(!err)
        {
            Simple_Dev_Effort=docs[0].Simple_Dev*simplecount;
            Simple_Srdev_Effort=docs[0].Simple_Srdev*simplecount;
            Simple_BA_Effort=docs[0].Simple_BA*simplecount;
            // Simple_BA_Effort=Simple_BA_Effort.toFixed(2);
            Simple_Arch_Effort=docs[0].Simple_Arch*simplecount;
            // Simple_Arch_Effort=Simple_Arch_Effort.toFixed(2);
            Simple_PM_Effort=docs[0].Simple_PM*simplecount;
            // Simple_PM_Effort=Simple_PM_Effort.toFixed(2)
            Simple_DM_Effort=docs[0].Simple_DM*simplecount;
            // Simple_DM_Effort=Simple_DM_Effort.toFixed(2);
            Total_Simple_Effort=Simple_Dev_Effort+Simple_Srdev_Effort+Simple_BA_Effort+Simple_Arch_Effort+Simple_PM_Effort+Simple_DM_Effort;
            Total_Simple_Effort=Total_Simple_Effort.toFixed(2);
            Total_Simple_Effort=Number(Total_Simple_Effort);

            Medium_Dev_Effort=docs[0].Medium_Dev*mediumcount;
            Medium_Srdev_Effort=docs[0].Medium_Srdev*mediumcount;
            Medium_BA_Effort=docs[0].Medium_BA*mediumcount;
            // Medium_BA_Effort=Medium_BA_Effort.toFixed(2);
            Medium_Arch_Effort=docs[0].Medium_Arch*mediumcount;
            // Medium_Arch_Effort=Medium_Arch_Effort.toFixed(2);
            Medium_PM_Effort=docs[0].Medium_PM*mediumcount;
            // Medium_PM_Effort=Medium_PM_Effort.toFixed(2)
            Medium_DM_Effort=docs[0].Medium_DM*mediumcount;
            // Medium_DM_Effort=Medium_DM_Effort.toFixed(2);
            Total_Medium_Effort=Medium_Dev_Effort+Medium_Srdev_Effort+Medium_BA_Effort+Medium_Arch_Effort+Medium_PM_Effort+Medium_DM_Effort;
            Total_Medium_Effort=Total_Medium_Effort.toFixed(2);
            Total_Medium_Effort=Number(Total_Medium_Effort);


            Complex_Dev_Effort=docs[0].Complex_Dev*complexcount;
            Complex_Srdev_Effort=docs[0].Complex_Srdev*complexcount;
            Complex_BA_Effort=docs[0].Complex_BA*complexcount;
            // Complex_BA_Effort=Complex_BA_Effort.toFixed(2);
            Complex_Arch_Effort=docs[0].Complex_Arch*complexcount;
            // Complex_Arch_Effort=Complex_Arch_Effort.toFixed(2);
            Complex_PM_Effort=docs[0].Complex_PM*complexcount;
            // Complex_PM_Effort=Complex_PM_Effort.toFixed(2);
            Complex_DM_Effort=docs[0].Complex_DM*complexcount;
            // Complex_DM_Effort=Complex_DM_Effort.toFixed(2);
            Total_Complex_Effort=Complex_Dev_Effort+Complex_Srdev_Effort+Complex_BA_Effort+Complex_Arch_Effort+Complex_PM_Effort+Complex_DM_Effort;
            Total_Complex_Effort=Total_Complex_Effort.toFixed(2);
            Total_Complex_Effort=Number(Total_Complex_Effort);


            Total_Dev_Effort=Simple_Dev_Effort+Medium_Dev_Effort+Complex_Dev_Effort;
            Total_Srdev_Effort=Simple_Srdev_Effort+Medium_Srdev_Effort+Complex_Srdev_Effort;
            Total_BA_Effort=Simple_BA_Effort+Medium_BA_Effort+Complex_BA_Effort;
            Total_BA_Effort=Total_BA_Effort.toFixed(2)
            Total_Arch_Effort=Simple_Arch_Effort+Medium_Arch_Effort+Complex_Arch_Effort;
            Total_Arch_Effort=Total_Arch_Effort.toFixed(2);
            Total_PM_Effort=Simple_PM_Effort+Medium_PM_Effort+Complex_PM_Effort;
            Total_PM_Effort=Total_PM_Effort.toFixed(2);
            Total_DM_Effort=Simple_DM_Effort+Medium_DM_Effort+Complex_DM_Effort;
            Total_DM_Effort=Total_DM_Effort.toFixed(2);
            Total_Of_Total_Effort=Total_Simple_Effort+Total_Medium_Effort+Total_Complex_Effort;
            Total_Of_Total_Effort=Total_Of_Total_Effort.toFixed(2);

            Dev_Roundoff=Math.round(Total_Dev_Effort/projectduration);
            Srdev_Roundoff=Math.round(Total_Srdev_Effort/projectduration);
            BA_Roundoff=(Total_BA_Effort/projectduration);
            BA_Roundoff=BA_Roundoff.toFixed(2);
            Arch_Roundoff=(Total_Arch_Effort/projectduration);
            Arch_Roundoff=Arch_Roundoff.toFixed(2);
            PM_Roundoff=(Total_PM_Effort/projectduration);
            PM_Roundoff=PM_Roundoff.toFixed(2);
            DM_Roundoff=(Total_DM_Effort/projectduration);
            DM_Roundoff=DM_Roundoff.toFixed(2);
            Total_Rounoff=Total_Of_Total_Effort/projectduration;
            Total_Rounoff=Total_Rounoff.toFixed(2);
            

            Bot_Creator_Count=Dev_Roundoff+Srdev_Roundoff;
            Botrunner_Unatt_Count=totalcount;
            Botrunner_Att_Count=0;
            Controlroom_Count=1;
            Bot_Creator_Price=docs[0].Bot_Creator_Cost;
            Botrunner_Unatt_Price=docs[0].Bot_Run_Unatt_Cost;
            Botrunner_Att_Price=docs[0].Bot_Run_Att_Cost;
            Controlroom_Price=docs[0].Cont_Room_Cost;
            Total_Bot_Creator_Cost=Bot_Creator_Count*Bot_Creator_Price;
            Total_Botrunner_Unatt_Cost=Botrunner_Unatt_Count*Botrunner_Unatt_Price;
            Total_Botrunner_Att_Cost=Botrunner_Att_Count*Botrunner_Att_Price;
            Total_Controlroom_Cost=Controlroom_Price*Controlroom_Count;
            Totalof_Total_Lisc_Price=Total_Controlroom_Cost+Total_Botrunner_Att_Cost+Total_Botrunner_Unatt_Cost+Total_Bot_Creator_Cost;

            VM_Count=Dev_Roundoff+Srdev_Roundoff;
            Server_Count=1;
            VM_Price=docs[0].VM_Cost;
            Server_Price=docs[0].Server_Cost;
            Total_VM_Price=VM_Count*VM_Price;
            Total_Server_Price=Server_Count*Server_Price;
            Totalof_Total_Infra_Price=Total_VM_Price+Total_Server_Price;

            Dev_Cost=Total_Dev_Effort*docs[0].Dev_Cost*168;
            Srdev_Cost=Total_Srdev_Effort*docs[0].Srdev_Cost*168;
            BA_Cost=Total_BA_Effort*docs[0].BA_Cost*168;
            Arch_Cost=Total_Arch_Effort*docs[0].Arch_Cost*168;
            PM_Cost=Total_PM_Effort*docs[0].PM_Cost*168;
            PM_Cost=PM_Cost.toFixed(2);
            DUlead_Cost=Total_DM_Effort*docs[0].DUlead_Cost*168;
            Total_Imp_Cost=Dev_Cost+Srdev_Cost+BA_Cost+Arch_Cost+PM_Cost+DUlead_Cost;
            

            res.render("Calculation",
            {Simple_Dev_Effort:Simple_Dev_Effort,
                Simple_Srdev_Effort:Simple_Srdev_Effort,
                Simple_BA_Effort:Simple_BA_Effort,
                Simple_Arch_Effort:Simple_Arch_Effort,
                Simple_PM_Effort:Simple_PM_Effort,
                Simple_DM_Effort:Simple_DM_Effort,
                Total_Simple_Effort:Total_Simple_Effort,

                Medium_Dev_Effort:Medium_Dev_Effort,
                Medium_Srdev_Effort:Medium_Srdev_Effort,
                Medium_BA_Effort:Medium_BA_Effort,
                Medium_Arch_Effort:Medium_Arch_Effort,
                Medium_PM_Effort:Medium_PM_Effort,
                Medium_DM_Effort:Medium_DM_Effort,
                Total_Medium_Effort:Total_Medium_Effort,

                
                Complex_Dev_Effort:Complex_Dev_Effort,
                Complex_Srdev_Effort:Complex_Srdev_Effort,
                Complex_BA_Effort:Complex_BA_Effort,
                Complex_Arch_Effort:Complex_Arch_Effort,
                Complex_PM_Effort:Complex_PM_Effort,
                Complex_DM_Effort:Complex_DM_Effort,
                Total_Complex_Effort:Total_Complex_Effort,


                 Total_Dev_Effort:Total_Dev_Effort,
            Total_Srdev_Effort:Total_Srdev_Effort,
            Total_BA_Effort:Total_BA_Effort,
            Total_Arch_Effort:Total_Arch_Effort,
            Total_PM_Effort:Total_PM_Effort,
            Total_DM_Effort:Total_DM_Effort,
            Total_Of_Total_Effort:Total_Of_Total_Effort,

            Dev_Roundoff:Dev_Roundoff,
            Srdev_Roundoff:Srdev_Roundoff,
            BA_Roundoff:BA_Roundoff,
            Arch_Roundoff:Arch_Roundoff,
            PM_Roundoff:PM_Roundoff,
            DM_Roundoff:DM_Roundoff,
            Total_Rounoff:Total_Rounoff,

            Bot_Creator_Count:Bot_Creator_Count,
            Botrunner_Unatt_Count:Botrunner_Unatt_Count,
            Botrunner_Att_Count:Botrunner_Att_Count,
            Controlroom_Count:Controlroom_Count,
            Bot_Creator_Price:Bot_Creator_Price,
            Botrunner_Unatt_Price:Botrunner_Unatt_Price,
            Botrunner_Att_Price:Botrunner_Att_Price,
            Controlroom_Price:Controlroom_Price,
            Total_Bot_Creator_Cost:Total_Bot_Creator_Cost,
            Total_Botrunner_Unatt_Cost:Total_Botrunner_Unatt_Cost,
            Total_Botrunner_Att_Cost:Total_Botrunner_Att_Cost,
            Total_Controlroom_Cost:Total_Controlroom_Cost,
            Totalof_Total_Lisc_Price:Totalof_Total_Lisc_Price,

            VM_Count:VM_Count,
            Server_Count:Server_Count,
            VM_Price:VM_Price,
            Server_Price:Server_Price,
            Total_VM_Price:Total_VM_Price,
            Total_Server_Price:Total_Server_Price,
            Totalof_Total_Infra_Price:Totalof_Total_Infra_Price,

            Dev_Cost:Dev_Cost,
            Srdev_Cost:Srdev_Cost,
            BA_Cost:BA_Cost,
            Arch_Cost:Arch_Cost,
            PM_Cost:PM_Cost,
            DUlead_Cost:DUlead_Cost,
            Total_Imp_Cost:Total_Imp_Cost,
            
            });
            
            
        }
        else{
            res.send(err)
            console.log(err)
        }
    });

});
router.get("/liscenseCost",(res,req)=>{
    res.render("liscenseCost")
});
router.get("/liscenceCostCalculation",(req,res)=>{
    ConfigurationDetailsModel.find((err,doc)=>{
        if(!err)
        {
            BusinessModel.find((err,docs)=>{
                if(!err){
                    var length=docs[0].Selected_Process.length
                    console.log(length)
                    var count=0
                    for(i=0;i<length;i++)
                     { 
                        //  count=count+1;
                    //     console.log(docs[0].Selected_Process[i])
                    //     var SelectedString=docs[0].Selected_Process[i];
                    //     console.log(SelectedString)
                    //     var Selected=SelectedString.split(',');
                    //     console.log(Selected)
                    //     docs[i]=Selected[i];
                    //     console.log(docs[i])
                    //     console.log(count)
                    var selected=docs[0].Selected_Process[i].split(',')
                    var SelectedId=[];
                    if(i!=0)
                    {
                        SelectedId.concat(selected[0])
                    }
                    else{
                        SelectedId.push(selected[0])
                    }
                    
                    
                    
                        console.log(SelectedId)
                    }
                    // console.log("total"+SelectedId)
                    
                    for(i=0;i<SelectedId.length;i++){
                        console.log(SelectedId[i])
                    }
                    

                    res.render("liscenseCost",{list:docs[0],lists:doc[0]})
                }
                else{
                    res.send(err)
                    console.log(err)
                }
            });
        }
        else
        {
            res.send(err)
            console.log(err)
        }
    });
});
router.get("/adminViewById", (req, res)=>{
     res.render("adminViewById")
 });
 router.get("/approveProcess", (req, res)=>{
    ProcessModel.find({Status:"REQUESTED"},(err, docs) => {
        if(!err){
        res.render("approveProcess", {list: docs});
      
        console.log(docs);
        }
        else {
        console.log('Failed to retrieve the Course List: '+ err);
        }
        });
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
router.get("/approved", (req, res)=>{
    res.render("approved")
});
router.get("/secondProcess", (req, res)=>{
    res.render("secondProcess")
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
       res.render("secondProcess",{list:doc});
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
router.post("/addProcessTwo", (req, res)=>{
    var secondprocessmodel = new SecondProcessModel();
    secondprocessmodel.Proc_Id = req.body.Proc_Id;
    secondprocessmodel.Num_of_apps = req.body.Num_of_apps;
    secondprocessmodel.Num_of_mainframe = req.body.Num_of_mainframe;
    secondprocessmodel.Num_of_Citrix = req.body.Num_of_Citrix;
    secondprocessmodel.Third_party_sites = req.body.Third_party_sites;
    secondprocessmodel.Num_of_scrs = req.body.Num_of_scrs;
    secondprocessmodel.Num_of_proccessteps = req.body.Num_of_proccessteps;
    secondprocessmodel.Num_of_Scenarios = req.body.Num_of_Scenarios;
    secondprocessmodel.Num_of_Decpoints = req.body.Num_of_Decpoints;
    secondprocessmodel.Num_of_standardinput = req.body.Num_of_standardinput;
    secondprocessmodel.Intr_dynamic_table = req.body.Intr_dynamic_table;
    secondprocessmodel.Num_of_basedcontrols = req.body.Num_of_basedcontrols;
    secondprocessmodel.Num_of_accessprofile = req.body.Num_of_accessprofile;
    secondprocessmodel.Num_of_browsersupp = req.body.Num_of_browsersupp;
    secondprocessmodel.Operation_stability = req.body.Operation_stability;
    secondprocessmodel.Freq_change = req.body.Freq_change;
    secondprocessmodel.Svc_lvl_agr = req.body.Svc_lvl_agr;
    secondprocessmodel.Num_of_getsignoff = req.body.Num_of_getsignoff;
    secondprocessmodel.Num_of_Envsetup = req.body.Num_of_Envsetup;
    secondprocessmodel.Func_point = req.body.Func_point;
    secondprocessmodel.Monthly_effsaving = req.body.Monthly_effsaving;
    secondprocessmodel.Effort = req.body.Effort;
    secondprocessmodel.Quadrant = req.body.Quadrant;
    if(secondprocessmodel.Func_point <= 25)
    secondprocessmodel.Classification = "Simple";
    else if(secondprocessmodel.Func_point > 25 && secondprocessmodel.Func_point <= 50)
    secondprocessmodel.Classification = "Medium";
    else
    secondprocessmodel.Classification = "Complex";
    secondprocessmodel.save((err, doc) => {
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
       res.render("secondProcess",{viewtitle:"Captured Successfully"});
    }

});
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
         

    router.get('/viewById/:id', (req, res) => {
        console.log("Inside router")
        console.log(req.params.id);
    //    if(req.params.id) {
        ProcessModel.find(req.params.id,(err, doc) => {
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
    // }
    // else
    // res.render("processViewById",{viewtitle:"Please enter the Process Id"});
        });
router.get("/approveProcessById/:id",(req,res)=>{
    // console.log(req)
  if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
      console.log(req.params.id.match(/^[0-9a-fA-F]{24}$/))
      ProcessModel.findByIdAndUpdate(req.params.id,{Status:"APPROVED"}, (err,doc)=>{
          console.log(doc)
        if (!err) {
            res.render("approved"); 
           }         
     else
       { res.send('Error during updating the record: ' + err);}

      });
  }
  else{
    res.render("approveProcess",{viewtitle : "Invalid"})  
  }
});

// router.get("/approveProcessById/:id", (req, res)=>{
//     console.log(req.params.id);
//     if(req.params.id){
//         ProcessModel.findById(req.params.id,(err,doc)=>{
//            if(doc.length!=0){
//                 if(doc.Status=="REQUESTED"){
//                     ProcessModel.updateOne({ Status: "APPROVED" }, (err, doc) => {
//                         //console.log(doc)
//                         if (!err) {
//                              res.render("approveProcess",{viewresult:"APPROVED Successfully"}); 
//                             }         
//                       else
//                         { res.send('Error during updating the record: ' + err);}
//                             });
//                 }
//                 else{
//                     res.render("approveProcess",{viewtitle : "Process is alredy approved!"})
//                 }
//            }
//            else{
//             res.render("approveProcess",{viewtitle : "Process is not captured!"})
//            }
//         });
    
//         }
//         else
//         res.render("approveProcess",{viewtitle : "please enter the Process Id"})   
               
//         });
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

 router.get('/:id', (req, res) => {
        ProcessModel.find(req.params.Proc_Id, (err, doc) => {
            console.log("in view")
            console.log(req.params.Proc_Id)
            console.log(doc[0])
            if(doc[0].length!=0){
                console.log(doc.Status)
                if (doc[0].Status=="APPROVED") {
                res.render("processList", {viewtitle:"process",process:doc[0]
                });
                //console.log(doc);
                }
                else
                res.render("processViewById",{viewtitle:"Process is not Approved wait for the admin approval"});
               //res.send("Process Not Approved"); 
            }
                else{
                    res.render("processViewById",{viewtitle : "Process is not captured!" })
                }
        });
        });
module.exports = router;