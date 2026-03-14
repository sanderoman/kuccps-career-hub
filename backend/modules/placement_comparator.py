"""
Placement Comparator Module - KUCCPS Cutoff & Cluster Point Matching
Compares student cluster points against programme cutoff points
Implements university cutoff vs technical college cluster requirements
"""

from modules.grade_converter import convert_grade_to_points, get_mean_grade_category

class PlacementComparator:
    """Compares student scores against programme requirements"""
    
    def compare_with_programme(self, student_cluster_score, programme_data):
        """
        Compare student cluster score with programme requirements
        
        Args:
            student_cluster_score (int): Student's cluster score
            programme_data (dict): Programme data with cutoff and requirements
        
        Returns:
            dict: Comparison result with eligibility status
        """
        programme_level = programme_data.get('programme_level', 'Unknown')
        cutoff_2024 = programme_data.get('cluster_score_cutoff_2024')
        minimum_required = programme_data.get('cluster_score_minimum')
        
        # Different logic for different programme levels
        if programme_level == 'Degree':
            return self._compare_degree_programme(
                student_cluster_score,
                programme_data
            )
        elif programme_level == 'Diploma':
            return self._compare_diploma_programme(
                student_cluster_score,
                programme_data
            )
        elif programme_level == 'Certificate':
            return self._compare_certificate_programme(
                student_cluster_score,
                programme_data
            )
        else:
            return self._compare_other_programme(
                student_cluster_score,
                programme_data
            )
    
    def _compare_degree_programme(self, student_score, programme):
        """
        Compare for Degree programmes (Universities)
        Uses KUCCPS 2024/2025 official cutoff points
        
        For universities:
        - Student cluster score must meet or exceed cutoff
        - Can vary year to year (2024: one cutoff, 2025: another)
        """
        cutoff_2024 = programme.get('cluster_score_cutoff_2024')
        cutoff_2025 = programme.get('cluster_score_cutoff_2025')
        
        is_eligible_2024 = student_score >= cutoff_2024 if cutoff_2024 else False
        is_eligible_2025 = student_score >= cutoff_2025 if cutoff_2025 else False
        
        gap_2024 = student_score - cutoff_2024 if cutoff_2024 else 0
        gap_2025 = student_score - cutoff_2025 if cutoff_2025 else 0
        
        # start with programme data so fields like cluster_subjects are preserved
        result = {
            **programme,
            'student_cluster_score': student_score,
            'cutoff_2024': cutoff_2024,
            'cutoff_2025': cutoff_2025,
            'is_eligible_2024': is_eligible_2024,
            'is_eligible_2025': is_eligible_2025,
            'eligibility_status': 'ELIGIBLE' if is_eligible_2024 else 'NOT ELIGIBLE',
            'gap_from_2024_cutoff': gap_2024,
            'gap_from_2025_cutoff': gap_2025,
            'year_2024_placement': 'YES' if is_eligible_2024 else 'NO',
            'year_2025_placement': 'YES' if is_eligible_2025 else 'NO',
            'comparison_basis': 'University Cutoff Points (Official KUCCPS)',
            'remarks': self._generate_degree_remarks(student_score, cutoff_2024, gap_2024)
        }
        # guarantee some normalized keys
        result['programme_level'] = 'Degree'
        result['programme_code'] = programme.get('code')
        result['programme_name'] = programme.get('name')
        return result
    
    def _compare_diploma_programme(self, student_score, programme):
        """
        Compare for Diploma programmes (Technical Colleges)
        Uses cluster subject requirements (4 subjects minimum)
        Cluster subjects required depend on programme
        """
        cutoff_2024 = programme.get('cluster_score_cutoff_2024')
        minimum = programme.get('cluster_score_minimum', 12)
        
        is_eligible = student_score >= (cutoff_2024 or minimum)
        gap = student_score - (cutoff_2024 or minimum)
        
        result = {
            **programme,
            'student_cluster_score': student_score,
            'minimum_cluster_score': minimum,
            'cutoff_2024': cutoff_2024 or minimum,
            'is_eligible': is_eligible,
            'eligibility_status': 'ELIGIBLE' if is_eligible else 'NOT ELIGIBLE',
            'gap_from_cutoff': gap,
            'duration_years': programme.get('duration_years'),
            'intake_capacity': programme.get('intake_capacity'),
            'comparison_basis': 'Cluster Subject Requirement (Technical)',
            'remarks': self._generate_diploma_remarks(student_score, cutoff_2024 or minimum, gap)
        }
        result['programme_level'] = 'Diploma'
        result['programme_code'] = programme.get('code')
        result['programme_name'] = programme.get('name')
        return result
    
    def _compare_certificate_programme(self, student_score, programme):
        """
        Compare for Certificate programmes (Technical Colleges/Artisan)
        Basic cluster requirements
        Lower entry requirements than diploma
        """
        minimum = programme.get('cluster_score_minimum', 8)
        cutoff_2024 = programme.get('cluster_score_cutoff_2024')
        
        is_eligible = student_score >= (cutoff_2024 or minimum)
        gap = student_score - (cutoff_2024 or minimum)
        
        result = {
            **programme,
            'student_cluster_score': student_score,
            'minimum_cluster_score': minimum,
            'cutoff_2024': cutoff_2024 or minimum,
            'is_eligible': is_eligible,
            'eligibility_status': 'ELIGIBLE' if is_eligible else 'NOT ELIGIBLE',
            'gap_from_cutoff': gap,
            'duration_years': programme.get('duration_years'),
            'intake_capacity': programme.get('intake_capacity'),
            'comparison_basis': 'Basic Cluster Requirement (Certificate)',
            'remarks': self._generate_certificate_remarks(student_score, cutoff_2024 or minimum, gap)
        }
        result['programme_level'] = 'Certificate'
        result['programme_code'] = programme.get('code')
        result['programme_name'] = programme.get('name')
        return result
    
    def _compare_other_programme(self, student_score, programme):
        """Compare for other programme types"""
        minimum = programme.get('cluster_score_minimum', 0)
        is_eligible = student_score >= minimum
        gap = student_score - minimum
        
        return {
            'programme_name': programme.get('name'),
            'programme_code': programme.get('code'),
            'programme_level': programme.get('programme_level', 'Other'),
            'student_cluster_score': student_score,
            'minimum_cluster_score': minimum,
            'is_eligible': is_eligible,
            'eligibility_status': 'ELIGIBLE' if is_eligible else 'NOT ELIGIBLE',
            'gap_from_cutoff': gap,
            'comparison_basis': 'Standard Cluster Requirement'
        }
    
    @staticmethod
    def _generate_degree_remarks(student_score, cutoff, gap):
        """Generate remarks for degree programmes"""
        if gap >= 5:
            return f"Strong candidate. Scored {gap} points above cutoff."
        elif gap >= 0:
            return f"Meets cutoff by {gap} points. Competitive programme."
        elif gap >= -3:
            return f"Just below cutoff ({abs(gap)} points). Consider waitlist."
        else:
            return f"Not eligible ({abs(gap)} points below). Retake or explore other options."
    
    @staticmethod
    def _generate_diploma_remarks(student_score, cutoff, gap):
        """Generate remarks for diploma programmes"""
        if gap >= 3:
            return f"Good fit. Scored {gap} points above requirement."
        elif gap >= 0:
            return f"Meets diploma requirement by {gap} points."
        else:
            return f"Below requirement. Consider certificate or retake."
    
    @staticmethod
    def _generate_certificate_remarks(student_score, cutoff, gap):
        """Generate remarks for certificate programmes"""
        if gap >= 2:
            return f"Well qualified. Above minimum by {gap} points."
        elif gap >= 0:
            return f"Meets minimum certificate requirement."
        else:
            return f"Below minimum. Consider retaking or other options."
    
    def batch_compare(self, student_cluster_score, programmes_data):
        """
        Compare student against multiple programmes at once
        Organize results by institution and programme level
        
        Args:
            student_cluster_score (int): Student's cluster score
            programmes_data (list): List of programme dictionaries
        
        Returns:
            dict: Organized comparison results
        """
        results = {
            'student_cluster_score': student_cluster_score,
            'by_level': {
                'degree': {'eligible': [], 'ineligible': []},
                'diploma': {'eligible': [], 'ineligible': []},
                'certificate': {'eligible': [], 'ineligible': []},
                'other': {'eligible': [], 'ineligible': []}
            },
            'by_institution': {},
            'total_eligible': 0,
            'total_ineligible': 0
        }
        
        for programme in programmes_data:
            comparison = self.compare_with_programme(student_cluster_score, programme)
            is_eligible = comparison.get('is_eligible') or comparison.get('is_eligible_2024')
            level = programme.get('programme_level', 'other').lower()
            
            # Organize by level
            if is_eligible:
                results['by_level'][level]['eligible'].append(comparison)
                results['total_eligible'] += 1
            else:
                results['by_level'][level]['ineligible'].append(comparison)
                results['total_ineligible'] += 1
            
            # Organize by institution
            inst_code = programme.get('institution_code')
            if inst_code not in results['by_institution']:
                results['by_institution'][inst_code] = {
                    'eligible': [],
                    'ineligible': []
                }
            
            if is_eligible:
                results['by_institution'][inst_code]['eligible'].append(comparison)
            else:
                results['by_institution'][inst_code]['ineligible'].append(comparison)
        
        return results
    
    def generate_placement_summary(self, batch_results):
        """
        Generate human-readable placement eligibility summary
        
        Args:
            batch_results (dict): Results from batch_compare
        
        Returns:
            dict: Summary with counts and recommendations
        """
        return {
            'student_cluster_score': batch_results['student_cluster_score'],
            'total_eligible_programmes': batch_results['total_eligible'],
            'total_ineligible_programmes': batch_results['total_ineligible'],
            'eligible_by_level': {
                'Degree': len(batch_results['by_level']['degree']['eligible']),
                'Diploma': len(batch_results['by_level']['diploma']['eligible']),
                'Certificate': len(batch_results['by_level']['certificate']['eligible'])
            },
            'top_eligible_programmes': self._get_top_programmes(batch_results),
            'recommendation': self._generate_overall_recommendation(batch_results)
        }
    
    @staticmethod
    def _get_top_programmes(batch_results, limit=5):
        """Get top eligible programmes"""
        all_eligible = []
        for level_data in batch_results['by_level'].values():
            all_eligible.extend(level_data['eligible'])
        
        # Sort by gap (higher gap = better fit)
        sorted_progs = sorted(
            all_eligible,
            key=lambda x: x.get('gap_from_cutoff') or x.get('gap_from_2024_cutoff') or 0,
            reverse=True
        )
        
        return sorted_progs[:limit]
    
    @staticmethod
    def _generate_overall_recommendation(batch_results):
        """Generate overall placement recommendation"""
        degree_count = len(batch_results['by_level']['degree']['eligible'])
        diploma_count = len(batch_results['by_level']['diploma']['eligible'])
        certificate_count = len(batch_results['by_level']['certificate']['eligible'])
        
        if degree_count > 0:
            return f"You are eligible for {degree_count} degree programmes. Recommended to pursue university education."
        elif diploma_count > 0:
            return f"You are eligible for {diploma_count} diploma programmes. Consider technical education for specialized skills."
        elif certificate_count > 0:
            return f"You are eligible for {certificate_count} certificate programmes. Develop technical expertise through vocational training."
        else:
            return "Review your scores. Consider retaking or exploring alternative pathways."
