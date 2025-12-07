# API Design Specification – Apple Music Analytics
Examen Final - Bases de Datos II
Autor: Jonnatan Macario
Fecha: 07-12-2025

## Objetivo
Esta API permite que un dashboard consulte datos agregados de la plataforma Apple Music Analytics.  
Cada endpoint corresponde a una Aggregation Pipeline definida en `/database/queries.js`.

---

# Reporte de Regalías por Artista (Último Mes)

## GET /api/analytics/royalties?months=1

### Descripción
Devuelve el total de segundos reproducidos por cada artista durante el último mes.

### Parámetros
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| months | Number | Meses a analizar (default = 1) |

### Respuesta JSON (Ejemplo)
```json
[
  {
    "artist_id": "654fa91bd2932718bb7068ad",
    "artist_name": "Bad Bunny",
    "total_seconds": 482000,
    "stream_count": 2400
  }
]
```

---

# Top 10 Canciones en Guatemala (Últimos 7 días)

## GET /api/charts/top10?country=GT&days=7

### Descripción
Devuelve las 10 canciones más escuchadas en Guatemala en los últimos 7 días.

### Parámetros
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| country | String | Código del país (ejemplo: GT) |
| days | Number | Días hacia atrás (default = 7) |

### Respuesta JSON (Ejemplo)
```json
[
  {
    "song_id": "654faf91bd29de18bb70a232",
    "title": "Mon Amour",
    "artist": "Bad Bunny",
    "total_streams": 153
  }
]
```

---

# Usuarios Zombis Premium

## GET /api/users/zombies?days=30

### Descripción
Devuelve usuarios Premium que no han tenido actividad en los últimos 30 días.

### Parámetros
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| days | Number | Días sin actividad (default: 30) |

### Respuesta JSON (Ejemplo)
```json
[
  {
    "user_id": "654fad12bda3318bb701239a",
    "username": "ghost_user001",
    "email": "ghost001@gmail.com",
    "country": "GT"
  }
]
```

---

# Distribución de Edades — Oyentes de Reggaeton

## GET /api/demographics/reggaeton

### Descripción
Devuelve cuántos usuarios escuchan reggaeton, agrupados por rangos de edad.

### Respuesta JSON (Ejemplo)
```json
[
  { "age_range": "15-20", "total_users": 12 },
  { "age_range": "21-30", "total_users": 33 },
  { "age_range": "31-40", "total_users": 19 },
  { "age_range": "41+",   "total_users": 3  }
]
```

---

# Heavy Users de Bad Bunny

## GET /api/users/heavy/badbunny

### Descripción
Devuelve los 5 usuarios que han escuchado más canciones distintas del artista Bad Bunny.

### Respuesta JSON (Ejemplo)
```json
[
  {
    "user_id": "654faf1221aa118bb7002ab0",
    "username": "music_fan_88",
    "email": "fan88@example.com",
    "distinct_count": 14
  }
]
```

---

# Notas Finales
- Todos los endpoints retornan JSON.  
- No requiere autenticación porque es una PoC.  
- Se usa como base para el dashboard v0.