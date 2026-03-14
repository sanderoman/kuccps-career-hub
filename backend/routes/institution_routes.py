"""
Institution Routes - KUCCPS institution data endpoints
"""

from flask import Blueprint, request, jsonify

institution_bp = Blueprint('institutions', __name__)

# Mock institution data (replace with database queries)
INSTITUTIONS = {
    # Public Universities
    '1101': {
        'code': '1101',
        'name': 'University of Nairobi',
        'type': 'University',
        'ownership': 'Public',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.uonbi.ac.ke',
        'established': 1970,
        'total_courses': 150,
        'is_accredited': True
    },
    '1102': {
        'code': '1102',
        'name': 'Kenyatta University',
        'type': 'University',
        'ownership': 'Public',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.kenyatta.ac.ke',
        'established': 1985,
        'total_courses': 120,
        'is_accredited': True
    },
    '1103': {
        'code': '1103',
        'name': 'Moi University',
        'type': 'University',
        'ownership': 'Public',
        'location': 'Eldoret',
        'county': 'Uasin Gishu',
        'website': 'www.mu.ac.ke',
        'established': 1984,
        'total_courses': 100,
        'is_accredited': True
    },
    '1104': {
        'code': '1104',
        'name': 'Jomo Kenyatta University of Agriculture and Technology',
        'type': 'University',
        'ownership': 'Public',
        'location': 'Juja',
        'county': 'Kiambu',
        'website': 'www.jkuat.ac.ke',
        'established': 1981,
        'total_courses': 95,
        'is_accredited': True
    },
    # Private Universities
    '1201': {
        'code': '1201',
        'name': 'Strathmore University',
        'type': 'University',
        'ownership': 'Private',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.strathmore.edu',
        'established': 1981,
        'total_courses': 85,
        'is_accredited': True
    },
    '1202': {
        'code': '1202',
        'name': 'Kenya Methodist University',
        'type': 'University',
        'ownership': 'Private',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.kemu.ac.ke',
        'established': 1991,
        'total_courses': 65,
        'is_accredited': True
    },
    '1203': {
        'code': '1203',
        'name': 'Catholic University of Eastern Africa',
        'type': 'University',
        'ownership': 'Private',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.cuea.ac.ke',
        'established': 1984,
        'total_courses': 58,
        'is_accredited': True
    },
    # Public Technical Colleges
    '2101': {
        'code': '2101',
        'name': 'Kenya Technical Trainer College',
        'type': 'Technical College',
        'ownership': 'Public',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.kttc.ac.ke',
        'established': 1990,
        'total_courses': 45,
        'is_accredited': True
    },
    '2102': {
        'code': '2102',
        'name': 'Nairobi Institute of Technology',
        'type': 'Technical College',
        'ownership': 'Public',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.nit.ac.ke',
        'established': 2005,
        'total_courses': 35,
        'is_accredited': True
    },
    '2103': {
        'code': '2103',
        'name': 'Mombasa Technical College',
        'type': 'Technical College',
        'ownership': 'Public',
        'location': 'Mombasa',
        'county': 'Mombasa',
        'website': 'www.montec.ac.ke',
        'established': 2000,
        'total_courses': 30,
        'is_accredited': True
    },
    # Private Technical Colleges
    '2201': {
        'code': '2201',
        'name': 'Inoorero University (Technical)',
        'type': 'Technical College',
        'ownership': 'Private',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.inoorero.ac.ke',
        'established': 2011,
        'total_courses': 22,
        'is_accredited': True
    },
    # Public Diploma Colleges
    '3101': {
        'code': '3101',
        'name': 'Kenya Institute of Mass Communication',
        'type': 'Diploma College',
        'ownership': 'Public',
        'location': 'Nairobi',
        'county': 'Nairobi',
        'website': 'www.kimc.ac.ke',
        'established': 1966,
        'total_courses': 8,
        'is_accredited': True
    },
}

