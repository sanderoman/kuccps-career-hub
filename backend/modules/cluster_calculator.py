"""
Cluster Calculator Module - KUCCPS Cluster Subject Analysis
Analyzes and scores cluster subjects based on course requirements
"""

# Subject categories for cluster analysis
SUBJECT_CATEGORIES = {
    'Mathematics': ['Mathematics', 'Math'],
    'Physics': ['Physics', 'Phys'],
    'Chemistry': ['Chemistry', 'Chem'],
    'Biology': ['Biology', 'Bio'],
    'English': ['English', 'Eng'],
    'Kiswahili': ['Kiswahili', 'Swahili'],
    'Science': ['Physics', 'Chemistry', 'Biology'],
    'Group III': [
        'History', 'Geography', 'Civics', 'Economics', 
        'Computer Science', 'Agricultural Science', 'Home Science',
        'Business Studies'
    ]
}

# Cluster definitions for different programmes
PROGRAMME_CLUSTERS = {
    'Computer Science': {
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
        'min_cluster_score': 24
    },
    'Engineering': {
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
        'min_cluster_score': 24
    },
    'Medicine': {
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
        'min_cluster_score': 28
    },
    'Business': {
        'cluster_subjects': ['Mathematics', 'Economics', 'English', 'Kiswahili'],
        'min_cluster_score': 20
    },
    'Education': {
        'cluster_subjects': ['Mathematics', 'English', 'Kiswahili', 'History'],
        'min_cluster_score': 18
    },
    'Nursing': {
        'cluster_subjects': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
        'min_cluster_score': 22
    },
    'Agriculture': {
        'cluster_subjects': ['Mathematics', 'Chemistry', 'Biology', 'Agricultural Science'],
        'min_cluster_score': 20
    }
}

def normalize_subject_name(subject):
    """
    Normalize subject name for comparison
    
    Args:
        subject (str): Student's subject name
    
    Returns:
        str: Normalized category name
    """
    subject = subject.strip().lower()
    
    for category, variations in SUBJECT_CATEGORIES.items():
        if any(var.lower() in subject for var in variations):
            return category
    
    return subject.title()

def calculate_cluster_score(student_subjects, student_grades, cluster_subjects):
    """
    Calculate cluster score for a specific cluster
    
    Args:
        student_subjects (list): List of student's subjects
        student_grades (dict): Grade points mapping {subject: points}
        cluster_subjects (list): Required cluster subjects for programme
    
    Returns:
        dict: Cluster analysis with score and breakdown
    """
    from modules.grade_converter import convert_grade_to_points
    
    # Normalize student subjects
    student_data = {}
    for subject, grade in student_grades.items():
        normalized = normalize_subject_name(subject)
        student_data[normalized] = grade
    
    cluster_score = 0
    matched_subjects = []
    missing_subjects = []
    
    for required_subject in cluster_subjects:
        normalized_required = normalize_subject_name(required_subject)
        if normalized_required in student_data:
            score = student_data[normalized_required]
            cluster_score += score
            matched_subjects.append({
                'subject': required_subject,
                'grade_points': score
            })
        else:
            missing_subjects.append(required_subject)
    
    return {
        'cluster_score': cluster_score,
        'matched_subjects': matched_subjects,
        'missing_subjects': missing_subjects,
        'matches_count': len(matched_subjects),
        'required_count': len(cluster_subjects)
    }

def analyze_programme_fit(student_subjects, student_grades, programme_name):
    """
    Analyze how well a student fits a specific programme
    
    Args:
        student_subjects (list): Student's subject list
        student_grades (dict): {subject: grade_points}
        programme_name (str): Programme to analyze
    
    Returns:
        dict: Fitness analysis
    """
    if programme_name not in PROGRAMME_CLUSTERS:
        return {'error': f"Programme '{programme_name}' not found"}
    
    cluster_info = PROGRAMME_CLUSTERS[programme_name]
    cluster_result = calculate_cluster_score(
        student_subjects,
        student_grades,
        cluster_info['cluster_subjects']
    )
    
    is_eligible = cluster_result['cluster_score'] >= cluster_info['min_cluster_score']
    
    return {
        'programme': programme_name,
        'cluster_analysis': cluster_result,
        'min_required_score': cluster_info['min_cluster_score'],
        'student_cluster_score': cluster_result['cluster_score'],
        'is_eligible': is_eligible,
        'eligibility_gap': cluster_result['cluster_score'] - cluster_info['min_cluster_score']
    }

def get_available_programmes():
    """Get list of all available programmes"""
    return list(PROGRAMME_CLUSTERS.keys())
