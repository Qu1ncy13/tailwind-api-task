import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`server is ready port: ${PORT}`);
});
app.use(express.json());
app.use(cors());

app.get("/api/services", async (req, res) =>{
    const responce = await fetch("https://sites.creatrix-digital.ru/sanatorium/api/v1/services");
    const data = await responce.json();
    res.json(data);
});

app.get("/api/staff", async (req, res) =>{
    const responce = await fetch("https://sites.creatrix-digital.ru/sanatorium/api/v1/medical-staff");
    const data = await responce.json();
    res.json(data);
}); 

app.get("/api/homes", async (req, res) =>{
    const responce = await fetch("https://sites.creatrix-digital.ru/sanatorium/api/v1/homes");
    const data = await responce.json();
    res.json(data);
});
app.post("/api/book", async (req, res) =>{
    const {fio, phone, email, check_in_date, check_out_date, count_people, home_id, comment} = req.body;
    console.log(req.body);
    res.status(201).json({
        message: "Дом забронирован"
    });
});
app.get("/api/staff/:id", async (req, res) =>{
    const specialistId = req.params.id;
    const responce = await fetch(`https://sites.creatrix-digital.ru/sanatorium/api/v1/medical-staff/${specialistId}`);
    const data = await responce.json();
    res.json(data);
});
app.get("/api/homes/:id", async (req, res) =>{
    const homeId = req.params.id;
    const responce = await fetch(`https://sites.creatrix-digital.ru/sanatorium/api/v1/homes/${homeId}`);
    const data = await responce.json();
    res.json(data);
});