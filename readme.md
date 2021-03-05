# CoronavirusEC API Documentation
Api que ofrece información sobre la situación del Covid19 en Ecuador, con los datos generales y los datos de cada provincia

## Tecnologías Utilizadas
- NodeJS como lenguaje de programación
- Express como framework servidor
- Cheerio como herramienta para manipular los datos obtenidos por el scrapper
- Request como herramienta para obtener los datos de las páginas web utilizadas
- CORS como paquete necesario para permitir que los servicios externos puedan realizar peticiones hacia los endpoints habilitados

## Actividades

**#1)** Leer los datos de la página oficial sobre el coronavirus en ecuador, datos generales y datos por provincia.

**#2)** Organizar los datos en un formato ideal para ser interpretado usando **JSON**.

**#3)** Construir 2 endpoints para poder retornar los datos generales y los datos por provincia previamente obtenidos.

**#4)** Agregar una configuración para permitir el acceso público del API habilitando los **CORS** a dichos endpoints.

## Rutas disponibles
**Estadisticas Generales** (/) (GET)

Este endpoint retorna el número de pacientes con covid19 que han sido confirmados, dados de alta, fallecidos, recuperados y descartados totalizados por todo el país.


**Estadisticas Provinciales** (/provincias) (GET)

Este endpoint retorna el número de pacientes con covid19 que han sido confirmados, que han fallecido y que probablemente fallecieron totalizados por cada provincia.

## Autor

> Stalin Maza