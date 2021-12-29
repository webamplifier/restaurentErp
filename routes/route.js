const express = require('express');
const UserController = require("../controllers/UserController");
const ProductController = require('../controllers/ProductController');
const Middlewares = require('../middlewares/Middleware');
const SalesController = require("../controllers/SalesController")

const RestaurentController = require("../controllers/RestaurentController");
const ExpenseController= require("../controllers/ExpenseController");

const ProfitController = require("../controllers/ProfitController")

const router = express.Router();

// user related routes
router.post('/login',UserController.login);
router.get('/userlist',Middlewares.checkAuth,UserController.list);
router.post('/createuser',Middlewares.checkAuth,UserController.create);
router.get('/userById/:id',Middlewares.checkAuth,UserController.fetchById);
router.post('/updateuser/:id',Middlewares.checkAuth,UserController.update);
router.get('/deleteuser/:id',Middlewares.checkAuth,UserController.delete);
router.post('/editPassword/:id',Middlewares.checkAuth,UserController.updatePassword);

// restaurent routes
router.post('/createRestaurant',Middlewares.checkAuth,RestaurentController.create);
router.get('/restaurantlist',Middlewares.checkAuth,RestaurentController.list);
router.get('/restaurantById/:id',Middlewares.checkAuth,RestaurentController.fetchById);
router.post('/updaterestaurant/:id',Middlewares.checkAuth,RestaurentController.update);
router.get('/deleteRestaurent/:id',Middlewares.checkAuth,RestaurentController.delete);

//expense routes
router.post('/createexpense',Middlewares.checkAuth,ExpenseController.create);
router.get('/expenselist',Middlewares.checkAuth,ExpenseController.list);
router.get('/expenseById/:id',Middlewares.checkAuth,ExpenseController.fetchById);
router.post('/updateexpense/:id',Middlewares.checkAuth,ExpenseController.update);
router.get('/deleteexpense/:id',Middlewares.checkAuth,ExpenseController.delete);
router.post('/filterExpensesByDate',Middlewares.checkAuth,ExpenseController.filterDateProfit)

// product routes
router.get('/productlist',Middlewares.checkAuth,ProductController.list);
router.post('/createproduct',Middlewares.checkAuth,ProductController.create);
router.get('/productById/:id',Middlewares.checkAuth,ProductController.fetchById);
router.post('/updateproduct/:id',Middlewares.checkAuth,ProductController.update);
router.get('/deleteproduct/:id',Middlewares.checkAuth,ProductController.delete);

// sales related routes
router.get('/salesList',Middlewares.checkAuth,SalesController.list)
router.get('/salesListPending',Middlewares.checkAuth,SalesController.listPending)
router.post('/create/sales',Middlewares.checkAuth,SalesController.create);
router.get('/detail/sales/:id',Middlewares.checkAuth,SalesController.fetchById)
router.post('/edit/sales/:id',Middlewares.checkAuth,SalesController.update)
router.get('/delete/sales/:id',Middlewares.checkAuth,SalesController.delete)
router.get('/fetchSalesDetail/:id',Middlewares.checkAuth,SalesController.fetchSalesDetail)
router.post('/filterSalesByDate',Middlewares.checkAuth,SalesController.filterDateProfit)

// profit routes
router.get('/get-total-profile-record',Middlewares.checkAuth,ProfitController.getProfitAmountReport)
router.post('/get-profit-data',Middlewares.checkAuth,ProfitController.filterDateProfit)

module.exports = router;