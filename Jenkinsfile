pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Paso para clonar el repositorio desde Git
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                // Paso para compilar y ejecutar pruebas
                bat 'mvn clean install'
            }
        }

        stage('Deploy') {
            steps {
                // Puedes agregar pasos adicionales para despliegue si es necesario
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