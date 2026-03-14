"""
Grade Conversion Module - KCSE to KUCCPS Points
Converts KCSE letter grades to KUCCPS numerical points (12-1 scale)
"""

# KCSE Grade to KUCCPS Points Conversion
GRADE_POINTS = {
    'A': 12,
    'A-': 11,
    'B+': 10,
    'B': 9,
    'B-': 8,
    'C+': 7,
    'C': 6,
    'C-': 5,
    'D+': 4,
    'D': 3,
    'D-': 2,
    'E': 1
}

# Reverse mapping for lookup
POINTS_GRADE = {v: k for k, v in GRADE_POINTS.items()}

def convert_grade_to_points(grade):
    """
    Convert KCSE letter grade to KUCCPS points
    
    Args:
        grade (str): KCSE letter grade (e.g., 'A', 'B+', 'C')
    
    Returns:
        int: KUCCPS points (1-12)
        
    Raises:
        ValueError: If grade is invalid
    """
    grade = grade.strip().upper()
    if grade not in GRADE_POINTS:
        raise ValueError(f"Invalid grade: {grade}. Must be A to E")
    return GRADE_POINTS[grade]

def convert_points_to_grade(points):
    """
    Convert KUCCPS points back to letter grade
    
    Args:
        points (int): KUCCPS points (1-12)
    
    Returns:
        str: KCSE letter grade
        
    Raises:
        ValueError: If points are invalid
    """
    if points not in POINTS_GRADE:
        raise ValueError(f"Invalid points: {points}. Must be 1-12")
    return POINTS_GRADE[points]

def get_mean_grade_category(mean_points):
    """
    Determine eligibility category based on mean KUCCPS points
    
    Args:
        mean_points (float): Mean KUCCPS points
    
    Returns:
        dict: Category info with eligibility programmes
    """
    if mean_points >= 7:  # C+ and above
        return {
            'category': 'A',
            'letter_grade': 'C+',
            'eligible_programmes': ['Degree', 'Diploma', 'Certificate', 'Artisan'],
            'description': 'C+ and above'
        }
    elif mean_points >= 5:  # C Plain to C-
        return {
            'category': 'B',
            'letter_grade': 'C',
            'eligible_programmes': ['Diploma', 'Certificate', 'Artisan'],
            'description': 'C Plain to C-'
        }
    else:  # D+ and below
        return {
            'category': 'C',
            'letter_grade': 'D+',
            'eligible_programmes': ['Certificate', 'Artisan'],
            'description': 'D+ and below'
        }

def calculate_mean_grade(grades_list):
    """
    Calculate mean grade from list of KCSE grades
    
    Args:
        grades_list (list): List of KCSE letter grades
    
    Returns:
        dict: Contains mean points and category info
    """
    if not grades_list or len(grades_list) == 0:
        raise ValueError("Grades list cannot be empty")
    
    total_points = sum(convert_grade_to_points(grade) for grade in grades_list)
    mean_points = total_points / len(grades_list)
    
    return {
        'mean_points': round(mean_points, 2),
        'total_points': total_points,
        'subject_count': len(grades_list),
        'category': get_mean_grade_category(mean_points)
    }
