pipeline {
    agent any

    environment {
        // Puedes definir variables de entorno aquí según sea necesario
        NODEJS_HOME = 'C:\\Program Files\\nodejs' // Ejemplo de la ruta de Node.js en Windows
        PATH = "${env.PATH};${NODEJS_HOME}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Paso para clonar el repositorio desde Git
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instala las dependencias de Node.js usando npm
                bat 'npm install'
            }
        }

        stage('Build and Test') {
            steps {
                // Construye la aplicación de React y ejecuta pruebas
                bat 'npm run build'
                // Puedes agregar comandos adicionales para ejecutar pruebas específicas si es necesario
            }
        }

        stage('Deploy') {
            steps {
                // Puedes agregar pasos adicionales para desplegar la aplicación si es necesario
                echo 'Despliegue de la aplicación...'
            }
        }
    }

    post {
        success {
            // Acciones a realizar cuando la ejecución es exitosa
            echo 'Pruebas exitosas. ¡Despliegue a producción!'
        }
        failure {
            // Acciones a realizar cuando la ejecución falla
            echo 'Fallo en las pruebas. No se realizará el despliegue.'
        }
    }
}