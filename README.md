ADMIN EMAIL:admin@admin.com
ADMIN PASS :adminadmin
SELLER EMAIL:seller@seller.com
SELLER PSS :sellerseller

🏥 Medicare Shop - Full-Stack Online Pharmacy Platform
Medicare Shop is a modern e-commerce platform specifically designed for selling medicines and healthcare products. It follows a Role-Based Access Control (RBAC) system, with separate dashboards and functionalities for admin, sellers, and customers.

🚀 Key Features & Highlights
Seller Request & Approval Workflow: Customers cannot become sellers directly; they have to apply and the admin reviews and updates their roles.

Atomic Transactions: Prisma Transaction ($transaction) is used so that when the seller approves, the request status and user role are updated together (Data Consistency).

Dynamic Product Management: Category-based medicine display and stock management.

Modern Auth: Secure user authentication and session management through BetterAuth.

Clean Architecture: The code is kept organized and maintainable by using the Route-Controller-Service pattern in the backend.

🛠 Tech Stack
🛠 Frontend:
Next.js (App Router): For server side rendering and fast performance.

TypeScript: For type safety and bug reduction.

Tailwind CSS: For modern and responsive user interface.

React Hook Form & Zod: For form validation and type validation.

Axios / TanStack Query: API call and data fetching management.

🛠 Backend:
Node.js & Express.js: Scalable backend server.

Prisma ORM: For handling database queries and relationships.

PostgreSQL (Neon DB): Reliable and cloud-based relational database.

Bcrypt: For password hashing and security.

👥 Roles & Permissions
1. Customer Role (Default)
Can browse and search for medicines on the home page.

Can filter medicines by category.

Can view medicine details and stock status.

Become a Seller: Can apply to become a seller with the necessary information (Shop Name, Address, etc.).

Can view your order history.

2. Seller Role
Seller Dashboard: Can manage your shop's medicine list.

Add new medicines, update prices and change stock.

Can view orders for your medicines.

3. Admin Role
User Management: Can control all users and their roles.

Request Approval: Can review, approve or reject applications to become a seller from customers.

Can deactivate/block any seller if necessary.

Can manage categories and data of the entire platform.







