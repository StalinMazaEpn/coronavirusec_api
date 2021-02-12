# API Documentation Example
This API offers information about the status of the covid19 in Ecuador.

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

<!-- ## Login
**You send:**  Your  login credentials.
**You get:** An `API-Token` with wich you can make further actions. -->

<!-- **Request:**
```json
POST /login HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "username": "foo",
    "password": "1234567" 
}
-->
# Rutas disponibles
**Index** (/)

Retorna las estadisticas generales del covid 19 en Ecuador

**Provincias** (/provincias)

Retorna las estadisticas por provincia sobre los casos de covid 19 en Ecuador

## Autor

> Stalin Maza