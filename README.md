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

!Resolve duplicated name file uploading bug 
