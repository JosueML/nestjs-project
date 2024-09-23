# NestJS Project

Este es un proyecto basado en NestJS que incluye manejo de variables de entorno, autenticación y autorización. La configuración y validación de las variables de entorno se realizan a través del módulo `ConfigModule`, y el proyecto usa `Yarn` como gestor de paquetes.

## Requisitos

-   Node.js
-   Yarn
-   Nest CLI (opcional)

## Instalación

1. Clonar el repositorio:

    git clone https://github.com/JosueML/nestjs-project.git

2. Entrar en la carpeta del proyecto:

    cd nestjs-project

3. Instalar las dependencias utilizando Yarn:

    yarn install

## Configuración de variables de entorno

Este proyecto maneja las variables de entorno a través de un archivo `.env` ubicado en la raíz del proyecto. Asegúrate de crear un archivo `.env` basado en el archivo de ejemplo `.env.template`:

1. Copia el archivo `.env.template` a `.env`:

    cp .env.template .env

2. Rellena los valores correspondientes en el archivo `.env`.

Las variables de entorno se gestionan a través de los siguientes archivos:

-   `env.config.ts`: Carga las variables del archivo `.env`.
-   `env.validation.ts`: Usa Joi para validar el esquema de las variables de entorno.

## Scripts

### Ejecutar la aplicación

Para iniciar la aplicación en desarrollo, usa el siguiente comando:

yarn start:dev

Esto levantará el servidor en modo desarrollo.

### Construir la aplicación

Para construir la aplicación para producción:

yarn build

### Ejecutar en producción

Después de construir el proyecto, puedes ejecutarlo en modo producción con:

yarn start:prod

### Pruebas

Para ejecutar las pruebas:

yarn test

## Autenticación y Autorización

Este proyecto incluye un módulo de autenticación y autorización. La protección de rutas se realiza mediante el decorador `@Auth()`, el cual asegura que la ruta requiere autenticación.

### Ejemplo de uso del decorador `@Auth()`

#### Rutas protegidas por autenticación básica:

```typescript
@Get('protected')
@Auth()
getProtectedData() {
  return 'Solo usuarios autenticados pueden acceder a esta ruta';
}
```

#### Rutas protegidas con roles específicos:

El decorador `@Auth()` acepta roles definidos en el `enum ValidRoles`. Por ejemplo, para proteger una ruta y asegurarse de que solo los usuarios con el rol de `admin` puedan acceder, se utiliza de la siguiente manera:

```typescript
@Get('admin')
@Auth(ValidRoles.admin)
getAdminData() {
  return 'Solo administradores pueden acceder a esta ruta';
}
```
