"""
KUCCPS Career Hub - Flask Application
Backend API for placement advisory system
"""

import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()

def create_app():
    """Application factory"""
    app = Flask(__name__)
    
    # Configuration
    env = os.getenv('FLASK_ENV', 'development')
    if env == 'testing':
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
            'DATABASE_URL',
            'sqlite:///kuccps_career_hub.db'
        )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    app.config['ENV'] = os.getenv('FLASK_ENV', 'development')
    
    # Production settings
    if env == 'production':
        app.config['DEBUG'] = False
        app.config['TESTING'] = False
    else:
        app.config['DEBUG'] = True
        app.config['TESTING'] = True
    
    # CORS Configuration
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
    if cors_origins == '*':
        CORS(app, origins="*", allow_headers=["Content-Type", "Authorization"])
    else:
        CORS(app, origins=cors_origins.split(','), allow_headers=["Content-Type", "Authorization"])
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    from routes.auth_routes import auth_bp
    from routes.placement_routes import placement_bp
    from routes.course_routes import course_bp
    from routes.institution_routes import institution_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(placement_bp, url_prefix='/api/placement')
    app.register_blueprint(course_bp, url_prefix='/api/courses')
    app.register_blueprint(institution_bp, url_prefix='/api/institutions')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {
            'error': 'Resource not found',
            'message': 'The requested endpoint does not exist',
            'available_endpoints': {
                'root': '/',
                'api': '/api',
                'health': '/api/health',
                'auth': '/api/auth',
                'placement': '/api/placement',
                'courses': '/api/courses',
                'institutions': '/api/institutions'
            }
        }, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {
            'error': 'Internal server error',
            'message': 'An unexpected error occurred',
            'service': 'KUCCPS Career Hub API'
        }, 500
    
    @app.errorhandler(405)
    def method_not_allowed(error):
        return {
            'error': 'Method not allowed',
            'message': 'This endpoint does not support the requested HTTP method',
            'service': 'KUCCPS Career Hub API'
        }, 405
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return {'status': 'healthy', 'service': 'KUCCPS Career Hub API'}, 200
    
    # Root route
    @app.route('/', methods=['GET'])
    def root():
        return {
            'message': 'KUCCPS Career Hub API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'auth': '/api/auth',
                'placement': '/api/placement',
                'courses': '/api/courses',
                'institutions': '/api/institutions'
            }
        }, 200
    
    # API info route
    @app.route('/api', methods=['GET'])
    def api_info():
        return {
            'message': 'KUCCPS Career Hub API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'auth': '/api/auth',
                'placement': '/api/placement',
                'courses': '/api/courses',
                'institutions': '/api/institutions'
            }
        }, 200
    
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', os.getenv('FLASK_PORT', 5000)))
    host = os.getenv('HOST', os.getenv('FLASK_HOST', '0.0.0.0'))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f"🚀 Starting KUCCPS Career Hub API")
    print(f"📍 Host: {host}")
    print(f"🔌 Port: {port}")
    print(f"🔧 Debug: {debug}")
    print(f"🌍 Environment: {os.getenv('FLASK_ENV', 'development')}")
    
    app.run(
        host=host,
        port=port,
        debug=debug
    )