@institution_bp.route('', methods=['GET'])
def get_all_institutions():
    """Get all institutions with optional filtering"""
    ownership = request.args.get('ownership', '').title()  # Public, Private, or empty
    inst_type = request.args.get('type', '')
    
    results = list(INSTITUTIONS.values())
    
    # Filter by ownership (Public, Private)
    if ownership:
        results = [i for i in results if i.get('ownership', '').lower() == ownership.lower()]
    
    # Filter by type (University, Technical College, Diploma College)
    if inst_type:
        results = [i for i in results if i.get('type', '').lower() == inst_type.lower()]
    
    return jsonify({
        'success': True,
        'total_institutions': len(results),
        'filter_applied': {
            'ownership': ownership or 'None',
            'type': inst_type or 'None'
        },
        'institutions': results
    }), 200

@institution_bp.route('/<institution_code>', methods=['GET'])
def get_institution(institution_code):
    """Get specific institution details"""
    if institution_code in INSTITUTIONS:
        return jsonify({
            'success': True,
            'institution': INSTITUTIONS[institution_code]
        }), 200
    
    return jsonify({'error': f'Institution {institution_code} not found'}), 404

@institution_bp.route('/by-ownership/<ownership>', methods=['GET'])
def get_by_ownership(ownership):
    """
    Get all institutions by ownership
    
    Args:
        ownership: 'Public' or 'Private'
    """
    institutions = [
        i for i in INSTITUTIONS.values() 
        if i['ownership'].lower() == ownership.lower()
    ]
    
    return jsonify({
        'success': True,
        'ownership': ownership,
        'total_institutions': len(institutions),
        'institutions': institutions,
        'breakdown_by_type': _get_breakdown_by_type(institutions)
    }), 200

@institution_bp.route('/public', methods=['GET'])
def get_public_institutions():
    """Get all PUBLIC higher learning institutions"""
    public_institutions = [
        i for i in INSTITUTIONS.values()
        if i.get('ownership', '').lower() == 'public'
    ]
    
    return jsonify({
        'success': True,
        'institution_type': 'PUBLIC',
        'total_count': len(public_institutions),
        'by_type': _get_breakdown_by_type(public_institutions),
        'institutions': public_institutions
    }), 200

@institution_bp.route('/private', methods=['GET'])
def get_private_institutions():
    """Get all PRIVATE higher learning institutions"""
    private_institutions = [
        i for i in INSTITUTIONS.values()
        if i.get('ownership', '').lower() == 'private'
    ]
    
    return jsonify({
        'success': True,
        'institution_type': 'PRIVATE',
        'total_count': len(private_institutions),
        'by_type': _get_breakdown_by_type(private_institutions),
        'institutions': private_institutions
    }), 200

@institution_bp.route('/search', methods=['GET'])
def search_institutions():
    """
    Search institutions by multiple criteria
    
    Query parameters:
    - q: search query (name)
    - ownership: Public/Private
    - type: University/Technical College/Diploma College
    - county: location filter
    """
    query = request.args.get('q', '').lower()
    ownership = request.args.get('ownership', '').title()
    inst_type = request.args.get('type', '')
    county = request.args.get('county', '').lower()
    
    results = []
    
    for institution in INSTITUTIONS.values():
        # Filter by search query
        if query and query not in institution['name'].lower():
            continue
        
        # Filter by ownership
        if ownership and institution['ownership'].lower() != ownership.lower():
            continue
        
        # Filter by type
        if inst_type and institution['type'].lower() != inst_type.lower():
            continue
        
        # Filter by county
        if county and institution.get('county', '').lower() != county:
            continue
        
        results.append(institution)
    
    return jsonify({
        'success': True,
        'query': request.args,
        'results': results,
        'count': len(results)
    }), 200

@institution_bp.route('/by-type/<inst_type>', methods=['GET'])
def get_institutions_by_type(inst_type):
    """
    Get institutions by type
    
    Types: University, Technical College, Diploma College
    """
    institutions = [
        i for i in INSTITUTIONS.values() 
        if i['type'].lower() == inst_type.lower()
    ]
    
    # Break down by ownership
    public = [i for i in institutions if i['ownership'].lower() == 'public']
    private = [i for i in institutions if i['ownership'].lower() == 'private']
    
    return jsonify({
        'success': True,
        'type': inst_type,
        'total_count': len(institutions),
        'public_count': len(public),
        'private_count': len(private),
        'institutions': institutions,
        'by_ownership': {
            'public': public,
            'private': private
        }
    }), 200

