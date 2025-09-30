// File ini akan menjadi entry poin aplikasi backend ini
 
import express from "express"; // Konfigurasi servernya
import router from "./routes/api";
const app = express();

const PORT = 3000;

app.use('/api', router);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});


