let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTA2NTk5NywianRpIjoiY2EzNjFhNDctYmZkZC00NGE1LTg1MDEtZTIzM2YyNWJjNjAyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IlJhbmdlcnMgU3F1YWQiLCJuYmYiOjE3MDkwNjU5OTcsImNzcmYiOiJhZjM4NzI0ZC0wYmM4LTQzZmMtOGZlNS04NjNkNDMzMjQ4NTYiLCJleHAiOjE3NDA2MDE5OTd9.nGOP7tZgrSNw60p2A7bTVVhShf52TFttv3-3o8g-Esg"//grab this from insomnia (give us permission to access the API routes)
let userId = localStorage.getItem('uuid') // represent the customer for our API calls 



// put all our API calls in 1 giant dictionary/object

export const serverCalls = {
    
    getShop: async () => {
        // api call consist of 1-5 things
        // 1. url ( required )
        // 2. headers ( optional ) //typically there
        // 3. parameters ( optional )
        // 4. body ( optional ) //usually on POST requests
        // 5. methods (GET, POST, PUT, DELETE)
        const response = await fetch(`https://rangers138-shopmm.onrender.com/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        
        return await response.json()
    }
    
}