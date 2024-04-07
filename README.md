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

- Apply login account accessing control (One AuthProvider() with different initialized Context) in one script - "AuthContext"
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

  1.  Application regular access control (Admin/DSPs)
  2.  Supabase senssion control (Log in/out to Supabase when processing data to the database)

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

      1.  ArrayBuffer decode

          - "application/vnd.ms-excel", ContentType in the header is not consistent (ContentType in the request header is correct)

      2.  GetURL with the individual token, though ending up with failed to add "sign/" into PUT request

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

- Signle Day OrderList Uploading -> Single Day OrderList Table (Unfinished: "If table is existed, remove it + upload new")

03/18/2024

- Signle Day OrderList Uploading -> Single Day OrderList Table

03/19/2024

- Single day dispatch order list display
- Driver DSP sorting

03/20/2024

- Seperate "Display" and "Upload" section

03/23/2024

- Single DSP Single Day
  - "Date" + "DSP" Selection backend

03/25/2025

- Home, Login(Main/DSP) frontend

03/26/2025

- Home, Login(Main/DSP) frontend
- Admin Dsbd frontend

03/27/2024
![alt text](image.png)

04/03/2024

- Expand columns for new "rd assignment AZ" in the supabase table

04/04/2024

- Scripts organizaiton (admin dashboard date selection)

04/05/2024

- Fetch data for pie view in the admin dashboard

04/06/2024

- Mapping to the individual DSP pie chart when clicking on the according button
  ![alt text](image-1.png)

- Finished one-day mapping only

**\*\***Endpoint for the deployment is different than the endpoint for the local test

/^&%&^%_&^&\*\*(&(_^&_%_&$$$*&*$$_$&&_^\*))/
...Order List Display Features
!"Updated time" in "az rd asmnt" table
...Resolve the UI logic
!Check file name, 'order_list','rd asmnt'
!Potential bug: In undispatch day, if today's and tmr's batch num are unfilled
!Bug in updating new daily order list, asynch error in "insertion"

!Login Information Speration
e.g. Block the admin attempt in DSP login page

!Mapping data to the supabase table in "upload new order list"

- If the existed data is different than new comming, update them

!!!Browser Testing

- Chrome working
- Edge not
