"""
Placement Routes - Student eligibility analysis endpoints
"""

from flask import Blueprint, request, jsonify
from modules.grade_converter import convert_grade_to_points, calculate_mean_grade
from modules.eligibility_engine import EligibilityEngine
from modules.placement_comparator import PlacementComparator
from modules.pdf_generator import PDFReportGenerator

placement_bp = Blueprint('placement', __name__)
eligibility_engine = EligibilityEngine()
placement_comparator = PlacementComparator()
pdf_generator = PDFReportGenerator()

# Mock programmes data (replace with database queries)
MOCK_PROGRAMMES = {
    '1040123': {
        'code': '1040123',
        'name': 'BSc Computer Science',
        'institution_code': '1101',
        'institution_name': 'University of Nairobi',
        'programme_level': 'Degree',
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'English'],
        'cluster_score_minimum': 24,
        'cluster_score_cutoff_2024': 28,
        'cluster_score_cutoff_2025': 29,
        'mean_grade_required': 7.0,
        'duration_years': 4,
        'intake_capacity': 60
    },
    '1040124': {
        'code': '1040124',
        'name': 'BSc Engineering (Electrical)',
        'institution_code': '1101',
        'institution_name': 'University of Nairobi',
        'programme_level': 'Degree',
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'English'],
        'cluster_score_minimum': 25,
        'cluster_score_cutoff_2024': 29,
        'cluster_score_cutoff_2025': 30,
        'mean_grade_required': 7.0,
        'duration_years': 5,
        'intake_capacity': 45
    },
    '2101001': {
        'code': '2101001',
        'name': 'Diploma in Electrical Installation',
        'institution_code': '2101',
        'institution_name': 'Kenya Technical Trainer College',
        'programme_level': 'Diploma',
        'cluster_subjects': ['Mathematics', 'Physics', 'English', 'Chemistry'],
        'cluster_score_minimum': 15,
        'cluster_score_cutoff_2024': 18,
        'mean_grade_required': 5.0,
        'duration_years': 3,
        'intake_capacity': 50
    },
    '2101101': {
        'code': '2101101',
        'name': 'Certificate in Electrical Installation',
        'institution_code': '2101',
        'institution_name': 'Kenya Technical Trainer College',
        'programme_level': 'Certificate',
        'cluster_subjects': ['Mathematics', 'English', 'Physics', 'Chemistry'],
        'cluster_score_minimum': 10,
        'cluster_score_cutoff_2024': 12,
        'mean_grade_required': 3.0,
        'duration_years': 2,
        'intake_capacity': 60
    }
}

