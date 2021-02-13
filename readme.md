# API Documentation Example
Api que ofrece información sobre la situacion del Covid19 en Ecuador

## Códigos de Respuesta
### Códigos de Respuesta según statusCode
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
405: Method not allowed
422: Unprocessable Entity 
50X: Server Error
100: Bad Request
110: Unauthorized
120: User Authenticaion Invalid
130: Parameter Error
140: Item Missing
150: Conflict
160: Server Error
```
# Rutas disponibles
**Index** (/)

Retorna las estadisticas generales del covid 19 en Ecuador

**Provincias** (/provincias)

Retorna las estadisticas por provincia sobre los casos de covid 19 en Ecuador

## Deploy Vercel

```bash
npm install vercel -g
$ cd <project-dir>
$ npm install
$ vercel
```

## Autor

> Stalin Maza