<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Documents\DocumentsController;
use App\Http\Controllers\Setting\SettingController;
use App\Http\Controllers\UnauthenticatedController;
use App\Http\Controllers\Brands\BrandsController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Billing\BillingController;
use App\Http\Middleware\CheckUserStatus;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Deposit\DepositController;
use App\Http\Controllers\Exam\ExamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('messages', [ChatController::class, 'message']);
Route::get('/messages/{community_slug}', [ChatController::class, 'getMessages']);
Route::get('/long-poll/{communitySlug}', [ChatController::class, 'longPoll']);
Route::get('settingrowClient', [UnauthenticatedController::class, 'settingrowClient']);

Route::group([
    'middleware' => 'api',
    'prefix'     => 'auth'
], function () {
    Route::post('userRegister', [UserAuthController::class, 'register']);
    Route::post('userLogin', [UserAuthController::class, 'login']);

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('profile', [AuthController::class, 'profile']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('updateprofile', [AuthController::class, 'updateprofile']);
    Route::post('updateUserProfileSocial', [AuthController::class, 'updateUserProfileSocial']);
    Route::post('changesPassword', [AuthController::class, 'changesPassword']);
    Route::post('updatePassword', [AuthController::class, 'updatePassword']);
    Route::get('showProfileData', [AuthController::class, 'showProfileData']);
    //Route::post('password/email', [ForgotPasswordController::class, 'sendPasswordResetEmail']);
    //Route::post('password/reset', [ResetPasswordController::class, 'updatePassword']);
});

Route::group([
    'prefix' => 'public'
], function () {
    Route::get('/filterepdfrow', [UnauthenticatedController::class, 'filterepdfrow']);
    Route::get('/gettorrentrow', [UnauthenticatedController::class, 'gettorrentrow']);
    Route::get('/geteServicerow', [UnauthenticatedController::class, 'geteServicerow']);
    Route::get('/filterepdfCategory', [UnauthenticatedController::class, 'filterepdfCategory']);
    Route::get('/getepdfCategoryList', [UnauthenticatedController::class, 'getepdfCategoryList']);
    Route::get('/geteServiceList', [UnauthenticatedController::class, 'geteServiceList']);
    Route::get('/getSeoDataForIndex', [UnauthenticatedController::class, 'getSeoDataForIndex']);
    Route::get('/getSeoDataForQuesAnsw', [UnauthenticatedController::class, 'getSeoDataForQuesAnsw']);
    Route::get('/getSeoDataForTorrent', [UnauthenticatedController::class, 'getSeoDataForTorrent']);
    Route::get('/getSeoDataForHome', [UnauthenticatedController::class, 'getSeoDataForHome']);
    Route::get('/mainCategorySeo/{slug}', [UnauthenticatedController::class, 'mainCategorySeo']);
    Route::get('/generate-pdf/{slug}', [UnauthenticatedController::class, 'generatePDF']);
    Route::get('getTorrentTutorial', [UnauthenticatedController::class, 'getTorrentTutorial']);
    Route::get('getTechnology', [UnauthenticatedController::class, 'getTechnology']);
    Route::get('getAllChildCaegorys', [UnauthenticatedController::class, 'getAllChildCaegorys']);
    Route::get('getSuraList', [UnauthenticatedController::class, 'getSuraList']);

    Route::get('allCategorys', [UnauthenticatedController::class, 'allCategory']);
    Route::get('parentChildCategory', [UnauthenticatedController::class, 'parentChildCategory']);
    Route::get('childCategory', [UnauthenticatedController::class, 'childCategory']);
    Route::get('getChildDataParentWise/{slug}', [UnauthenticatedController::class, 'getChildDataParentWise']);
    Route::get('getanswers', [UnauthenticatedController::class, 'getanswers']);
});

Route::middleware(['auth:api', CheckUserStatus::class])->group(function () {


    Route::group([
        'middleware' => 'api',
        'prefix' => 'deposit'
    ], function () {
        Route::get('deposit-list', [DepositController::class, 'getDepositList']);
     
    });


    Route::group([
        'prefix' => 'user'
    ], function () {
        Route::get('checkCurrentUser', [UserController::class, 'checkCurrentUser']);
        Route::get('getRoleList', [UserController::class, 'getRoleList']);
        Route::get('referralCode', [UserController::class, 'referralCode']);
        Route::get('allrolelistsInfo', [UserController::class, 'allrolelistsInfo']);
        Route::get('allrolelist', [UserController::class, 'allrolelist']);
        Route::get('roleCheck/{id}', [UserController::class, 'roleCheck']);
        Route::get('getUserRow/{id}', [UserController::class, 'editUserId']);
        Route::get('getCountry', [UserController::class, 'getCountry']);
        Route::get('getTime', [UserController::class, 'getTime']);
        Route::get('inactiveEmployee', [UserController::class, 'inactiveEmployee']);
        Route::get('inactiveUser', [UserController::class, 'inactiveUser']);
        Route::get('getInviteCode', [UserController::class, 'getInviteCode']);
        Route::get('autocompleteUser', [UserController::class, 'autocompleteUser']);
        Route::get('allUsers', [UserController::class, 'AllUsersList']);
        Route::get('allAgent', [UserController::class, 'allAgent']);
        Route::get('allAdmin', [UserController::class, 'allAdmin']);
        Route::get('allSuperAdmin', [UserController::class, 'allSuperAdmin']);
        Route::get('getUserWiseCurrentBalance', [UserController::class, 'getUserWiseCurrentBalance']);
        Route::get('getEmployeeList', [UserController::class, 'getEmployeeList']);
        Route::get('getDesignationList', [UserController::class, 'getDesignationList']);
        Route::get('departmentCheck/{id}', [UserController::class, 'departmentCheck']);
        Route::get('designationCheck/{id}', [UserController::class, 'designationCheck']);
        Route::get('getDepartmentList', [UserController::class, 'getDepartmentList']);
        Route::get('typeofdoucments', [UserController::class, 'typeofdoucments']);
        Route::post('saveDesignation', [UserController::class, 'saveDesignation']);
        Route::post('saveDepartment', [UserController::class, 'saveDepartment']);
        Route::post('changePassword', [UserController::class, 'changePassword']);
        Route::post('changePasswordClient', [UserController::class, 'changePasswordClient']);
        Route::post('updateUserProPass', [UserController::class, 'updateUserProPass']);
        Route::post('saveUser', [UserController::class, 'saveUser']);
        Route::post('updateUser', [UserController::class, 'updateUser']);
        Route::post('updateUserProfileImg', [UserController::class, 'updateUserProfileImg']);
        Route::post('assignToUser', [UserController::class, 'assignToUser']);
        Route::post('saveRole', [UserController::class, 'saveRole']);
        Route::get('saveUserBookMark', [UserController::class, 'saveUserBookMark']);
        Route::get('fetechBookmark', [UserController::class, 'fetechBookmark']);
        Route::get('deleteBookmark', [UserController::class, 'deleteBookmark']);
    });

    Route::group([
        'prefix' => 'category'
    ], function () {
        Route::post('insertePdfCategory', [CategoryController::class, 'insertePdfCategory']);
        Route::post('inserMiningCategory', [CategoryController::class, 'inserMiningCategory']);
        Route::post('editMiningCategory', [CategoryController::class, 'editMiningCategory']);
        Route::post('editEpdfUpdate', [CategoryController::class, 'editEpdfUpdate']);
        Route::post('save', [CategoryController::class, 'save']);
        Route::post('edit', [CategoryController::class, 'edit']);
        Route::post('saveAttribute', [CategoryController::class, 'saveAttribute']);
        Route::post('saveAttributeVal', [CategoryController::class, 'saveAttributeVal']);
        Route::get('getCategoryList', [CategoryController::class, 'allCategory']);
        Route::get('allMiningCategoryes', [CategoryController::class, 'allMiningCategoryes']);
        Route::get('ePdfCategoryes', [CategoryController::class, 'ePdfCategoryes']);
        Route::get('getInacCategoryList', [CategoryController::class, 'allInacCategory']);
        Route::get('categoryRow/{id}', [CategoryController::class, 'findCategoryRow']);
        Route::get('getCategoryListParent', [CategoryController::class, 'getCategoryListParent']);
        Route::get('getSubCategoryChild/{id}', [CategoryController::class, 'getSubCategoryChild']);
        Route::get('minningCategoryrow/{id}', [CategoryController::class, 'minningCategoryrow']);
        Route::get('ePdfCategoryChkRow/{id}', [CategoryController::class, 'ePdfCategoryChkRow']);
        Route::get('attributeRow/{id}', [CategoryController::class, 'attributeRow']);
        Route::get('attributeValRow/{id}', [CategoryController::class, 'attributeValRow']);
        Route::get('attributeValRows/{product_id}/{product_attribute_id}', [CategoryController::class, 'attributeValRows']);
        Route::get('search', [CategoryController::class, 'searchCategory']);
        Route::get('attributes', [CategoryController::class, 'getAttribute']);
        Route::get('attributes-list', [CategoryController::class, 'getAttributeList']);
        Route::get('attributes-val-list', [CategoryController::class, 'getAttributeValList']);
        Route::get('postCategorysearch', [CategoryController::class, 'postCategorysearch']);
        Route::get('getCategoryRow', [CategoryController::class, 'getCategoryRow']);
        Route::get('epdfCategory', [CategoryController::class, 'epdfCategory']);
        Route::get('allCategorys', [CategoryController::class, 'getCategoryList']);
        Route::get('getCategoryUnderSubCat', [CategoryController::class, 'getCategoryUnderSubCat']);
    });

    Route::group([
        'prefix' => 'product'
    ], function () {
        Route::get('categoryWiseProduct', [ProductController::class, 'categoryWiseProduct']);
        Route::post('save', [ProductController::class, 'save']);
        Route::get('dashboardCounting', [ProductController::class, 'dashboardCounting']);
        Route::post('product-update', [ProductController::class, 'productUpdate']);
        Route::post('insertVarientGroup', [ProductController::class, 'insertVarientGroup']);
        Route::get('getProductList', [ProductController::class, 'getProductList']);
        Route::get('insertProductAttrAndValues', [ProductController::class, 'insertProductAttrAndValues']);
        Route::get('insertProductVarient', [ProductController::class, 'insertProductVarient']);
        Route::get('deleteValrient', [ProductController::class, 'deleteValrient']);
        Route::get('getAttrHistory/{id}', [ProductController::class, 'getAttrHistory']);
        Route::get('productrow/{id}', [ProductController::class, 'productrow']);
        Route::get('additionaIMagesDelete', [ProductController::class, 'additionaIMagesDelete']);
        Route::get('deleteCategory', [ProductController::class, 'deleteCategory']);
        Route::get('getVarientHistory', [ProductController::class, 'getVarientHistory']);
        Route::get('removeProducts/{id}', [ProductController::class, 'removeProducts']);
    });

    Route::group([
        'prefix' => 'post'
    ], function () {
        Route::post('savePdf', [PostController::class, 'savePdf']);
        Route::post('updateePdf', [PostController::class, 'updateePdf']);
        Route::post('save', [PostController::class, 'save']);
        Route::post('saveService', [PostController::class, 'saveService']);
        Route::post('update', [PostController::class, 'update']);
        Route::post('updateService', [PostController::class, 'updateService']);
        Route::post('addTorrent', [PostController::class, 'addTorrent']);
        Route::post('TorrentUpdate', [PostController::class, 'TorrentUpdate']);
        Route::get('postrow/{id}', [PostController::class, 'postrow']);
        Route::get('serviceImgDelete', [PostController::class, 'serviceImgDelete']);
        Route::get('servicerow/{id}', [PostController::class, 'servicerow']);
        Route::get('epdfRow/{id}', [PostController::class, 'epdfRow']);
        Route::get('postTorrentRow/{id}', [PostController::class, 'postTorrentRow']);
        Route::get('allPost', [PostController::class, 'allPostList']);
        Route::get('allServices', [PostController::class, 'allServices']);
        Route::get('ePdfallPost', [PostController::class, 'ePdfallPost']);
        Route::get('allTorrentFiles', [PostController::class, 'allTorrentFiles']);
        Route::get('postCategoryData', [PostController::class, 'postCategoryData']);
    });

    Route::group([
        'prefix' => 'billing'
    ], function () {

        Route::get('getBillingDetails', [BillingController::class, 'getBillingDetails']);
    });

    Route::group([
        'prefix' => 'exam'
    ], function () {

        Route::get('getExamDetails', [ExamController::class, 'getExamDetails']);
        Route::post('submitanswers', [ExamController::class, 'submitanswers']);
        Route::get('getanswers', [ExamController::class, 'getanswers']);
        Route::get('getCertificateDetails', [ExamController::class, 'getCertificateDetails']);
    });

    Route::group([
        //'middleware' => 'api',
        'prefix' => 'brands'
    ], function () {
        Route::post('save', [BrandsController::class, 'save']);
        Route::get('allbrandlist', [BrandsController::class, 'allbrandlist']);
        Route::get('allCouminitylist', [BrandsController::class, 'allCouminitylist']);
        Route::get('brandrow/{id}', [BrandsController::class, 'brandrow']);
        Route::get('communityrow/{id}', [BrandsController::class, 'communityrow']);
        Route::post('communitySave', [BrandsController::class, 'communitySave']);
    });

    Route::group([
        'prefix' => 'payment'
    ], function () {
        Route::post('create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
    });

    Route::group([
        'prefix' => 'documents'
    ], function () {
        Route::get('geteBooks', [DocumentsController::class, 'geteBooks']);
        Route::get('readebooks', [DocumentsController::class, 'readebooks']);
    });

    Route::group([
        'prefix' => 'setting'
    ], function () {
        //add slider 
        Route::post('insertSlider', [SettingController::class, 'insertSlider']);
        Route::post('upateSetting', [SettingController::class, 'upateSetting']);
        Route::get('slidersImages', [SettingController::class, 'slidersImages']);
        Route::get('sliderrow/{id}', [SettingController::class, 'sliderrow']);
        //setting row
        Route::get('settingrow', [SettingController::class, 'settingrow']);
    });
});