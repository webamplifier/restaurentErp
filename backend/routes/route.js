const express = require('express');
const companyController = require("../controllers/CompanyController");
const UserController = require("../controllers/UserController");
const CategoryController = require('../controllers/CategoryController');
const SubCategoryController = require('../controllers/SubCategoryController')
const ProductController = require('../controllers/ProductController');
const VehicleController = require('../controllers/VehicleController');
const EstimationController = require('../controllers/EstimationController');
const Middlewares = require('../middlewares/Middleware');
const PartyController = require("../controllers/PartyController")
const CustomerController = require("../controllers/CustomerController");
const PurchaseController = require("../controllers/PurchaseController")
const InventoryController = require("../controllers/InventoryController");
const RecieptController= require("../controllers/RecieptController");

const RestaurentController = require("../controllers/RestaurentController")


const router = express.Router();


// user related routes
router.post('/login',UserController.login);
router.get('/userlist',Middlewares.checkAuth,UserController.list);
router.post('/createuser',Middlewares.checkAuth,UserController.create);
router.get('/userById/:id',Middlewares.checkAuth,UserController.fetchById);
router.post('/updateuser/:id',Middlewares.checkAuth,UserController.update);
router.get('/deleteuser/:id',Middlewares.checkAuth,UserController.delete);

// restaurent routes
router.post('/createRestaurant',Middlewares.checkAuth,RestaurentController.create);
router.get('/restaurantlist',Middlewares.checkAuth,RestaurentController.list);
router.get('/restaurantById/:id',Middlewares.checkAuth,RestaurentController.fetchById);
router.post('/updaterestaurant/:id',Middlewares.checkAuth,RestaurentController.update);

// category routes
router.get('/categorylist',Middlewares.checkAuth,CategoryController.list);
router.post('/createcategory',Middlewares.checkAuth,CategoryController.create);
router.get('/categoryById/:id',Middlewares.checkAuth,CategoryController.fetchById);
router.post('/updatecategory/:id',Middlewares.checkAuth,CategoryController.update);
router.get('/deletecategory/:id',Middlewares.checkAuth,CategoryController.delete);


// sub category routes
router.get('/subcategorylist',Middlewares.checkAuth,SubCategoryController.list);
router.post('/createsubcategory',Middlewares.checkAuth,SubCategoryController.create);
router.get('/subcategoryById/:id',Middlewares.checkAuth,SubCategoryController.fetchById);
router.post('/updatesubcategory/:id',Middlewares.checkAuth,SubCategoryController.update);
router.get('/deletesubcategory/:id',Middlewares.checkAuth,SubCategoryController.delete);


// product routes
router.get('/productlist',Middlewares.checkAuth,ProductController.list);
router.post('/createproduct',Middlewares.checkAuth,ProductController.create);
router.get('/productById/:id',Middlewares.checkAuth,ProductController.fetchById);
router.post('/updateproduct/:id',Middlewares.checkAuth,ProductController.update);
router.get('/deleteproduct/:id',Middlewares.checkAuth,ProductController.delete);

// party routes
router.get('/partylist',Middlewares.checkAuth,PartyController.list);
router.post('/createparty',Middlewares.checkAuth,PartyController.create);
router.get('/partyById/:id',Middlewares.checkAuth,PartyController.fetchById);
router.post('/updateparty/:id',Middlewares.checkAuth,PartyController.update);
router.get('/deleteparty/:id',Middlewares.checkAuth,PartyController.delete);

// customer routes
router.get('/clientlist',Middlewares.checkAuth,CustomerController.list);
router.post('/createclient',Middlewares.checkAuth,CustomerController.create);
router.get('/clientById/:id',Middlewares.checkAuth,CustomerController.fetchById);
router.post('/updateclient/:id',Middlewares.checkAuth,CustomerController.update);
router.get('/deleteclient/:id',Middlewares.checkAuth,CustomerController.delete);


// purchase related routes
router.get('/purchaseList',Middlewares.checkAuth,PurchaseController.list)
router.post('/createPurchase',Middlewares.checkAuth,PurchaseController.create);
router.get('/getPurchaseById/:id',Middlewares.checkAuth,PurchaseController.fetchById)
router.post('/updatePurchaseEntry/:id',Middlewares.checkAuth,PurchaseController.update)
router.get('/deletePurchase/:id',Middlewares.checkAuth,PurchaseController.delete)

//inventory related routes
router.get('/inventoryList',Middlewares.checkAuth,InventoryController.list)

//Reciept related routes
router.get('/recieptList',Middlewares.checkAuth,RecieptController.list)

// Company Routes but shown as clients
router.get('/companyList',Middlewares.checkAuth,companyController.list);
router.post('/createCompany',Middlewares.checkAuth,companyController.create);
router.get('/companyById/:id',Middlewares.checkAuth,companyController.fetchById);
router.post('/updateCompany/:id',Middlewares.checkAuth,companyController.update);
router.get('/deleteCompany/:id',Middlewares.checkAuth,companyController.delete);
router.post('/adjustDueAmount/:id',Middlewares.checkAuth,companyController.adjustAmount)
router.post('/getCompanySalesReport',Middlewares.checkAuth,companyController.getCompanySalesReport)

// vehicle routes
router.get('/vehiclelist',Middlewares.checkAuth,VehicleController.list);
router.post('/createvehicle',Middlewares.checkAuth,VehicleController.create);
router.get('/vehicleById/:id',Middlewares.checkAuth,VehicleController.fetchById);
router.post('/updatevehicle/:id',Middlewares.checkAuth,VehicleController.update);
router.get('/deletevehicle/:id',Middlewares.checkAuth,VehicleController.delete);

// estimation routes
router.get('/fetch-needs-estimation',Middlewares.checkAuth,EstimationController.fetchSalesNeeds);
router.post('/create-estimation',Middlewares.checkAuth,EstimationController.create);
router.post('/update-estimation/:id',Middlewares.checkAuth,EstimationController.update);
router.get('/estimation-list',Middlewares.checkAuth,EstimationController.list)
router.get('/estimation-detail/:id',Middlewares.checkAuth,EstimationController.getDetailById);
router.get('/delete/estimation/:id',Middlewares.checkAuth,EstimationController.delete)
router.post('/filter-sales-report',Middlewares.checkAuth,EstimationController.filterReport)

module.exports = router;