# 🎵 Apple Music -- Data Analytics PoC

### Universidad Da Vinci --- Bases de Datos II

**Estudiante:** \[Jonnatan Danilo Macario Escobar\]\
**Catedrático:** Ing. Brandon Chitay\
**Fecha:** 07-12-2025

------------------------------------------------------------------------

# Descripción del Proyecto

Este repositorio contiene la Prueba de Concepto (PoC) solicitada para el
caso de estudio de Apple Music, donde se requiere diseñar una
arquitectura de datos moderna capaz de procesar millones de streams por
minuto y generar analíticas en tiempo real.

La solución incluye: - Contenedores Docker con MongoDB\
- Seeder masivo\
- Arquitectura NoSQL\
- 5 Aggregation Pipelines\
- API Design\
- Dashboard visual con v0.app\
- Presentación final

------------------------------------------------------------------------

# Arquitectura General

    MongoDB (Docker)
       ├── users
       ├── artists
       ├── songs
       └── streams
            ↑
            Aggregation Pipelines
            ↑
            API Design
            ↑
            Dashboard (v0)

------------------------------------------------------------------------

# 1. Infraestructura (Docker)

Archivo: `database/docker-compose.yml`

Ejecución:

    docker-compose up -d

------------------------------------------------------------------------

# 2. Data Seeding

Script: `seed.js`

Genera: 
- 100 usuarios\
- 5 artistas\
- 50 canciones\
- 2000+ streams\
- Usuarios zombis\
- Sesgo hacia Guatemala y Bad Bunny

Ejecutar:

    npm install
    npm start

------------------------------------------------------------------------

# 3. Diseño del Esquema

Archivo: `database/schema-diagram.pdf`

Incluye: 
- users\
- artists\
- songs\
- streams

------------------------------------------------------------------------

# 4. Aggregation Pipelines

Archivo: `database/queries.js`

Consultas: 
1. Regalías por artista\
2. Top 10 GT\
3. Usuarios Premium Zombis\
4. Demografía (Reggaeton)\
5. Heavy Users Bad Bunny

------------------------------------------------------------------------

# 5. Diseño de API

Archivo: `api-design/api-spec.md`

Endpoints bien documentados: 
- /analytics/royalties\
- /charts/top10\
- /users/zombies\
- /demographics/reggaeton\
- /users/heavy/badbunny

------------------------------------------------------------------------

# 6. Dashboard Visual (v0.app)

Carpeta: `dashboard-v0/screenshots/`

Prompt usado: `dashboard-v0/prompt.txt`

Incluye capturas de:
- Regalías\
- Top10\
- Zombis\
- Edades\
- Heavy Users

------------------------------------------------------------------------

# 7. Defensa (Video)

Link al video: **\[https://drive.google.com/file/d/1YIBgcArYFuA2AYW_cmS__B_qF2lKl-d0/view?usp=sharing\]** 

------------------------------------------------------------------------

# Proyecto listo para entrega

Esta solución demuestra una arquitectura NoSQL escalable, consultas
complejas y un dashboard profesional para Apple Music.
