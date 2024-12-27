# How to Run the Project

## Prerequisites
- Node.js (npm)
- Yarn
- Neon connection string

## Run
1. Create a `.env` file with the following content, replacing the connection string with yours:
    ```
    DATABASE_URL="postgresql:// ... /neondb?sslmode=require"
    ```
2. Install dependencies
    ```console
    $ yarn
    ```
3. Apply database schema
    ```console
    $ yarn migrate
    ```
4. Compile the app
    ```
    $ yarn build
    ```
5. Start the app
    ```
    $ yarn start
    ```