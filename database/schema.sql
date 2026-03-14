-- KUCCPS Career Hub Database Schema
-- PostgreSQL database structure for placement advisory system

-- ============================================
-- TABLES DEFINITION
-- ============================================

-- Grade Conversion Reference
CREATE TABLE IF NOT EXISTS kcse_grades_points (
    id SERIAL PRIMARY KEY,
    grade VARCHAR(3) UNIQUE NOT NULL,
    kuccps_points INT NOT NULL,
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KUCCPS Institutions
CREATE TABLE IF NOT EXISTS kuccps_institutions (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    ownership VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    county VARCHAR(100),
    website VARCHAR(255),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    established INT,
    total_courses INT DEFAULT 0,
    is_accredited BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KUCCPS Courses/Programmes
CREATE TABLE IF NOT EXISTS kuccps_courses (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    institution_code VARCHAR(10) NOT NULL,
    programme_level VARCHAR(50) NOT NULL,
    description TEXT,
    cluster_subjects_count INT DEFAULT 4,
    cluster_score_minimum INT NOT NULL,
    cluster_score_cutoff_2024 INT,
    cluster_score_cutoff_2025 INT,
    mean_grade_required FLOAT,
    mean_grade_required_letter VARCHAR(3),
    duration_years INT,
    intake_capacity INT,
    application_fee INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_code) REFERENCES kuccps_institutions(code)
);

-- Cluster Subjects Configuration
CREATE TABLE IF NOT EXISTS cluster_subjects (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(10) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    position INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_code) REFERENCES kuccps_courses(code),
    UNIQUE(course_code, subject_name)
);

-- Student Data Storage
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    total_subjects INT,
    mean_grade_points FLOAT,
    mean_grade_category VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Subjects and Grades
CREATE TABLE IF NOT EXISTS student_grades (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    grade_letter VARCHAR(3),
    grade_points INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    UNIQUE(student_id, subject_name)
);

-- OTP Verification Codes
CREATE TABLE IF NOT EXISTS otp_codes (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    otp_code VARCHAR(10),
    phone_number VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    attempts INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    verified_at TIMESTAMP
);

-- Placement Analysis Results
CREATE TABLE IF NOT EXISTS placement_analysis (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    analysis_json JSONB,
    eligible_programmes INT,
    ineligible_programmes INT,
    recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

-- User Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    session_token VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_student_grades_student_id ON student_grades(student_id);
CREATE INDEX idx_otp_codes_student_id ON otp_codes(student_id);
CREATE INDEX idx_courses_institution ON kuccps_courses(institution_code);
CREATE INDEX idx_placement_analysis_student_id ON placement_analysis(student_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);

-- ============================================
-- INITIAL DATA
-- ============================================

-- Insert Grade Conversion Data
INSERT INTO kcse_grades_points (grade, kuccps_points, description) VALUES
('A', 12, 'Excellent'),
('A-', 11, 'Very Good'),
('B+', 10, 'Good'),
('B', 9, 'Good'),
('B-', 8, 'Satisfactory'),
('C+', 7, 'Satisfactory'),
('C', 6, 'Fair'),
('C-', 5, 'Fair'),
('D+', 4, 'Poor'),
('D', 3, 'Poor'),
('D-', 2, 'Very Poor'),
('E', 1, 'Fail')
ON CONFLICT (grade) DO NOTHING;

-- Insert Sample Institutions
INSERT INTO kuccps_institutions (code, name, type, location, website, established, total_courses) VALUES
('1101', 'University of Nairobi', 'University', 'Nairobi', 'www.uonbi.ac.ke', 1970, 150),
('1102', 'Kenyatta University', 'University', 'Nairobi', 'www.kenyatta.ac.ke', 1985, 120),
('1103', 'Moi University', 'University', 'Eldoret', 'www.mu.ac.ke', 1984, 100),
('1104', 'JKUAT', 'University', 'Juja', 'www.jkuat.ac.ke', 1981, 95),
('2101', 'Kenya Technical Trainer College', 'Technical College', 'Nairobi', 'www.kttc.ac.ke', 1990, 45)
ON CONFLICT (code) DO NOTHING;

-- Insert Sample Courses
INSERT INTO kuccps_courses (code, name, institution_code, programme_level, cluster_score_required, mean_grade_required, cutoff_2024, duration_years) VALUES
('1040123', 'BSc Computer Science', '1101', 'Degree', 24, 7.0, 24, 4),
('1040124', 'Diploma in Information Technology', '1101', 'Diploma', 18, 5.0, 18, 3),
('1050234', 'BSc Engineering', '1103', 'Degree', 25, 7.0, 25, 5),
('1040125', 'Certificate in Computer Applications', '1104', 'Certificate', 12, 3.0, 12, 2),
('1030456', 'BSc Business Administration', '1102', 'Degree', 20, 7.0, 20, 4)
ON CONFLICT (code) DO NOTHING;

-- Insert Cluster Subjects for Sample Courses
INSERT INTO cluster_subjects (course_code, subject_name, position) VALUES
('1040123', 'Mathematics', 1),
('1040123', 'Physics', 2),
('1040123', 'Chemistry', 3),
('1040123', 'Computer Science', 4),
('1050234', 'Mathematics', 1),
('1050234', 'Physics', 2),
('1050234', 'Chemistry', 3),
('1050234', 'Biology', 4),
('1030456', 'Mathematics', 1),
('1030456', 'Economics', 2),
('1030456', 'English', 3),
('1030456', 'Kiswahili', 4)
ON CONFLICT (course_code, subject_name) DO NOTHING;
