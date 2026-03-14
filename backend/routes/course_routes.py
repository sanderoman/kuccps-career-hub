"""
Course Routes - KUCCPS course data endpoints
"""

from flask import Blueprint, request, jsonify

course_bp = Blueprint('courses', __name__)

# Mock course data (replace with database queries)
COURSES = {
    '1040123': {
        'code': '1040123',
        'name': 'BSc Computer Science',
        'level': 'Degree',
        'institution_code': '1101',
        'min_cluster_score': 24,
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
        'cutoff_2024': 24,
        'duration_years': 4
    },
    '1040124': {
        'code': '1040124',
        'name': 'Diploma in Information Technology',
        'level': 'Diploma',
        'institution_code': '1101',
        'min_cluster_score': 18,
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
        'cutoff_2024': 18,
        'duration_years': 3
    },
    '1050234': {
        'code': '1050234',
        'name': 'BSc Engineering',
        'level': 'Degree',
        'institution_code': '1102',
        'min_cluster_score': 25,
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
        'cutoff_2024': 25,
        'duration_years': 5
    }
}

@course_bp.route('', methods=['GET'])
def get_all_courses():
    """Get all available courses"""
    return jsonify({
        'success': True,
        'total_courses': len(COURSES),
        'courses': list(COURSES.values())
    }), 200

@course_bp.route('/<course_code>', methods=['GET'])
def get_course(course_code):
    """Get specific course details"""
    if course_code in COURSES:
        return jsonify({
            'success': True,
            'course': COURSES[course_code]
        }), 200
    
    return jsonify({'error': f'Course {course_code} not found'}), 404

@course_bp.route('/search', methods=['GET'])
def search_courses():
    """
    Search courses by name or criteria
    Query parameters:
    - q: search query
    - level: Degree/Diploma/Certificate/Artisan
    - institution_code: filter by institution
    """
    query = request.args.get('q', '').lower()
    level = request.args.get('level', '').lower()
    institution_code = request.args.get('institution_code')
    
    results = []
    
    for course in COURSES.values():
        # Filter by search query
        if query and query not in course['name'].lower():
            continue
        
        # Filter by level
        if level and course['level'].lower() != level:
            continue
        
        # Filter by institution
        if institution_code and course['institution_code'] != institution_code:
            continue
        
        results.append(course)
    
    return jsonify({
        'success': True,
        'query': request.args,
        'results': results,
        'count': len(results)
    }), 200

@course_bp.route('/by-institution/<institution_code>', methods=['GET'])
def get_courses_by_institution(institution_code):
    """Get courses offered by specific institution"""
    courses = [c for c in COURSES.values() if c['institution_code'] == institution_code]
    
    return jsonify({
        'success': True,
        'institution_code': institution_code,
        'courses': courses,
        'count': len(courses)
    }), 200

@course_bp.route('/health', methods=['GET'])
def course_health():
    """Check course service health"""
    return jsonify({'status': 'healthy', 'service': 'Course Information'}), 200
