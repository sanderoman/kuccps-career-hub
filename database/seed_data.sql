-- KUCCPS Career Hub - Sample Data Seed Script
-- Populates additional test data for development

-- Insert Additional Institutions (Public Universities)
INSERT INTO kuccps_institutions (code, name, type, ownership, location, county, website, established, total_courses, is_accredited) VALUES
('1101', 'University of Nairobi', 'University', 'Public', 'Nairobi', 'Nairobi', 'www.uonbi.ac.ke', 1970, 150, TRUE),
('1102', 'Kenyatta University', 'University', 'Public', 'Nairobi', 'Nairobi', 'www.kenyatta.ac.ke', 1985, 120, TRUE),
('1103', 'Moi University', 'University', 'Public', 'Eldoret', 'Uasin Gishu', 'www.mu.ac.ke', 1984, 100, TRUE),
('1104', 'Jomo Kenyatta University of Agriculture and Technology', 'University', 'Public', 'Juja', 'Kiambu', 'www.jkuat.ac.ke', 1981, 95, TRUE),
('1105', 'Maseno University', 'University', 'Public', 'Maseno', 'Kisumu', 'www.maseno.ac.ke', 1991, 85, TRUE),
('1106', 'Egerton University', 'University', 'Public', 'Njoro', 'Nakuru', 'www.egerton.ac.ke', 1939, 90, TRUE),
('1107', 'The Technical University of Kenya', 'University', 'Public', 'Nairobi', 'Nairobi', 'www.tuk.ac.ke', 2013, 110, TRUE),
('1108', 'Dedan Kimathi University', 'University', 'Public', 'Nyeri', 'Nyeri', 'www.dkut.ac.ke', 2007, 60, TRUE),
('1109', 'Multimedia University of Kenya', 'University', 'Public', 'Nairobi', 'Nairobi', 'www.mmu.ac.ke', 2013, 45, TRUE),
('1110', 'Laikipia University', 'University', 'Public', 'Nakuru', 'Laikipia', 'www.laikipia.ac.ke', 2007, 55, TRUE),
('1111', 'University of Eastern Africa Baraton', 'University', 'Public', 'Eldoret', 'Uasin Gishu', 'www.ueab.ac.ke', 1991, 50, TRUE),
('1112', 'Kisii University', 'University', 'Public', 'Kisii', 'Kisii', 'www.kisiiuni.ac.ke', 2013, 65, TRUE),
('1113', 'Kenyatta University - Distance Learning', 'University', 'Public', 'Nairobi', 'Nairobi', 'www.kenyatta.ac.ke', 1985, 40, TRUE),
('1114', 'South Eastern Kenya University', 'University', 'Public', 'Kitui', 'Kitui', 'www.seku.ac.ke', 2012, 50, TRUE),
('1115', 'Mount Kenya University (Public)', 'University', 'Public', 'Thika', 'Kiambu', 'www.mku.ac.ke', 1997, 75, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Additional Institutions (Private Universities)
INSERT INTO kuccps_institutions (code, name, type, ownership, location, county, website, established, total_courses, is_accredited) VALUES
('1201', 'Strathmore University', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.strathmore.edu', 1981, 85, TRUE),
('1202', 'Kenya Methodist University', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.kemu.ac.ke', 1991, 65, TRUE),
('1203', 'Catholic University of Eastern Africa', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.cuea.ac.ke', 1984, 58, TRUE),
('1204', 'Aga Khan University', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.aku.edu', 1988, 45, TRUE),
('1205', 'United States International University', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.usiu.ac.ke', 1989, 42, TRUE),
('1206', 'Daystar University', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.daystar.ac.ke', 1996, 52, TRUE),
('1207', 'Kabarak University', 'University', 'Private', 'Nakuru', 'Nakuru', 'www.kabarak.ac.ke', 1997, 48, TRUE),
('1208', 'Kericho Polytechnic (University)', 'University', 'Private', 'Kericho', 'Kericho', 'www.keriopoly.ac.ke', 2010, 35, TRUE),
('1209', 'Nairobi University College', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.nuc.ac.ke', 2005, 38, TRUE),
('1210', 'Pioneer International University', 'University', 'Private', 'Nairobi', 'Nairobi', 'www.pioneeruniversity.ac.ke', 2013, 30, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Technical Colleges (Public)
INSERT INTO kuccps_institutions (code, name, type, ownership, location, county, website, established, total_courses, is_accredited) VALUES
('2101', 'Kenya Technical Trainer College', 'Technical College', 'Public', 'Nairobi', 'Nairobi', 'www.kttc.ac.ke', 1990, 45, TRUE),
('2102', 'Nairobi Institute of Technology', 'Technical College', 'Public', 'Nairobi', 'Nairobi', 'www.nit.ac.ke', 2005, 35, TRUE),
('2103', 'Mombasa Technical College', 'Technical College', 'Public', 'Mombasa', 'Mombasa', 'www.montec.ac.ke', 2000, 30, TRUE),
('2104', 'Eldoret Technical Training Institute', 'Technical College', 'Public', 'Eldoret', 'Uasin Gishu', 'www.etti.ac.ke', 1995, 32, TRUE),
('2105', 'Kisumu Technical Institute', 'Technical College', 'Public', 'Kisumu', 'Kisumu', 'www.kti.ac.ke', 2000, 28, TRUE),
('2106', 'Nakuru Technical Training Institute', 'Technical College', 'Public', 'Nakuru', 'Nakuru', 'www.ntti.ac.ke', 2001, 30, TRUE),
('2107', 'Kilimambogo Technical Training Institute', 'Technical College', 'Public', 'Thika', 'Kiambu', 'www.ktti.ac.ke', 1985, 35, TRUE),
('2108', 'Malindi Technical Training Institute', 'Technical College', 'Public', 'Malindi', 'Kilifi', 'www.mtti.ac.ke', 2002, 25, TRUE),
('2109', 'Machakos Technical Institute', 'Technical College', 'Public', 'Machakos', 'Machakos', 'www.mti.ac.ke', 2000, 28, TRUE),
('2110', 'Muranga Technical Training Institute', 'Technical College', 'Public', 'Murang\'a', 'Murang\'a', 'www.mutti.ac.ke', 1998, 26, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Technical Colleges (Private)
INSERT INTO kuccps_institutions (code, name, type, ownership, location, county, website, established, total_courses, is_accredited) VALUES
('2201', 'Inoorero University (Technical)', 'Technical College', 'Private', 'Nairobi', 'Nairobi', 'www.inoorero.ac.ke', 2011, 22, TRUE),
('2202', 'Vision Institute of Professional Studies', 'Technical College', 'Private', 'Nairobi', 'Nairobi', 'www.vips.ac.ke', 2008, 20, TRUE),
('2203', 'Amref Health Africa Technical Institute', 'Technical College', 'Private', 'Nairobi', 'Nairobi', 'www.amref.org', 2005, 18, TRUE),
('2204', 'Confidant Institute of Technology', 'Technical College', 'Private', 'Mombasa', 'Mombasa', 'www.cit.ac.ke', 2010, 16, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Diploma Colleges (Public)
INSERT INTO kuccps_institutions (code, name, type, ownership, location, county, website, established, total_courses, is_accredited) VALUES
('3101', 'Kenya Institute of Mass Communication', 'Diploma College', 'Public', 'Nairobi', 'Nairobi', 'www.kimc.ac.ke', 1966, 8, TRUE),
('3102', 'Kenya School of Government (Diploma)', 'Diploma College', 'Public', 'Nairobi', 'Nairobi', 'www.ksg.ac.ke', 1963, 15, TRUE),
('3103', 'Nairobi School of Real Estate', 'Diploma College', 'Public', 'Nairobi', 'Nairobi', 'www.nsre.ac.ke', 2000, 5, TRUE),
('3104', 'Institute of Tourism and Hotel Management', 'Diploma College', 'Public', 'Nairobi', 'Nairobi', 'www.ithm.ac.ke', 1972, 10, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Diploma Colleges (Private)
INSERT INTO kuccps_institutions (code, name, type, ownership, location, county, website, established, total_courses, is_accredited) VALUES
('3201', 'Nairobi Aviation College', 'Diploma College', 'Private', 'Nairobi', 'Nairobi', 'www.nac.ac.ke', 2005, 6, TRUE),
('3202', 'Kenya School of Professional Studies', 'Diploma College', 'Private', 'Nairobi', 'Nairobi', 'www.ksps.ac.ke', 2008, 12, TRUE),
('3203', 'Institute of Professional Studies-Nairobi', 'Diploma College', 'Private', 'Nairobi', 'Nairobi', 'www.ips-nairobi.ac.ke', 2010, 14, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Sample Courses (Public Universities - with 2024 & 2025 cutoff)
INSERT INTO kuccps_courses (code, name, institution_code, programme_level, description, cluster_subjects_count, cluster_score_minimum, cluster_score_cutoff_2024, cluster_score_cutoff_2025, mean_grade_required, mean_grade_required_letter, duration_years, intake_capacity, is_active) VALUES
('1040123', 'BSc Computer Science', '1101', 'Degree', 'Computer Science Programme', 4, 24, 28, 29, 7.0, 'C+', 4, 60, TRUE),
('1040124', 'BSc Engineering (Electrical)', '1101', 'Degree', 'Electrical Engineering', 4, 25, 29, 30, 7.0, 'C+', 5, 45, TRUE),
('1040125', 'BSc Medicine', '1101', 'Degree', 'Medicine Programme', 4, 28, 32, 33, 7.5, 'B-', 6, 30, TRUE),
('1040201', 'BSc Software Engineering', '1102', 'Degree', 'Software Engineering', 4, 23, 27, 28, 7.0, 'C+', 4, 50, TRUE),
('1040202', 'BSc Information Technology', '1102', 'Degree', 'IT Programme', 4, 22, 26, 27, 7.0, 'C+', 4, 55, TRUE),
('1040301', 'BSc Agriculture', '1103', 'Degree', 'Agriculture', 4, 20, 24, 25, 6.5, 'C', 4, 65, TRUE),
('1040302', 'BSc Geology', '1103', 'Degree', 'Geology', 4, 22, 26, 27, 7.0, 'C+', 4, 40, TRUE),
('1040401', 'BSc Mechanical Engineering', '1104', 'Degree', 'Mechanical Engineering', 4, 25, 29, 30, 7.0, 'C+', 5, 50, TRUE),
('1040402', 'BSc Civil Engineering', '1104', 'Degree', 'Civil Engineering', 4, 25, 29, 30, 7.0, 'C+', 5, 45, TRUE),
('1040501', 'BSc Business Administration', '1105', 'Degree', 'Business Admin', 4, 20, 24, 25, 6.5, 'C', 4, 80, TRUE),
('1040502', 'BSc Actuarial Science', '1105', 'Degree', 'Actuarial Science', 4, 24, 28, 29, 7.0, 'C+', 4, 35, TRUE),
('1040601', 'BSc Education (Science)', '1106', 'Degree', 'Education - Science', 4, 20, 24, 25, 6.5, 'C', 4, 100, TRUE),
('1040602', 'BSc Education (Arts)', '1106', 'Degree', 'Education - Arts', 4, 18, 22, 23, 6.0, 'C', 4, 120, TRUE),
('1040701', 'BSc Nursing', '1101', 'Degree', 'Nursing Science', 4, 22, 26, 27, 6.5, 'C', 4, 45, TRUE),
('1040702', 'BSc Public Health', '1102', 'Degree', 'Public Health', 4, 21, 25, 26, 6.5, 'C', 4, 50, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Sample Courses (Private Universities)
INSERT INTO kuccps_courses (code, name, institution_code, programme_level, description, cluster_subjects_count, cluster_score_minimum, cluster_score_cutoff_2024, cluster_score_cutoff_2025, mean_grade_required, mean_grade_required_letter, duration_years, intake_capacity, is_active) VALUES
('1200101', 'BSc Information Technology', '1201', 'Degree', 'IT at Strathmore', 4, 22, 26, 27, 7.0, 'C+', 4, 60, TRUE),
('1200102', 'BSc Business and Finance', '1201', 'Degree', 'Business Finance', 4, 20, 24, 25, 6.5, 'C', 4, 70, TRUE),
('1200201', 'BA Theology', '1202', 'Degree', 'Theology Programme', 3, 18, 22, 23, 6.0, 'C', 3, 40, TRUE),
('1200301', 'BSc Computer Science', '1203', 'Degree', 'CS at CUEA', 4, 23, 27, 28, 7.0, 'C+', 4, 45, TRUE),
('1200401', 'MD Medicine', '1204', 'Degree', 'Medicine at AKU', 4, 30, 34, 35, 8.0, 'B+', 6, 25, TRUE),
('1200501', 'BSc Engineering', '1205', 'Degree', 'Engineering', 4, 24, 28, 29, 7.0, 'C+', 5, 50, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Sample Courses (Technical Colleges - Diploma level)
INSERT INTO kuccps_courses (code, name, institution_code, programme_level, description, cluster_subjects_count, cluster_score_minimum, cluster_score_cutoff_2024, mean_grade_required, mean_grade_required_letter, duration_years, intake_capacity, is_active) VALUES
('2101001', 'Diploma in Electrical Installation', '2101', 'Diploma', 'Electrical Diploma', 4, 15, 18, 5.0, 'C', 3, 50, TRUE),
('2101002', 'Diploma in Plumbing and Pipe Fitting', '2101', 'Diploma', 'Plumbing Diploma', 4, 14, 17, 5.0, 'C', 3, 40, TRUE),
('2101003', 'Diploma in Welding and Fabrication', '2101', 'Diploma', 'Welding Diploma', 4, 12, 15, 4.5, 'C-', 2, 45, TRUE),
('2102001', 'Diploma in Information Technology', '2102', 'Diploma', 'IT Diploma', 4, 16, 19, 5.0, 'C', 3, 60, TRUE),
('2102002', 'Diploma in Electronics', '2102', 'Diploma', 'Electronics', 4, 15, 18, 5.0, 'C', 3, 35, TRUE),
('2103001', 'Diploma in Marine Engineering', '2103', 'Diploma', 'Marine Eng', 4, 17, 20, 5.5, 'C+', 3, 30, TRUE),
('2103002', 'Diploma in Building and Construction', '2103', 'Diploma', 'Construction', 4, 14, 17, 5.0, 'C', 3, 50, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Sample Courses (Certificate level)
INSERT INTO kuccps_courses (code, name, institution_code, programme_level, description, cluster_subjects_count, cluster_score_minimum, cluster_score_cutoff_2024, mean_grade_required, mean_grade_required_letter, duration_years, intake_capacity, is_active) VALUES
('2101101', 'Certificate in Electrical Installation', '2101', 'Certificate', 'Electrical Cert', 4, 10, 12, 3.0, 'D+', 2, 60, TRUE),
('2101102', 'Certificate in Welding Fabrication', '2101', 'Certificate', 'Welding Cert', 4, 8, 10, 2.5, 'D+', 2, 70, TRUE),
('2102101', 'Certificate in ICT', '2102', 'Certificate', 'ICT Certificate', 4, 11, 13, 3.5, 'D+', 2, 80, TRUE),
('2103101', 'Certificate in Building Trades', '2103', 'Certificate', 'Building Cert', 4, 9, 11, 3.0, 'D+', 2, 90, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Insert Cluster Subjects for Additional Courses
INSERT INTO cluster_subjects (course_code, subject_name, position) VALUES
('1040201', 'Mathematics', 1),
('1040201', 'Physics', 2),
('1040201', 'Computer Science', 3),
('1040201', 'English', 4),
('1040202', 'Mathematics', 1),
('1040202', 'Physics', 2),
('1040202', 'Chemistry', 3),
('1040202', 'Computer Science', 4),
('1060301', 'Physics', 1),
('1060301', 'Mathematics', 2),
('1060301', 'Chemistry', 3),
('1060301', 'Technical Drawing', 4),
('1070302', 'Mathematics', 1),
('1070302', 'Physics', 2),
('1070302', 'Chemistry', 3),
('1070302', 'Practical Skills', 4),
('1080303', 'Mathematics', 1),
('1080303', 'Physics', 2),
('1080303', 'Technical Drawing', 3),
('1080303', 'Practical Skills', 4)
ON CONFLICT (course_code, subject_name) DO NOTHING;

-- Sample Student Data (Test Records)
INSERT INTO students (student_id, name, phone_number, email, total_subjects, mean_grade_points, mean_grade_category)
VALUES
('STU001', 'John Mbugua', '+254712345678', 'john@example.com', 8, 8.5, 'A'),
('STU002', 'Sarah Kipchoge', '+254723456789', 'sarah@example.com', 8, 6.5, 'B'),
('STU003', 'Kamau Omondi', '+254734567890', 'kamau@example.com', 8, 4.5, 'C')
ON CONFLICT (student_id) DO NOTHING;

-- Sample Student Grades
INSERT INTO student_grades (student_id, subject_name, grade_letter, grade_points) 
SELECT 
    (SELECT id FROM students WHERE student_id = 'STU001'),
    subject_name,
    'A',
    12
FROM (VALUES ('Mathematics'), ('Physics'), ('Chemistry'), ('Biology'), ('English'), ('Kiswahili'), ('History'), ('Geography')) AS subjects(subject_name)
ON CONFLICT (student_id, subject_name) DO NOTHING;

-- Mark some test records for conflict resolution
INSERT INTO student_grades (student_id, subject_name, grade_letter, grade_points) 
SELECT 
    (SELECT id FROM students WHERE student_id = 'STU002'),
    subject_name,
    'C+',
    7
FROM (VALUES ('Mathematics'), ('Physics'), ('Chemistry'), ('Biology'), ('English'), ('Kiswahili'), ('History'), ('Geography')) AS subjects(subject_name)
ON CONFLICT (student_id, subject_name) DO NOTHING;

-- Create timestamp function for automatic update
DROP TRIGGER IF EXISTS update_institutions_timestamp ON kuccps_institutions CASCADE;
DROP TRIGGER IF EXISTS update_courses_timestamp ON kuccps_courses CASCADE;
DROP TRIGGER IF EXISTS update_students_timestamp ON students CASCADE;

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_institutions_timestamp
BEFORE UPDATE ON kuccps_institutions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_courses_timestamp
BEFORE UPDATE ON kuccps_courses
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_students_timestamp
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
