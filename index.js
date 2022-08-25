//const https = require('http');

//const { request } = require("express")
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./loggerMiddleware")


app.use(express.json())
app.use(cors())
app.use(logger)

let datas = [
  {
    id: 1,
    titulo: "agua",
    URL: "10.100.....agua.php?tipouma=2&edo=8&mun=01231&sexo=0",
    tipo: "WebService",
    campos: [
      "identidad",
      "idanio",
      "c",
      "d",
      "e",
      "tipouma",
      "superf",
      "num",
      "benef",
      "idsx",
    ],
    camposAl: [
      "Entidad",
      "Año",
      "cc",
      "dd",
      "ee",
      "ttipouma",
      "ssuperf",
      "nnum",
      "bbenef",
      "Sexo",
    ],
    camposSt: ["a", "idSx"],
    camposNm: ["b", "c"],
    camposCat: ["d", "e", "tipouma", "idSx"],
    camposOp: ["superf", "num", "benef"],
    camposGp: ["a", "b", "c", "d"],
    camposfilt: ["ent", "anio", "mun"],
    idsCompat: [2, 5, 8],
    idCapa: 65,
    content: "HTML is easyssskakakakak",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    titulo: "umas.php=cat=anio&anio=2012,2014,ent=5,7,mun=1001,1002,2001",
    URL: "10.100.....anps.php?",
    tipo: "REST|WebService",
    campos: ["a", "b", "c", "d", "e", "tipouma", "superf", "num", "benef"],
    camposAl: [
      "aa",
      "bb",
      "cc",
      "dd",
      "ee",
      "ttipouma",
      "ssuperf",
      "nnum",
      "bbenef",
    ],
    camposSt: ["a"],
    camposNm: ["b", "c"],
    camposCt: ["d", "e"],
    camposOp: ["superf", "num", "benef"],
    camposGp: ["a", "b", "c", "d"],
    idsCompat: [2, 5, 8],
    idCapa: 65,
    content: "HTML is easysssssssss",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
]

app.get("/", function (req, res) {
  res.send("Hello World")
})

app.get("/api/notes", function (req, res) {
  //res.json(datas);
  res.json(datas)
})

app.get("/api/notes/:id", function (req, res) {
  //res.json(datas);
  const id = Number(req.params.id)
  const tema = datas.find((datas) => datas.id === id)
  if (tema) {
    res.json(tema)
  } else {
    res.status(404).end()
  }
})

app.delete("/api/notes/:id", function (request, response) {
  //res.json(datas);
  const id = Number(request.params.id)
  datas = datas.filter((tema) => tema.id != id)
  response.status(204).end()
})

app.post("/api/notes", function (request, response) {
  const tema = request.body

  if (!tema.URL || !tema) {
    return response.status(400).json({
      error: "Tema.URL not found",
    })
  }
  const ids = datas.map((tema) => tema.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    titulo: tema.titulo,
    URL: tema.URL,
    tipo: tema.tipo,
    campos: tema.campos,
    camposAl: tema.camposAl,
    camposSt: tema.camposSt,
    camposNm: tema.camposNm,
    camposOp: tema.camposOp,
    camposGp: tema.camposGp,
    camposfilt: tema.camposfilt,
    idsCompat: tema.idsCompat,
    idCapa: tema.idCapa,
    content: tema.content,
    date: tema.date,
    important: tema.important,
  }
  datas = [...datas, newNote]
  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: "Not Found"
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
