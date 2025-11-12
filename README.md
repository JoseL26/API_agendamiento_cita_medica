# Appointment API

_Documentación y template para la API de gestión de citas (appointments)_

## Descripción

Esta API permite la gestión de citas médicas, implementando un flujo serverless y event-driven sobre AWS. Utiliza AWS Lambda, SQS, SNS, EventBridge y DynamoDB para orquestar el registro, procesamiento y confirmación de citas de manera desacoplada y escalable.

## Arquitectura y Flujo

1. **POST /appointment**

   - Registra una nueva cita en DynamoDB.
   - Publica un mensaje en un topic SNS (`appointment-topic`) con el atributo `countryISO`.
   - SNS distribuye el mensaje a las colas SQS (`SQS_PE`, `SQS_CL`) según el filtro de país.

2. **Procesamiento por país**

   - Lambdas `appointment_pe` y `appointment_cl` consumen mensajes de sus respectivas colas SQS.
   - Cada Lambda procesa la cita y publica un evento de conformidad en EventBridge (`appointment-bus`).

3. **Confirmación**
   - EventBridge, mediante una regla, reenvía los eventos de conformidad a la cola `SQS_CONFIRMATION`.
   - Opcionalmente, otra Lambda puede consumir de `SQS_CONFIRMATION` para acciones finales.

## Endpoints

- **POST /appointment**  
  Crea una nueva cita.  
  **Body de ejemplo:**

  ```json
  {
    "insuredId": "12345",
    "scheduleId": 100,
    "countryISO": "PE"
  }
  ```

- **GET /appointment/{insuredId}**  
  Obtiene la información de la(s) cita(s) para el insuredId proporcionado.

## Tecnologías y Frameworks

- **AWS Lambda** (funciones serverless)
- **AWS SQS** (colas para desacoplar procesamiento)
- **AWS SNS** (publicación y distribución de eventos)
- **AWS EventBridge** (enrutamiento de eventos)
- **AWS DynamoDB** (persistencia NoSQL)
- **Node.js v18** (runtime)
- **TypeScript** (tipado estático)
- **Serverless Framework** (infraestructura como código)
- **Jest** y **jest-cucumber** (testing)
- **mysql2** (conexión a RDS MySQL para persistencia relacional)

## Requisitos

- Node.js v18+
- AWS CLI configurado
- Serverless Framework instalado globalmente (`npm install -g serverless`)

## Instalación y uso local

```bash
npm install
```

### Despliegue en AWS

```bash
serverless deploy
```

### Ejecución local

```bash
serverless offline
```

## Estructura del Proyecto

```
src/
  appointment/
    infrastructure/
    domain/
    application/
  appointment_pe/
  appointment_cl/
serverless.yml
package.json
README.md
```

## Notas adicionales

- El flujo de eventos desacoplado permite escalar y mantener la solución fácilmente.
- Los filtros SNS aseguran que solo el país correspondiente procese la cita.
- EventBridge permite orquestar acciones de confirmación y auditoría.
- El código está preparado para integración continua y pruebas automáticas.
