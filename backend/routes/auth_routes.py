"""
Authentication Routes - OTP verification endpoints
"""

from flask import Blueprint, request, jsonify
from modules.otp_authentication import OTPManager

auth_bp = Blueprint('auth', __name__)
otp_manager = OTPManager()

@auth_bp.route('/request-otp', methods=['POST'])
def request_otp():
    """
    Request OTP code for student
    
    Expected JSON:
    {
        "student_id": "string",
        "phone_number": "string (e.g., +254712345678)"
    }
    """
    data = request.get_json()
    
    # Validate input
    student_id = data.get('student_id')
    phone_number = data.get('phone_number')
    
    if not student_id or not phone_number:
        return jsonify({'error': 'student_id and phone_number are required'}), 400
    
    # Request OTP
    result = otp_manager.request_otp(student_id, phone_number)
    
    return jsonify(result), 200

@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    """
    Verify OTP code
    
    Expected JSON:
    {
        "student_id": "string",
        "otp_code": "string (6 digits)"
    }
    """
    data = request.get_json()
    
    # Validate input
    student_id = data.get('student_id')
    otp_code = data.get('otp_code')
    
    if not student_id or not otp_code:
        return jsonify({'error': 'student_id and otp_code are required'}), 400
    
    # Verify OTP
    result = otp_manager.verify_otp(student_id, otp_code)
    
    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@auth_bp.route('/health', methods=['GET'])
def auth_health():
    """Check authentication service health"""
    return jsonify({'status': 'healthy', 'service': 'OTP Authentication'}), 200
