# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]