@placement_bp.route('/analyze', methods=['POST'])
def analyze_placement():
    """
    Analyze student eligibility for programmes
    
    Expected JSON:
    {
        "student_id": "string",
        "name": "string",
        "subjects": ["Mathematics", "Physics", ...],
        "grades": {
            "Mathematics": "A",
            "Physics": "B+",
            ...
        }
    }
    """
    data = request.get_json()
    
    # Validate input
    if not data.get('subjects') or not data.get('grades'):
        return jsonify({'error': 'subjects and grades are required'}), 400
    
    try:
        # Calculate mean grade
        grades_list = list(data['grades'].values())
        mean_result = calculate_mean_grade(grades_list)
        
        # Convert grades to points for cluster analysis
        grade_points = {}
        for subject, grade in data['grades'].items():
            try:
                grade_points[subject] = convert_grade_to_points(grade)
            except ValueError:
                continue
        
        # Calculate total cluster score (sum of all subject points)
        student_cluster_score = sum(grade_points.values())
        
        # Prepare student data
        student_data = {
            'student_id': data.get('student_id'),
            'name': data.get('name', 'Student'),
            'subjects': data.get('subjects'),
            'grades': data.get('grades'),
            'grade_points': grade_points,
            'mean_points': mean_result['mean_points'],
            'subject_count': mean_result['subject_count'],
            'cluster_score': student_cluster_score
        }
        
        # Determine eligibility
        eligibility_report = eligibility_engine.determine_full_eligibility(student_data)
        
        # Compare with all programmes
        batch_comparison = placement_comparator.batch_compare(
            student_cluster_score,
            list(MOCK_PROGRAMMES.values())
        )
        
        # Generate placement summary
        placement_summary = placement_comparator.generate_placement_summary(batch_comparison)
        
        # Generate recommendations
        recommendation = eligibility_engine.generate_recommendation(eligibility_report)
        
        return jsonify({
            'success': True,
            'student_data': student_data,
            'eligibility': eligibility_report,
            'placement_comparison': batch_comparison,
            'placement_summary': placement_summary,
            'recommendation': recommendation
        }), 200
    
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@placement_bp.route('/compare-programmes', methods=['POST'])
def compare_programmes():
    """
    Compare student cluster score against specific programme cutoffs
    Shows year-to-year cutoff comparison for universities
    
    Expected JSON:
    {
        "student_cluster_score": 28,
        "programme_codes": ["1040123", "1040124"]  // Optional, if empty compares all
    }
    """
    data = request.get_json()
    
    try:
        student_score = data.get('student_cluster_score')
        if not student_score:
            return jsonify({'error': 'student_cluster_score is required'}), 400
        
        programme_codes = data.get('programme_codes', [])
        
        # Get programmes to compare
        if programme_codes:
            programmes = [p for code, p in MOCK_PROGRAMMES.items() if code in programme_codes]
        else:
            programmes = list(MOCK_PROGRAMMES.values())
        
        # Run batch comparison
        comparison_results = placement_comparator.batch_compare(student_score, programmes)
        
        return jsonify({
            'success': True,
            'comparison_results': comparison_results,
            'summary': placement_comparator.generate_placement_summary(comparison_results)
        }), 200
    
    except Exception as e:
        return jsonify({'error': f'Comparison failed: {str(e)}'}), 500

@placement_bp.route('/programme/<programme_code>', methods=['GET'])
def get_programme_details(programme_code):
    """Get detailed programme information with cutoff points"""
    if programme_code in MOCK_PROGRAMMES:
        programme = MOCK_PROGRAMMES[programme_code]
        return jsonify({
            'success': True,
            'programme': programme,
            'explanation': {
                'cluster_score_minimum': 'Absolute minimum cluster score',
                'cluster_score_cutoff_2024': '2024 official KUCCPS cutoff (if university)',
                'cluster_score_cutoff_2025': '2025 projected cutoff (universities only)',
                'mean_grade_required': 'Mean KCSE grade requirement',
                'intake_capacity': 'Number of students to be admitted'
            }
        }), 200
    
    return jsonify({'error': f'Programme {programme_code} not found'}), 404

@placement_bp.route('/report', methods=['POST'])
def generate_report():
    """
    Generate placement advisory report with cutoff comparison
    """
    data = request.get_json()
    
    try:
        student_data = {
            'student_id': data.get('student_id'),
            'name': data.get('name'),
            'subject_count': data.get('subject_count', 8),
            'cluster_score': data.get('cluster_score')
        }
        
        eligibility_report = data.get('eligibility', {})
        placement_comparison = data.get('placement_comparison', {})
        
        # Generate report data
        report_data = pdf_generator.generate_report_data(student_data, eligibility_report)
        
        # Add placement comparison to report
        report_data['placement_comparison'] = placement_comparison
        
        return jsonify({
            'success': True,
            'report': report_data
        }), 200
    
    except Exception as e:
        return jsonify({'error': f'Report generation failed: {str(e)}'}), 500

@placement_bp.route('/report/download', methods=['POST'])
def download_report():
    """Download placement advisory as PDF"""
    data = request.get_json()
    
    try:
        report_data = data.get('report')
        
        # Create PDF file
        pdf_result = pdf_generator.create_pdf_file(report_data)
        
        return jsonify({
            'success': pdf_result['success'],
            'message': pdf_result['message'],
            'file_path': pdf_result['file_path']
        }), 200
    
    except Exception as e:
        return jsonify({'error': f'PDF download failed: {str(e)}'}), 500

@placement_bp.route('/health', methods=['GET'])
def placement_health():
    """Check placement service health"""
    return jsonify({'status': 'healthy', 'service': 'Placement Analysis'}), 200
