/**
 * CONSULTAS DE NEGOCIO - APPLE MUSIC CASE
 * Adaptado al seed.js original proporcionado por el Ingeniero.
 */

module.exports = {

    // 1) Reporte de Regalías por Artista (Último Mes)
    royaltiesLastMonth: () => {
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);

        return [
            { $match: { date: { $gte: lastMonth, $lte: now } } },

            // Tenemos artist_id directamente en streams
            {
                $group: {
                    _id: "$artist_id",
                    total_seconds: { $sum: "$seconds_played" },
                    stream_count: { $sum: 1 }
                }
            },

            // Unir para obtener el nombre del artista
            {
                $lookup: {
                    from: "artists",
                    localField: "_id",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            { $unwind: "$artist" },

            {
                $project: {
                    _id: 0,
                    artist_id: "$_id",
                    artist_name: "$artist.name",
                    total_seconds: 1,
                    stream_count: 1
                }
            },

            { $sort: { total_seconds: -1 } }
        ];
    },


    // 2) Top 10 canciones más escuchadas en Guatemala (Últimos 7 días)
    top10Guatemala: () => {
        const now = new Date();
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);

        return [
            { 
                $match: { 
                    country: "GT", 
                    date: { $gte: last7, $lte: now } 
                } 
            },

            {
                $group: {
                    _id: "$song_id",
                    total_streams: { $sum: 1 }
                }
            },

            // Unir con songs para obtener título y artista
            {
                $lookup: {
                    from: "songs",
                    localField: "_id",
                    foreignField: "_id",
                    as: "song"
                }
            },
            { $unwind: "$song" },

            {
                $project: {
                    _id: 0,
                    song_id: "$_id",
                    title: "$song.title",
                    artist: "$song.artist_name",
                    total_streams: 1
                }
            },

            { $sort: { total_streams: -1 } },
            { $limit: 10 }
        ];
    },


    // 3) Usuarios Zombis Premium
    zombiePremiumUsers: () => {
        const now = new Date();
        const last30 = new Date();
        last30.setDate(now.getDate() - 30);

        return [

            // Filtrar solo premium
            { $match: { subscription: "Premium" } },

            // Buscar si tienen streams recientes
            {
                $lookup: {
                    from: "streams",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "streams_last_30",
                    pipeline: [
                        {
                            $match: {
                                date: { $gte: last30, $lte: now }
                            }
                        }
                    ]
                }
            },

            // ZOMBIE = No tiene streams en 30 días
            {
                $match: {
                    streams_last_30: { $size: 0 }
                }
            },

            {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    country: 1
                }
            }
        ];
    },


    // 4) Distribución de edades entre usuarios que escuchan Reggaeton
    reggaetonAgeDistribution: () => {
        const now = new Date();

        return [

            // Unir streams → songs
            {
                $lookup: {
                    from: "songs",
                    localField: "song_id",
                    foreignField: "_id",
                    as: "song"
                }
            },
            { $unwind: "$song" },

            // Filtrar solo Reggaeton
            { $match: { "song.genre": "Reggaeton" } },

            // Unir con users
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },

            // Agrupar por usuario (para no contarlo varias veces)
            {
                $group: {
                    _id: "$user._id",
                    birth_date: { $first: "$user.birth_date" }
                }
            },

            // Calcular edad del usuario
            {
                $addFields: {
                    age: {
                        $dateDiff: {
                            startDate: "$birth_date",
                            endDate: now,
                            unit: "year"
                        }
                    }
                }
            },

            // Clasificar en rangos
            {
                $addFields: {
                    age_range: {
                        $switch: {
                            branches: [
                                { case: { $lte: ["$age", 20] }, then: "15-20" },
                                { case: { $lte: ["$age", 30] }, then: "21-30" },
                                { case: { $lte: ["$age", 40] }, then: "31-40" },
                            ],
                            default: "41+"
                        }
                    }
                }
            },

            {
                $group: {
                    _id: "$age_range",
                    total_users: { $sum: 1 }
                }
            },

            { $sort: { _id: 1 } }
        ];
    },


    // 5) Heavy Users de Bad Bunny (Canciones distintas)
    heavyUsersBadBunny: () => {

        return [

            // Filtrar primero por streams que tengan artista_id de Bad Bunny
            {
                $lookup: {
                    from: "artists",
                    localField: "artist_id",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            { $unwind: "$artist" },
            { $match: { "artist.name": "Bad Bunny" } },

            // Contar canciones DISTINTAS por usuario
            {
                $group: {
                    _id: "$user_id",
                    songs_unique: { $addToSet: "$song_id" }
                }
            },

            {
                $addFields: {
                    distinct_count: { $size: "$songs_unique" }
                }
            },

            { $sort: { distinct_count: -1 } },
            { $limit: 5 },

            // Datos del usuario
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },

            {
                $project: {
                    user_id: "$_id",
                    username: "$user.username",
                    email: "$user.email",
                    distinct_count: 1,
                    _id: 0
                }
            }
        ];
    }

};
