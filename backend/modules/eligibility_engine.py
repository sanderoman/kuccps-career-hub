"""
Eligibility Engine - KUCCPS Placement Eligibility Determination
Determines student eligibility for programmes based on grades and clusters
"""

from modules.grade_converter import convert_grade_to_points, get_mean_grade_category
from modules.cluster_calculator import analyze_programme_fit, get_available_programmes

class EligibilityEngine:
    """Core eligibility determination engine"""
    
    def __init__(self):
        self.mean_threshold = {
            'Degree': 7.0,        # C+ and above
            'Diploma': 5.0,       # C Plain
            'Certificate': 3.0,   # D+
            'Artisan': 1.0        # E and above
        }
    
    def check_programme_eligibility(self, mean_points, programme_level):
        """
        Check if student is eligible for a programme level
        
        Args:
            mean_points (float): Student's mean KUCCPS points
            programme_level (str): Level (Degree/Diploma/Certificate/Artisan)
        
        Returns:
            bool: Is eligible
        """
        if programme_level not in self.mean_threshold:
            raise ValueError(f"Invalid programme level: {programme_level}")
        
        return mean_points >= self.mean_threshold[programme_level]
    
    def get_eligible_programmes(self, mean_points):
        """
        Get all programme levels student is eligible for
        
        Args:
            mean_points (float): Student's mean KUCCPS points
        
        Returns:
            list: Eligible programme levels
        """
        eligible = []
        
        category = get_mean_grade_category(mean_points)
        return category['eligible_programmes']
    
    def determine_full_eligibility(self, student_data):
        """
        Comprehensive eligibility determination
        
        Args:
            student_data (dict): {
                'subjects': list of subject names,
                'grades': {subject: grade_letter},
                'mean_points': float
            }
        
        Returns:
            dict: Complete eligibility report
        """
        mean_points = student_data.get('mean_points')
        subjects = student_data.get('subjects', [])
        grades = student_data.get('grades', {})
        
        # Convert grades to points for cluster analysis
        grade_points = {}
        for subject, grade in grades.items():
            try:
                grade_points[subject] = convert_grade_to_points(grade)
            except ValueError:
                continue
        
        # Get eligible programme levels
        eligible_levels = self.get_eligible_programmes(mean_points)
        
        # Analyze fit for different programmes
        programme_analysis = []
        for programme in get_available_programmes():
            fit = analyze_programme_fit(subjects, grade_points, programme)
            if fit and 'error' not in fit:
                programme_analysis.append({
                    'programme': programme,
                    'cluster_score': fit['student_cluster_score'],
                    'min_required': fit['min_required_score'],
                    'is_eligible': fit['is_eligible']
                })
        
        return {
            'mean_points': mean_points,
            'eligible_programme_levels': eligible_levels,
            'programme_analysis': programme_analysis,
            'eligible_programmes': [
                p['programme'] for p in programme_analysis if p['is_eligible']
            ],
            'ineligible_programmes': [
                p['programme'] for p in programme_analysis if not p['is_eligible']
            ]
        }
    
    def generate_recommendation(self, eligibility_report):
        """
        Generate human-readable recommendations
        
        Args:
            eligibility_report (dict): Output from determine_full_eligibility
        
        Returns:
            dict: Recommendation text and insights
        """
        eligible_count = len(eligibility_report.get('eligible_programmes', []))
        mean_points = eligibility_report.get('mean_points', 0)
        
        if mean_points >= 7:
            recommendation = "Congratulations! You qualify for degree programmes. Consider your cluster subjects when selecting specific courses."
        elif mean_points >= 5:
            recommendation = "You qualify for diploma and certificate programmes. Focus on diploma programmes for better career prospects."
        elif mean_points >= 3:
            recommendation = "You qualify for certificate and artisan programmes. These provide valuable technical skills."
        else:
            recommendation = "You may need to retake KCSE or explore alternative pathways such as technical colleges."
        
        return {
            'recommendation': recommendation,
            'eligible_count': eligible_count,
            'mean_points': mean_points,
            'next_steps': [
                "Review your cluster subjects",
                "Compare with KUCCPS 2024 cutoff points",
                "Visit campus open days",
                "Complete KUCCPS online application"
            ]
        }