@institution_bp.route('/universities', methods=['GET'])
def get_universities():
    """Get all universities (Public and Private)"""
    ownership = request.args.get('ownership', '')  # Optional: 'Public' or 'Private'
    
    universities = [
        i for i in INSTITUTIONS.values()
        if i['type'].lower() == 'university'
    ]
    
    if ownership:
        universities = [i for i in universities if i['ownership'].lower() == ownership.lower()]
    
    public_unis = [i for i in universities if i['ownership'].lower() == 'public']
    private_unis = [i for i in universities if i['ownership'].lower() == 'private']
    
    return jsonify({
        'success': True,
        'institution_type': 'Universities',
        'total_universities': len(universities),
        'public_universities': len(public_unis),
        'private_universities': len(private_unis),
        'universities': universities,
        'by_ownership': {
            'public': public_unis,
            'private': private_unis
        }
    }), 200

@institution_bp.route('/technical-colleges', methods=['GET'])
def get_technical_colleges():
    """Get all technical colleges (Public and Private)"""
    ownership = request.args.get('ownership', '')
    
    colleges = [
        i for i in INSTITUTIONS.values()
        if i['type'].lower() == 'technical college'
    ]
    
    if ownership:
        colleges = [i for i in colleges if i['ownership'].lower() == ownership.lower()]
    
    public = [i for i in colleges if i['ownership'].lower() == 'public']
    private = [i for i in colleges if i['ownership'].lower() == 'private']
    
    return jsonify({
        'success': True,
        'institution_type': 'Technical Colleges',
        'total_colleges': len(colleges),
        'public_colleges': len(public),
        'private_colleges': len(private),
        'colleges': colleges,
        'by_ownership': {
            'public': public,
            'private': private
        }
    }), 200

@institution_bp.route('/stats', methods=['GET'])
def get_institution_statistics():
    """Get comprehensive institution statistics"""
    all_institutions = list(INSTITUTIONS.values())
    
    public_count = len([i for i in all_institutions if i['ownership'].lower() == 'public'])
    private_count = len([i for i in all_institutions if i['ownership'].lower() == 'private'])
    
    universities = [i for i in all_institutions if i['type'].lower() == 'university']
    tech_colleges = [i for i in all_institutions if i['type'].lower() == 'technical college']
    diploma_colleges = [i for i in all_institutions if i['type'].lower() == 'diploma college']
    
    return jsonify({
        'success': True,
        'total_institutions': len(all_institutions),
        'by_ownership': {
            'public': public_count,
            'private': private_count
        },
        'by_type': {
            'universities': len(universities),
            'technical_colleges': len(tech_colleges),
            'diploma_colleges': len(diploma_colleges)
        },
        'by_ownership_and_type': {
            'public_universities': len([i for i in universities if i['ownership'].lower() == 'public']),
            'private_universities': len([i for i in universities if i['ownership'].lower() == 'private']),
            'public_technical_colleges': len([i for i in tech_colleges if i['ownership'].lower() == 'public']),
            'private_technical_colleges': len([i for i in tech_colleges if i['ownership'].lower() == 'private']),
            'public_diploma_colleges': len([i for i in diploma_colleges if i['ownership'].lower() == 'public']),
            'private_diploma_colleges': len([i for i in diploma_colleges if i['ownership'].lower() == 'private'])
        }
    }), 200

@institution_bp.route('/health', methods=['GET'])
def institution_health():
    """Check institution service health"""
    return jsonify({'status': 'healthy', 'service': 'Institution Information'}), 200


# Helper functions
def _get_breakdown_by_type(institutions):
    """Get breakdown of institutions by type"""
    universities = len([i for i in institutions if i['type'].lower() == 'university'])
    tech_colleges = len([i for i in institutions if i['type'].lower() == 'technical college'])
    diploma_colleges = len([i for i in institutions if i['type'].lower() == 'diploma college'])
    
    return {
        'universities': universities,
        'technical_colleges': tech_colleges,
        'diploma_colleges': diploma_colleges
    }
