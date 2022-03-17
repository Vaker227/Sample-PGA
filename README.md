## Login - **Done**

-	Allow Admin can login with Email & Password **Pass**
-	Requirement: 
	+ Form validate (Require inputs) **Pass**
	+ Email verify type input **Pass**
	+ Password verify with min length is 6 characters **Pass**
	+ Redirect to Product list page after logged successfully **Pass**


## User Management
### User List - **Done**
-	Get User List with filters **Pass**
-	Requirement:
	+ Pagination (Default is 25 items/page), show total items, allow custom limit on page (25, 50, 75, 100) **Pass**
	+ Filters: User Types (Get types from API: /apiAdmin/commons/role), Status (include: ‘Any status’– value: ‘null’, ‘Enable’ – value ‘E’ , ‘Disable’ – value ‘D’ , ‘Unapproved vendor’ – value ‘U’) => All filter value must be is an array **Pass**
	+ Searching by Keyword **Pass**
	+ Loading screen when searching/filtering **Pass**
	+ Sort by Email, Name (ASC, DESC) **Pass**
	+ Click to row => Redirect to User detail page **Pass**
	+ Option to select all row to Remove selected **Pass**
	+ Click to Trash icon => selected row to delete **Pass**

### Create/Update User **Done**
-	Function to create new User or update User **Pass**
-	Requirement:
  	+ Form validate: Require for all (*) field **Pass**
	+ Email validate **Pass**
	+ Password min-length is 6 characters **Pass**
	+ Password & Confirm password must be the same **Pass**
	+ Page Create & Update user have the same UI, just need add data to Update page **Pass**

### Delete User **Done**
-	Allow delete batch of Users => Function need working on User list page **Pass**


## Product Management 
### Product List **Done**
-	Get User List with some filters: Keywords, User Type, Status … **Pass**
-	Requirement:
	+ Pagination (Default is 25 items/page), show total items, allow custom limit on page (25, 50, 75, 100) **Pass**
	+ Filters: Category (Get list from API: / api/categories/list), Stock Status (include: ‘Any status’– value: ‘all, ‘In Stock’ – value ‘in’ , ‘Low stock’ – value ‘low’ , ‘SOLD’ – value ‘out’) **Pass**
	+ Searching by Keyword **Pass**
	+ Loading screen when searching/filtering **Pass**
	+ Sort by SKU, Name (ASC, DESC) **Pass** 
	+ Click to row => Redirect to Product detail page **Pass**
	+ Option to select all row to Remove selected **Pass**
	+ Click to Trash icon => selected row to delete **Pass**

### Create/Update Product **Done**
-	Function allow to create/update a Product **Pass**
-	Requirement:
	+ Form validate: Require for all (*) field **Pass**
	+ Page Create & Update user have the same UI, just need add data to Update page **Pass**
	+ Add button only available when the form is Valid **Pass**
	+ Allow select multiple Category **Pass**
	+ Allow upload multiple image **Pass**
	+ Allow Drag & Drop image priority **Pass**
	+ When setup the Price for product & selected “Sale” checkbox => Show the child-box with select Sale Price based on Percent(%) or Fix Price ($) **Pass**
	+ Date field can select date on the popup (Date picker) **Pass**

### Delete Product **Done**
- Allow delete batch of Products => Function need working on Product list page **Pass**