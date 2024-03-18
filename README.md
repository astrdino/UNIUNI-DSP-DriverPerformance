Uniuni Driver Performance for DSPs

02/12/2024
1. Deployment on Vercel
2. Reading dynamically cloud file (from the Public Directory in this case, the user can choose to read file from Cloud Storage)

02/13/2024 (Deployed)
1. Multi-Pages
2. Component Authentication (Without using API)
   - Endpoint prevention
3. Date time display

02/14/2024
- Apply login account accessing control (One AuthProvider() with different initialized Context) in one script -  "AuthContext"
- Use different scripts ("ProtectedRoute", "ProtectedRoute_DSP") to make up components for event - "Unauthorized has as to return login page"

02/15/2024
1. Drop List Routing
2. XLSX data conditional display and analysis

02/18/2024
- Cloud Storage System Update: static local directory -> Supabase 
- Supabase Backend API Configuration ("Update")

03/02/2024
- Integrated Supabase API to fetch data from the cloud storage and displayed in the web component

03/04/2024 
- (Deployed) Added enviroment variables in Vercel so client-end will able to connect with Supabase

- Nested Authentication	
	1. Application regular access control (Admin/DSPs)
	2. Supabase senssion control (Log in/out to Supabase when processing data to the database)

	!Policies set up in supabase


03/05/24

- Admin Dashboard
	- Login with input values
	- Clear value if the "Log In" is hitted
	- Cloud LogIn UI workflow


03/06/24

- Admin Dashboard 
	- Managed and organized code of Admin Dashboard Component
	- Achieved Props in Component


03/07/24
- Admin Dashboard
	- Resolved duplicated name file uploading bug 
		- Somehow spbs.update() is not working for me. Tried:
			1. ArrayBuffer decode
				- "application/vnd.ms-excel", ContentType in the header is not consistent (ContentType in the     request header is correct)

			2. GetURL with the individual token, though ending up with failed to add "sign/" into PUT request

		- Instead, I applied two asyn functions - to remove the candidate first before to
		  upload them.


03/08/24
- Get polices done for uploading + inserting into supbase storage

03/09/24
- Workflow in uploading-mapping operation updated


03/10/24
- Uploading-mapping: insertion

03/11/24 (Deployed)
- Resolved updating latest day and batch number in db once get new RD ASMNT 
	- current feature: 
		1. All B-D in 2024 will be mapped in database if db is empty
		2. If db is not empty, only update the missing B-D
		3. If first a couple of rows are recorded, the other after them won't get updated.


03/13/2024
- Function "Upload Order List to Supabase Storage"
	- Multiple conditions (Datepicker + File uploading)


03/14/2024
- Added one more column in supabase so two different batch number will be placed in seperated column
	- One BatchNum One Column
- Check in the supabase table if the given vaue is stored in any columns
- Logic Check if the batch in the sheet is corresponding manually 

03/15/2024
- Create new tables by calling PostgreSQL function in React
	- ...contain policies generating and RLS active


03/16/2024
- PostgreSQL function is working on SQL edition in Supabase but not return back to the Application end in react
  so I apply an alternative which simply utilizing "Select()", if the table not existed, specific type of error is thrown, otherwise is it existed



03/17/2024
- Signle Day OrderList Uploading -> Single Day OrderList Table


******Endpoint for the deployment is different than the endpoint for the local test


...Order List Display Features
	
!Resolve the UI logic
!Check file name, 'order_list','rd asmnt'

